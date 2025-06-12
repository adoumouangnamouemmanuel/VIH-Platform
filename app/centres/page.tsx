"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Info, ChevronRight, Sparkles } from "lucide-react"
import dynamic from "next/dynamic"
import Link from "next/link"
import SearchSection from "@/components/centres/search-section"
import CentreCard from "@/components/centres/centre-card"
import StatsBanner from "@/components/centres/stats-banner"

// Mock data for Niger context
const centresData = [
  {
    id: 1,
    name: "ONG Mieux Vivre avec le SIDA",
    address: "Maurice de Lens",
    phone: "+227 20 72 35 41",
    hours: "Lun-Ven: 8h-17h, Sam: 9h-13h",
    services: ["Test VIH", "Conseil", "Dépistage anonyme", "Suivi médical"],
    coordinates: [13.5116, 2.1254] as [number, number],
    rating: 4.8,
    distance: "1.2 km",
  },
  {
    id: 2,
    name: "ONG ESPOIR Niger",
    address: "Récasement, Niamey",
    phone: "+227 20 73 41 56",
    hours: "Lun-Ven: 7h30-16h30",
    services: [
      "Test VIH",
      "Traitement ARV",
      "Consultation spécialisée",
      "Suivi biologique",
    ],
    coordinates: [13.5137, 2.1098] as [number, number],
    rating: 4.6,
    distance: "2.8 km",
  },
  {
    id: 3,
    name: "Centre CEDAV",
    address: "Avenue des Zarmakoye",
    phone: "+227 20 51 04 23",
    hours: "Lun-Ven: 8h-16h",
    services: [
      "Test VIH",
      "Dépistage IST",
      "Consultation anonyme",
      "Prévention",
    ],
    coordinates: [13.8069, 8.9881] as [number, number],
    rating: 4.5,
    distance: "485 km",
  },
];

// Dynamically import the Map component to avoid SSR issues with Leaflet
const Map = dynamic(() => import("@/components/map"), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center rounded-2xl">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Chargement de la carte...</p>
      </div>
    </div>
  ),
})

export default function CentresPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredCentres, setFilteredCentres] = useState(centresData)
  const [selectedCentre, setSelectedCentre] = useState<number | null>(null)
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)
  const [isLocating, setIsLocating] = useState(false)

  useEffect(() => {
    // Filter centres based on search term
    const filtered = centresData.filter(
      (centre) =>
        centre.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        centre.address.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredCentres(filtered)
  }, [searchTerm])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Filter is already handled by the useEffect
  }

  const handleGetUserLocation = () => {
    setIsLocating(true)
    // Get user's location if they allow it
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude])
          setIsLocating(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          setIsLocating(false)
        },
      )
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4 mr-2" />
            Trouvez le centre le plus proche au Niger
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
            Centres de Dépistage au Niger
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Découvrez les centres de dépistage VIH dans toutes les régions du Niger.
            <span className="text-indigo-600 dark:text-indigo-400 font-medium"> Confidentialité garantie</span>, prise
            en charge professionnelle et résultats fiables.
          </p>
        </motion.div>

        {/* Stats Banner */}
        <StatsBanner />

        {/* Search Section */}
        <SearchSection
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
          onGetLocation={handleGetUserLocation}
          isLocating={isLocating}
        />

        {/* Main Content */}
        <Tabs defaultValue="map" className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <TabsList className="grid w-full grid-cols-2 mb-8 rounded-2xl p-1 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg">
              <TabsTrigger
                value="map"
                className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
              >
                Vue Carte
              </TabsTrigger>
              <TabsTrigger
                value="list"
                className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
              >
                Vue Liste
              </TabsTrigger>
            </TabsList>
          </motion.div>

          <TabsContent value="map" className="mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="h-[600px] rounded-2xl overflow-hidden">
                    <Map
                      centres={filteredCentres}
                      selectedCentre={selectedCentre}
                      setSelectedCentre={setSelectedCentre}
                      userLocation={userLocation}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {selectedCentre && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-8"
              >
                <CentreCard centre={filteredCentres.find((c) => c.id === selectedCentre)!} index={0} />
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="list" className="mt-0">
            {filteredCentres.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                {filteredCentres.map((centre, index) => (
                  <CentreCard key={centre.id} centre={centre} index={index} />
                ))}
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
                  <CardContent className="flex flex-col items-center justify-center py-16">
                    <div className="rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 p-6 mb-6">
                      <Info className="h-12 w-12 text-indigo-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Aucun centre trouvé</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-center mb-8 max-w-md leading-relaxed">
                      Aucun centre ne correspond à votre recherche. Essayez de rechercher dans une autre région du
                      Niger.
                    </p>
                    <Button
                      onClick={() => setSearchTerm("")}
                      className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Réinitialiser la recherche
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-6xl mx-auto mt-16"
        >
          <Card className="border-0 shadow-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white overflow-hidden">
            <CardContent className="relative p-12">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="lg:w-2/3 text-center lg:text-left">
                  <h2 className="text-3xl font-bold mb-4">Besoin d'aide pour choisir un centre ?</h2>
                  <p className="text-xl opacity-90 leading-relaxed">
                    Notre assistant virtuel peut vous aider à trouver le centre le plus proche de votre région, répondre
                    à vos questions sur le dépistage et vous orienter vers les services adaptés au Niger.
                  </p>
                </div>
                <div className="lg:w-1/3 flex justify-center lg:justify-end">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-2xl bg-white text-indigo-700 hover:bg-white/90 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <Link href="/chatbot">
                      Discuter avec l'assistant
                      <ChevronRight className="ml-2 h-6 w-6" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
