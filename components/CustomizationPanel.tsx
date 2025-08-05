"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "./ui/button"
import { CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Switch } from "./ui/switch"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { X, Palette, Moon, Sun, Languages, Save, RotateCcw } from "lucide-react"

interface CustomizationPanelProps {
  onClose: () => void
  theme: "light" | "dark"
  setTheme: (theme: "light" | "dark") => void
  language: "en" | "ar"
  setLanguage: (language: "en" | "ar") => void
  customColors: {
    primary: string
    secondary: string
    accent: string
  }
  setCustomColors: (colors: {
    primary: string
    secondary: string
    accent: string
  }) => void
}

export function CustomizationPanel({
  onClose,
  theme,
  setTheme,
  language,
  setLanguage,
  customColors,
  setCustomColors,
}: CustomizationPanelProps) {
  const [tempColors, setTempColors] = useState(customColors)

  const presetColors = [
    { name: "Blue", primary: "#2563eb", secondary: "#3b82f6", accent: "#1d4ed8" },
    { name: "Purple", primary: "#7c3aed", secondary: "#8b5cf6", accent: "#6d28d9" },
    { name: "Green", primary: "#059669", secondary: "#10b981", accent: "#047857" },
    { name: "Red", primary: "#dc2626", secondary: "#ef4444", accent: "#b91c1c" },
    { name: "Orange", primary: "#ea580c", secondary: "#f97316", accent: "#c2410c" },
    { name: "Pink", primary: "#db2777", secondary: "#ec4899", accent: "#be185d" },
  ]

  const handleSave = () => {
    setCustomColors(tempColors)
    onClose()
  }

  const handleReset = () => {
    const defaultColors = { primary: "#2563eb", secondary: "#3b82f6", accent: "#1d4ed8" }
    setTempColors(defaultColors)
    setCustomColors(defaultColors)
  }

  const t = (key: string) => {
    const translations = {
      en: {
        title: "Customization Panel",
        subtitle: "Personalize your experience",
        theme: "Theme",
        language: "Language",
        colors: "Colors",
        presets: "Color Presets",
        primary: "Primary Color",
        secondary: "Secondary Color",
        accent: "Accent Color",
        save: "Save Changes",
        reset: "Reset to Default",
        close: "Close",
      },
      ar: {
        title: "لوحة التخصيص",
        subtitle: "خصص تجربتك",
        theme: "المظهر",
        language: "اللغة",
        colors: "الألوان",
        presets: "الألوان المحددة مسبقاً",
        primary: "اللون الأساسي",
        secondary: "اللون الثانوي",
        accent: "لون التمييز",
        save: "حفظ التغييرات",
        reset: "إعادة تعيين افتراضي",
        close: "إغلاق",
      },
    }

    const keys = key.split(".")
    let value: any = translations[language]

    for (const k of keys) {
      value = value?.[k]
    }

    return value || key
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className={`w-full max-w-2xl rounded-2xl shadow-2xl ${
            theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"
          } border`}
          onClick={(e) => e.stopPropagation()}
        >
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className={`flex items-center gap-2 ${theme === "dark" ? "text-white" : "text-slate-800"}`}>
                <Palette className="w-5 h-5 text-blue-600" />
                {t("title")}
              </CardTitle>
              <CardDescription className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>
                {t("subtitle")}
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className={theme === "dark" ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-800"}
            >
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Theme Selection */}
            <div className="space-y-4">
              <Label
                className={`text-lg font-semibold flex items-center gap-2 ${
                  theme === "dark" ? "text-white" : "text-slate-800"
                }`}
              >
                {theme === "dark" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                {t("theme")}
              </Label>
              <div className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="theme-switch"
                    checked={theme === "dark"}
                    onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                  />
                  <Label htmlFor="theme-switch" className={theme === "dark" ? "text-slate-300" : "text-slate-700"}>
                    {theme === "dark" ? "Dark Mode" : "Light Mode"}
                  </Label>
                </div>
              </div>
            </div>

            {/* Language Selection */}
            <div className="space-y-4">
              <Label
                className={`text-lg font-semibold flex items-center gap-2 ${
                  theme === "dark" ? "text-white" : "text-slate-800"
                }`}
              >
                <Languages className="w-5 h-5" />
                {t("language")}
              </Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger
                  className={`w-full ${
                    theme === "dark" ? "bg-slate-700 border-slate-600 text-white" : "bg-white border-slate-200"
                  }`}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent
                  className={theme === "dark" ? "bg-slate-700 border-slate-600" : "bg-white border-slate-200"}
                >
                  <SelectItem value="en">🇺🇸 English</SelectItem>
                  <SelectItem value="ar">🇸🇦 العربية</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Color Customization */}
            <div className="space-y-6">
              <Label
                className={`text-lg font-semibold flex items-center gap-2 ${
                  theme === "dark" ? "text-white" : "text-slate-800"
                }`}
              >
                <Palette className="w-5 h-5" />
                {t("colors")}
              </Label>

              {/* Color Presets */}
              <div className="space-y-3">
                <Label className={`text-sm font-medium ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                  {t("presets")}
                </Label>
                <div className="grid grid-cols-3 gap-3">
                  {presetColors.map((preset) => (
                    <Button
                      key={preset.name}
                      variant="outline"
                      className={`h-12 flex items-center gap-2 ${
                        theme === "dark" ? "border-slate-600 hover:bg-slate-700" : "border-slate-200 hover:bg-slate-50"
                      }`}
                      onClick={() =>
                        setTempColors({
                          primary: preset.primary,
                          secondary: preset.secondary,
                          accent: preset.accent,
                        })
                      }
                    >
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.primary }} />
                      <span className={theme === "dark" ? "text-slate-300" : "text-slate-700"}>{preset.name}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Custom Colors */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className={`text-sm font-medium ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                    {t("primary")}
                  </Label>
                  <div className="flex items-center gap-3">
                    <Input
                      type="color"
                      value={tempColors.primary}
                      onChange={(e) => setTempColors({ ...tempColors, primary: e.target.value })}
                      className="w-16 h-10 p-1 rounded-lg"
                    />
                    <Input
                      type="text"
                      value={tempColors.primary}
                      onChange={(e) => setTempColors({ ...tempColors, primary: e.target.value })}
                      className={`flex-1 ${
                        theme === "dark" ? "bg-slate-700 border-slate-600 text-white" : "bg-white border-slate-200"
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className={`text-sm font-medium ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                    {t("secondary")}
                  </Label>
                  <div className="flex items-center gap-3">
                    <Input
                      type="color"
                      value={tempColors.secondary}
                      onChange={(e) => setTempColors({ ...tempColors, secondary: e.target.value })}
                      className="w-16 h-10 p-1 rounded-lg"
                    />
                    <Input
                      type="text"
                      value={tempColors.secondary}
                      onChange={(e) => setTempColors({ ...tempColors, secondary: e.target.value })}
                      className={`flex-1 ${
                        theme === "dark" ? "bg-slate-700 border-slate-600 text-white" : "bg-white border-slate-200"
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className={`text-sm font-medium ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                    {t("accent")}
                  </Label>
                  <div className="flex items-center gap-3">
                    <Input
                      type="color"
                      value={tempColors.accent}
                      onChange={(e) => setTempColors({ ...tempColors, accent: e.target.value })}
                      className="w-16 h-10 p-1 rounded-lg"
                    />
                    <Input
                      type="text"
                      value={tempColors.accent}
                      onChange={(e) => setTempColors({ ...tempColors, accent: e.target.value })}
                      className={`flex-1 ${
                        theme === "dark" ? "bg-slate-700 border-slate-600 text-white" : "bg-white border-slate-200"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
              <Button
                onClick={handleSave}
                className="flex-1 text-white"
                style={{
                  background: `linear-gradient(135deg, ${tempColors.primary}, ${tempColors.secondary})`,
                  border: "none",
                }}
              >
                <Save className="w-4 h-4 mr-2" />
                {t("save")}
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className={`${
                  theme === "dark"
                    ? "border-slate-600 text-slate-300 hover:bg-slate-700"
                    : "border-slate-300 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                {t("reset")}
              </Button>
            </div>
          </CardContent>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
