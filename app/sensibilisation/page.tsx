"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Lightbulb,
  Sparkles,
  Brain,
  Target,
  Microscope,
  Zap,
  Shield,
  Stethoscope,
  Info,
  CheckCircle2,
  AlertCircle,
  Heart,
  TrendingUp,
  Video,
  FileText,
  Users,
  Download,
  Play,
  Eye,
  Star,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"
import { FloatingNav } from "@/components/sensibilisation/floating-nav"
import { StatsSection } from "@/components/sensibilisation/stats-section"
import { InteractiveQuiz } from "@/components/sensibilisation/interactive-quiz"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function SensibilisationPage() {
  const [activeSection, setActiveSection] = useState("hero")
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  // Track active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "stats", "understanding", "prevention", "quiz", "resources"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50 dark:from-gray-900 dark:via-gray-950 dark:to-indigo-950 overflow-hidden">
        {/* Animated Background */}
        <motion.div style={{ y: backgroundY }} className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/20 via-purple-100/20 to-violet-100/20 dark:from-indigo-900/10 dark:via-purple-900/10 dark:to-violet-900/10" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-indigo-400/10 to-violet-400/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 to-violet-600 z-50 origin-left"
          style={{ scaleX: scrollYProgress }}
        />

        {/* Floating Navigation */}
        <FloatingNav activeSection={activeSection} />

        <div className="relative z-10 pt-24 pb-16 px-4">
          <div className="container mx-auto">
            {/* Hero Section */}
            <section id="hero" className="mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg"
                >
                  <Lightbulb className="h-4 w-4" />
                  Espace d'Apprentissage Interactif
                  <Sparkles className="h-4 w-4" />
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600"
                >
                  Sensibilisation VIH
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed"
                >
                  Découvrez tout ce que vous devez savoir sur le VIH à travers
                  une expérience d'apprentissage moderne, interactive et
                  bienveillante. Informez-vous, testez vos connaissances et
                  devenez acteur de la prévention.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-full px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <Link href="#understanding">
                      <Brain className="h-5 w-5 mr-2" />
                      Commencer l'apprentissage
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-2 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-full px-8 py-6 text-lg backdrop-blur-sm"
                  >
                    <Link href="#quiz">
                      <Target className="h-5 w-5 mr-2" />
                      Tester mes connaissances
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </section>

            {/* Statistics Section */}
            <StatsSection />

            {/* Understanding Section */}
            <section id="understanding" className="mb-20">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                  Comprendre le VIH
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                  Une approche moderne et interactive pour apprendre les bases
                  du VIH
                </p>
              </motion.div>

              <Tabs defaultValue="basics" className="max-w-6xl mx-auto">
                <TabsList className="grid w-full grid-cols-4 mb-12 rounded-2xl p-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-2xl border border-white/20 dark:border-gray-700/20">
                  <TabsTrigger
                    value="basics"
                    className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-violet-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                  >
                    <Microscope className="h-4 w-4 mr-2" />
                    Les bases
                  </TabsTrigger>
                  <TabsTrigger
                    value="transmission"
                    className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-violet-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Transmission
                  </TabsTrigger>
                  <TabsTrigger
                    value="prevention"
                    className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-violet-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Prévention
                  </TabsTrigger>
                  <TabsTrigger
                    value="treatment"
                    className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-violet-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                  >
                    <Stethoscope className="h-4 w-4 mr-2" />
                    Traitement
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="basics">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg overflow-hidden">
                      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 text-white p-8">
                        <h3 className="text-2xl font-bold flex items-center gap-3 mb-2">
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{
                              duration: 20,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "linear",
                            }}
                          >
                            <Microscope className="h-8 w-8" />
                          </motion.div>
                          Qu'est-ce que le VIH ?
                        </h3>
                        <p className="text-white/80 text-lg">
                          Comprendre le virus de l'immunodéficience humaine
                        </p>
                      </div>
                      <CardContent className="p-8 space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          <div className="space-y-6">
                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.2 }}
                              className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-2xl p-6"
                            >
                              <h4 className="text-xl font-semibold mb-4 text-indigo-800 dark:text-indigo-300 flex items-center gap-2">
                                <Info className="h-5 w-5" />
                                Définition
                              </h4>
                              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                Le VIH (Virus de l'Immunodéficience Humaine) est
                                un virus qui attaque le système immunitaire,
                                affaiblissant la capacité du corps à combattre
                                les infections et certaines maladies.
                              </p>
                            </motion.div>

                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.4 }}
                              className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-2xl p-6"
                            >
                              <h4 className="text-xl font-semibold mb-4 text-green-800 dark:text-green-300 flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5" />
                                Bonne nouvelle
                              </h4>
                              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                Avec les traitements actuels, une personne
                                séropositive peut vivre une vie normale et en
                                bonne santé, avec une espérance de vie similaire
                                à celle de la population générale.
                              </p>
                            </motion.div>
                          </div>

                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 rounded-2xl p-6"
                          >
                            <h4 className="text-xl font-semibold mb-6 text-purple-800 dark:text-purple-300">
                              Évolution sans traitement
                            </h4>
                            <div className="space-y-4">
                              <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                <span className="text-gray-700 dark:text-gray-300">
                                  Infection initiale
                                </span>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-orange-400"></div>
                                <span className="text-gray-700 dark:text-gray-300">
                                  Phase asymptomatique
                                </span>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                <span className="text-gray-700 dark:text-gray-300">
                                  SIDA (sans traitement)
                                </span>
                              </div>
                            </div>
                            <div className="mt-6 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                💡 <strong>Important :</strong> Avec un
                                traitement approprié, l'évolution vers le SIDA
                                peut être évitée.
                              </p>
                            </div>
                          </motion.div>
                        </div>

                        <Alert className="border-0 bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/30 border-l-4 border-l-indigo-500">
                          <AlertCircle className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                          <AlertTitle className="text-indigo-800 dark:text-indigo-300">
                            Concept I=I
                          </AlertTitle>
                          <AlertDescription className="text-gray-700 dark:text-gray-300">
                            Une personne séropositive sous traitement efficace
                            avec une charge virale indétectable ne transmet pas
                            le VIH. C'est ce qu'on appelle le concept "I=I"
                            (Indétectable = Intransmissible).
                          </AlertDescription>
                        </Alert>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                <TabsContent value="transmission">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg overflow-hidden">
                        <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-6">
                          <h3 className="text-xl font-bold flex items-center gap-2">
                            <AlertCircle className="h-6 w-6" />
                            Modes de transmission
                          </h3>
                        </div>
                        <CardContent className="p-6 space-y-4">
                          {[
                            "Rapports sexuels non protégés",
                            "Partage de matériel d'injection",
                            "Transmission mère-enfant",
                            "Contact avec du sang contaminé",
                          ].map((mode, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center gap-3 p-3 rounded-xl bg-red-50 dark:bg-red-950/20"
                            >
                              <div className="w-2 h-2 rounded-full bg-red-500"></div>
                              <span className="text-gray-700 dark:text-gray-300">
                                {mode}
                              </span>
                            </motion.div>
                          ))}
                        </CardContent>
                      </Card>

                      <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg overflow-hidden">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6">
                          <h3 className="text-xl font-bold flex items-center gap-2">
                            <CheckCircle2 className="h-6 w-6" />
                            Le VIH ne se transmet PAS par
                          </h3>
                        </div>
                        <CardContent className="p-6 space-y-4">
                          {[
                            "Contacts quotidiens (poignées de main)",
                            "Objets partagés (téléphone, vaisselle)",
                            "Salive, larmes ou sueur",
                            "Piqûres d'insectes",
                          ].map((mode, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: 20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center gap-3 p-3 rounded-xl bg-green-50 dark:bg-green-950/20"
                            >
                              <div className="w-2 h-2 rounded-full bg-green-500"></div>
                              <span className="text-gray-700 dark:text-gray-300">
                                {mode}
                              </span>
                            </motion.div>
                          ))}
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="prevention">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-8">
                        <h3 className="text-2xl font-bold flex items-center gap-3 mb-2">
                          <Shield className="h-8 w-8" />
                          Prévention et protection
                        </h3>
                        <p className="text-white/80 text-lg">
                          Comment se protéger et protéger les autres
                        </p>
                      </div>
                      <CardContent className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {[
                            {
                              title: "Préservatifs",
                              description:
                                "Utilisez des préservatifs lors de chaque rapport sexuel",
                              icon: Shield,
                              color: "blue",
                            },
                            {
                              title: "PrEP",
                              description:
                                "Traitement préventif pour les personnes à haut risque",
                              icon: Stethoscope,
                              color: "purple",
                            },
                            {
                              title: "TPE",
                              description:
                                "Traitement d'urgence dans les 48h après exposition",
                              icon: AlertCircle,
                              color: "orange",
                            },
                            {
                              title: "Dépistage régulier",
                              description:
                                "Connaître son statut permet de prendre les mesures appropriées",
                              icon: Heart,
                              color: "green",
                            },
                          ].map((item, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ scale: 1.05 }}
                              className={`p-6 rounded-2xl bg-gradient-to-br ${
                                item.color === "blue"
                                  ? "from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30"
                                  : item.color === "purple"
                                  ? "from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30"
                                  : item.color === "orange"
                                  ? "from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30"
                                  : "from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30"
                              } cursor-pointer transition-all duration-300`}
                            >
                              <div
                                className={`rounded-full p-3 w-12 h-12 mb-4 ${
                                  item.color === "blue"
                                    ? "bg-blue-500"
                                    : item.color === "purple"
                                    ? "bg-purple-500"
                                    : item.color === "orange"
                                    ? "bg-orange-500"
                                    : "bg-green-500"
                                }`}
                              >
                                <item.icon className="h-6 w-6 text-white" />
                              </div>
                              <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                                {item.title}
                              </h4>
                              <p className="text-gray-600 dark:text-gray-400">
                                {item.description}
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                <TabsContent value="treatment">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg overflow-hidden">
                      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white p-8">
                        <h3 className="text-2xl font-bold flex items-center gap-3 mb-2">
                          <Heart className="h-8 w-8" />
                          Traitement et espoir
                        </h3>
                        <p className="text-white/80 text-lg">
                          Les avancées médicales qui changent tout
                        </p>
                      </div>
                      <CardContent className="p-8 space-y-8">
                        <div className="text-center">
                          <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                              type: "spring",
                              stiffness: 200,
                              delay: 0.2,
                            }}
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-950/30 dark:to-emerald-950/30 px-6 py-3 rounded-full mb-6"
                          >
                            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                            <span className="text-green-800 dark:text-green-300 font-semibold">
                              Espérance de vie normale avec traitement
                            </span>
                          </motion.div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {[
                            {
                              title: "Efficacité",
                              value: "95%",
                              description: "des traitements sont efficaces",
                              icon: TrendingUp,
                              color: "green",
                            },
                            {
                              title: "Qualité de vie",
                              value: "100%",
                              description: "vie normale possible",
                              icon: Heart,
                              color: "red",
                            },
                            {
                              title: "Transmission",
                              value: "0%",
                              description: "si charge virale indétectable",
                              icon: Shield,
                              color: "blue",
                            },
                          ].map((stat, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.1 }}
                              className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 shadow-lg"
                            >
                              <div
                                className={`rounded-full p-3 w-12 h-12 mx-auto mb-4 ${
                                  stat.color === "green"
                                    ? "bg-green-500"
                                    : stat.color === "red"
                                    ? "bg-red-500"
                                    : "bg-blue-500"
                                }`}
                              >
                                <stat.icon className="h-6 w-6 text-white" />
                              </div>
                              <p
                                className={`text-3xl font-bold mb-2 ${
                                  stat.color === "green"
                                    ? "text-green-600 dark:text-green-400"
                                    : stat.color === "red"
                                    ? "text-red-600 dark:text-red-400"
                                    : "text-blue-600 dark:text-blue-400"
                                }`}
                              >
                                {stat.value}
                              </p>
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                {stat.title}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {stat.description}
                              </p>
                            </motion.div>
                          ))}
                        </div>

                        <Alert className="border-0 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-l-4 border-l-green-500">
                          <Heart className="h-5 w-5 text-green-600 dark:text-green-400" />
                          <AlertTitle className="text-green-800 dark:text-green-300">
                            Message d'espoir
                          </AlertTitle>
                          <AlertDescription className="text-gray-700 dark:text-gray-300">
                            Grâce aux traitements antirétroviraux modernes, une
                            personne diagnostiquée séropositive aujourd'hui peut
                            vivre une vie longue, saine et épanouie. Le plus
                            important est de commencer le traitement rapidement
                            après le diagnostic.
                          </AlertDescription>
                        </Alert>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              </Tabs>
            </section>

            {/* Interactive Quiz Section */}
            <section id="quiz" className="mb-20">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                  Testez vos connaissances
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                  Un quiz interactif pour vérifier votre compréhension
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <InteractiveQuiz />
              </motion.div>
            </section>

            {/* Resources Section */}
            <section id="resources" className="mb-20">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                  Ressources et outils
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                  Documents, vidéos et outils pour approfondir vos connaissances
                </p>
              </motion.div>

              <Tabs defaultValue="videos" className="max-w-6xl mx-auto">
                <TabsList className="grid w-full grid-cols-3 mb-12 rounded-2xl p-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-2xl">
                  <TabsTrigger
                    value="videos"
                    className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-violet-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
                  >
                    <Video className="h-4 w-4 mr-2" />
                    Vidéos
                  </TabsTrigger>
                  <TabsTrigger
                    value="documents"
                    className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-violet-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Documents
                  </TabsTrigger>
                  <TabsTrigger
                    value="testimonials"
                    className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-violet-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Témoignages
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="videos">
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  >
                    {[
                      {
                        title: "Comprendre le VIH en 3 minutes",
                        description: "Une explication simple et claire du VIH",
                        duration: "3:24",
                        featured: false,
                      },
                      {
                        title: "Les différents tests de dépistage",
                        description: "Présentation des méthodes de dépistage",
                        duration: "5:12",
                        featured: true,
                      },
                      {
                        title: "Vivre avec le VIH aujourd'hui",
                        description: "Témoignages et informations pratiques",
                        duration: "8:45",
                        featured: false,
                      },
                    ].map((video, index) => (
                      <motion.div key={index} variants={fadeInUp}>
                        <Card
                          className={`border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden group ${
                            video.featured
                              ? "ring-2 ring-indigo-500 dark:ring-indigo-400"
                              : ""
                          }`}
                        >
                          <div className="relative aspect-video bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all duration-300"
                            >
                              <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full bg-white/90 hover:bg-white h-16 w-16 shadow-2xl"
                              >
                                <Play className="h-8 w-8 text-indigo-600 ml-1" />
                              </Button>
                            </motion.div>
                            <div className="absolute bottom-3 right-3 bg-black/70 text-white text-sm px-3 py-1 rounded-full">
                              {video.duration}
                            </div>
                            {video.featured && (
                              <div className="absolute top-3 left-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm px-3 py-1 rounded-full flex items-center gap-1">
                                <Star className="h-3 w-3" />
                                Recommandé
                              </div>
                            )}
                          </div>
                          <CardContent className="p-6">
                            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                              {video.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                              {video.description}
                            </p>
                            <Button
                              variant="link"
                              className="p-0 h-auto text-indigo-600 dark:text-indigo-400 flex items-center"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Regarder maintenant
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </TabsContent>

                <TabsContent value="documents">
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                  >
                    {[
                      {
                        title: "Guide complet du dépistage VIH",
                        description:
                          "Tout savoir sur les différents tests disponibles et leur fiabilité",
                        icon: FileText,
                        size: "2.4 MB",
                        pages: "24 pages",
                      },
                      {
                        title: "Brochure prévention et protection",
                        description:
                          "Les moyens de prévention expliqués simplement avec illustrations",
                        icon: Shield,
                        size: "1.8 MB",
                        pages: "16 pages",
                      },
                    ].map((doc, index) => (
                      <motion.div key={index} variants={fadeInUp}>
                        <Card className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 group overflow-hidden">
                          <CardContent className="p-8">
                            <div className="flex items-start gap-6">
                              <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className="rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-900/30 dark:to-violet-900/30 p-4"
                              >
                                <doc.icon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                              </motion.div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-xl mb-2 text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                  {doc.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                                  {doc.description}
                                </p>
                                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                                  <span>{doc.size}</span>
                                  <span>•</span>
                                  <span>{doc.pages}</span>
                                </div>
                                <Button className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 rounded-full">
                                  <Download className="h-4 w-4 mr-2" />
                                  Télécharger PDF
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </TabsContent>

                <TabsContent value="testimonials">
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                  >
                    {[
                      {
                        name: "Sophie, 34 ans",
                        title: "Vivre avec le VIH depuis 8 ans",
                        content:
                          "J'ai découvert ma séropositivité il y a 8 ans. Au début, j'étais terrifiée, je pensais que ma vie était finie. Mais grâce au traitement et au soutien de mes proches, j'ai appris à vivre normalement. Aujourd'hui, ma charge virale est indétectable.",
                        featured: true,
                      },
                      {
                        name: "Marc, 42 ans",
                        title: "L'importance du dépistage précoce",
                        content:
                          "J'ai été diagnostiqué séropositif lors d'un dépistage de routine. Ce diagnostic précoce m'a permis de commencer un traitement immédiatement. Aujourd'hui, je vis normalement et mon espérance de vie est la même que celle de n'importe qui.",
                        featured: false,
                      },
                    ].map((testimonial, index) => (
                      <motion.div key={index} variants={fadeInUp}>
                        <Card
                          className={`border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 h-full overflow-hidden ${
                            testimonial.featured
                              ? "ring-2 ring-purple-500 dark:ring-purple-400"
                              : ""
                          }`}
                        >
                          <div
                            className={`${
                              testimonial.featured
                                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                                : "bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700"
                            } p-6`}
                          >
                            <div className="flex items-center gap-3">
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                className={`rounded-full p-3 ${
                                  testimonial.featured
                                    ? "bg-white/20"
                                    : "bg-indigo-100 dark:bg-indigo-900/30"
                                }`}
                              >
                                <Users
                                  className={`h-6 w-6 ${
                                    testimonial.featured
                                      ? "text-white"
                                      : "text-indigo-600 dark:text-indigo-400"
                                  }`}
                                />
                              </motion.div>
                              <div>
                                <h3
                                  className={`text-lg font-bold ${
                                    testimonial.featured
                                      ? "text-white"
                                      : "text-gray-900 dark:text-gray-100"
                                  }`}
                                >
                                  {testimonial.title}
                                </h3>
                                <p
                                  className={`${
                                    testimonial.featured
                                      ? "text-white/80"
                                      : "text-gray-600 dark:text-gray-400"
                                  }`}
                                >
                                  {testimonial.name}
                                </p>
                              </div>
                            </div>
                            {testimonial.featured && (
                              <div className="mt-3">
                                <span className="bg-white/20 text-white border-0 px-3 py-1 rounded-full text-sm flex items-center gap-1 w-fit">
                                  <Star className="h-3 w-3" />
                                  Témoignage inspirant
                                </span>
                              </div>
                            )}
                          </div>
                          <CardContent className="p-6">
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
                              "{testimonial.content}"
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </TabsContent>
              </Tabs>
            </section>

            {/* FAQ Section */}
            <section className="mb-20">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                  Questions fréquentes
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                  Réponses aux questions les plus posées sur le VIH
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto"
              >
                <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg overflow-hidden">
                  <CardContent className="p-8">
                    <Accordion
                      type="single"
                      collapsible
                      className="w-full space-y-4"
                    >
                      {[
                        {
                          question:
                            "Combien de temps après une exposition peut-on détecter le VIH ?",
                          answer:
                            "La période fenêtre varie selon le type de test :\n• Tests de 4ème génération : 6 semaines\n• Tests rapides (TROD) : 3 mois\n• Autotests : 3 mois\n\nEn cas de doute, consultez un professionnel de santé.",
                        },
                        {
                          question: "Quels sont les symptômes du VIH ?",
                          answer:
                            "Les symptômes initiaux peuvent ressembler à ceux d'une grippe : fièvre, fatigue, maux de gorge, ganglions enflés, éruption cutanée. Ces symptômes apparaissent généralement 2 à 4 semaines après l'infection. Cependant, de nombreuses personnes ne présentent aucun symptôme pendant des années.",
                        },
                        {
                          question: "Existe-t-il un traitement contre le VIH ?",
                          answer:
                            "Il n'existe pas de remède définitif, mais les traitements antirétroviraux actuels sont très efficaces. Pris correctement, ils permettent de réduire la charge virale à un niveau indétectable, empêchent la progression vers le SIDA, permettent de vivre normalement et empêchent la transmission du virus.",
                        },
                      ].map((item, index) => (
                        <AccordionItem
                          key={index}
                          value={`item-${index}`}
                          className="border border-gray-200 dark:border-gray-700 rounded-xl px-6 data-[state=open]:bg-indigo-50 dark:data-[state=open]:bg-indigo-950/20 transition-all duration-300"
                        >
                          <AccordionTrigger className="text-left hover:text-indigo-600 dark:hover:text-indigo-400 py-6 text-lg font-medium hover:no-underline">
                            <div className="flex items-center gap-3">
                              <div className="rounded-full bg-indigo-100 dark:bg-indigo-900/30 p-2">
                                <Info className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                              </div>
                              {item.question}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pb-6 pt-2">
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 ml-11 shadow-sm">
                              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                                {item.answer}
                              </p>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </motion.div>
            </section>

            {/* CTA Section */}
            <section className="mb-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Card className="border-0 shadow-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 text-white overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/90 via-purple-600/90 to-violet-600/90"></div>
                  <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
                  <CardContent className="p-12 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          delay: 0.2,
                        }}
                        className="inline-flex items-center gap-2 bg-white/20 px-6 py-3 rounded-full mb-6"
                      >
                        <Sparkles className="h-5 w-5" />
                        <span className="font-medium">
                          Vous avez des questions ?
                        </span>
                      </motion.div>
                      <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Besoin d'aide personnalisée ?
                      </h2>
                      <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-3xl mx-auto">
                        Notre assistant virtuel peut vous aider à trouver des
                        réponses à vos questions et vous orienter vers les
                        ressources adaptées à votre situation.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            asChild
                            size="lg"
                            className="bg-white text-indigo-700 hover:bg-white/90 text-lg px-8 py-6 rounded-full shadow-xl"
                          >
                            <Link href="/chatbot">
                              <MessageSquare className="h-6 w-6 mr-2" />
                              Discuter avec l'assistant
                            </Link>
                          </Button>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="border-white text-white hover:bg-white/20 text-lg px-8 py-6 rounded-full backdrop-blur-sm"
                          >
                            <Link href="/evaluation">
                              <Target className="h-6 w-6 mr-2" />
                              Évaluer mes risques
                            </Link>
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}