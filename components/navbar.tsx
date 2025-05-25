"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, User, ChevronDown } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

const navItems = [
  { name: "Accueil", href: "/" },
  {
    name: "Services",
    href: "#",
    children: [
      { name: "Sensibilisation", href: "/sensibilisation" },
      { name: "Évaluation", href: "/evaluation" },
      { name: "Centres", href: "/centres" },
      { name: "Chatbot", href: "/chatbot" },
    ],
  },
  { name: "Forum", href: "/forum" },
  { name: "À propos", href: "/a-propos" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const isMobile = useMobile()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleDropdown = (name: string) => {
    if (activeDropdown === name) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(name)
    }
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5",
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                VIH
              </span>
              <span
                className={`text-2xl font-bold ${scrolled ? "text-gray-800 dark:text-white" : "text-white dark:text-white"}`}
              >
                Info
              </span>
            </motion.div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <div key={item.href} className="relative group">
              {item.children ? (
                <button
                  onClick={() => toggleDropdown(item.name)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1",
                    scrolled
                      ? "text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
                      : "text-gray-700 hover:text-indigo-400 dark:text-gray-200 dark:hover:text-white",
                    activeDropdown === item.name &&
                      "bg-indigo-50 dark:bg-gray-800 text-indigo-600 dark:text-indigo-400",
                  )}
                >
                  {item.name}
                  <ChevronDown className="h-4 w-4" />
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                    scrolled
                      ? "text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
                      : "text-gray-700 hover:text-indigo-400 dark:text-gray-200 dark:hover:text-white",
                    pathname === item.href && "bg-white/20 dark:bg-gray-800/40 font-semibold",
                  )}
                >
                  {item.name}
                </Link>
              )}

              {/* Dropdown for desktop */}
              {item.children && (
                <AnimatePresence>
                  {activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-1 w-48 rounded-xl bg-white dark:bg-gray-800 shadow-lg overflow-hidden z-50"
                    >
                      <div className="py-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-indigo-400"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className={scrolled ? "opacity-100" : "opacity-0 md:opacity-100"}>
            <ModeToggle />
          </div>

          <Button
            asChild
            variant="ghost"
            size="sm"
            className={cn(
              "hidden md:flex",
              scrolled
                ? "text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
                : "text-gray-700 hover:text-indigo-400 dark:text-gray-200 dark:hover:text-white",
            )}
          >
            <Link href="/connexion">
              <User className="h-4 w-4 mr-2" />
              Connexion
            </Link>
          </Button>

          <Button
            asChild
            size="sm"
            className="hidden md:flex bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 border-0 rounded-full"
          >
            <Link href="/inscription">Inscription</Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "md:hidden",
              scrolled
                ? "text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
                : "text-white hover:text-white/80 dark:text-gray-200 dark:hover:text-white",
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800 shadow-lg"
          >
            <div className="container py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <div key={item.href}>
                  {item.children ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className={cn(
                          "flex items-center justify-between w-full px-4 py-3 text-left text-sm font-medium rounded-lg",
                          activeDropdown === item.name
                            ? "bg-indigo-50 dark:bg-gray-800 text-indigo-600 dark:text-indigo-400"
                            : "text-gray-700 dark:text-gray-200",
                        )}
                      >
                        {item.name}
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            activeDropdown === item.name && "transform rotate-180",
                          )}
                        />
                      </button>
                      <AnimatePresence>
                        {activeDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="pl-4"
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={cn(
                                  "block px-4 py-2 text-sm rounded-lg my-1",
                                  pathname === child.href
                                    ? "bg-indigo-50 dark:bg-gray-800 text-indigo-600 dark:text-indigo-400"
                                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800",
                                )}
                              >
                                {child.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "block px-4 py-3 text-sm font-medium rounded-lg",
                        pathname === item.href
                          ? "bg-indigo-50 dark:bg-gray-800 text-indigo-600 dark:text-indigo-400"
                          : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800",
                      )}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="flex flex-col gap-2 pt-4 mt-2 border-t dark:border-gray-800">
                <Button asChild variant="outline" size="sm" className="w-full justify-center">
                  <Link href="/connexion">
                    <User className="h-4 w-4 mr-2" />
                    Connexion
                  </Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="w-full justify-center bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 border-0"
                >
                  <Link href="/inscription">Inscription</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}