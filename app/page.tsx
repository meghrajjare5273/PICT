"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowRight,
  BarChart3,
  Box,
  Brain,
  ChevronRight,
  LineChart,
  Rocket,
  Store,
  Truck,
  TrendingUp,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function Home() {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    features: false,
    roles: false,
    cta: false,
  })

  const heroRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const rolesRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === heroRef.current) {
            setIsVisible((prev) => ({ ...prev, hero: entry.isIntersecting }))
          } else if (entry.target === featuresRef.current) {
            setIsVisible((prev) => ({ ...prev, features: entry.isIntersecting }))
          } else if (entry.target === rolesRef.current) {
            setIsVisible((prev) => ({ ...prev, roles: entry.isIntersecting }))
          } else if (entry.target === ctaRef.current) {
            setIsVisible((prev) => ({ ...prev, cta: entry.isIntersecting }))
          }
        })
      },
      { threshold: 0.1 },
    )

    if (heroRef.current) observer.observe(heroRef.current)
    if (featuresRef.current) observer.observe(featuresRef.current)
    if (rolesRef.current) observer.observe(rolesRef.current)
    if (ctaRef.current) observer.observe(ctaRef.current)

    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current)
      if (featuresRef.current) observer.unobserve(featuresRef.current)
      if (rolesRef.current) observer.unobserve(rolesRef.current)
      if (ctaRef.current) observer.unobserve(ctaRef.current)
    }
  }, [])

  // Features data
  const features = [
    {
      icon: <Brain className="h-10 w-10 text-primary" />,
      title: "AI-Powered Forecasting",
      description: "Leverage machine learning algorithms to predict demand and optimize inventory levels.",
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-primary" />,
      title: "Real-time Analytics",
      description: "Monitor sales trends and inventory performance with interactive dashboards.",
    },
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: "Automated Ordering",
      description: "Set up automatic reordering based on inventory thresholds and demand predictions.",
    },
    {
      icon: <LineChart className="h-10 w-10 text-primary" />,
      title: "Demand Prediction",
      description: "Accurately forecast customer demand to optimize stock levels and reduce waste.",
    },
  ]

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section ref={heroRef} className="w-full py-12 md:py-24 lg:py-32 xl:py-36 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div
              className={cn(
                "flex flex-col justify-center space-y-4 opacity-0",
                isVisible.hero && "slide-in-left opacity-100",
              )}
            >
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  <span className="gradient-text">AI-Powered</span> Supply Chain Management
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Streamline your supply chain operations with intelligent inventory management and demand forecasting.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/dealer/signup">
                  <Button size="lg" className="w-full">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline" className="w-full">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div
              className={cn(
                "flex items-center justify-center opacity-0",
                isVisible.hero && "slide-in-right opacity-100",
              )}
            >
              <div className="relative w-full aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 p-1">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-4 p-4 w-full h-full">
                    <div className="flex flex-col gap-4">
                      <div className="h-1/2 rounded-lg bg-primary/10 flex items-center justify-center">
                        <BarChart3 className="h-12 w-12 text-primary/60" />
                      </div>
                      <div className="h-1/2 rounded-lg bg-secondary/10 flex items-center justify-center">
                        <Truck className="h-12 w-12 text-primary/60" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="h-1/2 rounded-lg bg-secondary/10 flex items-center justify-center">
                        <Store className="h-12 w-12 text-primary/60" />
                      </div>
                      <div className="h-1/2 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Box className="h-12 w-12 text-primary/60" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" ref={featuresRef} className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div
            className={cn(
              "flex flex-col items-center justify-center space-y-4 text-center opacity-0",
              isVisible.features && "slide-in-up opacity-100",
            )}
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Powerful Features</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                SupplyConnect offers cutting-edge tools to optimize your supply chain operations
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={cn(
                  "opacity-0 transition-all duration-500 delay-[calc(100ms*var(--delay))]",
                  isVisible.features && "slide-in-up opacity-100",
                )}
                style={{ "--delay": index } as React.CSSProperties}
              >
                <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                  <div className="p-2 rounded-full bg-primary/10 mb-2">{feature.icon}</div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section ref={rolesRef} className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div
            className={cn(
              "flex flex-col items-center justify-center space-y-4 text-center opacity-0",
              isVisible.roles && "slide-in-up opacity-100",
            )}
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Choose Your Role</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                SupplyConnect serves both dealers and shopkeepers with tailored features
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 mt-8">
            <Card className={cn("opacity-0", isVisible.roles && "slide-in-left opacity-100")}>
              <CardContent className="p-6 flex flex-col space-y-4">
                <div className="p-2 rounded-full bg-primary/10 w-fit">
                  <Truck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">For Dealers</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-primary" />
                    <span>Manage multiple shopkeeper relationships</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-primary" />
                    <span>Track inventory across distribution network</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-primary" />
                    <span>Forecast demand with AI-powered analytics</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-primary" />
                    <span>Optimize delivery routes and schedules</span>
                  </li>
                </ul>
                <div className="pt-4">
                  <Link href="/dealer/signup">
                    <Button className="w-full">Register as Dealer</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            <Card className={cn("opacity-0", isVisible.roles && "slide-in-right opacity-100")}>
              <CardContent className="p-6 flex flex-col space-y-4">
                <div className="p-2 rounded-full bg-primary/10 w-fit">
                  <Store className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">For Shopkeepers</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-primary" />
                    <span>Connect with trusted dealers in your area</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-primary" />
                    <span>Manage inventory with automated reordering</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-primary" />
                    <span>Access sales analytics and performance metrics</span>
                  </li>
                </ul>
                <div className="pt-4">
                  <Link href="/shopkeeper/signup">
                    <Button className="w-full">Register as Shopkeeper</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="w-full py-12 md:py-24 lg:py-32 gradient-bg">
        <div className="container px-4 md:px-6">
          <div
            className={cn(
              "flex flex-col items-center justify-center space-y-4 text-center opacity-0",
              isVisible.cta && "fade-in opacity-100",
            )}
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
                Ready to Transform Your Supply Chain?
              </h2>
              <p className="max-w-[600px] text-white/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join SupplyConnect today and experience the power of AI-driven inventory management
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
              <Link href="/dealer/signup">
                <Button size="lg" variant="secondary" className="w-full">
                  Get Started as Dealer <Rocket className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/shopkeeper/signup">
                <Button size="lg" variant="secondary" className="w-full">
                  Get Started as Shopkeeper <Rocket className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

