"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, BarChart3, Box, FileUp, Loader2, RefreshCcw, Store, TrendingUp } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function Inventory() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [shops, setShops] = useState([
    { id: 1, name: "Electronics Hub", file: null, prediction: 0 },
    { id: 2, name: "Tech World", file: null, prediction: 0 },
    { id: 3, name: "Mobile Store", file: null, prediction: 0 },
    { id: 4, name: "Gadget Zone", file: null, prediction: 0 },
    { id: 5, name: "Digital Shop", file: null, prediction: 0 },
    { id: 6, name: "Smart Store", file: null, prediction: 0 },
  ])
  const [activeTab, setActiveTab] = useState("upload")
  const [chartData, setChartData] = useState({
    labels: shops.map((shop) => shop.name),
    datasets: [
      {
        label: "Predicted Sales",
        data: shops.map((shop) => shop.prediction),
      },
    ],
  })

  useEffect(() => {
    // Update chart data when shop predictions change
    setChartData({
      labels: shops.map((shop) => shop.name),
      datasets: [
        {
          label: "Predicted Sales",
          data: shops.map((shop) => shop.prediction),
        },
      ],
    })
  }, [shops])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, shopId: number) => {
    const file = e.target.files?.[0]
    if (!file) return

    setShops((prevShops) => prevShops.map((shop) => (shop.id === shopId ? { ...shop, file } : shop)))
  }

  const handlePrediction = async (shopId: number) => {
    setIsLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, you would make an API call here
      // const formData = new FormData();
      // formData.append("file", shops.find(shop => shop.id === shopId)?.file);
      // const response = await fetch("http://localhost:8000/inventory/predict", {
      //   method: "POST",
      //   body: formData,
      // });
      // if (!response.ok) throw new Error("Prediction failed");
      // const data = await response.json();

      // Generate random prediction value for demo
      const randomPrediction = Math.floor(Math.random() * 1000) + 500

      setShops((prevShops) =>
        prevShops.map((shop) => (shop.id === shopId ? { ...shop, prediction: randomPrediction } : shop)),
      )

      setActiveTab("results")
    } catch (err) {
      setError("Failed to predict sales. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePredictAll = async () => {
    setIsLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Generate random prediction values for all shops
      setShops((prevShops) =>
        prevShops.map((shop) => ({
          ...shop,
          prediction: Math.floor(Math.random() * 1000) + 500,
        })),
      )

      setActiveTab("results")
    } catch (err) {
      setError("Failed to predict sales. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
          <p className="text-muted-foreground">
            Upload sales data and get AI-powered demand forecasts for your inventory.
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="upload" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="upload" className="flex items-center gap-2">
                <FileUp className="h-4 w-4" />
                <span>Upload Data</span>
              </TabsTrigger>
              <TabsTrigger value="results" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                <span>Prediction Results</span>
              </TabsTrigger>
            </TabsList>
            <Button variant="outline" size="sm" className="h-8 gap-1" onClick={() => setActiveTab("upload")}>
              <RefreshCcw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </Button>
          </div>

          <TabsContent value="upload" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {shops.map((shop, index) => (
                <Card
                  key={shop.id}
                  className={`slide-in-up transition-all duration-500 delay-[calc(100ms*var(--delay))]`}
                  style={{ "--delay": index } as React.CSSProperties}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Store className="h-5 w-5" />
                      <span>{shop.name}</span>
                    </CardTitle>
                    <CardDescription>Upload sales data for prediction</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`file-${shop.id}`}>Upload CSV File</Label>
                      <Input
                        id={`file-${shop.id}`}
                        type="file"
                        accept=".csv"
                        onChange={(e) => handleFileChange(e, shop.id)}
                      />
                      <p className="text-xs text-muted-foreground">CSV format with sales history data</p>
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => handlePrediction(shop.id)}
                      disabled={!shop.file || isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <TrendingUp className="mr-2 h-4 w-4" />
                          Predict Demand
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <Button size="lg" onClick={handlePredictAll} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing All Shops...
                  </>
                ) : (
                  <>
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Generate Predictions for All Shops
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="results" className="space-y-4">
            <Card className="slide-in-up">
              <CardHeader>
                <CardTitle>Prediction Results</CardTitle>
                <CardDescription>AI-generated demand forecasts for your shops</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <div className="flex h-full items-end gap-6 pt-10">
                    {shops.map((shop, index) => (
                      <div key={shop.id} className="relative flex h-full w-full flex-col justify-end">
                        <div
                          className="bg-primary rounded-t w-full transition-all duration-1000"
                          style={{
                            height: `${(shop.prediction / 1500) * 100}%`,
                          }}
                        ></div>
                        <div className="absolute top-0 left-0 right-0 text-center">
                          <span className="text-lg font-bold">{shop.prediction}</span>
                        </div>
                        <div className="mt-2 text-center">
                          <span className="text-sm font-medium">{shop.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Recommendations</h3>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-5 w-5 text-green-500" />
                        <span className="font-medium">Inventory Optimization</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Based on the predictions, we recommend increasing stock levels for Electronics Hub and Tech
                        World by 15% to meet the forecasted demand.
                      </p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Box className="h-5 w-5 text-primary" />
                        <span className="font-medium">Stock Reallocation</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Consider reallocating inventory from Digital Shop to Mobile Store to balance stock levels
                        according to predicted demand.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

