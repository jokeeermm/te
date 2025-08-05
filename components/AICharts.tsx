"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, Activity, Brain } from "lucide-react"

const performanceData = [
  { time: "00:00", success: 98.2, processing: 12, completed: 45 },
  { time: "04:00", success: 97.8, processing: 18, completed: 52 },
  { time: "08:00", success: 98.5, processing: 24, completed: 67 },
  { time: "12:00", success: 98.9, processing: 31, completed: 89 },
  { time: "16:00", success: 98.3, processing: 28, completed: 103 },
  { time: "20:00", success: 98.7, processing: 22, completed: 118 },
]

const aiLoadData = [
  { name: "Neural Analysis", value: 35, color: "#3b82f6" },
  { name: "Pattern Recognition", value: 25, color: "#8b5cf6" },
  { name: "Transfer Execution", value: 20, color: "#10b981" },
  { name: "Security Protocols", value: 15, color: "#f59e0b" },
  { name: "Learning Updates", value: 5, color: "#ef4444" },
]

const transferVolumeData = [
  { hour: "1h", volume: 156 },
  { hour: "2h", volume: 234 },
  { hour: "3h", volume: 189 },
  { hour: "4h", volume: 298 },
  { hour: "5h", volume: 267 },
  { hour: "6h", volume: 445 },
  { hour: "7h", volume: 378 },
  { hour: "8h", volume: 512 },
]

export function AICharts() {
  const [activeMetric, setActiveMetric] = useState("success")

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Performance Trends */}
      <Card className="bg-slate-800/50 border-slate-700 lg:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <CardTitle className="text-white">AI Performance Analytics</CardTitle>
            </div>
            <div className="flex gap-2">
              <Badge
                className={`cursor-pointer transition-all ${activeMetric === "success" ? "bg-green-500/20 text-green-400 border-green-400/30" : "bg-slate-700/50 text-slate-400"}`}
                onClick={() => setActiveMetric("success")}
              >
                Success Rate
              </Badge>
              <Badge
                className={`cursor-pointer transition-all ${activeMetric === "processing" ? "bg-blue-500/20 text-blue-400 border-blue-400/30" : "bg-slate-700/50 text-slate-400"}`}
                onClick={() => setActiveMetric("processing")}
              >
                Processing
              </Badge>
              <Badge
                className={`cursor-pointer transition-all ${activeMetric === "completed" ? "bg-purple-500/20 text-purple-400 border-purple-400/30" : "bg-slate-700/50 text-slate-400"}`}
                onClick={() => setActiveMetric("completed")}
              >
                Completed
              </Badge>
            </div>
          </div>
          <CardDescription className="text-slate-400">
            Real-time neural network performance metrics over the last 24 hours
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="successGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="processingGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="completedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #475569",
                  borderRadius: "8px",
                  color: "#f1f5f9",
                }}
              />
              {activeMetric === "success" && (
                <Area type="monotone" dataKey="success" stroke="#10b981" fillOpacity={1} fill="url(#successGradient)" />
              )}
              {activeMetric === "processing" && (
                <Area
                  type="monotone"
                  dataKey="processing"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#processingGradient)"
                />
              )}
              {activeMetric === "completed" && (
                <Area
                  type="monotone"
                  dataKey="completed"
                  stroke="#8b5cf6"
                  fillOpacity={1}
                  fill="url(#completedGradient)"
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* AI Resource Distribution */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-400" />
            Neural Load Distribution
          </CardTitle>
          <CardDescription className="text-slate-400">Current AI processing resource allocation</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={aiLoadData}
                cx="50%"
                cy="50%"
                outerRadius={70}
                innerRadius={30}
                paddingAngle={5}
                dataKey="value"
              >
                {aiLoadData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #475569",
                  borderRadius: "8px",
                  color: "#f1f5f9",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {aiLoadData.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-300">{item.name}</span>
                </div>
                <span className="text-slate-400">{item.value}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Transfer Volume */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            Transfer Volume
          </CardTitle>
          <CardDescription className="text-slate-400">Hourly member transfer activity</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={transferVolumeData}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.3} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="hour" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #475569",
                  borderRadius: "8px",
                  color: "#f1f5f9",
                }}
              />
              <Bar dataKey="volume" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
