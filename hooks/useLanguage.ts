"use client"

import { useState, useEffect } from "react"

type Language = "en" | "ar"

const translations = {
  en: {
    title: "Telegram Member Transfer Tool v4",
    subtitle: "AI-Powered Transfer System",
    nav: {
      features: "Features",
      pricing: "Pricing",
      contact: "Contact",
    },
    status: {
      online: "Online",
    },
    hero: {
      badge: "AI-Powered Transfer System",
      title: {
        part1: "Effortlessly",
        part2: "transfer members",
        part3: "from any group",
      },
      description: "AI-powered tool that securely moves members from public to private Telegram groups.",
      startButton: "Start Now",
      trackButton: "Track Order",
    },
    payment: {
      title: "Payment Methods",
      subtitle: "Multiple Payment Options",
      description: "Choose from various secure payment methods",
      usdt: "Fast and secure cryptocurrency payments",
      vodafone: "Easy mobile wallet payments in Egypt",
      bitcoin: "Decentralized cryptocurrency payments",
      paypal: "Traditional online payment method",
      popular: "Popular",
    },
    stats: {
      transferred: "Members Transferred",
      success: "Success Rate",
      active: "Active Transfers",
      time: "Average Time",
    },
    features: {
      title: "Features",
      subtitle: "Why Choose Our Tool?",
      description: "Advanced AI technology meets user-friendly design for the ultimate transfer experience",
      secure: {
        title: "Secure and private",
        description: "Transfer members without compromising privacy.",
      },
      ai: {
        title: "AI-Powered",
        description: "Smart algorithms optimize transfer success rates.",
      },
      fast: {
        title: "Automated and fast",
        description: "Streamlined transfer process powered by AI.",
      },
      noauth: {
        title: "No authentication needed",
        description: "Easily initiate transfers without any login.",
      },
    },
    dashboard: {
      title: "Dashboard",
      subtitle: "AI Control Center",
      description: "Monitor and manage your transfers with our advanced AI dashboard",
      tabs: {
        overview: "Overview",
        analytics: "Analytics",
        training: "AI Training",
        system: "System",
      },
      engine: {
        title: "AI Processing Engine",
        description: "Advanced neural network for optimal transfers",
        analysis: "Deep learning analysis",
        scoring: "Member compatibility scoring",
        optimization: "Transfer timing optimization",
        active: "Active",
        processing: "Processing",
        learning: "Learning",
        start: "Start Transfer",
        track: "Track Order",
      },
      stats: {
        title: "Live Stats",
        cpu: "CPU Usage",
        memory: "Memory",
        ai: "AI Load",
      },
      insights: {
        title: "AI Insights",
        window: "Optimal transfer window detected",
        compatibility: "High compatibility groups found",
        learning: "Neural network learning improved",
      },
    },
    footer: {
      description:
        "The ultimate AI-powered simulation tool for Telegram member transfers. Safe, fun, and completely free to use.",
      made: "Made with ❤️ for demos and testing",
      product: "Product",
      support: "Support",
      docs: "Documentation",
      help: "Help Center",
      privacy: "Privacy Policy",
      rights: "All rights reserved.",
      global: "Global CDN",
    },
  },
  ar: {
    title: "أداة نقل أعضاء تليجرام الإصدار 4",
    subtitle: "نظام النقل المدعوم بالذكاء الاصطناعي",
    nav: {
      features: "المميزات",
      pricing: "الأسعار",
      contact: "اتصل بنا",
    },
    status: {
      online: "متصل",
    },
    hero: {
      badge: "نظام النقل المدعوم بالذكاء الاصطناعي",
      title: {
        part1: "انقل الأعضاء",
        part2: "بسهولة تامة",
        part3: "من أي مجموعة",
      },
      description: "أداة مدعومة بالذكاء الاصطناعي تنقل الأعضاء بأمان من المجموعات العامة إلى الخاصة في تليجرام.",
      startButton: "ابدأ الآن",
      trackButton: "تتبع الطلب",
    },
    payment: {
      title: "طرق الدفع",
      subtitle: "خيارات دفع متعددة",
      description: "اختر من بين طرق الدفع الآمنة المختلفة",
      usdt: "مدفوعات العملة المشفرة السريعة والآمنة",
      vodafone: "مدفوعات المحفظة المحمولة السهلة في مصر",
      bitcoin: "مدفوعات العملة المشفرة اللامركزية",
      paypal: "طريقة الدفع التقليدية عبر الإنترنت",
      popular: "الأكثر شعبية",
    },
    stats: {
      transferred: "الأعضاء المنقولون",
      success: "معدل النجاح",
      active: "العمليات النشطة",
      time: "متوسط الوقت",
    },
    features: {
      title: "المميزات",
      subtitle: "لماذا تختار أداتنا؟",
      description: "تقنية الذكاء الاصطناعي المتقدمة تلتقي بالتصميم سهل الاستخدام لتجربة النقل المثلى",
      secure: {
        title: "آمن وخاص",
        description: "انقل الأعضاء دون المساس بالخصوصية.",
      },
      ai: {
        title: "مدعوم بالذكاء الاصطناعي",
        description: "خوارزميات ذكية تحسن معدلات نجاح النقل.",
      },
      fast: {
        title: "تلقائي وسريع",
        description: "عملية نقل مبسطة مدعومة بالذكاء الاصطناعي.",
      },
      noauth: {
        title: "لا يحتاج مصادقة",
        description: "ابدأ عمليات النقل بسهولة دون أي تسجيل دخول.",
      },
    },
    dashboard: {
      title: "لوحة التحكم",
      subtitle: "مركز التحكم بالذكاء الاصطناعي",
      description: "راقب وأدر عمليات النقل الخاصة بك باستخدام لوحة التحكم المتقدمة",
      tabs: {
        overview: "نظرة عامة",
        analytics: "التحليلات",
        training: "تدريب الذكاء الاصطناعي",
        system: "النظام",
      },
      engine: {
        title: "محرك المعالجة بالذكاء الاصطناعي",
        description: "شبكة عصبية متقدمة لعمليات النقل المثلى",
        analysis: "تحليل التعلم العميق",
        scoring: "تسجيل توافق الأعضاء",
        optimization: "تحسين توقيت النقل",
        active: "نشط",
        processing: "قيد المعالجة",
        learning: "يتعلم",
        start: "بدء النقل",
        track: "تتبع الطلب",
      },
      stats: {
        title: "الإحصائيات المباشرة",
        cpu: "استخدام المعالج",
        memory: "الذاكرة",
        ai: "حمل الذكاء الاصطناعي",
      },
      insights: {
        title: "رؤى الذكاء الاصطناعي",
        window: "تم اكتشاف نافزة النقل المثلى",
        compatibility: "تم العثور على مجموعات عالية التوافق",
        learning: "تحسن تعلم الشبكة العصبية",
      },
    },
    footer: {
      description: "أداة المحاكاة المثلى المدعومة بالذكاء الاصطناعي لنقل أعضاء تليجرام. آمنة وممتعة ومجانية تماماً.",
      made: "صُنعت بـ ❤️ للعروض التوضيحية والاختبار",
      product: "المنتج",
      support: "الدعم",
      docs: "التوثيق",
      help: "مركز المساعدة",
      privacy: "سياسة الخصوصية",
      rights: "جميع الحقوق محفوظة.",
      global: "شبكة توصيل المحتوى العالمية",
    },
  },
}

export function useLanguage() {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ar")) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("language", language)
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = language
  }, [language])

  const t = (key: string) => {
    const keys = key.split(".")
    let value: any = translations[language]

    for (const k of keys) {
      value = value?.[k]
    }

    return value || key
  }

  return { language, setLanguage, t }
}
