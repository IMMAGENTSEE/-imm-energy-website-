"use server"

import type { Resend as ResendType } from "resend"

/**
 * Αποστολή email επικοινωνίας μέσω Resend.
 * Αν λείπει το RESEND_API_KEY, απλώς καταγράφουμε τα δεδομένα
 * και ενημερώνουμε τον χρήστη ότι θα τον καλέσουμε.
 */
export async function sendContactEmail(formData: FormData) {
  try {
    /* -------------------------------------------------------------------- */
    /* 1. Ανάγνωση και βασική επικύρωση πεδίων                               */
    /* -------------------------------------------------------------------- */
    const name = (formData.get("name") as string | null)?.trim() ?? ""
    const phone = (formData.get("phone") as string | null)?.trim() ?? ""
    const email = (formData.get("email") as string | null)?.trim() ?? ""
    const message = (formData.get("message") as string | null)?.trim() ?? ""
    const billFile = formData.get("bill-upload") as File | null

    if (!name || !phone || !email) {
      return {
        success: false,
        message: "Παρακαλώ συμπληρώστε όλα τα υποχρεωτικά πεδία.",
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: "Παρακαλώ εισάγετε έγκυρη διεύθυνση email.",
      }
    }

    /* -------------------------------------------------------------------- */
    /* 2. Έλεγχος ύπαρξης API Key                                            */
    /* -------------------------------------------------------------------- */
    const apiKey = process.env.RESEND_API_KEY
    console.log("🔍 API Key status:", apiKey ? "Υπάρχει" : "Λείπει")

    if (!apiKey) {
      console.error("❌ Λείπει το RESEND_API_KEY στο περιβάλλον.")
      logFallback({ name, phone, email, message, billFile })
      return {
        success: true,
        message: "Το μήνυμά σας καταγράφηκε! Θα επικοινωνήσουμε το συντομότερο (χρειάζεται ρύθμιση API key).",
      }
    }

    /* -------------------------------------------------------------------- */
    /* 3. Προετοιμασία κειμένου email                                        */
    /* -------------------------------------------------------------------- */
    const emailText = [
      "ΝΕΟ ΜΗΝΥΜΑ ΑΠΟ ΤΗ ΦΟΡΜΑ IMM ENERGY",
      "",
      `👤 Όνομα: ${name}`,
      `📞 Τηλέφωνο: ${phone}`,
      `📧 Email: ${email}`,
      "",
      "💬 Μήνυμα:",
      message || "—",
      "",
      `📄 Λογαριασμός: ${billFile ? `Επισυνάπτεται (${billFile.name})` : "Δεν επισυνάφθηκε"}`,
    ].join("\n")

    /* -------------------------------------------------------------------- */
    /* 4. Προετοιμασία συνημμένου (αν υπάρχει)                               */
    /* -------------------------------------------------------------------- */
    let attachments:
      | Array<{
          filename: string
          content: Buffer
        }>
      | undefined = undefined

    if (billFile && billFile.size > 0) {
      try {
        const bytes = await billFile.arrayBuffer()
        attachments = [
          {
            filename: billFile.name,
            content: Buffer.from(bytes),
          },
        ]
      } catch (err) {
        console.error("Σφάλμα κατά την επεξεργασία του αρχείου:", err)
        // συνεχίζουμε χωρίς συνημμένο
      }
    }

    /* -------------------------------------------------------------------- */
    /* 5. Αποστολή μέσω Resend                                              */
    /* -------------------------------------------------------------------- */
    try {
      console.log("📧 Προσπάθεια αποστολής email...")

      const { Resend } = (await import("resend")) as { Resend: typeof ResendType }
      const resend = new Resend(apiKey)

      const result = await resend.emails.send({
        from: "IMM Energy <onboarding@resend.dev>",
        to: ["imm.energy@hotmail.com"],
        subject: `🔌 Νέα αίτηση από ${name}`,
        text: emailText,
        attachments,
      })

      console.log("📬 Resend response:", result)

      if (result.error) {
        console.error("❌ Σφάλμα Resend:", result.error)
        logFallback({ name, phone, email, message, billFile, error: result.error })
        return {
          success: false,
          message: `Σφάλμα αποστολής: ${result.error.message || "Άγνωστο σφάλμα"}. Θα σας καλέσουμε σύντομα.`,
        }
      }

      console.log("✅ Email ID:", result.data?.id)
      return {
        success: true,
        message: "Το μήνυμα στάλθηκε επιτυχώς! Θα επικοινωνήσουμε σύντομα.",
      }
    } catch (emailError) {
      console.error("❌ Σφάλμα κατά την αποστολή:", emailError)
      logFallback({ name, phone, email, message, billFile, error: emailError })
      return {
        success: false,
        message: `Τεχνικό πρόβλημα: ${emailError instanceof Error ? emailError.message : "Άγνωστο σφάλμα"}`,
      }
    }
  } catch (err) {
    console.error("❌  Άγνωστο σφάλμα:", err)
    logFallback({ error: err })
    return {
      success: false,
      message:
        "Παρουσιάστηκε τεχνικό πρόβλημα. Παρακαλώ καλέστε στο 2310 451112 ή στείλτε email στο imm.energy@hotmail.com.",
    }
  }
}

/* ========================================================================= */
/* Helper για fallback logging                                               */
/* ========================================================================= */
function logFallback({
  name,
  phone,
  email,
  message,
  billFile,
  error,
}: {
  name?: string
  phone?: string
  email?: string
  message?: string
  billFile?: File | null
  error?: unknown
}) {
  console.log("=== IMM ENERGY – Fallback log ===")
  if (name) console.log("Όνομα:", name)
  if (phone) console.log("Τηλέφωνο:", phone)
  if (email) console.log("Email:", email)
  if (message) console.log("Μήνυμα:", message)
  if (billFile) console.log("Λογαριασμός:", billFile.name)
  if (error) console.error("Σφάλμα:", error)
  console.log("=================================")
}
