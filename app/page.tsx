"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight, Shield, Activity, MapPin, MessageCircle, Users, FileText } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = 3

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
    }, 5000)
    return () => clearTimeout(timer)
  }, [currentSlide, totalSlides])

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
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

  const heroSlides = [
    {
      title: "Dépistage VIH accessible et confidentiel",
      description:
        "Prenez soin de votre santé avec un accès facile aux informations et aux centres de dépistage près de chez vous.",
      image: "hiv.jpg",
      color: "from-violet-600 to-indigo-700",
    },
    {
      title: "Suivi personnalisé et sécurisé",
      description:
        "Recevez vos résultats en ligne et bénéficiez d'un accompagnement adapté à votre situation en toute confidentialité.",
      image: "hiv.jpg",
      color: "from-teal-500 to-emerald-600",
    },
    {
      title: "Informations fiables et actualisées",
      description:
        "Accédez à des ressources éducatives vérifiées sur le VIH, sa prévention et les traitements disponibles.",
      image: "hiv.jpg",
      color: "from-blue-600 to-cyan-600",
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <AnimatePresence mode="wait">
          {heroSlides.map(
            (slide, index) =>
              currentSlide === index && (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${slide.color} opacity-80 z-10`}
                    style={{ mixBlendMode: "multiply" }}
                  ></div>
                  <div className="absolute inset-0 bg-[url('https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FHIV&psig=AOvVaw0vtnCHD4dpm2-5YseZdtGO&ust=1748273018596000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCOCB1df2vo0DFQAAAAAdAAAAABAV')] bg-cover bg-center opacity-40"></div>
                </motion.div>
              ),
          )}
        </AnimatePresence>

        <div className="container mx-auto px-4 md:px-6 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-white max-w-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                    {heroSlides[currentSlide].title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
                    {heroSlides[currentSlide].description}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-indigo-700 hover:bg-white/90 text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  <Link href="/evaluation">
                    Évaluer mes symptômes
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/20 text-lg px-8 py-6 rounded-full"
                >
                  <Link href="/centres">Trouver un centre</Link>
                </Button>
              </div>

              <div className="flex mt-12 space-x-2">
                {Array.from({ length: totalSlides }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      i === currentSlide ? "bg-white w-8" : "bg-white/50"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                <Image src="hiv.jpg" alt="Dépistage VIH" fill className="object-cover" />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent z-20"></div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
          >
            <StatCard
              number="95%"
              text="des cas de VIH peuvent être traités efficacement s'ils sont détectés tôt"
              icon={<Activity className="h-10 w-10 text-indigo-600" />}
            />
            <StatCard
              number="38%"
              text="des personnes vivant avec le VIH ignorent leur statut sérologique"
              icon={<Shield className="h-10 w-10 text-indigo-600" />}
            />
            <StatCard
              number="100%"
              text="confidentiel, notre plateforme garantit votre anonymat"
              icon={<Shield className="h-10 w-10 text-indigo-600" />}
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              Une plateforme complète pour votre santé
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez tous nos services conçus pour vous accompagner à chaque étape de votre parcours de dépistage.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          >
            <FeatureCard
              icon={<FileText className="h-8 w-8 text-indigo-600" />}
              title="Sensibilisation"
              description="Accédez à des ressources éducatives sur le VIH, ses modes de transmission et les moyens de prévention."
              link="/sensibilisation"
            />
            <FeatureCard
              icon={<Activity className="h-8 w-8 text-indigo-600" />}
              title="Auto-évaluation"
              description="Évaluez vos symptômes et risques potentiels grâce à notre questionnaire interactif confidentiel."
              link="/evaluation"
              featured={true}
            />
            <FeatureCard
              icon={<MapPin className="h-8 w-8 text-indigo-600" />}
              title="Centres de dépistage"
              description="Localisez les centres de dépistage les plus proches de chez vous avec toutes les informations pratiques."
              link="/centres"
            />
            <FeatureCard
              icon={<MessageCircle className="h-8 w-8 text-indigo-600" />}
              title="Chatbot d'assistance"
              description="Posez vos questions et recevez des conseils personnalisés grâce à notre assistant virtuel."
              link="/chatbot"
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8 text-indigo-600" />}
              title="Espace confidentiel"
              description="Suivez votre historique de dépistage et recevez vos résultats en toute confidentialité."
              link="/espace-personnel"
              featured={true}
            />
            <FeatureCard
              icon={<Users className="h-8 w-8 text-indigo-600" />}
              title="Forum communautaire"
              description="Échangez anonymement avec d'autres utilisateurs et posez vos questions dans un espace sécurisé."
              link="/forum"
            />
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-indigo-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-indigo-800">Témoignages</h2>
            <p className="text-xl text-indigo-700/80">
              Découvrez les expériences de personnes qui ont utilisé notre plateforme.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote="Le dépistage était une source d'anxiété pour moi, mais grâce à cette plateforme, j'ai pu trouver un centre près de chez moi et obtenir toutes les informations dont j'avais besoin."
              author="Sophie, 28 ans"
            />
            <TestimonialCard
              quote="L'outil d'auto-évaluation m'a aidé à comprendre mes risques et à prendre la décision de me faire dépister. Le processus était simple et rassurant."
              author="Thomas, 34 ans"
              featured={true}
            />
            <TestimonialCard
              quote="J'apprécie particulièrement la confidentialité de la plateforme. Pouvoir accéder à mes résultats en ligne m'a évité beaucoup de stress."
              author="Marie, 31 ans"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Prenez soin de votre santé dès aujourd'hui</h2>
            <p className="text-xl md:text-2xl mb-10 text-white/90">
              Le dépistage précoce du VIH permet une prise en charge rapide et efficace. Notre plateforme vous
              accompagne à chaque étape de votre parcours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-indigo-700 hover:bg-white/90 text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                <Link href="/inscription">
                  Créer un compte confidentiel
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/20 text-lg px-8 py-6 rounded-full"
              >
                <Link href="/centres">Explorer les centres</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-semibold text-gray-700">Nos partenaires</h2>
          </motion.div>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-70">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-32 h-12 bg-gray-200 rounded-md"></div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  link,
  featured = false,
}: {
  icon: React.ReactNode
  title: string
  description: string
  link: string
  featured?: boolean
}) {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <motion.div variants={fadeInUp}>
      <div
        className={`h-full rounded-2xl p-8 transition-all duration-300 hover:shadow-xl ${
          featured
            ? "bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100"
            : "bg-white border border-gray-100 hover:border-indigo-100"
        }`}
      >
        <div
          className={`rounded-full w-16 h-16 flex items-center justify-center mb-6 ${
            featured ? "bg-gradient-to-br from-indigo-600 to-violet-600 text-white" : "bg-indigo-50"
          }`}
        >
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
        <Button
          asChild
          variant={featured ? "default" : "outline"}
          className={
            featured
              ? "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-full"
              : "text-indigo-600 border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-300 rounded-full"
          }
        >
          <Link href={link}>
            En savoir plus
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </motion.div>
  )
}

function StatCard({ number, text, icon }: { number: string; text: string; icon: React.ReactNode }) {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <motion.div variants={fadeInUp}>
      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-all h-full flex flex-col items-center text-center">
        <div className="rounded-full w-20 h-20 bg-indigo-50 flex items-center justify-center mb-6">{icon}</div>
        <p className="text-4xl font-bold text-indigo-600 mb-4">{number}</p>
        <p className="text-gray-700 leading-relaxed">{text}</p>
      </div>
    </motion.div>
  )
}

function TestimonialCard({ quote, author, featured = false }: { quote: string; author: string; featured?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div
        className={`rounded-2xl p-8 h-full ${
          featured
            ? "bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg"
            : "bg-white border border-indigo-100"
        }`}
      >
        <div className="mb-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={`text-2xl ${featured ? "text-yellow-300" : "text-yellow-400"}`}>
              ★
            </span>
          ))}
        </div>
        <p className={`text-lg mb-6 leading-relaxed ${featured ? "text-white/90" : "text-gray-600"}`}>"{quote}"</p>
        <p className={`font-semibold ${featured ? "text-white" : "text-indigo-600"}`}>{author}</p>
      </div>
    </motion.div>
  )
}