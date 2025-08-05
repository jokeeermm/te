"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Badge } from "./ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Textarea } from "./ui/textarea"
import { ArrowLeft, Settings, Edit, DollarSign, Bot, Shield, Activity, Cpu, Database, Terminal } from "lucide-react"
import { EnhancedAdminFeatures } from "./EnhancedAdminFeatures"

interface Order {
  id: string
  sourceGroup: string
  targetGroup: string
  paymentMethod: string
  status: "analyzing" | "verifying" | "transferring" | "completed" | "failed"
  amount: number
  createdAt: string
  notes: string
  aiScore?: number
}

interface AdminPanelProps {
  onBack: () => void
}

export function AdminPanel({ onBack }: AdminPanelProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginData, setLoginData] = useState({ username: "", password: "" })
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [newPrice, setNewPrice] = useState("")
  const [newNotes, setNewNotes] = useState("")

  // Enhanced mock orders data with AI scores
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "AI-7F2A9C",
      sourceGroup: "https://t.me/crypto_traders",
      targetGroup: "https://t.me/new_crypto_group",
      paymentMethod: "Bitcoin",
      status: "completed",
      amount: 49.99,
      createdAt: "2024-01-15 14:30",
      notes: "Neural network verified payment via blockchain",
      aiScore: 98.7,
    },
    {
      id: "AI-B4E8D1",
      sourceGroup: "https://t.me/tech_community",
      targetGroup: "https://t.me/startup_hub",
      paymentMethod: "PayPal",
      status: "transferring",
      amount: 49.99,
      createdAt: "2024-01-15 16:45",
      notes: "Large group detected - AI optimizing transfer timing",
      aiScore: 94.3,
    },
    {
      id: "AI-X9K7M2",
      sourceGroup: "https://t.me/marketing_group",
      targetGroup: "https://t.me/business_network",
      paymentMethod: "Ethereum",
      status: "verifying",
      amount: 49.99,
      createdAt: "2024-01-15 18:20",
      notes: "Smart contract verification in progress",
      aiScore: 96.1,
    },
    {
      id: "AI-K3L9P7",
      sourceGroup: "https://t.me/defi_community",
      targetGroup: "https://t.me/yield_farming",
      paymentMethod: "Bitcoin",
      status: "analyzing",
      amount: 49.99,
      createdAt: "2024-01-15 19:15",
      notes: "AI conducting deep pattern analysis",
      aiScore: 92.8,
    },
    {
      id: "AI-M8N2Q5",
      sourceGroup: "https://t.me/nft_traders",
      targetGroup: "https://t.me/digital_art",
      paymentMethod: "Ethereum",
      status: "completed",
      amount: 49.99,
      createdAt: "2024-01-15 20:30",
      notes: "High compatibility groups - optimal transfer achieved",
      aiScore: 97.5,
    },
  ])

  const handleLogin = () => {
    if (loginData.username === "admin" && loginData.password === "admin123") {
      setIsLoggedIn(true)
    } else {
      alert("Invalid credentials. Use admin/admin123")
    }
  }

  const getStatusColor = (status: Order["status"]) => {
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

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  const updateOrderPrice = (orderId: string, newAmount: number) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, amount: newAmount } : order)))
    setNewPrice("")
  }

  const addInternalNotes = (orderId: string, notes: string) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, notes } : order)))
    setNewNotes("")
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-800/50 border-slate-700">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-blue-400" />
            </div>
            <CardTitle className="text-white">AI Admin Access</CardTitle>
            <CardDescription className="text-slate-400">Secure neural network administration panel</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-slate-300">
                Administrator ID
              </Label>
              <Input
                id="username"
                placeholder="Enter admin username"
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300">
                Security Key
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter security key"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
              />
            </div>

            <div className="text-xs text-slate-400 p-3 bg-slate-700/30 rounded border border-slate-600">
              <div className="flex items-center gap-2 mb-2">
                <Terminal className="w-3 h-3" />
                <span>Demo Credentials</span>
              </div>
              <div className="font-mono">admin / admin123</div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={onBack}
                className="flex-1 border-slate-600 text-slate-300 bg-transparent"
              >
                Cancel
              </Button>
              <Button onClick={handleLogin} className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600">
                Access System
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack} className="text-slate-400 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h1 className="text-xl text-white">AI Administration</h1>
                <p className="text-sm text-slate-400">Neural Network Control Center</p>
              </div>
            </div>
          </div>

          <Button variant="outline" onClick={() => setIsLoggedIn(false)} className="border-slate-600 text-slate-300">
            <Shield className="w-4 h-4 mr-2" />
            Secure Logout
          </Button>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Active Agents</p>
                  <p className="text-2xl text-white">{orders.length}</p>
                  <p className="text-xs text-blue-400">+3 today</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Bot className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Neural Revenue</p>
                  <p className="text-2xl text-white">
                    ${orders.reduce((sum, order) => sum + order.amount, 0).toFixed(2)}
                  </p>
                  <p className="text-xs text-green-400">+12.5% this week</p>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide">AI Processing</p>
                  <p className="text-2xl text-white">
                    {orders.filter((o) => ["analyzing", "verifying", "transferring"].includes(o.status)).length}
                  </p>
                  <p className="text-xs text-purple-400">Neural active</p>
                </div>
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Success Rate</p>
                  <p className="text-2xl text-white">98.7%</p>
                  <p className="text-xs text-green-400">AI optimized</p>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Admin Features */}
        <div className="mb-8">
          <EnhancedAdminFeatures orders={orders} />
        </div>

        {/* AI Orders Management */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white flex items-center gap-2">
                  <Database className="w-5 h-5 text-cyan-400" />
                  Neural Network Operations
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Monitor and manage AI-driven transfer operations
                </CardDescription>
              </div>
              <Badge className="bg-cyan-900/30 text-cyan-400 border-cyan-400/30">
                {orders.filter((o) => o.status !== "completed" && o.status !== "failed").length} Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-300">AI Agent ID</TableHead>
                    <TableHead className="text-slate-300">Source Neural Map</TableHead>
                    <TableHead className="text-slate-300">Target Destination</TableHead>
                    <TableHead className="text-slate-300">Payment</TableHead>
                    <TableHead className="text-slate-300">Amount</TableHead>
                    <TableHead className="text-slate-300">AI Score</TableHead>
                    <TableHead className="text-slate-300">Status</TableHead>
                    <TableHead className="text-slate-300">Timestamp</TableHead>
                    <TableHead className="text-slate-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id} className="border-slate-700 hover:bg-slate-700/30">
                      <TableCell className="font-mono text-sm text-blue-400">{order.id}</TableCell>
                      <TableCell className="max-w-48 truncate text-slate-300">{order.sourceGroup}</TableCell>
                      <TableCell className="max-w-48 truncate text-slate-300">{order.targetGroup}</TableCell>
                      <TableCell className="text-slate-300">{order.paymentMethod}</TableCell>
                      <TableCell className="text-green-400">${order.amount}</TableCell>
                      <TableCell>
                        {order.aiScore && (
                          <Badge
                            className={`${
                              order.aiScore > 95
                                ? "bg-green-900/30 text-green-400 border-green-400/30"
                                : order.aiScore > 90
                                  ? "bg-blue-900/30 text-blue-400 border-blue-400/30"
                                  : "bg-yellow-900/30 text-yellow-400 border-yellow-400/30"
                            }`}
                          >
                            {order.aiScore}%
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                      </TableCell>
                      <TableCell className="text-slate-400 text-sm">{order.createdAt}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedOrder(order)}
                              className="hover:bg-slate-700"
                            >
                              <Edit className="w-4 h-4 text-slate-400" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md">
                            <DialogHeader>
                              <DialogTitle className="text-white">AI Agent Control: {order.id}</DialogTitle>
                              <DialogDescription className="text-slate-400">
                                Neural network operation management and override controls
                              </DialogDescription>
                            </DialogHeader>

                            {selectedOrder && (
                              <div className="space-y-6">
                                <div className="space-y-3">
                                  <Label className="text-slate-300">Override AI Status</Label>
                                  <Select
                                    value={selectedOrder.status}
                                    onValueChange={(value) =>
                                      updateOrderStatus(selectedOrder.id, value as Order["status"])
                                    }
                                  >
                                    <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-800 border-slate-700">
                                      <SelectItem value="analyzing" className="text-white">
                                        🧠 Analyzing
                                      </SelectItem>
                                      <SelectItem value="verifying" className="text-white">
                                        🔍 Verifying Payment
                                      </SelectItem>
                                      <SelectItem value="transferring" className="text-white">
                                        ⚡ Transferring Members
                                      </SelectItem>
                                      <SelectItem value="completed" className="text-white">
                                        ✅ Completed
                                      </SelectItem>
                                      <SelectItem value="failed" className="text-white">
                                        ❌ Failed
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div className="space-y-3">
                                  <Label className="text-slate-300">Manual Price Override</Label>
                                  <div className="flex gap-2">
                                    <Input
                                      placeholder="49.99"
                                      value={newPrice}
                                      onChange={(e) => setNewPrice(e.target.value)}
                                      className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                                    />
                                    <Button
                                      onClick={() => updateOrderPrice(selectedOrder.id, Number.parseFloat(newPrice))}
                                      disabled={!newPrice}
                                      className="bg-blue-600 hover:bg-blue-700"
                                    >
                                      Update
                                    </Button>
                                  </div>
                                </div>

                                <div className="space-y-3">
                                  <Label className="text-slate-300">AI System Notes</Label>
                                  <Textarea
                                    placeholder="Add neural network annotations..."
                                    value={newNotes || selectedOrder.notes}
                                    onChange={(e) => setNewNotes(e.target.value)}
                                    rows={3}
                                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                                  />
                                  <Button
                                    onClick={() => addInternalNotes(selectedOrder.id, newNotes || selectedOrder.notes)}
                                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                                  >
                                    <Bot className="w-4 h-4 mr-2" />
                                    Save to Neural Network
                                  </Button>
                                </div>

                                {selectedOrder.aiScore && (
                                  <div className="bg-slate-700/30 p-4 rounded-lg border border-slate-600">
                                    <h4 className="text-cyan-400 text-sm mb-2 flex items-center gap-2">
                                      <Activity className="w-4 h-4" />
                                      AI Performance Metrics
                                    </h4>
                                    <div className="space-y-2 text-xs">
                                      <div className="flex justify-between">
                                        <span className="text-slate-400">Compatibility Score:</span>
                                        <span className="text-green-400">{selectedOrder.aiScore}%</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-slate-400">Neural Confidence:</span>
                                        <span className="text-blue-400">94.2%</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-slate-400">Processing Time:</span>
                                        <span className="text-purple-400">2.3s</span>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
