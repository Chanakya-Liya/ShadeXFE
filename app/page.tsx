import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TreePine, MapPin, Thermometer, Upload, Users, Target } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <TreePine className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-900">ShadeX</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Cool Cities with
            <span className="text-green-600 block">Smart Tree Planting</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            ShadeX uses AI to identify the optimal locations for tree planting, maximizing temperature reduction and
            environmental impact in urban areas. Combat urban heat with data-driven decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/analysis">
              <Button size="lg" className="text-lg px-8 py-3">
                Start Analysis
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button variant="outline" size="lg" className="text-lg px-8 py-3 bg-transparent">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How ShadeX Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform analyzes your location data to provide precise recommendations for maximum cooling
              impact.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Upload className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Upload & Input</CardTitle>
                <CardDescription>
                  Upload satellite images, drone photos, or enter GPS coordinates and addresses
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>AI Analysis</CardTitle>
                <CardDescription>
                  Our dual AI models analyze soil health and identify optimal planting locations
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <MapPin className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Visual Results</CardTitle>
                <CardDescription>
                  Get interactive maps with highlighted zones and temperature reduction estimates
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Who Benefits from ShadeX</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>Government Agencies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Make data-driven decisions for city-wide tree planting initiatives and urban planning projects.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <MapPin className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Urban Planners</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Integrate environmental considerations into development plans with precise location data.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Thermometer className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle>Homeowners</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Optimize your property's cooling potential and contribute to neighborhood environmental health.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Cool Your City?</h2>
          <p className="text-xl text-green-100 mb-8">
            Join the movement to combat urban heat with intelligent tree planting strategies.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              Start Your First Analysis
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TreePine className="h-6 w-6 text-green-400" />
              <span className="text-xl font-bold">ShadeX</span>
            </div>
            <p className="text-gray-400">© 2024 ShadeX. Cooling cities through smart technology.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
