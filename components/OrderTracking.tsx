"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Badge } from "./ui/badge"
import { Progress } from "./ui/progress"
import { ArrowLeft, Search, Bot, Clock, CheckCircle, AlertCircle, Activity, Eye } from "lucide-react"

interface OrderTrackingProps {
  onBack: () => void
}

interface TrackingOrder {
  id: string
  status: "analyzing" | "verifying" | "transferring" | "completed" | "failed"
  sourceGroup: string
  targetGroup: string
  progress: number
  estimatedTime: string
  aiScore: number
  details: {
    phase: string
    description: string
    timestamp: string
  }[]
}

export function OrderTracking({ onBack }: OrderTrackingProps) {
  const [trackingId, setTrackingId] = useState("")
  const [searchResult, setSearchResult] = useState<TrackingOrder | null>(null)
  const [isSearching, setIsSearching] = useState(false)

  // Mock tracking data
  const mockOrders: { [key: string]: TrackingOrder } = {
    "AI-7F2A9C": {
      id: "AI-7F2A9C",
      status: "completed",
      sourceGroup: "https://t.me/crypto_traders",
      targetGroup: "https://t.me/investment_hub",
      progress: 100,
      estimatedTime: "Completed",
      aiScore: 98.7,
      details: [
        {
          phase: "Analysis Complete",
          description: "AI completed deep analysis of source group structure and member patterns",
          timestamp: "2024-01-15 14:32:15",
        },
        {
          phase: "Payment Verified",
          description: "Bitcoin transaction verified on blockchain - Confirmation ID: 3xA4f7B9",
          timestamp: "2024-01-15 14:35:42",
        },
        {
          phase: "Transfer Initiated",
          description: "Neural network began automated member transfer protocol",
          timestamp: "2024-01-15 14:37:18",
        },
        {
          phase: "Members Transferred",
          description: "Successfully transferred 1,247 members with 98.7% compatibility score",
          timestamp: "2024-01-15 14:52:33",
        },
        {
          phase: "Mission Complete",
          description: "AI transfer operation completed. Neural network updated with new patterns.",
          timestamp: "2024-01-15 14:53:01",
        },
      ],
    },
    "AI-B4E8D1": {
      id: "AI-B4E8D1",
      status: "transferring",
      sourceGroup: "https://t.me/tech_community",
      targetGroup: "https://t.me/startup_hub",
      progress: 73,
      estimatedTime: "4-6 minutes",
      aiScore: 94.3,
      details: [
        {
          phase: "Analysis Complete",
          description: "Large group detected (2,500+ members). AI optimizing transfer strategy.",
          timestamp: "2024-01-15 16:45:12",
        },
        {
          phase: "Payment Verified",
          description: "PayPal payment confirmed - Transaction ID: PP-7Y8Z9A1B",
          timestamp: "2024-01-15 16:47:33",
        },
        {
          phase: "Transfer In Progress",
          description: "Neural network executing batch transfer protocol. 1,825/2,501 members processed.",
          timestamp: "2024-01-15 16:51:45",
        },
      ],
    },
    "AI-X9K7M2": {
      id: "AI-X9K7M2",
      status: "verifying",
      sourceGroup: "https://t.me/marketing_group",
      targetGroup: "https://t.me/business_network",
      progress: 45,
      estimatedTime: "8-12 minutes",
      aiScore: 96.1,
      details: [
        {
          phase: "Analysis Complete",
          description: "AI identified high compatibility score between groups (96.1%)",
          timestamp: "2024-01-15 18:20:33",
        },
        {
          phase: "Payment Processing",
          description: "Ethereum smart contract verification in progress - Hash: 0x4a7b3c8d",
          timestamp: "2024-01-15 18:22:15",
        },
      ],
    },
  }

  const handleSearch = () => {
    setIsSearching(true)

    // Simulate API call delay
    setTimeout(() => {
      const order = mockOrders[trackingId.toUpperCase()]
      setSearchResult(order || null)
      setIsSearching(false)
    }, 1000)
  }

  const getStatusColor = (status: TrackingOrder["status"]) => {
    switch (status) {
      case "analyzing":
        return "bg-blue-900/30 text-blue-400 border-blue-400/30"
      case "verifying":
        return "bg-yellow-900/30 text-yellow-400 border-yellow-400/30"
      case "transferring":
        return "bg-purple-900/30 text-purple-400 border-purple-400/30"
      case "completed":
        return "bg-green-900/30 text-green-400 border-green-400/30"
      case "failed":
        return "bg-red-900/30 text-red-400 border-red-400/30"
      default:
        return "bg-gray-900/30 text-gray-400 border-gray-400/30"
    }
  }

  const getStatusIcon = (status: TrackingOrder["status"]) => {
    switch (status) {
      case "analyzing":
        return <Bot className="w-4 h-4 text-blue-400" />
      case "verifying":
        return <Clock className="w-4 h-4 text-yellow-400" />
      case "transferring":
        return <Activity className="w-4 h-4 text-purple-400 animate-pulse" />
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "failed":
        return <AlertCircle className="w-4 h-4 text-red-400" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={onBack} className="text-slate-400 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-xl text-white">Order Tracking</h1>
              <p className="text-sm text-slate-400">Track your AI transfer progress in real-time</p>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Search className="w-5 h-5 text-blue-400" />
              Track Your Order
            </CardTitle>
            <CardDescription className="text-slate-400">
              Enter your AI Agent ID to track the progress of your member transfer
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-1">
                <Label htmlFor="trackingId" className="text-slate-300">
                  AI Agent ID
                </Label>
                <Input
                  id="trackingId"
                  placeholder="AI-7F2A9C"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400"
                />
              </div>
              <div className="flex items-end">
                <Button
                  onClick={handleSearch}
                  disabled={!trackingId.trim() || isSearching}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                >
                  {isSearching ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  ) : (
                    <Search className="w-4 h-4 mr-2" />
                  )}
                  Track Order
                </Button>
              </div>
            </div>

            <div className="bg-slate-700/30 p-4 rounded-lg border border-slate-600">
              <h4 className="text-slate-300 text-sm mb-2">Demo Order IDs:</h4>
              <div className="flex flex-wrap gap-2">
                {Object.keys(mockOrders).map((id) => (
                  <Button
                    key={id}
                    variant="outline"
                    size="sm"
                    onClick={() => setTrackingId(id)}
                    className="text-xs border-slate-600 text-slate-400 hover:bg-slate-700"
                  >
                    {id}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        {searchResult === null && trackingId && !isSearching && (
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-8 text-center">
              <AlertCircle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-white text-lg mb-2">Order Not Found</h3>
              <p className="text-slate-400">
                No order found with ID "{trackingId}". Please check your AI Agent ID and try again.
              </p>
            </CardContent>
          </Card>
        )}

        {searchResult && (
          <div className="space-y-6">
            {/* Order Status Overview */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    {getStatusIcon(searchResult.status)}
                    AI Agent {searchResult.id}
                  </CardTitle>
                  <Badge className={getStatusColor(searchResult.status)}>
                    {searchResult.status.charAt(0).toUpperCase() + searchResult.status.slice(1)}
                  </Badge>
                </div>
                <CardDescription className="text-slate-400">
                  Neural network transfer operation status and progress
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-slate-400 text-sm">Source Group</Label>
                      <p className="text-white text-sm mt-1 break-all">{searchResult.sourceGroup}</p>
                    </div>
                    <div>
                      <Label className="text-slate-400 text-sm">Target Group</Label>
                      <p className="text-white text-sm mt-1 break-all">{searchResult.targetGroup}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-slate-400 text-sm">AI Compatibility Score</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-green-400 text-lg">{searchResult.aiScore}%</p>
                        <Badge className="bg-green-900/30 text-green-400 border-green-400/30 text-xs">Excellent</Badge>
                      </div>
                    </div>
                    <div>
                      <Label className="text-slate-400 text-sm">Estimated Completion</Label>
                      <p className="text-white text-sm mt-1">{searchResult.estimatedTime}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-slate-400 text-sm">Progress</Label>
                    <span className="text-blue-400 text-sm">{searchResult.progress}%</span>
                  </div>
                  <Progress value={searchResult.progress} className="h-3 bg-slate-700" />
                </div>
              </CardContent>
            </Card>

            {/* Detailed Timeline */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-cyan-400" />
                  Processing Timeline
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Detailed log of AI processing stages and neural network decisions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {searchResult.details.map((detail, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-slate-700/30 rounded-lg">
                      <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-white text-sm">{detail.phase}</h4>
                          <span className="text-xs text-slate-500">{detail.timestamp}</span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">{detail.description}</p>
                      </div>
                    </div>
                  ))}

                  {searchResult.status !== "completed" && searchResult.status !== "failed" && (
                    <div className="flex items-start gap-4 p-4 bg-blue-900/20 rounded-lg border border-blue-700/30">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <div className="w-4 h-4 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-blue-400 text-sm mb-1">Currently Processing</h4>
                        <p className="text-slate-400 text-sm">
                          AI neural network is actively processing your request...
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
