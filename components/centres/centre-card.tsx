"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Clock, ChevronRight, Building2, Star, Navigation, Calendar } from "lucide-react"

interface Centre {
  id: number
  name: string
  address: string
  phone: string
  hours: string
  services: string[]
  coordinates: [number, number]
  rating?: number
  distance?: string
}

interface CentreCardProps {
  centre: Centre
  index: number
}

export default function CentreCard({ centre, index }: CentreCardProps) {
  const handleGetDirections = () => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(centre.address)}`, "_blank")
  }

  const handleBookAppointment = () => {
    // Simulate booking appointment
    alert("Fonctionnalité de prise de rendez-vous en cours de développement")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="h-full border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <CardHeader className="relative pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-xl flex items-center mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                <div className="p-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white mr-3">
                  <Building2 className="h-5 w-5" />
                </div>
                {centre.name}
              </CardTitle>

              <div className="flex items-start text-gray-600 dark:text-gray-400 mb-2">
                <MapPin className="h-4 w-4 mr-2 mt-1 flex-shrink-0 text-indigo-500" />
                <span className="text-sm">{centre.address}</span>
              </div>

              {centre.distance && (
                <Badge
                  variant="secondary"
                  className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                >
                  {centre.distance}
                </Badge>
              )}
            </div>

            {centre.rating && (
              <div className="flex items-center bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded-lg">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">{centre.rating}</span>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="relative">
          <div className="space-y-4">
            {/* Contact info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center p-3 rounded-xl bg-gray-50/50 dark:bg-gray-800/50">
                <Phone className="h-4 w-4 mr-3 text-indigo-500 flex-shrink-0" />
                <span className="text-sm">{centre.phone}</span>
              </div>
              <div className="flex items-center p-3 rounded-xl bg-gray-50/50 dark:bg-gray-800/50">
                <Clock className="h-4 w-4 mr-3 text-indigo-500 flex-shrink-0" />
                <span className="text-sm">{centre.hours}</span>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Services disponibles :</h4>
              <div className="flex flex-wrap gap-2">
                {centre.services.map((service, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200 text-indigo-700 dark:from-indigo-900/20 dark:to-purple-900/20 dark:border-indigo-800 dark:text-indigo-300"
                  >
                    {service}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleGetDirections}
                className="flex-1 rounded-xl border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-950/50"
              >
                <Navigation className="h-4 w-4 mr-2" />
                Itinéraire
              </Button>

              <Button
                size="sm"
                onClick={handleBookAppointment}
                className="flex-1 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Rendez-vous
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}