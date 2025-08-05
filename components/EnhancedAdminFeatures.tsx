import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { BarChart3, Users, Zap, TrendingUp } from "lucide-react"

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

interface EnhancedAdminFeaturesProps {
  orders: Order[]
}

export function EnhancedAdminFeatures({ orders }: EnhancedAdminFeaturesProps) {
  const completedOrders = orders.filter((o) => o.status === "completed")
  const avgAiScore = orders.reduce((sum, order) => sum + (order.aiScore || 0), 0) / orders.length

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-green-400" />
            Performance Analytics
          </CardTitle>
          <CardDescription className="text-slate-400">AI system performance metrics and insights</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-700/30 p-3 rounded-lg">
              <p className="text-xs text-slate-400">Completion Rate</p>
              <p className="text-lg text-green-400">{((completedOrders.length / orders.length) * 100).toFixed(1)}%</p>
            </div>
            <div className="bg-slate-700/30 p-3 rounded-lg">
              <p className="text-xs text-slate-400">Avg AI Score</p>
              <p className="text-lg text-blue-400">{avgAiScore.toFixed(1)}%</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Neural Efficiency</span>
              <span className="text-green-400">94.7%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                style={{ width: "94.7%" }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-400" />
            Quick Actions
          </CardTitle>
          <CardDescription className="text-slate-400">Administrative controls and system management</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
            <Users className="w-4 h-4 mr-2" />
            Bulk Status Update
          </Button>
          <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <TrendingUp className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
          <Button variant="outline" className="w-full border-slate-600 text-slate-300 bg-transparent">
            <Zap className="w-4 h-4 mr-2" />
            System Maintenance
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
