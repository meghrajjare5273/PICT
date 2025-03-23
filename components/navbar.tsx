"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { BarChart3, Box, ChevronDown, LogIn, Menu, Store, Truck, UserPlus, X } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const isMobile = useMobile()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const navLinks = [
    {
      title: "Dealer",
      icon: <Truck className="h-4 w-4 mr-2" />,
      items: [
        { title: "Login", href: "/dealer/login", icon: <LogIn className="h-4 w-4 mr-2" /> },
        { title: "Signup", href: "/dealer/signup", icon: <UserPlus className="h-4 w-4 mr-2" /> },
        { title: "Dashboard", href: "/dealer/dashboard", icon: <BarChart3 className="h-4 w-4 mr-2" /> },
      ],
    },
    {
      title: "Shopkeeper",
      icon: <Store className="h-4 w-4 mr-2" />,
      items: [
        { title: "Login", href: "/shopkeeper/login", icon: <LogIn className="h-4 w-4 mr-2" /> },
        { title: "Signup", href: "/shopkeeper/signup", icon: <UserPlus className="h-4 w-4 mr-2" /> },
        { title: "Dashboard", href: "/shopkeeper/dashboard", icon: <BarChart3 className="h-4 w-4 mr-2" /> },
      ],
    },
    {
      title: "Inventory",
      href: "/inventory",
      icon: <Box className="h-4 w-4 mr-2" />,
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2 transition-colors hover:text-primary">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <Box className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="hidden font-bold sm:inline-block">SupplyConnect</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link, index) =>
            link.items ? (
              <DropdownMenu key={index}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-1">
                    {link.icon}
                    {link.title}
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {link.items.map((item, idx) => (
                    <DropdownMenuItem key={idx} asChild>
                      <Link href={item.href} className="flex items-center cursor-pointer w-full">
                        {item.icon}
                        {item.title}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={index}
                href={link.href || "#"}
                className={cn(
                  "flex items-center text-sm font-medium transition-colors hover:text-primary",
                  pathname === link.href ? "text-primary" : "text-foreground/60",
                )}
              >
                {link.icon}
                {link.title}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <ModeToggle />

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && isMobile && (
        <div className="container py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link, index) =>
              link.items ? (
                <div key={index} className="flex flex-col gap-2">
                  <div className="flex items-center font-medium">
                    {link.icon}
                    {link.title}
                  </div>
                  <div className="flex flex-col gap-2 pl-6 border-l border-border">
                    {link.items.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        className={cn(
                          "flex items-center text-sm transition-colors hover:text-primary",
                          pathname === item.href ? "text-primary" : "text-foreground/60",
                        )}
                      >
                        {item.icon}
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={index}
                  href={link.href || "#"}
                  className={cn(
                    "flex items-center text-sm font-medium transition-colors hover:text-primary",
                    pathname === link.href ? "text-primary" : "text-foreground/60",
                  )}
                >
                  {link.icon}
                  {link.title}
                </Link>
              ),
            )}
          </nav>
        </div>
      )}
    </header>
  )
}


