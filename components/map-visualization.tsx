"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Thermometer, Leaf, Droplets } from "lucide-react"

interface MapVisualizationProps {
  results: any
}

export default function MapVisualization({ results }: MapVisualizationProps) {
  if (!results) return null

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Map Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>Optimal Planting Locations</CardTitle>
          <CardDescription>Interactive map showing recommended tree planting zones</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Simulated Map Interface */}
          <div className="bg-green-50 rounded-lg p-8 text-center border-2 border-dashed border-green-200">
            <MapPin className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Interactive Map View</h3>
            <p className="text-sm text-gray-600 mb-4">
              In a real implementation, this would show a Google Maps interface with:
            </p>
            <div className="space-y-2 text-sm text-left max-w-md mx-auto">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>High-priority planting zones (95% score)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>Medium-priority zones (88% score)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span>Lower-priority zones (82% score)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Unsuitable areas (roads, buildings)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-green-600" />
              Soil Health Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Overall Health:</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {results.soilHealth.overall}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">pH Level:</span>
              <span className="text-sm">{results.soilHealth.ph}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Nutrients:</span>
              <span className="text-sm">{results.soilHealth.nutrients}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Drainage:</span>
              <span className="text-sm">{results.soilHealth.drainage}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="h-5 w-5 text-blue-600" />
              Temperature Impact Zones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {results.optimalZones.map((zone: any, index: number) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Zone {index + 1}</p>
                    <p className="text-xs text-gray-600">Score: {zone.score}%</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-blue-600">-{zone.tempReduction}°C</p>
                    <p className="text-xs text-gray-600">cooling</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-purple-600" />
              Environmental Benefits
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">Air quality improvement:</span>
              <span className="font-medium">High</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Stormwater management:</span>
              <span className="font-medium">Enhanced</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Wildlife habitat:</span>
              <span className="font-medium">Supported</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Property value increase:</span>
              <span className="font-medium">5-15%</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
