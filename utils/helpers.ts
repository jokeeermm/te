export function generateId(prefix: string = "AI"): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let result = prefix + "-"
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M"
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K"
  }
  return num.toString()
}

export function formatCurrency(amount: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency
  }).format(amount)
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short", 
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(d)
}

export function getTimeAgo(timestamp: Date | string): string {
  const now = new Date()
  const past = typeof timestamp === "string" ? new Date(timestamp) : timestamp
  const diffInMinutes = Math.floor((now.getTime() - past.getTime()) / (1000 * 60))

  if (diffInMinutes < 1) return "just now"
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`
  
  const hours = Math.floor(diffInMinutes / 60)
  if (hours < 24) return `${hours}h ago`
  
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export function validateTelegramUrl(url: string): boolean {
  const telegramRegex = /^https:\/\/t\.me\/[a-zA-Z0-9_]+$/
  return telegramRegex.test(url)
}

export function extractGroupName(url: string): string {
  const match = url.match(/https:\/\/t\.me\/([a-zA-Z0-9_]+)/)
  return match ? match[1] : ""
}

export function generateMockData(count: number = 10) {
  return Array.from({ length: count }, (_, i) => ({
    id: generateId(),
    timestamp: new Date(Date.now() - Math.random() * 86400000 * 7),
    value: Math.floor(Math.random() * 1000) + 100,
    status: ["completed", "processing", "failed"][Math.floor(Math.random() * 3)]
  }))
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}