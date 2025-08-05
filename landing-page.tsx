"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Users,
  Zap,
  Shield,
  BarChart3,
  Star,
  CheckCircle,
  MessageCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Telegram Transfer v4
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-blue-600 transition-colors">
              How It Works
            </a>
            <a href="#faq" className="text-sm font-medium hover:text-blue-600 transition-colors">
              FAQ
            </a>
          </nav>
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            Start Transfer
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-200">
              <Sparkles className="mr-1 h-3 w-3" />
              AI-Powered Transfer Simulation
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
              Move Telegram Members
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {" "}
                Like Magic ✨
              </span>
            </h1>
            <p className="mb-8 text-xl text-gray-600 sm:text-2xl">
              Simulate member transfer between Telegram groups in 3 easy steps – no login needed
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-8 py-4"
              >
                Start Transfer
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-transparent">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-bounce">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        <div className="absolute top-32 right-16 animate-pulse">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100">
            <Zap className="h-4 w-4 text-indigo-600" />
          </div>
        </div>
        <div className="absolute bottom-20 left-1/4 animate-bounce delay-300">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
            <MessageCircle className="h-5 w-5 text-purple-600" />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Transfer members in just 4 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Select Source Group",
                description: "Choose the Telegram group you want to transfer members from",
                icon: Users,
                color: "blue",
              },
              {
                step: "02",
                title: "Choose Target Group",
                description: "Select your destination group where members will be moved",
                icon: MessageCircle,
                color: "indigo",
              },
              {
                step: "03",
                title: "Set Member Count",
                description: "Specify how many members you want to transfer",
                icon: BarChart3,
                color: "purple",
              },
              {
                step: "04",
                title: "Watch the Magic",
                description: "Sit back and watch the AI-powered transfer simulation",
                icon: Sparkles,
                color: "pink",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-${item.color}-100`}
                  >
                    <item.icon className={`h-8 w-8 text-${item.color}-600`} />
                  </div>
                  <div className={`text-sm font-bold text-${item.color}-600 mb-2`}>STEP {item.step}</div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-base">{item.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section id="features" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600">Everything you need for seamless member transfer simulation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "No Login Required",
                description: "Start transferring immediately without any account setup or authentication",
                icon: Shield,
                gradient: "from-green-400 to-blue-500",
              },
              {
                title: "Safe & Anonymous",
                description: "Complete simulation environment with no real data or privacy concerns",
                icon: CheckCircle,
                gradient: "from-purple-400 to-pink-500",
              },
              {
                title: "Custom Animations",
                description: "Beautiful transfer animations that make the process engaging and fun",
                icon: Sparkles,
                gradient: "from-yellow-400 to-orange-500",
              },
              {
                title: "Real-time Dashboard",
                description: "Monitor transfer progress with live charts and statistics",
                icon: BarChart3,
                gradient: "from-blue-400 to-indigo-500",
              },
              {
                title: "Lightning Fast",
                description: "Instant simulation results with AI-powered processing",
                icon: Zap,
                gradient: "from-red-400 to-pink-500",
              },
              {
                title: "Mobile Friendly",
                description: "Works perfectly on all devices with responsive design",
                icon: Users,
                gradient: "from-teal-400 to-blue-500",
              },
            ].map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardHeader>
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r ${feature.gradient}`}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">What Users Say</h2>
            <p className="text-xl text-gray-600">See why thousands love our transfer simulation tool</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Chen",
                role: "Community Manager",
                content:
                  "Moved 10,000 members in seconds! The simulation is so realistic, perfect for testing our workflows.",
                rating: 5,
              },
              {
                name: "Sarah Johnson",
                role: "Marketing Director",
                content:
                  "Amazing tool for demos and presentations. Our clients love seeing the transfer process in action.",
                rating: 5,
              },
              {
                name: "Mike Rodriguez",
                role: "Tech Enthusiast",
                content:
                  "The AI-powered animations are incredible. Best simulation tool I've ever used for Telegram groups.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Simple Pricing</h2>
            <p className="text-xl text-gray-600">Get started with our free simulation tool</p>
          </div>

          <div className="max-w-md mx-auto">
            <Card className="border-0 shadow-xl">
              <CardHeader className="text-center pb-8">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Free Forever</CardTitle>
                <CardDescription className="text-lg">Perfect for testing and demos</CardDescription>
                <div className="text-4xl font-bold text-gray-900 mt-4">
                  $0<span className="text-lg text-gray-600">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  "Unlimited transfer simulations",
                  "Real-time progress tracking",
                  "Custom animations",
                  "Mobile responsive design",
                  "No registration required",
                  "Community support",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>{feature}</span>
                  </div>
                ))}
                <Button className="w-full mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  Try It Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about our simulation tool</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "Is this real? Can it actually transfer members?",
                answer:
                  "No, this is a demo tool for simulation purposes only. It doesn't actually transfer any real Telegram members. It's designed for testing, demos, and UI mockups.",
              },
              {
                question: "Why would I use this simulation tool?",
                answer:
                  "Perfect for pranks, creating mockups, testing user interfaces, demonstrating workflows, or just having fun with realistic transfer animations.",
              },
              {
                question: "Do I need to provide my Telegram credentials?",
                answer:
                  "Absolutely not! This is a simulation tool that doesn't require any login, credentials, or access to your Telegram account.",
              },
              {
                question: "Is my data safe?",
                answer:
                  "Yes, completely safe! Since this is just a simulation, no real data is processed or stored. Everything happens in your browser.",
              },
              {
                question: "Can I customize the transfer animations?",
                answer:
                  "Yes! The tool includes various animation options and settings to make your simulation look exactly how you want it.",
              },
            ].map((faq, index) => (
              <Card key={index} className="border border-gray-200">
                <CardHeader
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleFaq(index)}
                >
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-left">{faq.question}</CardTitle>
                    {openFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </CardHeader>
                {openFaq === index && (
                  <CardContent className="pt-0">
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">Telegram Transfer v4</span>
              </div>
              <p className="text-gray-400 mb-4">
                The ultimate simulation tool for Telegram member transfers. Safe, fun, and completely free to use.
              </p>
              <p className="text-sm text-gray-500">Made with ❤️ for fun and demos</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#features" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-white transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Telegram Transfer v4. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
