"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Users, Clock, Shield } from "lucide-react"

const stats = [
  {
    icon: MapPin,
    value: "8",
    label: "Régions couvertes",
    description: "Dans tout le Niger",
  },
  {
    icon: Users,
    value: "3+",
    label: "Centres actifs",
    description: "Personnel qualifié",
  },
  {
    icon: Clock,
    value: "24h",
    label: "Résultats rapides",
    description: "Tests fiables",
  },
  {
    icon: Shield,
    value: "100%",
    label: "Confidentialité",
    description: "Anonymat garanti",
  },
]

export default function StatsBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="max-w-6xl mx-auto mb-12"
    >
      <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl overflow-hidden">
        <CardContent className="p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-1">{stat.label}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
