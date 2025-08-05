"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Bell, X, CheckCircle, AlertTriangle, Info, Bot } from "lucide-react"

interface Notification {
  id: string
  type: "success" | "warning" | "info" | "ai"
  title: string
  message: string
  timestamp: Date
  read: boolean
}

interface NotificationSystemProps {
  className?: string
}

export function NotificationSystem({ className }: NotificationSystemProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "ai",
      title: "AI Learning Update",
      message: "Neural network has improved pattern recognition by 2.3%",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
    },
    {
      id: "2",
      type: "success",
      title: "Transfer Completed",
      message: "Member transfer AI-7F2A9C completed successfully with 98.7% efficiency",
      timestamp: new Date(Date.now() - 12 * 60 * 1000),
      read: false,
    },
    {
      id: "3",
      type: "warning",
      title: "High Processing Load",
      message: "AI processing load reached 85%. Consider scaling resources.",
      timestamp: new Date(Date.now() - 25 * 60 * 1000),
      read: true,
    },
    {
      id: "4",
      type: "info",
      title: "System Optimization",
      message: "Scheduled maintenance completed. System running optimally.",
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      read: true,
    },
  ])

  const [isOpen, setIsOpen] = useState(false)

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const shouldAddNotification = Math.random() > 0.7 // 30% chance
      if (shouldAddNotification) {
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: ["success", "info", "ai"][Math.floor(Math.random() * 3)] as "success" | "info" | "ai",
          title: ["AI Processing", "Transfer Update", "Neural Activity"][Math.floor(Math.random() * 3)],
          message: [
            "New group compatibility analysis completed",
            "Transfer efficiency improved to 99.1%",
            "Neural network detected optimal transfer timing",
            "AI confidence level increased to 94.8%",
          ][Math.floor(Math.random() * 4)],
          timestamp: new Date(),
          read: false,
        }

        setNotifications((prev) => [newNotification, ...prev.slice(0, 9)])
      }
    }, 15000) // Every 15 seconds

    return () => clearInterval(interval)
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />
      case "info":
        return <Info className="w-4 h-4 text-blue-400" />
      case "ai":
        return <Bot className="w-4 h-4 text-purple-400" />
    }
  }

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    const hours = Math.floor(diffInMinutes / 60)
    if (hours < 24) return `${hours}h ago`
    return `${Math.floor(hours / 24)}d ago`
  }

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="text-slate-400 hover:text-white relative"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 bg-red-500 text-white text-xs flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-12 w-80 z-50">
          <Card className="bg-slate-800/95 border-slate-700 backdrop-blur-sm shadow-xl">
            <div className="p-4 border-b border-slate-700">
              <div className="flex items-center justify-between">
                <h3 className="text-white">AI Notifications</h3>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={markAllAsRead}
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      Mark all read
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            <CardContent className="p-0 max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-slate-400">
                  <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No notifications</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 hover:bg-slate-700/30 transition-colors cursor-pointer ${
                        !notification.read ? "bg-slate-700/20" : ""
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">{getIcon(notification.type)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className={`text-sm ${!notification.read ? "text-white" : "text-slate-300"}`}>
                              {notification.title}
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                removeNotification(notification.id)
                              }}
                              className="text-slate-500 hover:text-slate-300 p-1 h-auto"
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                          <p className="text-xs text-slate-400 mt-1 line-clamp-2">{notification.message}</p>
                          <p className="text-xs text-slate-500 mt-1">{getTimeAgo(notification.timestamp)}</p>
                        </div>
                        {!notification.read && <div className="w-2 h-2 bg-blue-400 rounded-full mt-2" />}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
