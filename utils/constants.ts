export const APP_CONFIG = {
  name: "Telegram Member Transfer Tool v4",
  description: "AI-powered tool for secure Telegram member transfers",
  version: "4.0.0",
  author: "Telegram Transfer Team",
  repository: "https://github.com/telegram-transfer/v4",
  support: "support@telegram-transfer.com"
}

export const API_ENDPOINTS = {
  transfer: "/api/transfer",
  status: "/api/status",
  analytics: "/api/analytics"
}

export const STORAGE_KEYS = {
  theme: "telegram-transfer-theme",
  language: "telegram-transfer-language",
  customColors: "telegram-transfer-colors",
  userPreferences: "telegram-transfer-preferences"
}

export const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ar", name: "العربية", flag: "🇸🇦" }
] as const

export const PAYMENT_METHODS = [
  {
    id: "bitcoin",
    name: "Bitcoin (BTC)",
    icon: "₿",
    description: "Fast and secure cryptocurrency payments",
    popular: true
  },
  {
    id: "ethereum", 
    name: "Ethereum (ETH)",
    icon: "Ξ",
    description: "Smart contract processing"
  },
  {
    id: "usdt",
    name: "USDT",
    icon: "₮",
    description: "Stable cryptocurrency payments"
  },
  {
    id: "paypal",
    name: "PayPal",
    icon: "💳",
    description: "Traditional online payment method"
  }
] as const

export const TRANSFER_STATUSES = {
  analyzing: "Analyzing",
  verifying: "Verifying Payment", 
  transferring: "Transferring Members",
  completed: "Completed",
  failed: "Failed"
} as const

export const AI_INSIGHTS = [
  "Optimal transfer window detected",
  "High compatibility groups found", 
  "Neural network learning improved",
  "Pattern recognition enhanced",
  "Transfer efficiency optimized"
] as const