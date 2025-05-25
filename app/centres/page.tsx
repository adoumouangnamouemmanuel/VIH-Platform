"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Building2, ChevronRight, Clock, ExternalLink, Info, MapPin, Phone, Search } from "lucide-react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useEffect, useState } from "react"

// Mock data for testing
const centresData = [
  {
    id: 1,
    name: "Centre de Dépistage Paris Centre",
    address: "15 Rue de Rivoli, 75004 Paris",
    phone: "01 42 72 88 99",
    hours: "Lun-Ven: 9h-18h, Sam: 10h-16h",
    services: ["Test VIH", "Conseil", "Dépistage anonyme"],
    coordinates: [48.856614, 2.3522219] as [number, number],
  },
  {
    id: 2,
    name: "Hôpital Saint-Louis - Service Maladies Infectieuses",
    address: "1 Avenue Claude Vellefaux, 75010 Paris",
    phone: "01 42 49 49 49",
    hours: "Lun-Ven: 8h30-17h",
    services: ["Test VIH", "Suivi médical", "Consultation spécialisée"],
    coordinates: [48.8748, 2.3684] as [number, number],
  },
  {
    id: 3,
    name: "CeGIDD Lyon",
    address: "5 Rue du Griffon, 69001 Lyon",
    phone: "04 72 07 17 17",
    hours: "Lun-Ven: 9h-17h",
    services: ["Test VIH", "Dépistage IST", "Consultation anonyme"],
    coordinates: [45.7578, 4.832] as [number, number],
  },
  {
    id: 4,
    name: "Centre de Santé Sexuelle - Marseille",
    address: "34 Boulevard Baille, 13006 Marseille",
    phone: "04 13 31 69 55",
    hours: "Lun-Jeu: 9h-17h, Ven: 9h-16h",
    services: ["Test VIH", "Préservatifs gratuits", "Conseil"],
    coordinates: [43.2965, 5.3698] as [number, number],
  },
  {
    id: 5,
    name: "CeGIDD Bordeaux",
    address: "Rue de Belfort, 33000 Bordeaux",
    phone: "05 57 22 46 66",
    hours: "Lun-Ven: 9h-17h",
    services: ["Test VIH", "Dépistage IST", "PrEP"],
    coordinates: [44.8378, -0.5792] as [number, number],
  },
]

