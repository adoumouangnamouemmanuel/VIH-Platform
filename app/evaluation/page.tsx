"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { QuestionCard } from "@/components/evaluation/question-card"
import { ResultsCard } from "@/components/evaluation/results-card"
import { FloatingParticles } from "@/components/evaluation/floating-particles"

const questions = [
  {
    id: 1,
    question: "Avez-vous eu des rapports sexuels non protégés au cours des 3 derniers mois ?",
    options: [
      { id: "q1-yes", label: "Oui", emoji: "⚠️" },
      { id: "q1-no", label: "Non", emoji: "✅" },
    ],
    riskFactor: 3,
  },
  {
    id: 2,
    question: "Avez-vous eu de la fièvre, des maux de gorge, des ganglions enflés ou une éruption cutanée récemment ?",
    options: [
      { id: "q2-yes", label: "Oui", emoji: "🤒" },
      { id: "q2-no", label: "Non", emoji: "😊" },
    ],
    riskFactor: 2,
  },
  {
    id: 3,
    question: "Avez-vous partagé du matériel d'injection (aiguilles, seringues) ?",
    options: [
      { id: "q3-yes", label: "Oui", emoji: "💉" },
      { id: "q3-no", label: "Non", emoji: "🚫" },
    ],
    riskFactor: 4,
  },
  {
    id: 4,
    question: "Avez-vous eu des partenaires sexuels multiples au cours des 6 derniers mois ?",
    options: [
      { id: "q4-yes", label: "Oui", emoji: "👥" },
      { id: "q4-no", label: "Non", emoji: "👤" },
    ],
    riskFactor: 2,
  },
  {
    id: 5,
    question: "Avez-vous déjà été diagnostiqué avec une autre infection sexuellement transmissible ?",
    options: [
      { id: "q5-yes", label: "Oui", emoji: "🏥" },
      { id: "q5-no", label: "Non", emoji: "✨" },
    ],
    riskFactor: 2,
  },
]

export default function EvaluationPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [currentAnswer, setCurrentAnswer] = useState<string | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [riskScore, setRiskScore] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const maxPossibleScore = questions.reduce((acc, q) => acc + q.riskFactor, 0)

  const handleNext = () => {
    if (currentAnswer) {
      setIsAnimating(true)

      // Save the answer
      const newAnswers = { ...answers, [currentQuestion]: currentAnswer }
      setAnswers(newAnswers)

      // Calculate risk if "yes" was selected
      let newRiskScore = riskScore
      if (currentAnswer.includes("yes")) {
        newRiskScore += questions[currentQuestion].riskFactor
        setRiskScore(newRiskScore)
      }

      // Delay to allow for animation
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion((prev) => prev + 1)
          setCurrentAnswer(null)
        } else {
          setShowResults(true)
        }
        setIsAnimating(false)
      }, 600)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setIsAnimating(true)

      // Recalculate risk score by removing the current question's contribution
      const currentQuestionAnswer = answers[currentQuestion]
      if (currentQuestionAnswer && currentQuestionAnswer.includes("yes")) {
        setRiskScore((prev) => prev - questions[currentQuestion].riskFactor)
      }

      setTimeout(() => {
        setCurrentQuestion((prev) => prev - 1)
        setCurrentAnswer(answers[currentQuestion - 1] || null)
        setIsAnimating(false)
      }, 300)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setCurrentAnswer(null)
    setShowResults(false)
    setRiskScore(0)
    setIsAnimating(false)
  }

  return (
    <div className="relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-indigo-950 z-0" />

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Content */}
      <div className="relative z-10 pt-24 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full mb-6 shadow-lg"
            >
              <span className="text-2xl">🩺</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Auto-évaluation
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
            >
              Un questionnaire confidentiel et sécurisé pour évaluer votre risque potentiel d'exposition au VIH. Vos
              réponses ne sont jamais enregistrées.
            </motion.p>
          </motion.div>

          {/* Question/Results Content */}
          <div className="flex justify-center">
            <AnimatePresence mode="wait">
              {!showResults ? (
                <QuestionCard
                  key="question"
                  question={questions[currentQuestion]}
                  currentQuestion={currentQuestion}
                  totalQuestions={questions.length}
                  currentAnswer={currentAnswer}
                  onAnswerChange={setCurrentAnswer}
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                  isAnimating={isAnimating}
                />
              ) : (
                <ResultsCard
                  key="results"
                  riskScore={riskScore}
                  maxScore={maxPossibleScore}
                  onRestart={handleRestart}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
