"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Progress } from "./ui/progress"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { Brain, Zap, TrendingUp, Activity, Target, BookOpen, Cpu, Database, RefreshCw, Play, Pause } from "lucide-react"

interface TrainingMetrics {
  epoch: number
  totalEpochs: number
  accuracy: number
  loss: number
  learningRate: number
  validationAccuracy: number
  processingSpeed: number
  dataProcessed: number
  totalData: number
}

interface ModelInfo {
  name: string
  version: string
  architecture: string
  parameters: number
  lastTrained: string
  status: "training" | "idle" | "evaluating" | "deployed"
}

export function AITrainingDashboard() {
  const [trainingMetrics, setTrainingMetrics] = useState<TrainingMetrics>({
    epoch: 147,
    totalEpochs: 200,
    accuracy: 98.7,
    loss: 0.032,
    learningRate: 0.001,
    validationAccuracy: 97.8,
    processingSpeed: 1250,
    dataProcessed: 245670,
    totalData: 300000,
  })

  const [modelInfo, setModelInfo] = useState<ModelInfo>({
    name: "TelegramAI-v4",
    version: "4.2.1",
    architecture: "Transformer + CNN",
    parameters: 175000000,
    lastTrained: "2024-01-15 20:30:45",
    status: "training",
  })

  const [trainingHistory, setTrainingHistory] = useState([
    { epoch: 140, accuracy: 98.1, loss: 0.045, validation: 97.2 },
    { epoch: 141, accuracy: 98.3, loss: 0.041, validation: 97.4 },
    { epoch: 142, accuracy: 98.4, loss: 0.039, validation: 97.6 },
    { epoch: 143, accuracy: 98.5, loss: 0.037, validation: 97.7 },
    { epoch: 144, accuracy: 98.6, loss: 0.035, validation: 97.7 },
    { epoch: 145, accuracy: 98.6, loss: 0.034, validation: 97.8 },
    { epoch: 146, accuracy: 98.7, loss: 0.033, validation: 97.8 },
    { epoch: 147, accuracy: 98.7, loss: 0.032, validation: 97.8 },
  ])

  const [isTraining, setIsTraining] = useState(true)

  // Simulate training progress
  useEffect(() => {
    if (!isTraining) return

    const interval = setInterval(() => {
      setTrainingMetrics((prev) => {
        const newEpoch = prev.epoch + 1
        const progress = newEpoch / prev.totalEpochs

        return {
          ...prev,
          epoch: Math.min(newEpoch, prev.totalEpochs),
          accuracy: Math.min(99.5, prev.accuracy + (Math.random() - 0.3) * 0.1),
          loss: Math.max(0.001, prev.loss - (Math.random() - 0.3) * 0.002),
          validationAccuracy: Math.min(99.2, prev.validationAccuracy + (Math.random() - 0.4) * 0.1),
          processingSpeed: 1200 + Math.random() * 100,
          dataProcessed: Math.min(prev.totalData, prev.dataProcessed + Math.random() * 1000),
        }
      })

      // Update training history
      setTrainingHistory((prev) => {
        const latest = prev[prev.length - 1]
        const newPoint = {
          epoch: latest.epoch + 1,
          accuracy: Math.min(99.5, latest.accuracy + (Math.random() - 0.3) * 0.1),
          loss: Math.max(0.001, latest.loss - (Math.random() - 0.3) * 0.002),
          validation: Math.min(99.2, latest.validation + (Math.random() - 0.4) * 0.1),
        }

        return [...prev.slice(-20), newPoint] // Keep last 20 points
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [isTraining])

  const getStatusColor = (status: ModelInfo["status"]) => {
    switch (status) {
      case "training":
        return "bg-blue-900/30 text-blue-400 border-blue-400/30"
      case "idle":
        return "bg-gray-900/30 text-gray-400 border-gray-400/30"
      case "evaluating":
        return "bg-purple-900/30 text-purple-400 border-purple-400/30"
      case "deployed":
        return "bg-green-900/30 text-green-400 border-green-400/30"
    }
  }

  const toggleTraining = () => {
    setIsTraining(!isTraining)
    setModelInfo((prev) => ({
      ...prev,
      status: isTraining ? "idle" : "training",
    }))
  }

  return (
    <div className="space-y-6">
      {/* Model Overview */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-400" />
              <CardTitle className="text-white">AI Model Training</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getStatusColor(modelInfo.status)}>
                {modelInfo.status === "training" && <Activity className="w-3 h-3 mr-1 animate-pulse" />}
                {modelInfo.status}
              </Badge>
              <Badge className="bg-purple-900/30 text-purple-400 border-purple-400/30">v{modelInfo.version}</Badge>
            </div>
          </div>
          <CardDescription className="text-slate-400">
            Neural network training and optimization for Telegram member analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Training Progress</span>
                  <span className="text-sm text-white">
                    Epoch {trainingMetrics.epoch}/{trainingMetrics.totalEpochs}
                  </span>
                </div>
                <Progress
                  value={(trainingMetrics.epoch / trainingMetrics.totalEpochs) * 100}
                  className="h-3 bg-slate-700"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Data Processing</span>
                  <span className="text-sm text-white">
                    {((trainingMetrics.dataProcessed / trainingMetrics.totalData) * 100).toFixed(1)}%
                  </span>
                </div>
                <Progress
                  value={(trainingMetrics.dataProcessed / trainingMetrics.totalData) * 100}
                  className="h-3 bg-slate-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="space-y-1">
                  <p className="text-xs text-slate-400">Current Accuracy</p>
                  <p className="text-lg text-green-400">{trainingMetrics.accuracy.toFixed(2)}%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-400">Validation Acc.</p>
                  <p className="text-lg text-blue-400">{trainingMetrics.validationAccuracy.toFixed(2)}%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-400">Loss</p>
                  <p className="text-lg text-red-400">{trainingMetrics.loss.toFixed(4)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-400">Learning Rate</p>
                  <p className="text-lg text-purple-400">{trainingMetrics.learningRate.toFixed(4)}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-700/30 p-4 rounded-lg border border-slate-600">
                <h4 className="text-slate-300 text-sm mb-3 flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  Model Architecture
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Model Name:</span>
                    <span className="text-white">{modelInfo.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Architecture:</span>
                    <span className="text-white">{modelInfo.architecture}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Parameters:</span>
                    <span className="text-white">{(modelInfo.parameters / 1000000).toFixed(0)}M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Processing Speed:</span>
                    <span className="text-green-400">{trainingMetrics.processingSpeed.toFixed(0)} samples/sec</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={toggleTraining}
                  className={`flex-1 ${isTraining ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
                >
                  {isTraining ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Pause Training
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Resume Training
                    </>
                  )}
                </Button>
                <Button variant="outline" className="border-slate-600 text-slate-300 bg-transparent">
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Training Progress Chart */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            Training Progress
          </CardTitle>
          <CardDescription className="text-slate-400">
            Real-time accuracy and loss metrics during neural network training
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trainingHistory}>
              <defs>
                <linearGradient id="accuracyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="validationGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="epoch" stroke="#9ca3af" tick={{ fontSize: 12 }} />
              <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} domain={[95, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #475569",
                  borderRadius: "8px",
                  color: "#f1f5f9",
                }}
              />
              <Line
                type="monotone"
                dataKey="accuracy"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                name="Training Accuracy"
              />
              <Line
                type="monotone"
                dataKey="validation"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                name="Validation Accuracy"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Loss Function Chart */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-red-400" />
            Loss Function
          </CardTitle>
          <CardDescription className="text-slate-400">Training loss optimization over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={trainingHistory}>
              <defs>
                <linearGradient id="lossGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="epoch" stroke="#9ca3af" tick={{ fontSize: 12 }} />
              <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} domain={[0, 0.1]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #475569",
                  borderRadius: "8px",
                  color: "#f1f5f9",
                }}
              />
              <Area
                type="monotone"
                dataKey="loss"
                stroke="#ef4444"
                fillOpacity={1}
                fill="url(#lossGradient)"
                name="Training Loss"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Training Insights */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-slate-300 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-orange-400" />
              Learning Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-green-900/20 rounded-lg border-l-4 border-green-400">
              <p className="text-green-200 text-sm">Convergence Stable</p>
              <p className="text-xs text-slate-400">Loss decreasing consistently</p>
            </div>
            <div className="p-3 bg-blue-900/20 rounded-lg border-l-4 border-blue-400">
              <p className="text-blue-200 text-sm">Pattern Recognition</p>
              <p className="text-xs text-slate-400">Identifying new user behaviors</p>
            </div>
            <div className="p-3 bg-purple-900/20 rounded-lg border-l-4 border-purple-400">
              <p className="text-purple-200 text-sm">Feature Learning</p>
              <p className="text-xs text-slate-400">Extracting complex patterns</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-slate-300 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              Resource Usage
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">GPU Usage</span>
                <span className="text-xs text-white">89%</span>
              </div>
              <Progress value={89} className="h-1 bg-slate-700" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">VRAM</span>
                <span className="text-xs text-white">15.2 / 24 GB</span>
              </div>
              <Progress value={63} className="h-1 bg-slate-700" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">Compute</span>
                <span className="text-xs text-white">2.4 TFLOPS</span>
              </div>
              <Progress value={76} className="h-1 bg-slate-700" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-slate-300 flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400">Inference Speed:</span>
              <span className="text-xs text-green-400">12ms avg</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400">Throughput:</span>
              <span className="text-xs text-blue-400">1.2K ops/sec</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400">Memory Efficiency:</span>
              <span className="text-xs text-purple-400">94.3%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400">Model Size:</span>
              <span className="text-xs text-orange-400">2.1 GB</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