// Dynamically import the Map component to avoid SSR issues with Leaflet
const Map = dynamic(() => import("@/components/map"), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded-xl">
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

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              Centres de Dépistage
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Trouvez le centre de dépistage le plus proche de chez vous pour effectuer un test VIH en toute
              confidentialité.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-8">
            <Card className="border-0 shadow-lg dark:shadow-indigo-900/10 overflow-hidden">
              <CardContent className="p-6">
                <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Rechercher par ville ou nom de centre..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 rounded-full border-gray-200 dark:border-gray-700 focus-visible:ring-indigo-500"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleGetUserLocation}
                      disabled={isLocating}
                      className="rounded-full border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-950"
                    >
                      {isLocating ? (
                        <>
                          <div className="animate-spin h-4 w-4 mr-2 border-2 border-indigo-600 border-t-transparent rounded-full"></div>
                          Localisation...
                        </>
                      ) : (
                        <>
                          <MapPin className="h-4 w-4 mr-2" />
                          Me localiser
                        </>
                      )}
                    </Button>
                    <Button
                      type="submit"
                      className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700"
                    >
                      Rechercher
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="map" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8 rounded-full p-1 bg-gray-100 dark:bg-gray-800">
              <TabsTrigger
                value="map"
                className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-violet-600 data-[state=active]:text-white"
              >
                Carte
              </TabsTrigger>
              <TabsTrigger
                value="list"
                className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-violet-600 data-[state=active]:text-white"
              >
                Liste
              </TabsTrigger>
            </TabsList>

            <TabsContent value="map" className="mt-0">
              <Card className="border-0 shadow-lg dark:shadow-indigo-900/10 overflow-hidden">
                <CardContent className="p-0">
                  <div className="h-[600px] rounded-xl overflow-hidden">
                    <Map
                      centres={filteredCentres}
                      selectedCentre={selectedCentre}
                      setSelectedCentre={setSelectedCentre}
                      userLocation={userLocation}
                    />
                  </div>
                </CardContent>
              </Card>
              {selectedCentre && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-6"
                >
                  <Card className="border-0 shadow-lg dark:shadow-indigo-900/10">
                    <CardHeader className="pb-2">
                      <CardTitle>
                        {filteredCentres.find((c) => c.id === selectedCentre)?.name || "Centre sélectionné"}
                      </CardTitle>
                      <CardDescription>
                        {filteredCentres.find((c) => c.id === selectedCentre)?.address || ""}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <Phone className="h-4 w-4 mr-2 mt-1 flex-shrink-0 text-indigo-600" />
                            <span>{filteredCentres.find((c) => c.id === selectedCentre)?.phone || ""}</span>
                          </div>
                          <div className="flex items-start">
                            <Clock className="h-4 w-4 mr-2 mt-1 flex-shrink-0 text-indigo-600" />
                            <span>{filteredCentres.find((c) => c.id === selectedCentre)?.hours || ""}</span>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">Services:</h4>
                          <div className="flex flex-wrap gap-2">
                            {filteredCentres
                              .find((c) => c.id === selectedCentre)
                              ?.services.map((service, index) => (
                                <span
                                  key={index}
                                  className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 text-xs px-2 py-1 rounded-full"
                                >
                                  {service}
                                </span>
                              ))}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-col sm:flex-row gap-3">
                        <Button
                          variant="outline"
                          className="rounded-full border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-950"
                          onClick={() =>
                            window.open(
                              `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                filteredCentres.find((c) => c.id === selectedCentre)?.address || "",
                              )}`,
                              "_blank",
                            )
                          }
                        >
                          Voir sur Google Maps
                          <ExternalLink className="ml-2 h-3 w-3" />
                        </Button>
                        <Button
                          className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700"
                          onClick={() => {
                            // Simulate booking appointment
                            alert("Fonctionnalité de prise de rendez-vous en cours de développement")
                          }}
                        >
                          Prendre rendez-vous
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </TabsContent>

            <TabsContent value="list" className="mt-0">
              {filteredCentres.length > 0 ? (
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {filteredCentres.map((centre) => (
                    <motion.div
                      key={centre.id}
                      variants={fadeIn}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="h-full border-0 shadow-lg dark:shadow-indigo-900/10 hover:shadow-xl transition-all duration-300">
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-xl flex items-center">
                                <Building2 className="h-5 w-5 mr-2 text-indigo-600" />
                                {centre.name}
                              </CardTitle>
                              <CardDescription className="flex items-start mt-1">
                                <MapPin className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0 text-gray-400" />
                                {centre.address}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div className="flex items-start">
                                <Phone className="h-4 w-4 mr-2 mt-1 flex-shrink-0 text-indigo-600" />
                                <span>{centre.phone}</span>
                              </div>
                              <div className="flex items-start">
                                <Clock className="h-4 w-4 mr-2 mt-1 flex-shrink-0 text-indigo-600" />
                                <span>{centre.hours}</span>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium mb-2">Services:</h4>
                              <div className="flex flex-wrap gap-2">
                                {centre.services.map((service, index) => (
                                  <span
                                    key={index}
                                    className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 text-xs px-2 py-1 rounded-full"
                                  >
                                    {service}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="rounded-full border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-950"
                                onClick={() =>
                                  window.open(
                                    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                      centre.address,
                                    )}`,
                                    "_blank",
                                  )
                                }
                              >
                                Voir sur Google Maps
                                <ExternalLink className="ml-2 h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700"
                                onClick={() => {
                                  // Simulate booking appointment
                                  alert("Fonctionnalité de prise de rendez-vous en cours de développement")
                                }}
                              >
                                Prendre rendez-vous
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <Card className="border-0 shadow-lg dark:shadow-indigo-900/10">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <div className="rounded-full bg-indigo-100 dark:bg-indigo-900/30 p-4 mb-4">
                      <Info className="h-8 w-8 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Aucun centre trouvé</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-center mb-6 max-w-md">
                      Aucun centre ne correspond à votre recherche. Essayez d'élargir vos critères ou de rechercher une
                      autre ville.
                    </p>
                    <Button
                      onClick={() => setSearchTerm("")}
                      className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700"
                    >
                      Réinitialiser la recherche
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>

          <div className="max-w-4xl mx-auto mt-12">
            <Card className="border-0 shadow-lg dark:shadow-indigo-900/10 bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="md:w-2/3">
                    <h2 className="text-2xl font-bold mb-4">Besoin d'aide pour choisir un centre ?</h2>
                    <p className="mb-0">
                      Notre assistant virtuel peut vous aider à trouver le centre le plus adapté à vos besoins et
                      répondre à toutes vos questions sur le dépistage.
                    </p>
                  </div>
                  <div className="md:w-1/3 flex justify-center md:justify-end">
                    <Button asChild size="lg" className="rounded-full bg-white text-indigo-700 hover:bg-white/90 px-8">
                      <Link href="/chatbot">
                        Discuter avec l'assistant
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
