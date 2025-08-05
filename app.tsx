"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "./components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { Badge } from "./components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select"
import {
  Send,
  Shield,
  Zap,
  Users,
  CheckCircle,
  ArrowRight,
  Star,
  BarChart3,
  Settings,
  Eye,
  Brain,
  Lock,
  Sparkles,
  TrendingUp,
  Activity,
  Globe,
  MessageCircle,
  Rocket,
  Clock,
  Palette,
  CreditCard,
  Smartphone,
  Bitcoin,
  DollarSign,
} from "lucide-react"
import { StartWizard } from "./components/StartWizard"
import { AdminPanel } from "./components/AdminPanel"
import { OrderTracking } from "./components/OrderTracking"
import { AICharts } from "./components/AICharts"
import { NotificationSystem } from "./components/NotificationSystem"
import { SystemMonitor } from "./components/SystemMonitor"
import { AITrainingDashboard } from "./components/AITrainingDashboard"
import { useLanguage } from "./hooks/useLanguage"
import { useTheme } from "./hooks/useTheme"
import { CustomizationPanel } from "./components/CustomizationPanel"

type AppState = "dashboard" | "wizard" | "admin" | "tracking"

export default function App() {
  const [currentView, setCurrentView] = useState<AppState>("dashboard")
  const [activeTab, setActiveTab] = useState("overview")
  const [showCustomization, setShowCustomization] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const { theme, setTheme, customColors, setCustomColors } = useTheme()

  const [aiStats, setAiStats] = useState({
    processing: 24,
    completed: 1847,
    success: 98.2,
    online: true,
    networkLoad: 67,
    memoryUsage: 45,
    aiLoad: 82,
  })

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAiStats((prev) => ({
        ...prev,
        processing: Math.floor(Math.random() * 50) + 10,
        completed: prev.completed + Math.floor(Math.random() * 3),
        success: 97.8 + Math.random() * 0.8,
        networkLoad: Math.floor(Math.random() * 30) + 50,
        memoryUsage: Math.floor(Math.random() * 20) + 35,
        aiLoad: Math.floor(Math.random() * 25) + 70,
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  if (currentView === "wizard") {
    return <StartWizard onBack={() => setCurrentView("dashboard")} />
  }

  if (currentView === "admin") {
    return <AdminPanel onBack={() => setCurrentView("dashboard")} />
  }

  if (currentView === "tracking") {
    return <OrderTracking onBack={() => setCurrentView("dashboard")} />
  }

  const isRTL = language === "ar"

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        theme === "dark"
          ? "bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950"
          : "bg-gradient-to-br from-slate-50 via-blue-50 to-white"
      } ${isRTL ? "rtl" : "ltr"}`}
      style={
        {
          "--primary": customColors.primary,
          "--secondary": customColors.secondary,
          "--accent": customColors.accent,
        } as React.CSSProperties
      }
    >
      {/* Customization Panel */}
      {showCustomization && (
        <CustomizationPanel
          onClose={() => setShowCustomization(false)}
          theme={theme}
          setTheme={setTheme}
          language={language}
          setLanguage={setLanguage}
          customColors={customColors}
          setCustomColors={setCustomColors}
        />
      )}

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-all duration-500 ${
          theme === "dark" ? "bg-slate-900/80 border-slate-700" : "bg-white/80 border-blue-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg"
                style={{ background: `linear-gradient(135deg, ${customColors.primary}, ${customColors.secondary})` }}
              >
                <Send className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-slate-800"}`}>
                  {t("title")}
                </h1>
                <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>{t("subtitle")}</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                className={`transition-colors ${
                  theme === "dark" ? "text-slate-300 hover:text-blue-400" : "text-slate-600 hover:text-blue-600"
                }`}
              >
                {t("nav.features")}
              </a>
              <a
                href="#pricing"
                className={`transition-colors ${
                  theme === "dark" ? "text-slate-300 hover:text-blue-400" : "text-slate-600 hover:text-blue-600"
                }`}
              >
                {t("nav.pricing")}
              </a>
              <a
                href="#contact"
                className={`transition-colors ${
                  theme === "dark" ? "text-slate-300 hover:text-blue-400" : "text-slate-600 hover:text-blue-600"
                }`}
              >
                {t("nav.contact")}
              </a>
            </nav>

            <div className="flex items-center gap-3">
              {/* Language Selector */}
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger
                  className={`w-20 h-8 ${
                    theme === "dark" ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-slate-200"
                  }`}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent
                  className={theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}
                >
                  <SelectItem value="en">🇺🇸 EN</SelectItem>
                  <SelectItem value="ar">🇸🇦 AR</SelectItem>
                </SelectContent>
              </Select>

              <Badge
                className={`${
                  theme === "dark"
                    ? "bg-green-900/30 text-green-400 border-green-400/30"
                    : "bg-green-100 text-green-700 border-green-200"
                }`}
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2" />
                {t("status.online")}
              </Badge>

              <NotificationSystem />

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCustomization(true)}
                className={`${
                  theme === "dark" ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-blue-600"
                }`}
              >
                <Palette className="w-4 h-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentView("admin")}
                className={`${
                  theme === "dark" ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-blue-600"
                }`}
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: isRTL ? 100 : -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Badge
                className={`mb-6 px-4 py-2 ${
                  theme === "dark"
                    ? "bg-blue-900/30 text-blue-400 border-blue-400/30"
                    : "bg-blue-100 text-blue-700 border-blue-200"
                }`}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {t("hero.badge")}
              </Badge>

              <h1
                className={`text-5xl lg:text-6xl font-bold mb-6 leading-tight ${
                  theme === "dark" ? "text-white" : "text-slate-800"
                }`}
              >
                {t("hero.title.part1")}
                <span className="block" style={{ color: customColors.primary }}>
                  {t("hero.title.part2")}
                </span>
                {t("hero.title.part3")}
              </h1>

              <p className={`text-xl mb-8 leading-relaxed ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                {t("hero.description")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    onClick={() => setCurrentView("wizard")}
                    className="px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all text-white"
                    style={{
                      background: `linear-gradient(135deg, ${customColors.primary}, ${customColors.secondary})`,
                      border: "none",
                    }}
                  >
                    {t("hero.startButton")}
                    <ArrowRight className={`w-5 h-5 ${isRTL ? "mr-2 rotate-180" : "ml-2"}`} />
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => setCurrentView("tracking")}
                    className={`px-8 py-4 text-lg rounded-xl ${
                      theme === "dark"
                        ? "border-slate-600 text-slate-300 hover:bg-slate-800"
                        : "border-blue-200 text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    <Eye className={`w-5 h-5 ${isRTL ? "ml-2" : "mr-2"}`} />
                    {t("hero.trackButton")}
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: isRTL ? -100 : 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <img
                  src="/telegram-hero.png"
                  alt="Telegram Transfer Tool"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-2xl" />
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                className={`absolute top-10 ${isRTL ? "left-10" : "right-10"} ${
                  theme === "dark" ? "bg-slate-800" : "bg-white"
                } rounded-full p-4 shadow-lg`}
              >
                <Send className="w-6 h-6 text-blue-600" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                className={`absolute bottom-10 ${isRTL ? "right-10" : "left-10"} ${
                  theme === "dark" ? "bg-slate-800" : "bg-white"
                } rounded-full p-4 shadow-lg`}
              >
                <Shield className="w-6 h-6 text-green-600" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Payment Methods Section */}
      <section className={`py-16 ${theme === "dark" ? "bg-slate-900/50" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge
              className={`mb-4 px-4 py-2 ${
                theme === "dark"
                  ? "bg-green-900/30 text-green-400 border-green-400/30"
                  : "bg-green-100 text-green-700 border-green-200"
              }`}
            >
              <CreditCard className="w-4 h-4 mr-2" />
              {t("payment.title")}
            </Badge>
            <h2 className={`text-3xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-slate-800"}`}>
              {t("payment.subtitle")}
            </h2>
            <p className={`text-lg ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
              {t("payment.description")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                name: "USDT",
                icon: Bitcoin,
                color: "green",
                description: t("payment.usdt"),
                popular: true,
              },
              {
                name: "Vodafone Cash",
                icon: Smartphone,
                color: "red",
                description: t("payment.vodafone"),
                popular: false,
              },
              {
                name: "Bitcoin",
                icon: Bitcoin,
                color: "orange",
                description: t("payment.bitcoin"),
                popular: false,
              },
              {
                name: "PayPal",
                icon: DollarSign,
                color: "blue",
                description: t("payment.paypal"),
                popular: false,
              },
            ].map((method, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card
                  className={`relative h-full transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-slate-800/50 border-slate-700 hover:border-slate-600"
                      : "bg-white border-slate-200 hover:border-blue-300 hover:shadow-lg"
                  }`}
                >
                  {method.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
                        {t("payment.popular")}
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-4">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                        method.color === "green"
                          ? "bg-green-100"
                          : method.color === "red"
                            ? "bg-red-100"
                            : method.color === "orange"
                              ? "bg-orange-100"
                              : "bg-blue-100"
                      }`}
                    >
                      <method.icon
                        className={`w-8 h-8 ${
                          method.color === "green"
                            ? "text-green-600"
                            : method.color === "red"
                              ? "text-red-600"
                              : method.color === "orange"
                                ? "text-orange-600"
                                : "text-blue-600"
                        }`}
                      />
                    </div>
                    <CardTitle className={`${theme === "dark" ? "text-white" : "text-slate-800"} text-lg`}>
                      {method.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription
                      className={`leading-relaxed ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}
                    >
                      {method.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-16 ${theme === "dark" ? "bg-slate-800/30" : "bg-slate-50"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { icon: Users, value: aiStats.completed.toLocaleString(), label: t("stats.transferred"), color: "blue" },
              { icon: CheckCircle, value: `${aiStats.success.toFixed(1)}%`, label: t("stats.success"), color: "green" },
              { icon: Zap, value: aiStats.processing, label: t("stats.active"), color: "purple" },
              { icon: Clock, value: "<2min", label: t("stats.time"), color: "orange" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    stat.color === "blue"
                      ? "bg-blue-100"
                      : stat.color === "green"
                        ? "bg-green-100"
                        : stat.color === "purple"
                          ? "bg-purple-100"
                          : "bg-orange-100"
                  }`}
                >
                  <stat.icon
                    className={`w-8 h-8 ${
                      stat.color === "blue"
                        ? "text-blue-600"
                        : stat.color === "green"
                          ? "text-green-600"
                          : stat.color === "purple"
                            ? "text-purple-600"
                            : "text-orange-600"
                    }`}
                  />
                </div>
                <div className={`text-3xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-slate-800"}`}>
                  {stat.value}
                </div>
                <div className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className={`py-20 ${
          theme === "dark" ? "bg-gradient-to-br from-slate-900 to-slate-800" : "bg-gradient-to-br from-blue-50 to-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge
              className={`mb-4 px-4 py-2 ${
                theme === "dark"
                  ? "bg-blue-900/30 text-blue-400 border-blue-400/30"
                  : "bg-blue-100 text-blue-700 border-blue-200"
              }`}
            >
              <Star className="w-4 h-4 mr-2" />
              {t("features.title")}
            </Badge>
            <h2 className={`text-4xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-slate-800"}`}>
              {t("features.subtitle")}
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
              {t("features.description")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: t("features.secure.title"),
                description: t("features.secure.description"),
                color: "blue",
                delay: 0,
              },
              {
                icon: Brain,
                title: t("features.ai.title"),
                description: t("features.ai.description"),
                color: "purple",
                delay: 0.1,
              },
              {
                icon: Zap,
                title: t("features.fast.title"),
                description: t("features.fast.description"),
                color: "yellow",
                delay: 0.2,
              },
              {
                icon: Lock,
                title: t("features.noauth.title"),
                description: t("features.noauth.description"),
                color: "green",
                delay: 0.3,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: feature.delay }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card
                  className={`h-full transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-slate-800/50 border-slate-700 hover:border-slate-600"
                      : "bg-white border-slate-200 hover:border-blue-300 hover:shadow-lg"
                  }`}
                >
                  <CardHeader className="text-center pb-4">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                        feature.color === "blue"
                          ? "bg-blue-100"
                          : feature.color === "purple"
                            ? "bg-purple-100"
                            : feature.color === "yellow"
                              ? "bg-yellow-100"
                              : "bg-green-100"
                      }`}
                    >
                      <feature.icon
                        className={`w-8 h-8 ${
                          feature.color === "blue"
                            ? "text-blue-600"
                            : feature.color === "purple"
                              ? "text-purple-600"
                              : feature.color === "yellow"
                                ? "text-yellow-600"
                                : "text-green-600"
                        }`}
                      />
                    </div>
                    <CardTitle className={`text-lg ${theme === "dark" ? "text-white" : "text-slate-800"}`}>
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription
                      className={`leading-relaxed ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}
                    >
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section className={`py-20 ${theme === "dark" ? "bg-slate-900/50" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge
              className={`mb-4 px-4 py-2 ${
                theme === "dark"
                  ? "bg-blue-900/30 text-blue-400 border-blue-400/30"
                  : "bg-blue-100 text-blue-700 border-blue-200"
              }`}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              {t("dashboard.title")}
            </Badge>
            <h2 className={`text-4xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-slate-800"}`}>
              {t("dashboard.subtitle")}
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
              {t("dashboard.description")}
            </p>
          </motion.div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList
              className={`grid w-full grid-cols-4 rounded-xl p-1 ${theme === "dark" ? "bg-slate-800" : "bg-slate-100"}`}
            >
              <TabsTrigger
                value="overview"
                className={`rounded-lg ${
                  theme === "dark"
                    ? "data-[state=active]:bg-slate-700 data-[state=active]:text-blue-400"
                    : "data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                }`}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                {t("dashboard.tabs.overview")}
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className={`rounded-lg ${
                  theme === "dark"
                    ? "data-[state=active]:bg-slate-700 data-[state=active]:text-blue-400"
                    : "data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                }`}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                {t("dashboard.tabs.analytics")}
              </TabsTrigger>
              <TabsTrigger
                value="training"
                className={`rounded-lg ${
                  theme === "dark"
                    ? "data-[state=active]:bg-slate-700 data-[state=active]:text-blue-400"
                    : "data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                }`}
              >
                <Brain className="w-4 h-4 mr-2" />
                {t("dashboard.tabs.training")}
              </TabsTrigger>
              <TabsTrigger
                value="system"
                className={`rounded-lg ${
                  theme === "dark"
                    ? "data-[state=active]:bg-slate-700 data-[state=active]:text-blue-400"
                    : "data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                }`}
              >
                <Activity className="w-4 h-4 mr-2" />
                {t("dashboard.tabs.system")}
              </TabsTrigger>
            </TabsList>

            <div className="mt-8">
              <TabsContent value="overview">
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <Card
                      className={`${
                        theme === "dark" ? "bg-slate-800/50 border-slate-700" : "bg-white border-slate-200"
                      }`}
                    >
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                            <Brain className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <CardTitle className={theme === "dark" ? "text-white" : "text-slate-800"}>
                              {t("dashboard.engine.title")}
                            </CardTitle>
                            <CardDescription className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>
                              {t("dashboard.engine.description")}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          {[
                            {
                              label: t("dashboard.engine.analysis"),
                              status: t("dashboard.engine.active"),
                              color: "green",
                            },
                            {
                              label: t("dashboard.engine.scoring"),
                              status: t("dashboard.engine.processing"),
                              color: "blue",
                            },
                            {
                              label: t("dashboard.engine.optimization"),
                              status: t("dashboard.engine.learning"),
                              color: "purple",
                            },
                          ].map((item, index) => (
                            <div
                              key={index}
                              className={`flex items-center gap-4 p-4 rounded-xl border ${
                                theme === "dark" ? "bg-slate-700/30 border-slate-600" : "bg-slate-50 border-slate-200"
                              }`}
                            >
                              <div
                                className={`w-3 h-3 rounded-full ${
                                  item.color === "green"
                                    ? "bg-green-500"
                                    : item.color === "blue"
                                      ? "bg-blue-500"
                                      : "bg-purple-500"
                                } animate-pulse`}
                              />
                              <span className={`flex-1 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                                {item.label}
                              </span>
                              <Badge
                                className={`${
                                  item.color === "green"
                                    ? "bg-green-100 text-green-700 border-green-200"
                                    : item.color === "blue"
                                      ? "bg-blue-100 text-blue-700 border-blue-200"
                                      : "bg-purple-100 text-purple-700 border-purple-200"
                                }`}
                              >
                                {item.status}
                              </Badge>
                            </div>
                          ))}
                        </div>

                        <div className="flex gap-4">
                          <Button
                            onClick={() => setCurrentView("wizard")}
                            className="flex-1 rounded-xl text-white"
                            style={{
                              background: `linear-gradient(135deg, ${customColors.primary}, ${customColors.secondary})`,
                              border: "none",
                            }}
                          >
                            <Rocket className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                            {t("dashboard.engine.start")}
                          </Button>
                          <Button
                            onClick={() => setCurrentView("tracking")}
                            variant="outline"
                            className={`rounded-xl ${
                              theme === "dark"
                                ? "border-slate-600 text-slate-300 hover:bg-slate-700"
                                : "border-slate-300 text-slate-700 hover:bg-slate-50"
                            }`}
                          >
                            <Eye className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                            {t("dashboard.engine.track")}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-6">
                    <Card
                      className={`${
                        theme === "dark" ? "bg-slate-800/50 border-slate-700" : "bg-white border-slate-200"
                      }`}
                    >
                      <CardHeader>
                        <CardTitle
                          className={`flex items-center gap-2 ${theme === "dark" ? "text-white" : "text-slate-800"}`}
                        >
                          <TrendingUp className="w-5 h-5 text-green-600" />
                          {t("dashboard.stats.title")}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {[
                          { label: t("dashboard.stats.cpu"), value: aiStats.networkLoad, color: "blue" },
                          { label: t("dashboard.stats.memory"), value: aiStats.memoryUsage, color: "green" },
                          { label: t("dashboard.stats.ai"), value: aiStats.aiLoad, color: "purple" },
                        ].map((stat, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                                {stat.label}
                              </span>
                              <span
                                className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-800"}`}
                              >
                                {stat.value}%
                              </span>
                            </div>
                            <div
                              className={`w-full rounded-full h-2 ${
                                theme === "dark" ? "bg-slate-700" : "bg-slate-200"
                              }`}
                            >
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${stat.value}%` }}
                                transition={{ duration: 1, delay: index * 0.2 }}
                                className={`h-2 rounded-full ${
                                  stat.color === "blue"
                                    ? "bg-blue-500"
                                    : stat.color === "green"
                                      ? "bg-green-500"
                                      : "bg-purple-500"
                                }`}
                              />
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card
                      className={`${
                        theme === "dark" ? "bg-slate-800/50 border-slate-700" : "bg-white border-slate-200"
                      }`}
                    >
                      <CardHeader>
                        <CardTitle
                          className={`flex items-center gap-2 ${theme === "dark" ? "text-white" : "text-slate-800"}`}
                        >
                          <MessageCircle className="w-5 h-5 text-orange-600" />
                          {t("dashboard.insights.title")}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {[
                          { text: t("dashboard.insights.window"), color: "blue" },
                          { text: t("dashboard.insights.compatibility"), color: "green" },
                          { text: t("dashboard.insights.learning"), color: "purple" },
                        ].map((insight, index) => (
                          <div
                            key={index}
                            className={`p-3 rounded-lg border-l-4 ${
                              insight.color === "blue"
                                ? theme === "dark"
                                  ? "bg-blue-900/20 border-blue-400"
                                  : "bg-blue-50 border-blue-400"
                                : insight.color === "green"
                                  ? theme === "dark"
                                    ? "bg-green-900/20 border-green-400"
                                    : "bg-green-50 border-green-400"
                                  : theme === "dark"
                                    ? "bg-purple-900/20 border-purple-400"
                                    : "bg-purple-50 border-purple-400"
                            }`}
                          >
                            <p
                              className={`text-sm ${
                                insight.color === "blue"
                                  ? theme === "dark"
                                    ? "text-blue-300"
                                    : "text-blue-700"
                                  : insight.color === "green"
                                    ? theme === "dark"
                                      ? "text-green-300"
                                      : "text-green-700"
                                    : theme === "dark"
                                      ? "text-purple-300"
                                      : "text-purple-700"
                              }`}
                            >
                              {insight.text}
                            </p>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="analytics">
                <AICharts />
              </TabsContent>

              <TabsContent value="training">
                <AITrainingDashboard />
              </TabsContent>

              <TabsContent value="system">
                <SystemMonitor />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`border-t py-12 ${
          theme === "dark" ? "bg-slate-900 border-slate-700" : "bg-slate-50 border-slate-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${customColors.primary}, ${customColors.secondary})` }}
                >
                  <Send className="w-6 h-6 text-white" />
                </div>
                <span className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-slate-800"}`}>
                  {t("title")}
                </span>
              </div>
              <p className={`mb-4 leading-relaxed ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                {t("footer.description")}
              </p>
              <p className={`text-sm ${theme === "dark" ? "text-slate-500" : "text-slate-500"}`}>{t("footer.made")}</p>
            </div>

            <div>
              <h3 className={`font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-slate-800"}`}>
                {t("footer.product")}
              </h3>
              <ul className={`space-y-2 ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                <li>
                  <a
                    href="#features"
                    className={`transition-colors ${theme === "dark" ? "hover:text-blue-400" : "hover:text-blue-600"}`}
                  >
                    {t("nav.features")}
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className={`transition-colors ${theme === "dark" ? "hover:text-blue-400" : "hover:text-blue-600"}`}
                  >
                    {t("nav.pricing")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`transition-colors ${theme === "dark" ? "hover:text-blue-400" : "hover:text-blue-600"}`}
                  >
                    {t("footer.docs")}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className={`font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-slate-800"}`}>
                {t("footer.support")}
              </h3>
              <ul className={`space-y-2 ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                <li>
                  <a
                    href="#"
                    className={`transition-colors ${theme === "dark" ? "hover:text-blue-400" : "hover:text-blue-600"}`}
                  >
                    {t("footer.help")}
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className={`transition-colors ${theme === "dark" ? "hover:text-blue-400" : "hover:text-blue-600"}`}
                  >
                    {t("nav.contact")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`transition-colors ${theme === "dark" ? "hover:text-blue-400" : "hover:text-blue-600"}`}
                  >
                    {t("footer.privacy")}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div
            className={`border-t mt-8 pt-8 flex flex-col md:flex-row items-center justify-between ${
              theme === "dark" ? "border-slate-700" : "border-slate-200"
            }`}
          >
            <p className={theme === "dark" ? "text-slate-500" : "text-slate-500"}>
              &copy; {new Date().getFullYear()} {t("title")}. {t("footer.rights")}
            </p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className={`text-sm ${theme === "dark" ? "text-slate-500" : "text-slate-500"}`}>
                  {t("status.online")}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Globe className={`w-3 h-3 ${theme === "dark" ? "text-slate-600" : "text-slate-400"}`} />
                <span className={`text-sm ${theme === "dark" ? "text-slate-500" : "text-slate-500"}`}>
                  {t("footer.global")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
