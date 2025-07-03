"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, MapPin, Loader2, TreePine, Thermometer, Leaf } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Navigation from "@/components/navigation"
import MapVisualization from "@/components/map-visualization"

export default function AnalysisPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [locationInput, setLocationInput] = useState("")
  const [analysisResults, setAnalysisResults] = useState<any>(null)
  const { toast } = useToast()

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      toast({
        title: "File uploaded",
        description: `${file.name} has been uploaded successfully.`,
      })
    }
  }

  const handleAnalysis = async () => {
    if (!uploadedFile && !locationInput) {
      toast({
        title: "Input required",
        description: "Please upload an image or enter a location.",
        variant: "destructive",
      })
      return
    }

    setIsAnalyzing(true)

    // Simulate AI analysis
    setTimeout(() => {
      const mockResults = {
        location: locationInput || uploadedFile?.name || "Uploaded Image",
        optimalZones: [
          { lat: 40.7128, lng: -74.006, score: 95, tempReduction: 3.2 },
          { lat: 40.713, lng: -74.0058, score: 88, tempReduction: 2.8 },
          { lat: 40.7125, lng: -74.0062, score: 82, tempReduction: 2.4 },
        ],
        soilHealth: {
          overall: "Good",
          ph: 6.8,
          nutrients: "Adequate",
          drainage: "Well-drained",
        },
        estimatedImpact: {
          totalTrees: 15,
          avgTempReduction: 2.8,
          co2Absorption: 450,
        },
      }

      setAnalysisResults(mockResults)
      setAnalysisComplete(true)
      setIsAnalyzing(false)

      // Save to history
      const existingHistory = JSON.parse(localStorage.getItem("shadex-history") || "[]")
      const newAnalysis = {
        id: Date.now(),
        date: new Date().toISOString(),
        location: mockResults.location,
        results: mockResults,
      }
      localStorage.setItem("shadex-history", JSON.stringify([newAnalysis, ...existingHistory]))

      toast({
        title: "Analysis complete!",
        description: "Your optimal tree planting locations have been identified.",
      })
    }, 3000)
  }

  const resetAnalysis = () => {
    setAnalysisComplete(false)
    setUploadedFile(null)
    setLocationInput("")
    setAnalysisResults(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tree Planting Analysis</h1>
          <p className="text-gray-600">
            Upload images or enter location data to discover optimal tree planting locations
          </p>
        </div>

        {!analysisComplete ? (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <Tabs defaultValue="upload" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upload">Upload Image</TabsTrigger>
                  <TabsTrigger value="location">Enter Location</TabsTrigger>
                </TabsList>

                <TabsContent value="upload" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Upload className="h-5 w-5" />
                        Upload Satellite or Drone Image
                      </CardTitle>
                      <CardDescription>Upload high-resolution images for detailed analysis</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600">Drag and drop your image here, or click to browse</p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                            id="file-upload"
                          />
                          <Label htmlFor="file-upload">
                            <Button variant="outline" className="cursor-pointer bg-transparent">
                              Choose File
                            </Button>
                          </Label>
                        </div>
                        {uploadedFile && (
                          <div className="mt-4 p-3 bg-green-50 rounded-lg">
                            <p className="text-sm text-green-700 font-medium">✓ {uploadedFile.name}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="location" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Location Input
                      </CardTitle>
                      <CardDescription>Enter GPS coordinates, address, or map URL</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          placeholder="Enter address, GPS coordinates, or map URL"
                          value={locationInput}
                          onChange={(e) => setLocationInput(e.target.value)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <Button onClick={handleAnalysis} className="w-full" size="lg" disabled={isAnalyzing}>
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Start Analysis"
                )}
              </Button>
            </div>

            {/* Info Section */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>How It Works</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Leaf className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Soil Health Analysis</h4>
                      <p className="text-sm text-gray-600">
                        AI analyzes soil composition, pH levels, and drainage patterns
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <MapPin className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Location Optimization</h4>
                      <p className="text-sm text-gray-600">
                        Identifies optimal planting zones while avoiding obstacles
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Thermometer className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Impact Prediction</h4>
                      <p className="text-sm text-gray-600">
                        Estimates temperature reduction and environmental benefits
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {isAnalyzing && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center space-y-4">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto text-green-600" />
                      <div>
                        <h3 className="font-medium">AI Analysis in Progress</h3>
                        <p className="text-sm text-gray-600">Processing your data with our advanced AI models...</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        ) : (
          /* Results Section */
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Analysis Results</h2>
              <Button onClick={resetAnalysis} variant="outline">
                New Analysis
              </Button>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TreePine className="h-5 w-5 text-green-600" />
                    Recommended Trees
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {analysisResults?.estimatedImpact.totalTrees}
                  </div>
                  <p className="text-sm text-gray-600">Optimal tree locations identified</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Thermometer className="h-5 w-5 text-blue-600" />
                    Temperature Reduction
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {analysisResults?.estimatedImpact.avgTempReduction}°C
                  </div>
                  <p className="text-sm text-gray-600">Average cooling effect</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-purple-600" />
                    CO₂ Absorption
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {analysisResults?.estimatedImpact.co2Absorption}kg
                  </div>
                  <p className="text-sm text-gray-600">Annual CO₂ absorption</p>
                </CardContent>
              </Card>
            </div>

            <MapVisualization results={analysisResults} />
          </div>
        )}
      </div>
    </div>
  )
}
