"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Progress } from "./ui/progress"
import { Separator } from "./ui/separator"
import { Cpu, HardDrive, Zap, Activity, Server, Database, Network, AlertTriangle, CheckCircle } from "lucide-react"

interface SystemMetrics {
  cpu: {
    usage: number
    cores: number
    temperature: number
  }
  memory: {
    used: number
    total: number
    usage: number
  }
  network: {
    latency: number
    bandwidth: number
    status: "optimal" | "degraded" | "offline"
  }
  ai: {
    load: number
    operations: number
    accuracy: number
    learningRate: number
  }
  storage: {
    used: number
    total: number
    usage: number
  }
}

interface SystemMonitorProps {
  className?: string
}

export function SystemMonitor({ className }: SystemMonitorProps) {
  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpu: { usage: 67, cores: 8, temperature: 42 },
    memory: { used: 12.8, total: 32, usage: 40 },
    network: { latency: 24, bandwidth: 850, status: "optimal" },
    ai: { load: 82, operations: 24, accuracy: 98.7, learningRate: 0.003 },
    storage: { used: 245, total: 1000, usage: 24.5 },
  })

  const [isOnline, setIsOnline] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // Simulate real-time system monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        cpu: {
          usage: Math.max(30, Math.min(90, prev.cpu.usage + (Math.random() - 0.5) * 10)),
          cores: 8,
          temperature: Math.max(35, Math.min(65, prev.cpu.temperature + (Math.random() - 0.5) * 3)),
        },
        memory: {
          used: Math.max(8, Math.min(28, prev.memory.used + (Math.random() - 0.5) * 2)),
          total: 32,
          usage: Math.max(25, Math.min(87, prev.memory.usage + (Math.random() - 0.5) * 5)),
        },
        network: {
          latency: Math.max(15, Math.min(100, prev.network.latency + (Math.random() - 0.5) * 10)),
          bandwidth: Math.max(500, Math.min(1000, prev.network.bandwidth + (Math.random() - 0.5) * 50)),
          status: prev.network.latency < 50 ? "optimal" : prev.network.latency < 100 ? "degraded" : "offline",
        },
        ai: {
          load: Math.max(60, Math.min(95, prev.ai.load + (Math.random() - 0.5) * 8)),
          operations: Math.max(10, Math.min(50, prev.ai.operations + Math.floor((Math.random() - 0.5) * 6))),
          accuracy: Math.max(95, Math.min(99.5, prev.ai.accuracy + (Math.random() - 0.5) * 0.5)),
          learningRate: Math.max(0.001, Math.min(0.01, prev.ai.learningRate + (Math.random() - 0.5) * 0.002)),
        },
        storage: {
          used: prev.storage.used + Math.random() * 0.1,
          total: 1000,
          usage: Math.max(20, Math.min(80, prev.storage.usage + (Math.random() - 0.5) * 2)),
        },
      }))
      setLastUpdate(new Date())
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal":
        return "bg-green-900/30 text-green-400 border-green-400/30"
      case "degraded":
        return "bg-yellow-900/30 text-yellow-400 border-yellow-400/30"
      case "offline":
        return "bg-red-900/30 text-red-400 border-red-400/30"
      default:
        return "bg-gray-900/30 text-gray-400 border-gray-400/30"
    }
  }

  const getHealthScore = () => {
    const cpuScore = Math.max(0, 100 - metrics.cpu.usage)
    const memoryScore = Math.max(0, 100 - metrics.memory.usage)
    const networkScore = metrics.network.status === "optimal" ? 100 : metrics.network.status === "degraded" ? 70 : 30
    const aiScore = metrics.ai.accuracy

    return Math.round((cpuScore + memoryScore + networkScore + aiScore) / 4)
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* System Overview */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Server className="w-5 h-5 text-cyan-400" />
              System Health Monitor
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge className={getStatusColor(isOnline ? "optimal" : "offline")}>
                {isOnline ? <CheckCircle className="w-3 h-3 mr-1" /> : <AlertTriangle className="w-3 h-3 mr-1" />}
                {isOnline ? "Online" : "Offline"}
              </Badge>
              <Badge className="bg-blue-900/30 text-blue-400 border-blue-400/30">Health: {getHealthScore()}%</Badge>
            </div>
          </div>
          <CardDescription className="text-slate-400">
            Real-time monitoring of AI system performance and infrastructure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-slate-500 mb-4">Last updated: {lastUpdate.toLocaleTimeString()}</div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* CPU Metrics */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-blue-400" />
                <h4 className="text-slate-300">CPU Performance</h4>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Usage</span>
                  <span className="text-sm text-white">{metrics.cpu.usage.toFixed(1)}%</span>
                </div>
                <Progress value={metrics.cpu.usage} className="h-2 bg-slate-700" />

                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Temperature</span>
                  <span
                    className={`text-sm ${metrics.cpu.temperature > 60 ? "text-red-400" : metrics.cpu.temperature > 50 ? "text-yellow-400" : "text-green-400"}`}
                  >
                    {metrics.cpu.temperature.toFixed(1)}°C
                  </span>
                </div>
                <Progress value={(metrics.cpu.temperature / 80) * 100} className="h-2 bg-slate-700" />

                <div className="text-xs text-slate-500">Cores: {metrics.cpu.cores} | Architecture: x64</div>
              </div>
            </div>

            {/* Memory Metrics */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-green-400" />
                <h4 className="text-slate-300">Memory Usage</h4>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">RAM Usage</span>
                  <span className="text-sm text-white">
                    {metrics.memory.used.toFixed(1)} / {metrics.memory.total} GB
                  </span>
                </div>
                <Progress value={metrics.memory.usage} className="h-2 bg-slate-700" />

                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Available</span>
                  <span className="text-sm text-green-400">
                    {(metrics.memory.total - metrics.memory.used).toFixed(1)} GB
                  </span>
                </div>

                <div className="text-xs text-slate-500">Type: DDR4 | Speed: 3200 MHz</div>
              </div>
            </div>
          </div>

          <Separator className="my-6 bg-slate-700" />

          <div className="grid md:grid-cols-2 gap-6">
            {/* Network Metrics */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Network className="w-4 h-4 text-purple-400" />
                <h4 className="text-slate-300">Network Status</h4>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Latency</span>
                  <span
                    className={`text-sm ${metrics.network.latency < 50 ? "text-green-400" : metrics.network.latency < 100 ? "text-yellow-400" : "text-red-400"}`}
                  >
                    {metrics.network.latency.toFixed(0)}ms
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Bandwidth</span>
                  <span className="text-sm text-white">{metrics.network.bandwidth.toFixed(0)} Mbps</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Status</span>
                  <Badge className={getStatusColor(metrics.network.status)}>{metrics.network.status}</Badge>
                </div>
              </div>
            </div>

            {/* AI Metrics */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <h4 className="text-slate-300">AI Engine Status</h4>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Neural Load</span>
                  <span className="text-sm text-white">{metrics.ai.load.toFixed(1)}%</span>
                </div>
                <Progress value={metrics.ai.load} className="h-2 bg-slate-700" />

                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Active Operations</span>
                  <span className="text-sm text-blue-400">{metrics.ai.operations}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Accuracy</span>
                  <span className="text-sm text-green-400">{metrics.ai.accuracy.toFixed(1)}%</span>
                </div>

                <div className="text-xs text-slate-500">Learning Rate: {metrics.ai.learningRate.toFixed(4)}</div>
              </div>
            </div>
          </div>

          <Separator className="my-6 bg-slate-700" />

          {/* Storage & Database */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-orange-400" />
              <h4 className="text-slate-300">Storage & Database</h4>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Used Storage</span>
                  <span className="text-sm text-white">{metrics.storage.used.toFixed(1)} GB</span>
                </div>
                <Progress value={metrics.storage.usage} className="h-2 bg-slate-700" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">DB Connections</span>
                  <span className="text-sm text-green-400">47/100</span>
                </div>
                <Progress value={47} className="h-2 bg-slate-700" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Query Performance</span>
                  <span className="text-sm text-blue-400">1.2ms avg</span>
                </div>
                <Progress value={85} className="h-2 bg-slate-700" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Alerts */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-red-400" />
            System Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {metrics.cpu.usage > 80 && (
              <div className="flex items-center gap-3 p-3 bg-yellow-900/20 rounded-lg border border-yellow-700/30">
                <AlertTriangle className="w-4 h-4 text-yellow-400" />
                <div>
                  <p className="text-sm text-yellow-400">High CPU Usage</p>
                  <p className="text-xs text-slate-400">
                    CPU usage is at {metrics.cpu.usage.toFixed(1)}%. Consider scaling resources.
                  </p>
                </div>
              </div>
            )}

            {metrics.memory.usage > 75 && (
              <div className="flex items-center gap-3 p-3 bg-orange-900/20 rounded-lg border border-orange-700/30">
                <AlertTriangle className="w-4 h-4 text-orange-400" />
                <div>
                  <p className="text-sm text-orange-400">Memory Usage High</p>
                  <p className="text-xs text-slate-400">
                    Memory usage is at {metrics.memory.usage.toFixed(1)}%. Monitor for potential issues.
                  </p>
                </div>
              </div>
            )}

            {metrics.network.latency > 80 && (
              <div className="flex items-center gap-3 p-3 bg-red-900/20 rounded-lg border border-red-700/30">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <div>
                  <p className="text-sm text-red-400">Network Latency High</p>
                  <p className="text-xs text-slate-400">
                    Network latency is {metrics.network.latency.toFixed(0)}ms. Check network connectivity.
                  </p>
                </div>
              </div>
            )}

            {metrics.cpu.usage <= 80 && metrics.memory.usage <= 75 && metrics.network.latency <= 80 && (
              <div className="flex items-center gap-3 p-3 bg-green-900/20 rounded-lg border border-green-700/30">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <div>
                  <p className="text-sm text-green-400">All Systems Operational</p>
                  <p className="text-xs text-slate-400">No alerts detected. System is running optimally.</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
