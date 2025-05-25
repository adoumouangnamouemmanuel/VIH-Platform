"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Brain, CheckCircle2, X, ArrowRight } from 'lucide-react'

const questions = [
  {
    question: "Le VIH peut-il se transmettre par une poignée de main ?",
    answers: ["Oui, toujours", "Non, jamais", "Seulement si il y a une blessure", "Ça dépend de la durée"],
    correct: 1,
    explanation:
      "Le VIH ne se transmet pas par contact casual comme les poignées de main, embrassades ou partage d'objets.",
  },
  {
    question: "Quelle est la période fenêtre pour les tests de 4ème génération ?",
    answers: ["1 semaine", "6 semaines", "3 mois", "6 mois"],
    correct: 1,
    explanation: "Les tests de 4ème génération peuvent détecter le VIH environ 6 semaines après l'infection.",
  },
  {
    question: "Que signifie I=I ?",
    answers: [
      "Infection = Immunité",
      "Indétectable = Intransmissible",
      "Information = Important",
      "Injection = Infection",
    ],
    correct: 1,
    explanation: "I=I signifie qu'une personne avec une charge virale indétectable ne peut pas transmettre le VIH.",
  },
]

export function InteractiveQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowResult(true)
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
  }

  return (
    <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-indigo-50 dark:from-gray-900 dark:to-indigo-950 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 text-white">
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-6 w-6" />
          Quiz Interactif - Question {currentQuestion + 1}/{questions.length}
        </CardTitle>
        <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-2 bg-white/20" />
      </CardHeader>
      <CardContent className="p-8">
        {currentQuestion < questions.length ? (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
              {questions[currentQuestion].question}
            </h3>
            <div className="space-y-3 mb-6">
              {questions[currentQuestion].answers.map((answer, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(index)}
                  disabled={showResult}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                    selectedAnswer === index
                      ? index === questions[currentQuestion].correct
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                        : "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300"
                      : showResult && index === questions[currentQuestion].correct
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                        : "border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 bg-white dark:bg-gray-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswer === index
                          ? index === questions[currentQuestion].correct
                            ? "border-green-500 bg-green-500"
                            : "border-red-500 bg-red-500"
                          : showResult && index === questions[currentQuestion].correct
                            ? "border-green-500 bg-green-500"
                            : "border-gray-300 dark:border-gray-600"
                      }`}
                    >
                      {(selectedAnswer === index && index === questions[currentQuestion].correct) ||
                      (showResult && index === questions[currentQuestion].correct) ? (
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      ) : selectedAnswer === index ? (
                        <X className="h-4 w-4 text-white" />
                      ) : null}
                    </div>
                    <span className="font-medium">{answer}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-6"
              >
                <p className="text-blue-800 dark:text-blue-300 font-medium mb-2">💡 Explication :</p>
                <p className="text-blue-700 dark:text-blue-300">{questions[currentQuestion].explanation}</p>
              </motion.div>
            )}

            {showResult && (
              <div className="flex justify-center">
                {currentQuestion < questions.length - 1 ? (
                  <Button
                    onClick={nextQuestion}
                    className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 rounded-full px-8"
                  >
                    Question suivante
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <div className="text-center">
                    <p className="text-lg font-semibold mb-4">
                      Quiz terminé ! Score : {score}/{questions.length}
                    </p>
                    <Button
                      onClick={resetQuiz}
                      className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 rounded-full px-8"
                    >
                      Recommencer
                    </Button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        ) : null}
      </CardContent>
    </Card>
  )
}