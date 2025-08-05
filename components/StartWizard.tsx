"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Badge } from "./ui/badge"
import { Progress } from "./ui/progress"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Textarea } from "./ui/textarea"
import {
  ArrowLeft,
  ArrowRight,
  Upload,
  CheckCircle,
  Bot,
  CreditCard,
  Bitcoin,
  Brain,
  Zap,
  Activity,
} from "lucide-react"

type WizardStep = "groups" | "payment" | "upload" | "processing" | "completed"
type OrderStatus = "analyzing" | "verifying" | "transferring" | "completed"

interface WizardData {
  sourceGroup: string
  targetGroup: string
  paymentMethod: string
  proofText: string
}

interface StartWizardProps {
  onBack: () => void
}

export function StartWizard({ onBack }: StartWizardProps) {
  const [currentStep, setCurrentStep] = useState<WizardStep>("groups")
  const [orderStatus, setOrderStatus] = useState<OrderStatus>("analyzing")
  const [orderId] = useState(() => Math.random().toString(36).substr(2, 9).toUpperCase())
  const [data, setData] = useState<WizardData>({
    sourceGroup: "",
    targetGroup: "",
    paymentMethod: "",
    proofText: "",
  })

  const steps = [
    { id: "groups", label: "Group Analysis", number: 1, icon: Brain },
    { id: "payment", label: "Payment Processing", number: 2, icon: CreditCard },
    { id: "upload", label: "Verification", number: 3, icon: Upload },
    { id: "processing", label: "AI Execution", number: 4, icon: Zap },
  ]

  const getCurrentStepIndex = () => {
    return steps.findIndex((step) => step.id === currentStep)
  }

  const getProgress = () => {
    const stepIndex = getCurrentStepIndex()
    return ((stepIndex + 1) / steps.length) * 100
  }

  const canProceed = () => {
    switch (currentStep) {
      case "groups":
        return data.sourceGroup && data.targetGroup
      case "payment":
        return data.paymentMethod
      case "upload":
        return data.proofText.trim()
      default:
        return false
    }
  }

  const handleNext = () => {
    const stepIndex = getCurrentStepIndex()
    if (stepIndex < steps.length - 1) {
      setCurrentStep(steps[stepIndex + 1].id as WizardStep)
    } else if (currentStep === "upload") {
      setCurrentStep("processing")
      simulateProcessing()
    }
  }

  const handleBack = () => {
    const stepIndex = getCurrentStepIndex()
    if (stepIndex > 0) {
      setCurrentStep(steps[stepIndex - 1].id as WizardStep)
    }
  }

  const simulateProcessing = () => {
    setTimeout(() => setOrderStatus("verifying"), 2000)
    setTimeout(() => setOrderStatus("transferring"), 5000)
    setTimeout(() => {
      setOrderStatus("completed")
      setCurrentStep("completed")
    }, 8000)
  }

  const getStatusMessage = () => {
    switch (orderStatus) {
      case "analyzing":
        return "AI analyzing group structure and member compatibility..."
      case "verifying":
        return "Neural network verifying payment authenticity..."
      case "transferring":
        return "Executing autonomous member transfer protocol..."
      case "completed":
        return "AI transfer operation completed successfully!"
    }
  }

  if (currentStep === "processing") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg bg-slate-800/50 border-slate-700">
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 relative">
              {orderStatus === "completed" ? (
                <CheckCircle className="w-10 h-10 text-green-400" />
              ) : (
                <>
                  <Bot className="w-10 h-10 text-blue-400" />
                  <div className="absolute inset-0 border-2 border-blue-400/30 rounded-full animate-spin border-t-blue-400" />
                </>
              )}
            </div>
            <Badge className="mb-2 bg-blue-900/30 text-blue-400 border-blue-400/30">AI Agent #{orderId}</Badge>
            <CardTitle className="text-white">Neural Processing Active</CardTitle>
            <CardDescription className="text-slate-400">{getStatusMessage()}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">AI Progress</span>
                <span className="text-blue-400">{orderStatus === "completed" ? "100%" : "Processing..."}</span>
              </div>
              <Progress value={orderStatus === "completed" ? 100 : undefined} className="h-3 bg-slate-700" />
            </div>

            <div className="space-y-4">
              {[
                {
                  label: "Deep Group Analysis",
                  status: ["analyzing", "verifying", "transferring", "completed"],
                  icon: Brain,
                },
                { label: "Payment Verification", status: ["verifying", "transferring", "completed"], icon: CreditCard },
                { label: "Member Transfer Protocol", status: ["transferring", "completed"], icon: Activity },
                { label: "Neural Network Learning", status: ["completed"], icon: Zap },
              ].map((phase, index) => {
                const isActive = phase.status.includes(orderStatus)
                const Icon = phase.icon
                return (
                  <div key={index} className="flex items-center gap-4 p-3 bg-slate-700/30 rounded-lg">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isActive ? "bg-green-500/20 text-green-400" : "bg-slate-600/50 text-slate-500"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <span className={`text-sm ${isActive ? "text-green-400" : "text-slate-500"}`}>{phase.label}</span>
                    </div>
                    <div
                      className={`w-3 h-3 rounded-full ${isActive ? "bg-green-400 animate-pulse" : "bg-slate-600"}`}
                    />
                  </div>
                )
              })}
            </div>

            {orderStatus === "completed" && (
              <Button
                onClick={onBack}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Return to AI Dashboard
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  if (currentStep === "completed") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg bg-slate-800/50 border-slate-700">
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
            <Badge className="mb-2 bg-green-900/30 text-green-400 border-green-400/30">AI Mission Complete</Badge>
            <CardTitle className="text-green-400">Transfer Protocol Executed!</CardTitle>
            <CardDescription className="text-slate-400">
              Your AI-powered member transfer has been completed with neural precision.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-slate-700/30 p-4 rounded-lg space-y-3 border border-slate-600">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">AI Agent ID:</span>
                <span className="text-sm font-mono text-white">#{orderId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">Source Analysis:</span>
                <span className="text-sm text-blue-400 truncate max-w-48">{data.sourceGroup}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">Target Destination:</span>
                <span className="text-sm text-purple-400 truncate max-w-48">{data.targetGroup}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">Neural Status:</span>
                <Badge className="bg-green-900/30 text-green-400 border-green-400/30">Mission Complete</Badge>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { metric: "Success Rate", value: "98.7%", color: "text-green-400" },
                { metric: "Members Processed", value: "1,247", color: "text-blue-400" },
                { metric: "AI Confidence", value: "99.2%", color: "text-purple-400" },
              ].map((stat, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-slate-800/50 rounded">
                  <span className="text-sm text-slate-400">{stat.metric}:</span>
                  <span className={`text-sm ${stat.color}`}>{stat.value}</span>
                </div>
              ))}
            </div>

            <Button
              onClick={onBack}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Bot className="w-4 h-4 mr-2" />
              Launch New AI Mission
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={onBack} className="text-slate-400 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h1 className="text-xl text-white">AI Transfer Protocol</h1>
              <p className="text-sm text-slate-400">Neural Network Guided Process</p>
            </div>
          </div>
        </div>

        {/* Progress Visualization */}
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            <span className="text-sm text-slate-400">
              AI Step {getCurrentStepIndex() + 1} of {steps.length}
            </span>
            <span className="text-sm text-blue-400">{Math.round(getProgress())}% Neural Processing</span>
          </div>
          <Progress value={getProgress()} className="h-3 bg-slate-700" />

          <div className="flex justify-between mt-6">
            {steps.map((step, index) => {
              const isActive = index === getCurrentStepIndex()
              const isCompleted = index < getCurrentStepIndex()
              const Icon = step.icon

              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center mb-2 transition-all ${
                      isActive
                        ? "bg-blue-500 text-white"
                        : isCompleted
                          ? "bg-green-500/20 text-green-400"
                          : "bg-slate-700 text-slate-400"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span
                    className={`text-xs text-center max-w-20 ${
                      isActive ? "text-blue-400" : isCompleted ? "text-green-400" : "text-slate-500"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Main Content */}
        <Card className="mb-8 bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-white">
              <div className="w-10 h-10 bg-blue-500 text-white rounded-lg flex items-center justify-center">
                {steps[getCurrentStepIndex()].number}
              </div>
              {steps[getCurrentStepIndex()].label}
            </CardTitle>
            <CardDescription className="text-slate-400">
              {currentStep === "groups" && "Configure source and destination parameters for AI analysis"}
              {currentStep === "payment" && "Select payment method for automated processing"}
              {currentStep === "upload" && "Provide verification data for neural network validation"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentStep === "groups" && (
              <>
                <div className="space-y-3">
                  <Label htmlFor="sourceGroup" className="text-slate-300">
                    Source Group URL
                  </Label>
                  <Input
                    id="sourceGroup"
                    placeholder="https://t.me/source_group"
                    value={data.sourceGroup}
                    onChange={(e) => setData({ ...data, sourceGroup: e.target.value })}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400"
                  />
                  <p className="text-sm text-slate-400">🧠 AI will analyze member patterns and engagement metrics</p>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="targetGroup" className="text-slate-300">
                    Target Group URL
                  </Label>
                  <Input
                    id="targetGroup"
                    placeholder="https://t.me/target_group"
                    value={data.targetGroup}
                    onChange={(e) => setData({ ...data, targetGroup: e.target.value })}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400"
                  />
                  <p className="text-sm text-slate-400">🎯 Neural network will calculate compatibility scores</p>
                </div>

                <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
                  <h4 className="text-blue-400 text-sm mb-2">AI Pre-Analysis</h4>
                  <p className="text-xs text-slate-400">
                    The neural network will perform deep analysis of both groups including member activity, engagement
                    patterns, and optimal transfer timing before processing.
                  </p>
                </div>
              </>
            )}

            {currentStep === "payment" && (
              <div className="space-y-4">
                <Label className="text-slate-300">AI Payment Processing Method</Label>
                <RadioGroup
                  value={data.paymentMethod}
                  onValueChange={(value) => setData({ ...data, paymentMethod: value })}
                >
                  <div className="flex items-center space-x-3 p-4 border border-slate-600 rounded-lg hover:border-orange-400/50 transition-colors">
                    <RadioGroupItem value="bitcoin" id="bitcoin" className="border-slate-400" />
                    <Label htmlFor="bitcoin" className="flex items-center gap-3 cursor-pointer text-white flex-1">
                      <Bitcoin className="w-6 h-6 text-orange-400" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span>Bitcoin (BTC)</span>
                          <Badge className="bg-orange-900/30 text-orange-400 border-orange-400/30">Preferred</Badge>
                        </div>
                        <span className="text-sm text-slate-400">$49.99 - Instant blockchain verification</span>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 p-4 border border-slate-600 rounded-lg hover:border-purple-400/50 transition-colors">
                    <RadioGroupItem value="ethereum" id="ethereum" className="border-slate-400" />
                    <Label htmlFor="ethereum" className="flex items-center gap-3 cursor-pointer text-white flex-1">
                      <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
                      <div>
                        <span>Ethereum (ETH)</span>
                        <div className="text-sm text-slate-400">$49.99 - Smart contract processing</div>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 p-4 border border-slate-600 rounded-lg hover:border-blue-400/50 transition-colors">
                    <RadioGroupItem value="paypal" id="paypal" className="border-slate-400" />
                    <Label htmlFor="paypal" className="flex items-center gap-3 cursor-pointer text-white flex-1">
                      <CreditCard className="w-6 h-6 text-blue-400" />
                      <div>
                        <span>PayPal</span>
                        <div className="text-sm text-slate-400">$49.99 - Traditional processing</div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {currentStep === "upload" && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="proof" className="text-slate-300">
                    Payment Verification Data
                  </Label>
                  <p className="text-sm text-slate-400 mb-3">Provide transaction details for AI verification system</p>
                  <Textarea
                    id="proof"
                    placeholder="Transaction ID, hash, or payment confirmation details..."
                    value={data.proofText}
                    onChange={(e) => setData({ ...data, proofText: e.target.value })}
                    rows={4}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400"
                  />
                </div>

                <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-blue-400/50 transition-colors">
                  <div className="w-12 h-12 bg-slate-700/50 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Upload className="w-6 h-6 text-slate-400" />
                  </div>
                  <p className="text-sm text-slate-300 mb-2">Neural Network Document Analysis</p>
                  <p className="text-xs text-slate-400 mb-4">
                    Optional: Upload screenshot or document for AI verification
                  </p>
                  <Button variant="outline" size="sm" disabled className="border-slate-600 bg-transparent">
                    Upload File (Demo Mode)
                  </Button>
                </div>

                <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-4">
                  <h4 className="text-purple-400 text-sm mb-2">🛡️ AI Security Protocol</h4>
                  <p className="text-xs text-slate-400">
                    All verification data is processed through encrypted neural networks with zero-knowledge protocols.
                    Your payment information remains completely private.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={getCurrentStepIndex() === 0}
            className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous Step
          </Button>

          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {currentStep === "upload" ? (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Initialize AI
              </>
            ) : (
              <>
                Next Step
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
