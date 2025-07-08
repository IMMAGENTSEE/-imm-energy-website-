"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  Zap,
  Search,
  CheckCircle,
  Phone,
  Mail,
  MessageSquare,
  ArrowRight,
  Star,
  Shield,
  Clock,
  MapPin,
  AlertCircle,
  Leaf,
  TrendingDown,
  Users,
  Award,
  Menu,
  X,
  Upload,
  FileText,
  Calculator,
  Handshake,
  BarChart3,
  Lightbulb,
  Flame,
  Recycle,
  Euro,
  ChevronDown,
  Building,
} from "lucide-react"
import { sendContactEmail } from "@/lib/send-email"

export default function IMMEnergyWebsite() {
  const [state, formAction, isPending] = useActionState(sendContactEmail, null)
  const [fileName, setFileName] = useState<string>("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [calculatorValues, setCalculatorValues] = useState({
    currentFixedCost: "",
    consumption: "",
    currentBill: "",
    tariffType: "blue",
  })
  const [calculatorResult, setCalculatorResult] = useState<{
    currentBill: number
    newBill: number
    monthlySavings: number
    annualSavings: number
  } | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
    } else {
      setFileName("")
    }
  }

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    setMobileMenuOpen(false)
  }

  // Calculator Logic - αντικαταστήστε την υπάρχουσα calculateSavings function
  const calculateSavings = () => {
    const currentFixedCost = Number.parseFloat(calculatorValues.currentFixedCost)
    const consumption = Number.parseFloat(calculatorValues.consumption)
    const currentBill = Number.parseFloat(calculatorValues.currentBill)

    if (!currentFixedCost || !consumption || !currentBill) return

    let newBill = 0

    if (calculatorValues.tariffType === "blue") {
      // Μπλε Τιμολόγιο: Πάγιο 9.90€ + Κατανάλωση × 0.099€/kWh
      const blueTariffFixed = 9.9
      const blueTariffRate = 0.099
      newBill = blueTariffFixed + consumption * blueTariffRate
    } else {
      // Κίτρινα Τιμολόγια: Εκτιμώμενη εξοικονόμηση 35%
      newBill = currentBill * 0.65
    }

    const monthlySavings = currentBill - newBill
    const annualSavings = monthlySavings * 12

    setCalculatorResult({
      currentBill,
      newBill,
      monthlySavings,
      annualSavings,
    })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-500 rounded-xl flex items-center justify-center">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  IMM Energy
                </h1>
                <p className="text-xs text-gray-500 hidden sm:block">Ενεργειακές Λύσεις</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {[
                { label: "Υπηρεσίες", id: "services" },
                { label: "Πώς Λειτουργεί", id: "how-it-works" },
                { label: "Προσφορές", id: "offers" },
                { label: "Επικοινωνία", id: "contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-600 hover:text-blue-600 transition-colors font-medium relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 py-4 border-t border-gray-200 animate-in slide-in-from-top-2">
              <nav className="flex flex-col space-y-3">
                {[
                  { label: "Υπηρεσίες", id: "services" },
                  { label: "Πώς Λειτουργεί", id: "how-it-works" },
                  { label: "Προσφορές", id: "offers" },
                  { label: "Επικοινωνία", id: "contact" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left text-gray-600 hover:text-blue-600 transition-colors font-medium py-2"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width%3D%2260%22 height%3D%2260%22 viewBox%3D%220 0 60 60%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg fill%3D%22none%22 fillRule%3D%22evenodd%22%3E%3Cg fill%3D%22%239C92AC%22 fillOpacity%3D%220.05%22%3E%3Ccircle cx%3D%2230%22 cy%3D%2230%22 r%3D%224%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-40"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200/30 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-green-200/30 rounded-full animate-bounce delay-2000"></div>
          <div className="absolute bottom-40 left-20 w-12 h-12 bg-yellow-200/30 rounded-full animate-bounce delay-3000"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-purple-200/30 rounded-full animate-bounce delay-500"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-20">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 py-2 text-sm font-medium animate-in fade-in-50 slide-in-from-bottom-4 duration-1000">
              <Leaf className="w-4 h-4 mr-2" />
              Πιστοποιημένοι Ενεργειακοί Σύμβουλοι
            </Badge>

            {/* Main Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-in fade-in-50 slide-in-from-bottom-4 duration-1000 delay-200">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
                Άλλαξε Πάροχο!!!
              </span>
              <br />
              <span className="text-gray-800">Εξοικονόμησε Χρήματα</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-in fade-in-50 slide-in-from-bottom-4 duration-1000 delay-400">
              Η ομάδα της <span className="font-semibold text-blue-600">IMM Energy</span> βρίσκει για εσάς την{" "}
              <span className="font-semibold text-green-600">καλύτερη προσφορά</span> από όλους τους παρόχους.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-10 animate-in fade-in-50 slide-in-from-bottom-4 duration-1000 delay-600">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">500+</div>
                <div className="text-sm text-gray-600">Ικανοποιημένοι Πελάτες</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">30%</div>
                <div className="text-sm text-gray-600">Μέση Εξοικονόμηση</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">24/7</div>
                <div className="text-sm text-gray-600">Υποστήριξη</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in-50 slide-in-from-bottom-4 duration-1000 delay-800">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-4 text-lg rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 group"
                onClick={() => scrollToSection("contact")}
              >
                <Zap className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                Ζήτησε Προσφορά
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg rounded-full transition-all duration-300 bg-transparent"
                onClick={() => scrollToSection("how-it-works")}
              >
                <Calculator className="mr-2 h-5 w-5" />
                Μάθε Περισσότερα
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-6 w-6 text-gray-400" />
        </div>
      </section>

      {/* Enhanced Partner Providers Section */}
      <section id="services" className="py-20 bg-gradient-to-r from-gray-50 to-blue-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800 px-4 py-2">
              <Shield className="w-4 h-4 mr-2" />
              Αξιόπιστοι Συνεργάτες
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Συνεργαζόμενοι Πάροχοι</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Συνεργαζόμαστε με όλους τους μεγάλους παρόχους για να σας προσφέρουμε τις καλύτερες τιμές
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 items-center">
            {[
              { name: "ΔΕΗ", color: "from-blue-600 to-blue-700", icon: Zap },
              { name: "Elpedison", color: "from-red-600 to-red-700", icon: Flame },
              { name: "Protergia", color: "from-green-600 to-green-700", icon: Leaf },
              { name: "NRG", color: "from-orange-600 to-orange-700", icon: Lightbulb },
              { name: "Volton", color: "from-purple-600 to-purple-700", icon: Zap },
              { name: "Ζενίθ", color: "from-indigo-600 to-indigo-700", icon: Star },
              { name: "ΗΡΩΝ", color: "from-teal-600 to-teal-700", icon: Recycle },
            ].map((provider, index) => {
              const IconComponent = provider.icon
              return (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm"
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${provider.color} rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {provider.name}
                    </h3>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Savings Calculator */}
          <div className="mt-16 max-w-4xl mx-auto">
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-green-50 to-blue-50">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl text-gray-900 flex items-center justify-center">
                  <Calculator className="w-6 h-6 mr-3 text-green-600" />
                  Υπολογιστής Εξοικονόμησης
                </CardTitle>
                <CardDescription className="text-gray-600 mt-2">
                  Υπολογίστε πόσα χρήματα μπορείτε να εξοικονομήσετε ετησίως
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="current-fixed-cost" className="text-gray-700 font-medium flex items-center mb-2">
                        <Euro className="w-4 h-4 mr-2 text-red-600" />
                        Τρέχον Πάγιο (€/μήνα)
                      </Label>
                      <Input
                        id="current-fixed-cost"
                        type="number"
                        step="0.01"
                        placeholder="π.χ. 5.00"
                        value={calculatorValues.currentFixedCost}
                        onChange={(e) => setCalculatorValues({ ...calculatorValues, currentFixedCost: e.target.value })}
                        className="border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-xl h-12"
                      />
                    </div>
                    <div>
                      <Label htmlFor="consumption" className="text-gray-700 font-medium flex items-center mb-2">
                        <Zap className="w-4 h-4 mr-2 text-blue-600" />
                        Μηνιαία Κατανάλωση (kWh)
                      </Label>
                      <Input
                        id="consumption"
                        type="number"
                        placeholder="π.χ. 300"
                        value={calculatorValues.consumption}
                        onChange={(e) => setCalculatorValues({ ...calculatorValues, consumption: e.target.value })}
                        className="border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-xl h-12"
                      />
                    </div>
                    <div>
                      <Label htmlFor="current-bill" className="text-gray-700 font-medium flex items-center mb-2">
                        <FileText className="w-4 h-4 mr-2 text-green-600" />
                        Κόστος Λογαριασμού (€/μήνα)
                      </Label>
                      <Input
                        id="current-bill"
                        type="number"
                        step="0.01"
                        placeholder="π.χ. 59.00"
                        value={calculatorValues.currentBill}
                        onChange={(e) => setCalculatorValues({ ...calculatorValues, currentBill: e.target.value })}
                        className="border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-xl h-12"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-700 font-medium flex items-center mb-2">
                        <Calculator className="w-4 h-4 mr-2 text-purple-600" />
                        Τύπος Τιμολογίου
                      </Label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => setCalculatorValues({ ...calculatorValues, tariffType: "blue" })}
                          className={`p-3 border-2 rounded-xl transition-all ${
                            calculatorValues.tariffType === "blue"
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-gray-200 hover:border-blue-300"
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span className="font-medium">Μπλε</span>
                          </div>
                        </button>
                        <button
                          onClick={() => setCalculatorValues({ ...calculatorValues, tariffType: "yellow" })}
                          className={`p-3 border-2 rounded-xl transition-all ${
                            calculatorValues.tariffType === "yellow"
                              ? "border-yellow-500 bg-yellow-50 text-yellow-700"
                              : "border-gray-200 hover:border-yellow-300"
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <span className="font-medium">Κίτρινα</span>
                          </div>
                        </button>
                      </div>
                    </div>
                    <Button
                      onClick={calculateSavings}
                      className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-xl h-12"
                    >
                      <Calculator className="h-4 w-4 mr-2" />
                      Υπολόγισε Εξοικονόμηση
                    </Button>
                  </div>

                  <div className="flex items-center justify-center">
                    {calculatorResult !== null ? (
                      <div className="text-center space-y-6">
                        <div className="bg-white rounded-2xl p-6 shadow-lg border">
                          <h3 className="text-lg font-bold text-gray-900 mb-4">Λεπτομερής Ανάλυση</h3>

                          {/* Τρέχων Λογαριασμός */}
                          <div className="bg-red-50 rounded-xl p-4 mb-4">
                            <h4 className="font-semibold text-red-800 mb-2">Τρέχων Λογαριασμός</h4>
                            <div className="text-2xl font-bold text-red-600">
                              €{calculatorResult.currentBill.toFixed(2)}
                            </div>
                            <div className="text-sm text-red-600">ανά μήνα</div>
                          </div>

                          {/* Νέος Λογαριασμός με Μπλε Τιμολόγιο */}
                          {calculatorValues.tariffType === "blue" && (
                            <div className="bg-blue-50 rounded-xl p-4 mb-4">
                              <h4 className="font-semibold text-blue-800 mb-2">Νέος Λογαριασμός (Μπλε Τιμολόγιο)</h4>
                              <div className="text-sm text-blue-600 mb-2">
                                Πάγιο: €9.90 + Κατανάλωση: {calculatorValues.consumption} kWh × €0.099
                              </div>
                              <div className="text-sm text-blue-600 mb-2">
                                €9.90 + €{(Number.parseFloat(calculatorValues.consumption) * 0.099).toFixed(2)} = €
                                {calculatorResult.newBill.toFixed(2)}
                              </div>
                              <div className="text-2xl font-bold text-blue-600">
                                €{calculatorResult.newBill.toFixed(2)}
                              </div>
                              <div className="text-sm text-blue-600">ανά μήνα</div>
                            </div>
                          )}

                          {/* Εξοικονόμηση */}
                          <div className="bg-green-50 rounded-xl p-4">
                            <h4 className="font-semibold text-green-800 mb-2">Εξοικονόμηση</h4>
                            <div className="text-3xl font-bold text-green-600 mb-2">
                              €{calculatorResult.monthlySavings.toFixed(2)}
                            </div>
                            <div className="text-sm text-green-600 mb-2">ανά μήνα</div>
                            <div className="text-lg font-semibold text-green-700">
                              €{calculatorResult.annualSavings.toFixed(2)} ετησίως
                            </div>
                          </div>
                        </div>

                        <div className="text-center">
                          <p className="text-sm text-gray-500 mb-4">
                            *Οι υπολογισμοί βασίζονται στα στοιχεία που εισάγατε
                          </p>
                          <Button
                            onClick={() => scrollToSection("contact")}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Ζήτησε Ακριβή Προσφορά
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-gray-500">
                        <Calculator className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                        <p>Συμπληρώστε τα στοιχεία για να δείτε την εκτιμώμενη εξοικονόμησή σας</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Blue & Yellow Tariffs Explanation Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-yellow-500 text-white px-4 py-2">
              <FileText className="w-4 h-4 mr-2" />
              Τιμολόγια Ενέργειας
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Τι είναι τα Μπλε & Κίτρινα Τιμολόγια;</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Κατανοήστε τη διαφορά μεταξύ των τιμολογίων για να επιλέξετε το καταλληλότερο για εσάς
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Blue Tariffs */}
            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-blue-50 to-blue-100/50 relative overflow-hidden">
              {/* Blue accent */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>

              <CardHeader className="text-center pb-6 pt-8">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                  <div className="text-white text-3xl font-bold">Μ</div>
                </div>
                <CardTitle className="text-3xl text-blue-800 mb-2 flex items-center justify-center">
                  <div className="w-4 h-4 bg-blue-500 rounded-full mr-3"></div>
                  Μπλε Τιμολόγια
                </CardTitle>
                <CardDescription className="text-blue-700 font-medium text-lg">
                  Οικιακοί Πελάτες & Μικρές Επιχειρήσεις
                </CardDescription>
              </CardHeader>

              <CardContent className="px-8 pb-8">
                <div className="space-y-6">
                  <div className="bg-white/80 rounded-2xl p-6 shadow-sm">
                    <h4 className="font-bold text-blue-800 mb-4 flex items-center">
                      <Zap className="w-5 h-5 mr-2" />
                      Χαρακτηριστικά:
                    </h4>
                    <div className="space-y-3">
                      {[
                        "Σταθερή τιμή",
                        "Χωρίς ρήτρα αναπροσαρμογής",
                        "Ετήσια δέσμευση",
                        "Απλούστερη τιμολόγηση",
                        "Ιδανικό για σπίτια και επιχειρήσεις",
                      ].map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-500/10 rounded-2xl p-6 border border-blue-200">
                    <h4 className="font-bold text-blue-800 mb-3 flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Κατάλληλο για:
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {["Σπίτια", "Διαμερίσματα", "Μικρά γραφεία", "Καταστήματα"].map((type, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                          <span className="text-sm text-gray-700">{type}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Yellow Tariffs */}
            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-yellow-50 to-yellow-100/50 relative overflow-hidden">
              {/* Yellow accent */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-500 to-yellow-600"></div>

              <CardHeader className="text-center pb-6 pt-8">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                  <div className="text-white text-3xl font-bold">Κ</div>
                </div>
                <CardTitle className="text-3xl text-yellow-800 mb-2 flex items-center justify-center">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full mr-3"></div>
                  Κίτρινα Τιμολόγια
                </CardTitle>
                <CardDescription className="text-yellow-700 font-medium text-lg">
                  Εξοχικά, Κοινόχρηστα και Μεγάλες Επιχειρήσεις
                </CardDescription>
              </CardHeader>

              <CardContent className="px-8 pb-8">
                <div className="space-y-6">
                  <div className="bg-white/80 rounded-2xl p-6 shadow-sm">
                    <h4 className="font-bold text-yellow-800 mb-4 flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2" />
                      Χαρακτηριστικά:
                    </h4>
                    <div className="space-y-3">
                      {[
                        "Χαμηλό ή μηδενικό πάγιο",
                        "Ονομαστική τιμή",
                        "Πολυπλοκότερη τιμολόγηση",
                        "Κλιμακωτές τιμές",
                        "Ρήτρα αναπροσαρμογής",
                      ].map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-yellow-500/10 rounded-2xl p-6 border border-yellow-200">
                    <h4 className="font-bold text-yellow-800 mb-3 flex items-center">
                      <Building className="w-5 h-5 mr-2" />
                      Κατάλληλο για:
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {["Εργοστάσια", "Μεγάλα γραφεία", "Ξενοδοχεία", "Βιομηχανίες"].map((type, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-yellow-600" />
                          <span className="text-sm text-gray-700">{type}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-800 px-4 py-2">
              <BarChart3 className="w-4 h-4 mr-2" />
              Απλή Διαδικασία
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Πώς Λειτουργεί</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Τρία απλά βήματα για να αλλάξετε πάροχο και να εξοικονομήσετε χρήματα
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Επικοινωνία",
                description: "Επικοινωνήστε μαζί μας και μας δώστε τα στοιχεία σας για να ξεκινήσουμε την αναζήτηση.",
                icon: Phone,
                color: "from-blue-500 to-blue-600",
                bgColor: "bg-blue-50",
              },
              {
                step: "02",
                title: "Σύγκριση Προσφορών",
                description: "Συγκρίνουμε όλες τις διαθέσιμες προσφορές και βρίσκουμε την καλύτερη για εσάς.",
                icon: Search,
                color: "from-green-500 to-green-600",
                bgColor: "bg-green-50",
              },
              {
                step: "03",
                title: "Αλλαγή Παρόχου",
                description: "Αναλαμβάνουμε όλη τη διαδικασία αλλαγής παρόχου χωρίς κόστος για εσάς.",
                icon: Handshake,
                color: "from-purple-500 to-purple-600",
                bgColor: "bg-purple-50",
              },
            ].map((item, index) => {
              const IconComponent = item.icon
              return (
                <Card
                  key={index}
                  className={`group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 ${item.bgColor} relative overflow-hidden`}
                >
                  {/* Step Number */}
                  <div className="absolute top-4 right-4 text-6xl font-bold text-white/20">{item.step}</div>

                  <CardHeader className="text-center pb-4">
                    <div
                      className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl`}
                    >
                      <IconComponent className="h-10 w-10 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-gray-900 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </CardContent>

                  {/* Connection Line */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-gray-300 to-transparent"></div>
                  )}
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Offers Section */}
      <section id="offers" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-yellow-100 text-yellow-800 px-4 py-2">
              <Star className="w-4 h-4 mr-2" />
              Ειδικές Προσφορές
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Τα Πακέτα Μας</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Επιλέξτε το πακέτο που ταιριάζει καλύτερα στις ανάγκες σας
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Οικιακή Χρήση",
                subtitle: "Ιδανικό για σπίτια",
                description: "Ιδανικό για σπίτια και μικρές επιχειρήσεις",
                icon: Star,
                color: "from-blue-500 to-blue-600",
                popular: false,
                features: ["Έως 30% εξοικονόμηση", "Δωρεάν αλλαγή παρόχου", "24/7 υποστήριξη", "Διαφανείς τιμές"],
              },
              {
                title: "Επιχειρήσεις",
                subtitle: "Εξειδικευμένες λύσεις",
                description: "Εξειδικευμένες λύσεις για επιχειρήσεις",
                icon: Shield,
                color: "from-green-500 to-green-600",
                popular: true,
                features: ["Προσαρμοσμένες τιμές", "Αναλυτικές αναφορές", "Αποκλειστικός σύμβουλος", "Ευέλικτοι όροι"],
              },
              {
                title: "Πράσινη Ενέργεια",
                subtitle: "100% ανανεώσιμες πηγές",
                description: "100% ανανεώσιμες πηγές ενέργειας",
                icon: Leaf,
                color: "from-purple-500 to-purple-600",
                popular: false,
                features: [
                  "Φιλική προς το περιβάλλον",
                  "Ανταγωνιστικές τιμές",
                  "Πιστοποιήσεις ποιότητας",
                  "Μειωμένο αποτύπωμα CO2",
                ],
              },
            ].map((offer, index) => {
              const IconComponent = offer.icon
              return (
                <Card
                  key={index}
                  className={`group hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border-0 bg-white relative overflow-hidden ${
                    offer.popular ? "ring-2 ring-green-500 scale-105" : ""
                  }`}
                >
                  {offer.popular && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-green-500 to-green-600 text-white text-center py-2 text-sm font-medium">
                      <Award className="inline w-4 h-4 mr-1" />
                      Δημοφιλέστερο
                    </div>
                  )}

                  <CardHeader className={`${offer.popular ? "pt-12" : "pt-6"} text-center`}>
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${offer.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-xl`}
                    >
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-gray-900 mb-2">{offer.title}</CardTitle>
                    <CardDescription className="text-gray-600 font-medium">{offer.subtitle}</CardDescription>
                  </CardHeader>

                  <CardContent className="px-6 pb-8">
                    <div className="space-y-4">
                      {offer.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-3">
                          <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                          </div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      className={`w-full mt-6 bg-gradient-to-r ${offer.color} hover:shadow-lg transition-all duration-300 text-white`}
                      onClick={() => scrollToSection("contact")}
                    >
                      Επιλογή Πακέτου
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Form Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-blue-100 text-blue-800 px-4 py-2">
                <MessageSquare className="w-4 h-4 mr-2" />
                Επικοινωνία
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Επικοινωνήστε Μαζί Μας</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Συμπληρώστε τη φόρμα και θα επικοινωνήσουμε μαζί σας το συντομότερο δυνατό
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Contact Info */}
              <div className="space-y-8">
                <Card className="border-0 bg-gradient-to-br from-blue-50 to-green-50 shadow-xl">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Στοιχεία Επικοινωνίας</h3>
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Phone className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Τηλέφωνο</h4>
                          <p className="text-gray-600">2310 451112</p>
                          <p className="text-sm text-gray-500">Δευτέρα - Παρασκευή, 9:00 - 18:00</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Mail className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                          <p className="text-gray-600">imm.energy@hotmail.com</p>
                          <p className="text-sm text-gray-500">Απαντάμε εντός 24 ωρών</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                          <MapPin className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Διεύθυνση</h4>
                          <div className="text-gray-600">
                            <p>Ζηργάνου 30</p>
                            <p>55134</p>
                            <p>Θεσσαλονίκη</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Benefits */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900">Γιατί να μας επιλέξετε;</h3>
                  {[
                    { icon: TrendingDown, text: "Εξοικονόμηση έως 30%" },
                    { icon: Users, text: "500+ ικανοποιημένοι πελάτες" },
                    { icon: Clock, text: "Γρήγορη εξυπηρέτηση" },
                    { icon: Shield, text: "Αξιόπιστη υποστήριξη" },
                  ].map((benefit, index) => {
                    const IconComponent = benefit.icon
                    return (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                          <IconComponent className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-gray-700">{benefit.text}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Contact Form */}
              <Card className="shadow-2xl border-0 bg-white">
                <CardContent className="p-8">
                  {state && (
                    <Alert
                      className={`mb-6 ${
                        state.success
                          ? "border-green-200 bg-green-50 text-green-800"
                          : "border-red-200 bg-red-50 text-red-800"
                      }`}
                    >
                      <AlertCircle className={`h-4 w-4 ${state.success ? "text-green-600" : "text-red-600"}`} />
                      <AlertDescription>{state.message}</AlertDescription>
                    </Alert>
                  )}

                  <form action={formAction} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-700 font-medium flex items-center">
                          <Users className="w-4 h-4 mr-2 text-blue-600" />
                          Όνομα *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Το όνομά σας"
                          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl h-12"
                          required
                          disabled={isPending}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-700 font-medium flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-green-600" />
                          Τηλέφωνο *
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="Το τηλέφωνό σας"
                          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl h-12"
                          required
                          disabled={isPending}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700 font-medium flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-purple-600" />
                        Email *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Το email σας"
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl h-12"
                        required
                        disabled={isPending}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-gray-700 font-medium flex items-center">
                        <MessageSquare className="w-4 h-4 mr-2 text-orange-600" />
                        Μήνυμα
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Πείτε μας περισσότερα για τις ανάγκες σας..."
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl min-h-[120px] resize-none"
                        rows={5}
                        disabled={isPending}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bill-upload" className="text-gray-700 font-medium flex items-center">
                        <FileText className="w-4 h-4 mr-2 text-indigo-600" />
                        Τελευταίος Λογαριασμός (προαιρετικό)
                      </Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors bg-gray-50/50">
                        <input
                          type="file"
                          id="bill-upload"
                          name="bill-upload"
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="hidden"
                          onChange={handleFileChange}
                          disabled={isPending}
                        />
                        <label htmlFor="bill-upload" className="cursor-pointer flex flex-col items-center space-y-3">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                            <Upload className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <span className="text-gray-700 font-medium">
                              {fileName || "Κάντε κλικ για να ανεβάσετε τον λογαριασμό σας"}
                            </span>
                            <p className="text-sm text-gray-500 mt-1">PDF, JPG, PNG (μέγιστο 5MB)</p>
                          </div>
                        </label>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isPending}
                      className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white py-4 rounded-xl text-lg font-medium shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none h-14"
                    >
                      {isPending ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Αποστολή...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <MessageSquare className="mr-2 h-5 w-5" />
                          Αποστολή Μηνύματος
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </div>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-green-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-green-400 rounded-xl flex items-center justify-center">
                  <Zap className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">IMM Energy</h3>
                  <p className="text-blue-200 text-sm">Ενεργειακές Λύσεις</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
                Η καλύτερη επιλογή για την αλλαγή παρόχου ενέργειας στην Ελλάδα. Εξοικονομήστε χρήματα με τις καλύτερες
                προσφορές της αγοράς.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: Euro, text: "Εξοικονόμηση" },
                  { icon: Shield, text: "Ασφάλεια" },
                  { icon: Leaf, text: "Οικολογία" },
                ].map((item, index) => {
                  const IconComponent = item.icon
                  return (
                    <div key={index} className="flex items-center space-x-2 text-sm text-gray-300">
                      <IconComponent className="h-4 w-4 text-green-400" />
                      <span>{item.text}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-blue-200">Επικοινωνία</h4>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span>2310 451112</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                  <span>imm.energy@hotmail.com</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <div>Ζηργάνου 30</div>
                    <div>55134</div>
                    <div>Θεσσαλονίκη</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-blue-200">Υπηρεσίες</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-yellow-400" />
                  <span>Αλλαγή Παρόχου Ρεύματος</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Flame className="h-4 w-4 text-orange-400" />
                  <span>Αλλαγή Παρόχου Φυσικού Αερίου</span>
                </li>
                <li className="flex items-center space-x-2">
                  <BarChart3 className="h-4 w-4 text-green-400" />
                  <span>Σύγκριση Προσφορών</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-blue-400" />
                  <span>Συμβουλευτικές Υπηρεσίες</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} IMM Energy. Όλα τα δικαιώματα διατηρούνται.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="text-sm text-gray-400">Powered by</span>
              <div className="flex items-center space-x-2">
                <Leaf className="h-4 w-4 text-green-400" />
                <span className="text-sm text-green-400 font-medium">Clean Energy</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
