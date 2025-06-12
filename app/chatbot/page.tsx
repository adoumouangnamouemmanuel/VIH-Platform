"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AnimatePresence, motion } from "framer-motion"
import {
  Clock,
  Heart,
  Info,
  MapPin,
  Maximize2,
  MessageCircle,
  Minimize2,
  Phone,
  Send,
  Sparkles,
  User,
  X,
} from "lucide-react"
import type React from "react"
import { useEffect, useRef, useState } from "react"

import {
  generateIntelligentResponse,
  getContextualSuggestions,
  getRealTimeSuggestions,
} from "@/components/chatbot/chatbot-engine"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

// Mock responses adapted for Niger/Africa context
const mockResponses: Record<string, string> = {
  default:
    "Je suis désolé, je n'ai pas bien compris votre question. Pourriez-vous reformuler ou choisir l'une des questions fréquentes ci-dessous ? Je suis là pour vous aider avec toutes vos questions sur le VIH au Niger.",
  bonjour:
    "Bonjour et bienvenue ! Je suis Amina, votre assistante virtuelle pour les questions sur le VIH au Niger. Comment puis-je vous aider aujourd'hui ? 😊",
  salut:
    "Salut ! Je suis Amina, votre assistante virtuelle. Comment puis-je vous accompagner dans vos questions sur le dépistage du VIH au Niger ?",
  test: "Au Niger, le test de dépistage du VIH est gratuit et confidentiel. Vous pouvez vous rendre dans les centres de santé publics, les hôpitaux régionaux comme l'Hôpital National de Niamey, ou les centres CEGIDD. Le test rapide donne des résultats en 15-30 minutes. Voulez-vous que je vous aide à trouver un centre près de chez vous ?",
  symptômes:
    "Les premiers symptômes du VIH peuvent apparaître 2-4 semaines après l'infection : fièvre, fatigue intense, maux de gorge, ganglions enflés, éruptions cutanées. Cependant, beaucoup de personnes n'ont aucun symptôme pendant des années. Au Niger, il est recommandé de faire un test si vous avez eu des rapports non protégés ou si vous présentez ces symptômes.",
  centres:
    "Au Niger, vous pouvez faire un test de dépistage dans plusieurs centres : l'Hôpital National de Niamey, les centres de santé de Maradi, Zinder, Tahoua, Agadez, et les centres CEGIDD dans les principales villes. Tous offrent des tests gratuits et confidentiels. Voulez-vous les coordonnées d'un centre spécifique ?",
  confidentialité:
    "Au Niger, tous les tests de dépistage du VIH sont strictement confidentiels selon la loi nigérienne. Dans les centres CEGIDD, vous pouvez même faire un test anonyme sans donner votre identité. Vos résultats ne sont partagés avec personne sans votre consentement.",
  résultats:
    "Les résultats des tests rapides sont disponibles en 15-30 minutes. Pour les tests sanguins classiques, comptez 1-3 jours. Au Niger, vous recevez vos résultats en main propre ou via notre plateforme sécurisée. Un conseiller est toujours disponible pour vous expliquer les résultats.",
  prévention:
    "Au Niger, la prévention du VIH passe par : l'utilisation systématique de préservatifs (disponibles gratuitement dans les centres de santé), la fidélité mutuelle, le dépistage régulier, et pour les personnes à haut risque, la PrEP est disponible dans certains centres spécialisés de Niamey.",
  traitement:
    "Au Niger, les traitements antirétroviraux sont gratuits et disponibles dans tous les hôpitaux régionaux. Avec un traitement bien suivi, une personne séropositive peut vivre normalement et ne plus transmettre le virus (charge virale indétectable). Le suivi médical est assuré par des spécialistes formés.",
  fenêtre:
    "La période fenêtre au Niger varie selon le test : 3 semaines pour les tests de 4ème génération disponibles à l'Hôpital National, et 3 mois pour les tests rapides utilisés dans les centres de santé. En cas de doute, consultez un professionnel dans un centre près de chez vous.",
  prep: "La PrEP (prophylaxie pré-exposition) est disponible au Niger dans certains centres spécialisés de Niamey et bientôt dans d'autres régions. Elle est recommandée pour les personnes à haut risque. Consultez le centre CEGIDD de Niamey pour plus d'informations et une évaluation personnalisée.",
  grossesse:
    "Au Niger, les femmes enceintes séropositives bénéficient d'un suivi spécialisé gratuit. Avec un traitement adapté, le risque de transmission à l'enfant est réduit à moins de 2%. Le suivi est assuré dans tous les hôpitaux régionaux avec des équipes formées.",
  coût: "Au Niger, tous les services liés au VIH sont gratuits : dépistage, conseil, traitement antirétroviral, suivi médical. C'est un engagement du gouvernement nigérien avec le soutien des partenaires internationaux. Aucun frais n'est demandé dans les structures publiques.",
}

