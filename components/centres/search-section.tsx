"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MapPin, SlidersHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface SearchSectionProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  onSearch: (e: React.FormEvent) => void
  onGetLocation: () => void
  isLocating: boolean
}

export default function SearchSection({
  searchTerm,
  setSearchTerm,
  onSearch,
  onGetLocation,
  isLocating,
}: SearchSectionProps) {
  const [filterType, setFilterType] = useState("all")

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="max-w-6xl mx-auto mb-8"
    >
      <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10" />
        <CardContent className="relative p-8">
          <form onSubmit={onSearch} className="space-y-6">
            {/* Main search bar */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Rechercher par ville, nom de centre ou code postal..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-14 rounded-2xl border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-indigo-500/50 text-lg"
                />
              </div>

              {/* Filter dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-14 px-6 rounded-2xl border-gray-200/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-gray-800/80"
                  >
                    <SlidersHorizontal className="h-5 w-5 mr-2" />
                    Filtres
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-gray-200/50">
                  <DropdownMenuItem onClick={() => setFilterType("all")}>Tous les centres</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterType("hospital")}>Hôpitaux</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterType("clinic")}>Cliniques</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterType("cegidd")}>CeGIDD</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={onGetLocation}
                disabled={isLocating}
                className="h-12 px-6 rounded-2xl border-indigo-200/50 text-indigo-700 hover:bg-indigo-50/80 dark:border-indigo-800/50 dark:text-indigo-400 dark:hover:bg-indigo-950/50 backdrop-blur-sm"
              >
                {isLocating ? (
                  <>
                    <div className="animate-spin h-5 w-5 mr-2 border-2 border-indigo-600 border-t-transparent rounded-full"></div>
                    Localisation...
                  </>
                ) : (
                  <>
                    <MapPin className="h-5 w-5 mr-2" />
                    Me localiser
                  </>
                )}
              </Button>

              <Button
                type="submit"
                className="h-12 px-8 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Search className="h-5 w-5 mr-2" />
                Rechercher
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}