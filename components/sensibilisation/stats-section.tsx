"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Activity, Users, Shield, Globe } from 'lucide-react'
import { AnimatedCounter } from "./animated-counter"

const stats = [
  {
    icon: Activity,
    value: 95,
    suffix: "%",
    description: "des cas de VIH peuvent être traités efficacement s'ils sont détectés tôt",
    color: "green"
  },
  {
    icon: Users,
    value: 38,
    suffix: "%",
    description: "des personnes vivant avec le VIH ignorent leur statut sérologique",
    color: "blue"
  },
  {
    icon: Shield,
    value: 100,
    suffix: "%",
    description: "confidentiel, notre plateforme garantit votre anonymat",
    color: "purple"
  },
  {
    icon: Globe,
    value: 38,
    suffix: "M",
    description: "de personnes vivent avec le VIH dans le monde",
    color: "orange"
  }
]

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

export function StatsSection() {
  return (
    <section id="stats" className="mb-20">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {stats.map((stat, index) => (
          <motion.div key={index} variants={fadeInUp}>
            <Card className={`border-0 shadow-2xl bg-gradient-to-br ${
              stat.color === 'green' ? 'from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30' :
              stat.color === 'blue' ? 'from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30' :
              stat.color === 'purple' ? 'from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30' :
              'from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30'
            } hover:shadow-3xl transition-all duration-500 group overflow-hidden`}>
              <CardContent className="p-8 text-center relative">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: stat.color === 'green' ? 5 : stat.color === 'blue' ? -5 : stat.color === 'purple' ? 5 : -5 }}
                  className={`rounded-full bg-gradient-to-br ${
                    stat.color === 'green' ? 'from-green-400 to-emerald-500' :
                    stat.color === 'blue' ? 'from-blue-400 to-indigo-500' :
                    stat.color === 'purple' ? 'from-purple-400 to-violet-500' :
                    'from-orange-400 to-amber-500'
                  } p-4 w-16 h-16 mx-auto mb-4 shadow-lg`}
                >
                  <stat.icon className="h-8 w-8 text-white" />
                </motion.div>
                <motion.p className={`text-4xl font-bold mb-2 ${
                  stat.color === 'green' ? 'text-green-600 dark:text-green-400' :
                  stat.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                  stat.color === 'purple' ? 'text-purple-600 dark:text-purple-400' :
                  'text-orange-600 dark:text-orange-400'
                }`}>
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </motion.p>
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  {stat.description}
                </p>
                <div className={`absolute inset-0 bg-gradient-to-r ${
                  stat.color === 'green' ? 'from-green-400/0 to-emerald-400/0 group-hover:from-green-400/5 group-hover:to-emerald-400/5' :
                  stat.color === 'blue' ? 'from-blue-400/0 to-indigo-400/0 group-hover:from-blue-400/5 group-hover:to-indigo-400/5' :
                  stat.color === 'purple' ? 'from-purple-400/0 to-violet-400/0 group-hover:from-purple-400/5 group-hover:to-violet-400/5' :
                  'from-orange-400/0 to-amber-400/0 group-hover:from-orange-400/5 group-hover:to-amber-400/5'
                } transition-all duration-500`} />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}