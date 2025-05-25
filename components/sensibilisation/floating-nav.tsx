"use client"

import { motion } from "framer-motion"
import { Home, TrendingUp, Brain, Shield, Target, BookOpen } from 'lucide-react'

const sections = [
  { id: "hero", label: "Accueil", icon: Home },
  { id: "stats", label: "Statistiques", icon: TrendingUp },
  { id: "understanding", label: "Comprendre", icon: Brain },
  { id: "prevention", label: "Prévention", icon: Shield },
  { id: "quiz", label: "Quiz", icon: Target },
  { id: "resources", label: "Ressources", icon: BookOpen },
]

interface FloatingNavProps {
  activeSection: string
}

export function FloatingNav({ activeSection }: FloatingNavProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block"
    >
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-2xl p-2 shadow-2xl border border-white/20 dark:border-gray-700/20">
        {sections.map((section) => (
          <motion.a
            key={section.id}
            href={`#${section.id}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`block p-3 rounded-xl mb-1 transition-all ${
              activeSection === section.id
                ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg"
                : "text-gray-600 dark:text-gray-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
            }`}
          >
            <section.icon className="h-5 w-5" />
          </motion.a>
        ))}
      </div>
    </motion.div>
  )
}