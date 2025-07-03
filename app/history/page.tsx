"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, TreePine, Thermometer, Eye } from "lucide-react"
import Navigation from "@/components/navigation"
import Link from "next/link"

interface HistoryItem {
  id: number
  date: string
  location: string
  results: {
    estimatedImpact: {
      totalTrees: number
      avgTempReduction: number
      co2Absorption: number
    }
    soilHealth: {
      overall: string
    }
  }
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([])

  useEffect(() => {
    const savedHistory = localStorage.getItem("shadex-history")
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory))
    }
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getSoilHealthColor = (health: string) => {
    switch (health.toLowerCase()) {
      case "excellent":
        return "bg-green-100 text-green-800"
      case "good":
        return "bg-blue-100 text-blue-800"
      case "fair":
        return "bg-yellow-100 text-yellow-800"
      case "poor":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (history.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analysis History</h1>
            <p className="text-gray-600">View and manage your previous tree planting analyses</p>
          </div>

          <Card className="text-center py-12">
            <CardContent>
              <TreePine className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No analyses yet</h3>
              <p className="text-gray-600 mb-6">Start your first analysis to see your results here</p>
              <Link href="/analysis">
                <Button>Start Analysis</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analysis History</h1>
          <p className="text-gray-600">View and manage your previous tree planting analyses</p>
        </div>

        <div className="grid gap-6">
          {history.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-green-600" />
                      {item.location}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(item.date)}
                    </CardDescription>
                  </div>
                  <Badge className={getSoilHealthColor(item.results.soilHealth.overall)}>
                    {item.results.soilHealth.overall} Soil
                  </Badge>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
                      <TreePine className="h-4 w-4" />
                      <span className="text-2xl font-bold">{item.results.estimatedImpact.totalTrees}</span>
                    </div>
                    <p className="text-xs text-gray-600">Trees</p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
                      <Thermometer className="h-4 w-4" />
                      <span className="text-2xl font-bold">{item.results.estimatedImpact.avgTempReduction}°C</span>
                    </div>
                    <p className="text-xs text-gray-600">Cooling</p>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-1">
                      {item.results.estimatedImpact.co2Absorption}kg
                    </div>
                    <p className="text-xs text-gray-600">CO₂/year</p>
                  </div>

                  <div className="flex items-center justify-center">
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/analysis">
            <Button>
              <TreePine className="h-4 w-4 mr-2" />
              New Analysis
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
