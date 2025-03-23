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
  Users,
} from "lucide-react"

export default function DealerDashboard() {
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
    totalShopkeepers: 24,
    totalProducts: 156,
    totalOrders: 1289,
    revenue: 128945,
    inventoryStatus: 78,
    recentActivity: [
      { id: 1, action: "New order received", shop: "Electronics Hub", time: "10 minutes ago" },
      { id: 2, action: "Inventory updated", shop: "Tech World", time: "1 hour ago" },
      { id: 3, action: "Shipment delivered", shop: "Mobile Store", time: "3 hours ago" },
      { id: 4, action: "New shopkeeper registered", shop: "Gadget Zone", time: "Yesterday" },
    ],
    topShops: [
      { id: 1, name: "Electronics Hub", orders: 156, revenue: 23450 },
      { id: 2, name: "Tech World", orders: 132, revenue: 19870 },
      { id: 3, name: "Mobile Store", orders: 98, revenue: 15640 },
      { id: 4, name: "Gadget Zone", orders: 87, revenue: 12980 },
    ],
    monthlyTrends: {
      orders: [65, 72, 86, 91, 85, 98, 105, 112, 108, 120, 115, 125],
      revenue: [12500, 13800, 15200, 16500, 15800, 17200, 18500, 19800, 19200, 21500, 20800, 22500],
    },
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Dealer Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your supply chain operations.</p>
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
              <TabsTrigger value="shopkeepers" className="flex items-center gap-2">
                <Store className="h-4 w-4" />
                <span>Shopkeepers</span>
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
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="slide-in-up">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Shopkeepers</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {isLoading ? (
                      <div className="h-8 w-16 animate-pulse rounded bg-muted"></div>
                    ) : (
                      dashboardData.totalShopkeepers
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">+2 from last month</p>
                </CardContent>
              </Card>
              <Card className="slide-in-up" style={{ "--delay": 1 } as React.CSSProperties}>
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
                  <p className="text-xs text-muted-foreground">+12 from last month</p>
                </CardContent>
              </Card>
              <Card className="slide-in-up" style={{ "--delay": 2 } as React.CSSProperties}>
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
                    <span>+8.2% from last month</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="slide-in-up" style={{ "--delay": 3 } as React.CSSProperties}>
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
                    <span>+12.5% from last month</span>
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
                                height: `${(value / 125) * 100}%`,
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
                  <CardDescription>Latest updates from your network</CardDescription>
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
                              {activity.shop} • {activity.time}
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
                  <CardTitle>Top Performing Shops</CardTitle>
                  <CardDescription>Based on order volume and revenue</CardDescription>
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
                      {dashboardData.topShops.map((shop) => (
                        <div key={shop.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{shop.name}</span>
                            <span className="text-sm text-muted-foreground">${shop.revenue.toLocaleString()}</span>
                          </div>
                          <Progress value={(shop.revenue / 23450) * 100} />
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
                          <span className="text-2xl font-bold">12</span>
                          <span className="text-xs text-muted-foreground">Requires attention</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 rounded-lg border p-4">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-green-500" />
                            <span className="text-sm font-medium">Healthy Stock</span>
                          </div>
                          <span className="text-2xl font-bold">144</span>
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

          <TabsContent value="shopkeepers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Shopkeeper Management</CardTitle>
                <CardDescription>Manage your shopkeeper network</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Store className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Shopkeepers Tab Content</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    This tab would contain shopkeeper management features
                  </p>
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

