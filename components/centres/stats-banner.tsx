"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, MapPin, Clock, Users } from "lucide-react"

const stats = [
  {
    icon: Building2,
    label: "Centres disponibles",
    value: "150+",
    color: "from-indigo-500 to-blue-500",
  },
  {
    icon: MapPin,
    label: "Villes couvertes",
    value: "50+",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Clock,
    label: "Ouvert 24h/24",
    value: "25",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Users,
    label: "Tests par mois",
    value: "10k+",
    color: "from-orange-500 to-red-500",
  },
]

export default function StatsBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="max-w-6xl mx-auto mb-12"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            whileHover={{ scale: 1.05 }}
          >
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-5`} />
              <CardContent className="relative p-6 text-center">
                <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${stat.color} text-white mb-3`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}