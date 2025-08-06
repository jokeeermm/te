import Head from 'next/head'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: string
}

export function SEO({
  title = "Telegram Member Transfer Tool v4 - AI-Powered Transfer System",
  description = "AI-powered tool that securely moves members from public to private Telegram groups. Fast, secure, and automated transfer process.",
  keywords = "telegram, member transfer, AI, automation, group management",
  image = "/telegram-hero.png",
  url = "https://telegram-transfer.vercel.app",
  type = "website"
}: SEOProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Telegram Transfer Team" />
      <link rel="canonical" href={url} />
    </Head>
  )
}