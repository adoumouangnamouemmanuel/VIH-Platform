"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft } from 'lucide-react'

interface Question {
  id: number
  question: string
  options: { id: string; label: string; emoji?: string }[]
  riskFactor: number
}

interface QuestionCardProps {
  question: Question
  currentQuestion: number
  totalQuestions: number
  currentAnswer: string | null
  onAnswerChange: (answer: string) => void
  onNext: () => void
  onPrevious: () => void
  isAnimating: boolean
}

export function QuestionCard({
  question,
  currentQuestion,
  totalQuestions,
  currentAnswer,
  onAnswerChange,
  onNext,
  onPrevious,
  isAnimating
}: QuestionCardProps) {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.95 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl -z-10" />
      
      <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl overflow-hidden relative">
        {/* Animated Border */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl opacity-20 animate-pulse" />
        <div className="absolute inset-[1px] bg-white/90 dark:bg-gray-900/90 rounded-3xl" />
        
        <div className="relative z-10">
          {/* Header with Progress */}
          <CardHeader className="pb-8 pt-8 px-8">
            <div className="flex justify-between items-center mb-6">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-4 py-2 rounded-full"
              >
                Question {currentQuestion + 1} sur {totalQuestions}
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-sm font-medium text-gray-600 dark:text-gray-400"
              >
                {Math.round(progress)}% complété
              </motion.span>
            </div>
            
            {/* Progress Bar */}
            <div className="relative">
              <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full relative"
                >
                  <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full" />
                </motion.div>
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                className="absolute -top-1 bg-white dark:bg-gray-900 rounded-full p-1 shadow-lg"
                style={{ left: `${progress}%`, transform: 'translateX(-50%)' }}
              >
                <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
              </motion.div>
            </div>

            <CardTitle className="mt-8 text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 dark:from-white dark:via-indigo-100 dark:to-purple-100 bg-clip-text text-transparent leading-tight">
              {question.question}
            </CardTitle>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            <RadioGroup 
              value={currentAnswer || ""} 
              onValueChange={onAnswerChange} 
              className="space-y-4"
            >
              {question.options.map((option, index) => (
                <motion.div
                  key={option.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className={`group relative overflow-hidden rounded-2xl transition-all duration-300 cursor-pointer ${
                    currentAnswer === option.id
                      ? "scale-[1.02] shadow-lg"
                      : "hover:scale-[1.01] hover:shadow-md"
                  }`}
                  onClick={() => onAnswerChange(option.id)}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 transition-all duration-300 ${
                    currentAnswer === option.id
                      ? "bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20"
                      : "bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 group-hover:from-indigo-50 group-hover:to-purple-50 dark:group-hover:from-indigo-900/20 dark:group-hover:to-purple-900/20"
                  }`} />
                  
                  {/* Border */}
                  <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                    currentAnswer === option.id
                      ? "ring-2 ring-indigo-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900"
                      : "ring-1 ring-gray-200 dark:ring-gray-700 group-hover:ring-indigo-300 dark:group-hover:ring-indigo-600"
                  }`} />

                  <div className="relative flex items-center space-x-4 p-6">
                    {/* Custom Radio */}
                    <div className="relative">
                      <RadioGroupItem 
                        value={option.id} 
                        id={option.id} 
                        className="sr-only" 
                      />
                      <div className={`w-6 h-6 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                        currentAnswer === option.id
                          ? "border-indigo-500 bg-indigo-500"
                          : "border-gray-300 dark:border-gray-600 group-hover:border-indigo-400"
                      }`}>
                        {currentAnswer === option.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="w-2 h-2 bg-white rounded-full"
                          />
                        )}
                      </div>
                    </div>

                    {/* Emoji */}
                    {option.emoji && (
                      <span className="text-2xl">{option.emoji}</span>
                    )}

                    {/* Label */}
                    <Label
                      htmlFor={option.id}
                      className={`flex-grow cursor-pointer font-medium text-lg transition-all duration-300 ${
                        currentAnswer === option.id
                          ? "text-indigo-700 dark:text-indigo-300"
                          : "text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                      }`}
                    >
                      {option.label}
                    </Label>

                    {/* Selection Indicator */}
                    {currentAnswer === option.id && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center"
                      >
                        <ArrowRight className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </RadioGroup>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-12">
              <Button
                onClick={onPrevious}
                disabled={currentQuestion === 0}
                variant="outline"
                className="rounded-full px-8 py-3 border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300 disabled:opacity-50"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Précédent
              </Button>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={onNext}
                  disabled={!currentAnswer || isAnimating}
                  className="rounded-full px-8 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentQuestion < totalQuestions - 1 ? (
                    <>
                      Suivant
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Voir les résultats
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  )
}