// Suggested questions adapted for Niger context
const suggestedQuestions = [
  "Où faire un test de dépistage à Niamey ?",
  "Le dépistage est-il gratuit au Niger ?",
  "Quels sont les symptômes du VIH ?",
  "Comment se protéger du VIH ?",
  "Combien de temps pour avoir les résultats ?",
  "Le test est-il confidentiel au Niger ?",
  "Qu'est-ce que la PrEP ?",
  "VIH et grossesse au Niger",
]

// Quick action buttons
const quickActions = [
  { icon: MapPin, label: "Centres Niamey", action: "centres niamey" },
  { icon: Phone, label: "Urgence", action: "urgence" },
  { icon: Info, label: "PrEP", action: "prep" },
  { icon: Heart, label: "Soutien", action: "soutien" },
]

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  typing?: boolean
}

export default function ChatbotPage() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        "Bonjour ! Je suis Amina, votre assistante virtuelle spécialisée dans les questions sur le VIH au Niger. Comment puis-je vous aider aujourd'hui ? 🌟",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [realTimeSuggestions, setRealTimeSuggestions] = useState<string[]>([])
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>([
    "Où faire un test de dépistage à Niamey ?",
    "Le dépistage est-il gratuit au Niger ?",
    "Quels sont les symptômes du VIH ?",
    "Comment se protéger du VIH ?",
  ])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateBotResponse = (userInput: string): { response: string; relatedQuestions: string[] } => {
    return generateIntelligentResponse(userInput)
  }

  const handleSendMessage = (messageText?: string) => {
    const textToSend = messageText || inputValue
    if (textToSend.trim() === "") return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: textToSend,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)
    setShowSuggestions(false)
    setRealTimeSuggestions([])

    // Simulate bot thinking with realistic delay
    setTimeout(() => {
      // Add typing indicator
      const typingMessage: Message = {
        id: `typing-${Date.now()}`,
        content: "",
        sender: "bot",
        timestamp: new Date(),
        typing: true,
      }
      setMessages((prev) => [...prev, typingMessage])

      // Generate and add bot response after typing simulation
      setTimeout(
        () => {
          const { response, relatedQuestions } = generateBotResponse(textToSend)
          const botMessage: Message = {
            id: Date.now().toString(),
            content: response,
            sender: "bot",
            timestamp: new Date(),
          }

          setMessages((prev) => prev.filter((msg) => !msg.typing).concat([botMessage]))
          setIsTyping(false)

          // Mettre à jour les suggestions contextuelles
          setCurrentSuggestions(relatedQuestions || getContextualSuggestions(response))
          setShowSuggestions(true)
        },
        1500 + Math.random() * 1000,
      )
    }, 500)
  }

  const handleQuickAction = (action: string) => {
    handleSendMessage(action)
  }

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)

    // Générer des suggestions en temps réel
    if (value.length >= 2) {
      const suggestions = getRealTimeSuggestions(value)
      setRealTimeSuggestions(suggestions)
    } else {
      setRealTimeSuggestions([])
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-16 px-4 bg-gradient-to-br from-indigo-50 via-white to-violet-50 dark:from-gray-900 dark:via-gray-950 dark:to-indigo-950">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-4"
              >
                <Sparkles className="h-4 w-4" />
                Assistant IA Spécialisé VIH Niger
              </motion.div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                Amina - Votre Assistante Virtuelle
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
                Posez vos questions sur le VIH, le dépistage et la prévention au
                Niger. Amina est là pour vous aider 24h/24.
              </p>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => setIsOpen(true)}
                  size="lg"
                  className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-full px-8 py-6 text-lg shadow-lg"
                >
                  <MessageCircle className="h-6 w-6 mr-2" />
                  Discuter avec Amina
                </Button>
              </motion.div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  className="cursor-pointer"
                  onClick={() => {
                    setIsOpen(true);
                    setTimeout(() => handleQuickAction(action.action), 500);
                  }}
                >
                  <Card className="border-0 shadow-lg dark:shadow-indigo-900/10 hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                    <CardContent className="p-6 text-center">
                      <div className="rounded-full bg-gradient-to-r from-indigo-100 to-violet-100 dark:from-indigo-900/30 dark:to-violet-900/30 p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <action.icon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        {action.label}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {action.label === "Centres Niamey" &&
                          "Trouvez les centres de dépistage à Niamey"}
                        {action.label === "Urgence" &&
                          "Numéros d'urgence VIH au Niger"}
                        {action.label === "PrEP" &&
                          "Informations sur la prophylaxie pré-exposition"}
                        {action.label === "Soutien" &&
                          "Soutien psychologique et associations"}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-lg dark:shadow-indigo-900/10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-2">
                      <Phone className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                      Urgence VIH
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    Ligne d'urgence gratuite 24h/24
                  </p>
                  <p className="font-bold text-lg text-green-600 dark:text-green-400">
                    15 15
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg dark:shadow-indigo-900/10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-2">
                      <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                      Tests Gratuits
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    Dépistage gratuit dans tout le Niger
                  </p>
                  <p className="font-bold text-lg text-blue-600 dark:text-blue-400">
                    100% Gratuit
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg dark:shadow-indigo-900/10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-2">
                      <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                      Résultats Rapides
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    Tests rapides disponibles
                  </p>
                  <p className="font-bold text-lg text-purple-600 dark:text-purple-400">
                    15-30 min
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>

        {/* Floating Chatbot Widget */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="fixed bottom-6 right-6 z-50"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                className="relative bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-full p-4 shadow-2xl"
              >
                <MessageCircle className="h-8 w-8" />
                <motion.div
                  className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: 1,
                  }}
                  style={{ opacity: 0.3 }}
                />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chatbot Modal */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-end justify-end p-6"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, x: 100, y: 100 }}
                animate={{
                  scale: isMinimized ? 0.3 : 1,
                  opacity: 1,
                  x: 0,
                  y: 0,
                  width: isMinimized ? 80 : 400,
                  height: isMinimized ? 60 : 600,
                }}
                exit={{ scale: 0.8, opacity: 0, x: 100, y: 100 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col"
                style={{
                  width: isMinimized ? 80 : 400,
                  height: isMinimized ? 60 : 600,
                }}
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 text-white p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                      className="relative"
                    >
                      <Avatar className="h-8 w-8 ring-2 ring-white/30">
                        <AvatarImage
                          src="/placeholder.svg?height=32&width=32"
                          alt="Amina"
                        />
                        <AvatarFallback className="bg-white/20 text-white font-bold text-sm">
                          A
                        </AvatarFallback>
                      </Avatar>
                      <motion.div
                        className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                      />
                    </motion.div>
                    {!isMinimized && (
                      <div>
                        <h3 className="font-semibold text-sm">Amina</h3>
                        <p className="text-xs text-white/80">
                          Assistant VIH Niger
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {!isMinimized && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsMinimized(true)}
                        className="h-8 w-8 text-white hover:bg-white/20"
                      >
                        <Minimize2 className="h-4 w-4" />
                      </Button>
                    )}
                    {isMinimized && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsMinimized(false)}
                        className="h-8 w-8 text-white hover:bg-white/20"
                      >
                        <Maximize2 className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="h-8 w-8 text-white hover:bg-white/20"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {!isMinimized && (
                  <>
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-950">
                      <AnimatePresence mode="popLayout">
                        {messages.map((message) => (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{
                              duration: 0.3,
                              type: "spring",
                              stiffness: 200,
                            }}
                            className={`flex ${
                              message.sender === "user"
                                ? "justify-end"
                                : "justify-start"
                            }`}
                          >
                            <div className="flex items-start max-w-[85%] gap-2">
                              {message.sender === "bot" && (
                                <Avatar className="h-6 w-6 ring-1 ring-indigo-100 dark:ring-indigo-800">
                                  <AvatarImage
                                    src="/placeholder.svg?height=24&width=24"
                                    alt="Amina"
                                  />
                                  <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-violet-500 text-white text-xs">
                                    A
                                  </AvatarFallback>
                                </Avatar>
                              )}

                              <div
                                className={`rounded-2xl px-3 py-2 relative text-sm ${
                                  message.sender === "user"
                                    ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white"
                                    : "bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700"
                                }`}
                              >
                                {message.typing ? (
                                  <div className="flex items-center gap-1">
                                    <motion.div
                                      className="w-1.5 h-1.5 bg-indigo-600 rounded-full"
                                      animate={{ scale: [1, 1.2, 1] }}
                                      transition={{
                                        duration: 0.6,
                                        repeat: Number.POSITIVE_INFINITY,
                                        delay: 0,
                                      }}
                                    />
                                    <motion.div
                                      className="w-1.5 h-1.5 bg-indigo-600 rounded-full"
                                      animate={{ scale: [1, 1.2, 1] }}
                                      transition={{
                                        duration: 0.6,
                                        repeat: Number.POSITIVE_INFINITY,
                                        delay: 0.2,
                                      }}
                                    />
                                    <motion.div
                                      className="w-1.5 h-1.5 bg-indigo-600 rounded-full"
                                      animate={{ scale: [1, 1.2, 1] }}
                                      transition={{
                                        duration: 0.6,
                                        repeat: Number.POSITIVE_INFINITY,
                                        delay: 0.4,
                                      }}
                                    />
                                  </div>
                                ) : (
                                  <p className="leading-relaxed">
                                    {message.content}
                                  </p>
                                )}
                              </div>

                              {message.sender === "user" && (
                                <Avatar className="h-6 w-6 ring-1 ring-indigo-100 dark:ring-indigo-800">
                                  <AvatarImage
                                    src="/placeholder.svg?height=24&width=24"
                                    alt="User"
                                  />
                                  <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-xs">
                                    <User className="h-3 w-3" />
                                  </AvatarFallback>
                                </Avatar>
                              )}
                            </div>
                          </motion.div>
                        ))}
                        <div ref={messagesEndRef} />
                      </AnimatePresence>
                    </div>

                    {/* Suggestions */}
                    <AnimatePresence>
                      {(showSuggestions || realTimeSuggestions.length > 0) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="px-4 py-2 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
                        >
                          <div className="flex flex-wrap gap-1">
                            {(realTimeSuggestions.length > 0
                              ? realTimeSuggestions
                              : currentSuggestions
                            )
                              .slice(0, 4)
                              .map((question, index) => (
                                <motion.button
                                  key={index}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: index * 0.05 }}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() =>
                                    handleSuggestedQuestion(question)
                                  }
                                  className="text-xs px-2 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-800/50 transition-colors"
                                >
                                  {question.length > 25
                                    ? question.substring(0, 25) + "..."
                                    : question}
                                </motion.button>
                              ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Input */}
                    <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                      <form onSubmit={handleSubmit} className="flex gap-2">
                        <Input
                          type="text"
                          placeholder="Tapez votre message..."
                          value={inputValue}
                          onChange={handleInputChange}
                          className="flex-1 rounded-full border-gray-200 dark:border-gray-700 focus-visible:ring-indigo-500 text-sm"
                          disabled={isTyping}
                        />
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            type="submit"
                            size="icon"
                            className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 h-9 w-9"
                            disabled={inputValue.trim() === "" || isTyping}
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </motion.div>
                      </form>
                    </div>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </>
  );
}
