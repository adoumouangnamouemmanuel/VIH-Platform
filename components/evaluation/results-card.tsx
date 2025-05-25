"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2, AlertTriangle, Info, MapPin, MessageCircle, RotateCcw, Share2 } from "lucide-react"
import Link from "next/link"

interface ResultsCardProps {
  riskScore: number
  maxScore: number
  onRestart: () => void
}

export function ResultsCard({ riskScore, maxScore, onRestart }: ResultsCardProps) {
  const getRiskLevel = () => {
    const percentage = (riskScore / maxScore) * 100
    if (percentage >= 60) return "élevé"
    if (percentage >= 30) return "modéré"
    return "faible"
  }

  const getRiskData = () => {
    const level = getRiskLevel()
    switch (level) {
      case "élevé":
        return {
          color: "red",
          icon: AlertCircle,
          gradient: "from-red-500 to-red-600",
          bgGradient: "from-red-50 to-red-100 dark:from-red-950/40 dark:to-red-900/40",
          borderColor: "border-red-200 dark:border-red-800",
          textColor: "text-red-700 dark:text-red-300",
          recommendation:
            "Nous vous recommandons fortement de faire un test de dépistage du VIH dès que possible. Consultez notre carte des centres de dépistage pour trouver le centre le plus proche.",
        }
      case "modéré":
        return {
          color: "amber",
          icon: AlertTriangle,
          gradient: "from-amber-500 to-orange-500",
          bgGradient: "from-amber-50 to-orange-100 dark:from-amber-950/40 dark:to-orange-900/40",
          borderColor: "border-amber-200 dark:border-amber-800",
          textColor: "text-amber-700 dark:text-amber-300",
          recommendation:
            "Il serait prudent de faire un test de dépistage du VIH. Consultez notre carte des centres de dépistage pour trouver le centre le plus proche.",
        }
      default:
        return {
          color: "green",
          icon: CheckCircle2,
          gradient: "from-green-500 to-emerald-500",
          bgGradient: "from-green-50 to-emerald-100 dark:from-green-950/40 dark:to-emerald-900/40",
          borderColor: "border-green-200 dark:border-green-800",
          textColor: "text-green-700 dark:text-green-300",
          recommendation:
            "Votre risque semble faible, mais il est toujours recommandé de faire un test de dépistage régulier si vous êtes sexuellement actif.",
        }
    }
  }

  const riskData = getRiskData()
  const RiskIcon = riskData.icon
  const percentage = (riskScore / maxScore) * 100

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl -z-10" />

      <Card className="border-0 shadow-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl overflow-hidden relative">
        {/* Animated Border */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl opacity-20 animate-pulse" />
        <div className="absolute inset-[1px] bg-white/95 dark:bg-gray-900/95 rounded-3xl" />

        <div className="relative z-10">
          <CardHeader className="text-center pb-8 pt-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="mx-auto w-20 h-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6"
            >
              <CheckCircle2 className="w-10 h-10 text-white" />
            </motion.div>

            <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 dark:from-white dark:via-indigo-100 dark:to-purple-100 bg-clip-text text-transparent">
              Résultats de votre évaluation
            </CardTitle>
            <p className="text-gray-600 dark:text-gray-400 mt-4 text-lg">
              Basé sur vos réponses, voici notre évaluation personnalisée
            </p>
          </CardHeader>

          <CardContent className="space-y-8 px-8 pb-8">
            {/* Risk Level Display */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className={`${riskData.bgGradient} p-8 rounded-2xl border ${riskData.borderColor} relative overflow-hidden`}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                    <RiskIcon className={`h-6 w-6 text-${riskData.color}-500`} />
                    Niveau de risque estimé
                  </h3>
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                    className={`px-4 py-2 rounded-full bg-gradient-to-r ${riskData.gradient} text-white font-bold text-lg shadow-lg`}
                  >
                    Risque {getRiskLevel()}
                  </motion.div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-4">
                  <div className="relative">
                    <div className="w-full bg-white/50 dark:bg-gray-800/50 rounded-full h-6 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                        className={`h-6 bg-gradient-to-r ${riskData.gradient} rounded-full relative`}
                      >
                        <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full" />
                      </motion.div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
                      <span>Faible</span>
                      <span>Modéré</span>
                      <span>Élevé</span>
                    </div>
                  </div>

                  {/* Score Display */}
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
                      className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 rounded-full px-6 py-3 shadow-lg"
                    >
                      <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        {riskScore}/{maxScore}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">points de risque</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Recommendation Alert */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <Alert className={`border-l-4 ${riskData.borderColor} ${riskData.bgGradient} border-0 rounded-2xl p-6`}>
                <RiskIcon className={`h-6 w-6 text-${riskData.color}-500`} />
                <AlertTitle className="text-xl font-bold mb-3">Recommandation personnalisée</AlertTitle>
                <AlertDescription className="text-base leading-relaxed">{riskData.recommendation}</AlertDescription>
              </Alert>
            </motion.div>

            {/* Important Notice */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 p-6 rounded-2xl border border-blue-200 dark:border-blue-800"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-full">
                  <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-2">Rappel important</h3>
                  <p className="text-blue-700 dark:text-blue-300 leading-relaxed">
                    Cette évaluation est uniquement indicative et ne remplace pas un diagnostic médical professionnel.
                    Le seul moyen de connaître votre statut VIH avec certitude est de faire un test de dépistage.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  className="w-full rounded-2xl py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link href="/centres" className="flex items-center justify-center gap-2">
                    <MapPin className="h-5 w-5" />
                    <span>Centres de dépistage</span>
                  </Link>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-2xl py-6 border-2 border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-950/20 transition-all duration-300"
                >
                  <Link href="/chatbot" className="flex items-center justify-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    <span>Assistant IA</span>
                  </Link>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={onRestart}
                  variant="outline"
                  className="w-full rounded-2xl py-6 border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
                >
                  <RotateCcw className="h-5 w-5 mr-2" />
                  Refaire le test
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="w-full rounded-2xl py-6 border-2 border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-950/20 transition-all duration-300"
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  Partager
                </Button>
              </motion.div>
            </motion.div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  )
}