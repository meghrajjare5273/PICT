"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  Box,
  Download,
  LineChart,
  Package,
  RefreshCcw,
  ShoppingCart,
  Store,
  TrendingDown,
  TrendingUp,
  Truck,
} from "lucide-react"

export default function ShopkeeperDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Sample data for the dashboard
  const dashboardData = {
    totalProducts: 48,
    totalOrders: 156,
    revenue: 24680,
    inventoryStatus: 65,
    recentActivity: [
      { id: 1, action: "New order placed", product: "Smartphone X", time: "10 minutes ago" },
      { id: 2, action: "Inventory updated", product: "Laptop Pro", time: "1 hour ago" },
      { id: 3, action: "Shipment received", product: "Various items", time: "3 hours ago" },
      { id: 4, action: "Price updated", product: "Tablet Mini", time: "Yesterday" },
    ],
    topProducts: [
      { id: 1, name: "Smartphone X", sales: 24, revenue: 12000 },
      { id: 2, name: "Laptop Pro", sales: 18, revenue: 9000 },
      { id: 3, name: "Tablet Mini", sales: 15, revenue: 3750 },
      { id: 4, name: "Wireless Earbuds", sales: 32, revenue: 2560 },
    ],
    monthlyTrends: {
      orders: [18, 22, 19, 24, 21, 26, 28, 32, 30, 35, 33, 38],
      revenue: [3600, 4400, 3800, 4800, 4200, 5200, 5600, 6400, 6000, 7000, 6600, 7600],
    },
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Shopkeeper Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your shop's performance.</p>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger value="inventory" className="flex items-center gap-2">
                <Box className="h-4 w-4" />
                <span>Inventory</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                <span>Orders</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <LineChart className="h-4 w-4" />
                <span>Analytics</span>
              </TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Download className="h-3.5 w-3.5" />
                <span>Export</span>
              </Button>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <RefreshCcw className="h-3.5 w-3.5" />
                <span>Refresh</span>
              </Button>
            </div>
          </div>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="slide-in-up">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {isLoading ? (
                      <div className="h-8 w-16 animate-pulse rounded bg-muted"></div>
                    ) : (
                      dashboardData.totalProducts
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">+5 from last month</p>
                </CardContent>
              </Card>
              <Card className="slide-in-up" style={{ "--delay": 1 } as React.CSSProperties}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {isLoading ? (
                      <div className="h-8 w-16 animate-pulse rounded bg-muted"></div>
                    ) : (
                      dashboardData.totalOrders
                    )}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                    <span>+12.5% from last month</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="slide-in-up" style={{ "--delay": 2 } as React.CSSProperties}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                  <LineChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {isLoading ? (
                      <div className="h-8 w-24 animate-pulse rounded bg-muted"></div>
                    ) : (
                      `$${dashboardData.revenue.toLocaleString()}`
                    )}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                    <span>+8.2% from last month</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4 slide-in-left">
                <CardHeader>
                  <CardTitle>Monthly Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="h-[200px] w-full animate-pulse rounded bg-muted"></div>
                  ) : (
                    <div className="h-[200px] w-full">
                      <div className="flex h-full items-end gap-2">
                        {dashboardData.monthlyTrends.orders.map((value, i) => (
                          <div key={i} className="relative flex h-full w-full flex-col justify-end">
                            <div
                              className="bg-primary rounded-t w-full transition-all duration-500"
                              style={{
                                height: `${(value / 38) * 100}%`,
                              }}
                            ></div>
                            <span className="mt-1 text-center text-xs text-muted-foreground">
                              {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              <Card className="col-span-3 slide-in-right">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest updates from your shop</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-4">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-4">
                          <div className="h-9 w-9 animate-pulse rounded-full bg-muted"></div>
                          <div className="space-y-2">
                            <div className="h-4 w-32 animate-pulse rounded bg-muted"></div>
                            <div className="h-3 w-24 animate-pulse rounded bg-muted"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {dashboardData.recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-start gap-4">
                          <div className="rounded-full bg-primary/10 p-2">
                            {activity.action.includes("order") ? (
                              <ShoppingCart className="h-4 w-4 text-primary" />
                            ) : activity.action.includes("Inventory") ? (
                              <Box className="h-4 w-4 text-primary" />
                            ) : activity.action.includes("Shipment") ? (
                              <Truck className="h-4 w-4 text-primary" />
                            ) : (
                              <Store className="h-4 w-4 text-primary" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{activity.action}</p>
                            <p className="text-xs text-muted-foreground">
                              {activity.product} • {activity.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-3 slide-in-left">
                <CardHeader>
                  <CardTitle>Top Selling Products</CardTitle>
                  <CardDescription>Based on sales volume and revenue</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-4">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="h-4 w-32 animate-pulse rounded bg-muted"></div>
                            <div className="h-4 w-16 animate-pulse rounded bg-muted"></div>
                          </div>
                          <div className="h-2 w-full animate-pulse rounded bg-muted"></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {dashboardData.topProducts.map((product) => (
                        <div key={product.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{product.name}</span>
                            <span className="text-sm text-muted-foreground">${product.revenue.toLocaleString()}</span>
                          </div>
                          <Progress value={(product.revenue / 12000) * 100} />
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
              <Card className="col-span-4 slide-in-right">
                <CardHeader>
                  <CardTitle>Inventory Status</CardTitle>
                  <CardDescription>Current stock levels across all products</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-4">
                      <div className="h-4 w-full animate-pulse rounded bg-muted"></div>
                      <div className="h-32 w-full animate-pulse rounded bg-muted"></div>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex w-full items-center justify-between">
                          <span className="text-sm font-medium">Overall Stock Level</span>
                          <span className="text-sm font-medium">{dashboardData.inventoryStatus}%</span>
                        </div>
                        <Progress value={dashboardData.inventoryStatus} className="w-full" />
                        <div className="flex w-full justify-between text-xs text-muted-foreground">
                          <span>Low Stock</span>
                          <span>Optimal</span>
                          <span>Overstocked</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col items-center gap-2 rounded-lg border p-4">
                          <div className="flex items-center gap-2">
                            <TrendingDown className="h-5 w-5 text-destructive" />
                            <span className="text-sm font-medium">Low Stock Items</span>
                          </div>
                          <span className="text-2xl font-bold">8</span>
                          <span className="text-xs text-muted-foreground">Requires attention</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 rounded-lg border p-4">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-green-500" />
                            <span className="text-sm font-medium">Healthy Stock</span>
                          </div>
                          <span className="text-2xl font-bold">40</span>
                          <span className="text-xs text-muted-foreground">No action needed</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Inventory Management</CardTitle>
                <CardDescription>Monitor and manage your product inventory</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Box className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Inventory Tab Content</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    This tab would contain detailed inventory management features
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Order Management</CardTitle>
                <CardDescription>Track and manage your orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Orders Tab Content</h3>
                  <p className="mt-2 text-sm text-muted-foreground">This tab would contain order management features</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>Detailed analytics and reporting</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <LineChart className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Analytics Tab Content</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    This tab would contain detailed analytics and reporting features
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

