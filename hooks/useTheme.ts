"use client"

import { useState, useEffect } from "react"

type Theme = "light" | "dark"

interface CustomColors {
  primary: string
  secondary: string
  accent: string
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light")
  const [customColors, setCustomColors] = useState<CustomColors>({
    primary: "#2563eb",
    secondary: "#3b82f6",
    accent: "#1d4ed8",
  })

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme
    const savedColors = localStorage.getItem("customColors")

    if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
      setTheme(savedTheme)
    }

    if (savedColors) {
      try {
        setCustomColors(JSON.parse(savedColors))
      } catch (e) {
        console.error("Failed to parse saved colors")
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("theme", theme)
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  useEffect(() => {
    localStorage.setItem("customColors", JSON.stringify(customColors))
  }, [customColors])

  return { theme, setTheme, customColors, setCustomColors }
}
