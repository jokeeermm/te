import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin', 'arabic'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'Telegram Member Transfer Tool v4 - AI-Powered Transfer System',
  description: 'AI-powered tool that securely moves members from public to private Telegram groups. Fast, secure, and automated transfer process.',
  keywords: ['telegram', 'member transfer', 'AI', 'automation', 'group management'],
  authors: [{ name: 'Telegram Transfer Team' }],
  creator: 'Telegram Transfer Tool',
  publisher: 'Telegram Transfer Tool',
  robots: 'index, follow',
  openGraph: {
    title: 'Telegram Member Transfer Tool v4',
    description: 'AI-powered tool for secure Telegram member transfers',
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['ar_SA'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Telegram Member Transfer Tool v4',
    description: 'AI-powered tool for secure Telegram member transfers',
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' }
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
