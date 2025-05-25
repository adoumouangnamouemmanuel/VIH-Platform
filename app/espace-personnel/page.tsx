"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Clock,
  Lock,
  Download,
  Bell,
  ChevronRight,
  FileText,
  CheckCircle2,
  AlertTriangle,
  User,
  Settings,
  Shield,
} from "lucide-react"
import Link from "next/link"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

// Mock data for test results
const testResults = [
  {
    id: 1,
    date: "15/04/2023",
    type: "Test sanguin",
    centre: "CeGIDD Paris Centre",
    status: "Négatif",
    available: true,
  },
  {
    id: 2,
    date: "10/01/2023",
    type: "Test rapide",
    centre: "Association AIDES",
    status: "Négatif",
    available: true,
  },
  {
    id: 3,
    date: "05/07/2022",
    type: "Test sanguin",
    centre: "Laboratoire MediTest",
    status: "Négatif",
    available: true,
  },
]

// Mock data for appointments
const appointments = [
  {
    id: 1,
    date: "22/05/2023",
    time: "14:30",
    type: "Consultation de suivi",
    centre: "CeGIDD Paris Centre",
    status: "Passé",
  },
  {
    id: 2,
    date: "10/06/2023",
    time: "10:15",
    type: "Test de dépistage",
    centre: "Hôpital Saint-Louis",
    status: "À venir",
  },
]

// Mock data for notifications
const notifications = [
  {
    id: 1,
    title: "Rappel de rendez-vous",
    message: "Votre rendez-vous au CeGIDD Paris Centre est prévu pour demain à 10:15.",
    date: "09/06/2023",
    read: false,
  },
  {
    id: 2,
    title: "Nouveau résultat disponible",
    message: "Les résultats de votre test du 15/04/2023 sont maintenant disponibles.",
    date: "18/04/2023",
    read: true,
  },
  {
    id: 3,
    title: "Rappel de dépistage",
    message: "Il est recommandé de faire un test de dépistage tous les 3 mois si vous avez des pratiques à risque.",
    date: "05/04/2023",
    read: true,
  },
]

export default function EspacePersonnelPage() {
  const [selectedTab, setSelectedTab] = useState("resultats")

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              Espace Personnel
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Suivez vos résultats de dépistage et gérez vos rendez-vous en toute confidentialité.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="border-0 shadow-lg dark:shadow-indigo-900/10 md:col-span-3">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-indigo-100 dark:bg-indigo-900/30 p-3">
                      <User className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <CardTitle>Bienvenue, Utilisateur</CardTitle>
                      <CardDescription>Dernière connexion: Aujourd'hui à 10:45</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 flex flex-col items-center text-center">
                      <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-2 mb-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Dernier test</p>
                      <p className="font-medium text-gray-900 dark:text-gray-100">15/04/2023</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 flex flex-col items-center text-center">
                      <div className="rounded-full bg-indigo-100 dark:bg-indigo-900/30 p-2 mb-2">
                        <Calendar className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Prochain rendez-vous</p>
                      <p className="font-medium text-gray-900 dark:text-gray-100">10/06/2023</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 flex flex-col items-center text-center">
                      <div className="rounded-full bg-amber-100 dark:bg-amber-900/30 p-2 mb-2">
                        <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Notifications</p>
                      <p className="font-medium text-gray-900 dark:text-gray-100">1 non lue</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg dark:shadow-indigo-900/10 bg-gradient-to-br from-indigo-600 to-violet-600 text-white">
                <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                  <Shield className="h-10 w-10 mb-4" />
                  <h3 className="text-lg font-semibold mb-2 text-center">Espace sécurisé</h3>
                  <p className="text-sm text-center text-white/80 mb-4">
                    Toutes vos données sont chiffrées et protégées. Seul vous pouvez y accéder.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white text-white hover:bg-white/20 rounded-full w-full"
                  >
                    Gérer la sécurité
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="resultats" className="mb-8" onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-3 mb-8 rounded-full p-1 bg-gray-100 dark:bg-gray-800">
                <TabsTrigger
                  value="resultats"
                  className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-violet-600 data-[state=active]:text-white"
                >
                  Résultats
                </TabsTrigger>
                <TabsTrigger
                  value="rendez-vous"
                  className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-violet-600 data-[state=active]:text-white"
                >
                  Rendez-vous
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-violet-600 data-[state=active]:text-white"
                >
                  Notifications
                </TabsTrigger>
              </TabsList>

              <TabsContent value="resultats">
                <motion.div key="resultats" variants={staggerContainer} initial="hidden" animate="visible">
                  <Card className="border-0 shadow-lg dark:shadow-indigo-900/10">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-2xl flex items-center">
                        <FileText className="h-6 w-6 mr-2 text-indigo-600 dark:text-indigo-400" />
                        Mes résultats de dépistage
                      </CardTitle>
                      <CardDescription>
                        Consultez l'historique de vos tests de dépistage et téléchargez vos résultats.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {testResults.length > 0 ? (
                        <div className="space-y-4">
                          {testResults.map((result) => (
                            <motion.div key={result.id} variants={fadeIn}>
                              <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-5 hover:border-indigo-200 dark:hover:border-indigo-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                  <div className="flex items-center mb-2 md:mb-0">
                                    <Calendar className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                                    <span className="text-gray-700 dark:text-gray-300">{result.date}</span>
                                    <span className="mx-2 text-gray-300 dark:text-gray-700">|</span>
                                    <span className="font-medium text-gray-900 dark:text-gray-100">{result.type}</span>
                                  </div>
                                  <Badge
                                    className={`${
                                      result.status === "Négatif"
                                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                        : result.status === "Positif"
                                          ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                                          : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                                    } rounded-full px-3`}
                                  >
                                    {result.status}
                                  </Badge>
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                  <div className="mb-3 md:mb-0">
                                    <p className="text-gray-700 dark:text-gray-300">Centre: {result.centre}</p>
                                  </div>
                                  {result.available ? (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="flex items-center rounded-full border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-950"
                                    >
                                      <Download className="h-4 w-4 mr-2" />
                                      Télécharger le PDF
                                    </Button>
                                  ) : (
                                    <Button variant="outline" size="sm" disabled className="rounded-full">
                                      Résultat non disponible
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <div className="rounded-full bg-indigo-100 dark:bg-indigo-900/30 p-4 mx-auto w-fit mb-4">
                            <FileText className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                          </div>
                          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                            Aucun résultat disponible
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                            Vous n'avez pas encore de résultats de dépistage. Prenez rendez-vous dans un centre pour
                            effectuer un test.
                          </p>
                          <Button
                            asChild
                            className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700"
                          >
                            <Link href="/centres">Trouver un centre de dépistage</Link>
                          </Button>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-between border-t p-6 bg-gray-50 dark:bg-gray-900">
                      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        <Lock className="h-4 w-4 mr-1 text-indigo-600 dark:text-indigo-400" />
                        Les résultats sont disponibles pendant 5 ans.
                      </p>
                      <Button
                        asChild
                        className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700"
                      >
                        <Link href="/centres">
                          Planifier un nouveau test
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="rendez-vous">
                <motion.div key="rendez-vous" variants={staggerContainer} initial="hidden" animate="visible">
                  <Card className="border-0 shadow-lg dark:shadow-indigo-900/10">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-2xl flex items-center">
                        <Calendar className="h-6 w-6 mr-2 text-indigo-600 dark:text-indigo-400" />
                        Mes rendez-vous
                      </CardTitle>
                      <CardDescription>Consultez et gérez vos rendez-vous de dépistage et de suivi.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {appointments.length > 0 ? (
                        <div className="space-y-4">
                          {appointments.map((appointment) => (
                            <motion.div key={appointment.id} variants={fadeIn}>
                              <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-5 hover:border-indigo-200 dark:hover:border-indigo-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                  <div className="flex items-center mb-2 md:mb-0">
                                    <Calendar className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                                    <span className="text-gray-700 dark:text-gray-300">{appointment.date}</span>
                                    <span className="mx-2 text-gray-300 dark:text-gray-700">|</span>
                                    <Clock className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                                    <span className="text-gray-700 dark:text-gray-300">{appointment.time}</span>
                                  </div>
                                  <Badge
                                    className={`${
                                      appointment.status === "À venir"
                                        ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300"
                                        : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                                    } rounded-full px-3`}
                                  >
                                    {appointment.status}
                                  </Badge>
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                  <div className="mb-3 md:mb-0">
                                    <p className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                                      {appointment.type}
                                    </p>
                                    <p className="text-gray-700 dark:text-gray-300">Centre: {appointment.centre}</p>
                                  </div>
                                  {appointment.status === "À venir" ? (
                                    <div className="flex gap-2">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="rounded-full border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-950"
                                      >
                                        Modifier
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="rounded-full border-red-200 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
                                      >
                                        Annuler
                                      </Button>
                                    </div>
                                  ) : (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="rounded-full border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-950"
                                    >
                                      Détails
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <div className="rounded-full bg-indigo-100 dark:bg-indigo-900/30 p-4 mx-auto w-fit mb-4">
                            <Calendar className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                          </div>
                          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                            Aucun rendez-vous programmé
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                            Vous n'avez pas de rendez-vous programmés. Prenez rendez-vous dans un centre pour effectuer
                            un test.
                          </p>
                          <Button
                            asChild
                            className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700"
                          >
                            <Link href="/centres">Prendre rendez-vous</Link>
                          </Button>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-center border-t p-6 bg-gray-50 dark:bg-gray-900">
                      <Button
                        asChild
                        className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700"
                      >
                        <Link href="/centres">
                          Prendre un nouveau rendez-vous
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="notifications">
                <motion.div key="notifications" variants={staggerContainer} initial="hidden" animate="visible">
                  <Card className="border-0 shadow-lg dark:shadow-indigo-900/10">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-2xl flex items-center">
                        <Bell className="h-6 w-6 mr-2 text-indigo-600 dark:text-indigo-400" />
                        Mes notifications
                      </CardTitle>
                      <CardDescription>
                        Restez informé des mises à jour concernant vos résultats et rendez-vous.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {notifications.length > 0 ? (
                        <div className="space-y-4">
                          {notifications.map((notification) => (
                            <motion.div key={notification.id} variants={fadeIn}>
                              <div
                                className={`border rounded-xl p-5 transition-all ${
                                  !notification.read
                                    ? "bg-indigo-50 dark:bg-indigo-900/10 border-indigo-200 dark:border-indigo-800"
                                    : "border-gray-200 dark:border-gray-800 hover:border-indigo-200 dark:hover:border-indigo-800 hover:bg-gray-50 dark:hover:bg-gray-900"
                                }`}
                              >
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex items-center">
                                    <Bell
                                      className={`h-5 w-5 mr-2 ${!notification.read ? "text-indigo-600 dark:text-indigo-400" : "text-gray-500 dark:text-gray-400"}`}
                                    />
                                    <span
                                      className={`font-medium ${
                                        !notification.read
                                          ? "text-indigo-800 dark:text-indigo-300"
                                          : "text-gray-900 dark:text-gray-100"
                                      }`}
                                    >
                                      {notification.title}
                                    </span>
                                  </div>
                                  <span className="text-xs text-gray-500 dark:text-gray-400">{notification.date}</span>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 ml-7">{notification.message}</p>
                                {!notification.read && (
                                  <div className="mt-3 ml-7">
                                    <Button variant="link" className="p-0 h-auto text-indigo-600 dark:text-indigo-400">
                                      Marquer comme lu
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <div className="rounded-full bg-indigo-100 dark:bg-indigo-900/30 p-4 mx-auto w-fit mb-4">
                            <Bell className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                          </div>
                          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                            Aucune notification
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                            Vous n'avez pas de notifications pour le moment. Nous vous informerons des mises à jour
                            importantes.
                          </p>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-between border-t p-6 bg-gray-50 dark:bg-gray-900">
                      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-indigo-600 dark:text-indigo-400" />
                        Les notifications sont conservées pendant 30 jours.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-950"
                      >
                        Tout marquer comme lu
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>

            <Card className="border-0 shadow-lg dark:shadow-indigo-900/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl flex items-center">
                  <Settings className="h-6 w-6 mr-2 text-indigo-600 dark:text-indigo-400" />
                  Paramètres de confidentialité
                </CardTitle>
                <CardDescription>Gérez vos préférences de confidentialité et de sécurité.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-notif" className="text-gray-900 dark:text-gray-100">
                            Notifications par email
                          </Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Recevoir des rappels de rendez-vous par email
                          </p>
                        </div>
                        <Switch id="email-notif" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="sms-notif" className="text-gray-900 dark:text-gray-100">
                            Notifications par SMS
                          </Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Recevoir des rappels de rendez-vous par SMS
                          </p>
                        </div>
                        <Switch id="sms-notif" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Sécurité</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="2fa" className="text-gray-900 dark:text-gray-100">
                            Authentification à deux facteurs
                          </Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Sécuriser votre compte avec une vérification supplémentaire
                          </p>
                        </div>
                        <Switch id="2fa" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="biometric" className="text-gray-900 dark:text-gray-100">
                            Connexion biométrique
                          </Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Utiliser votre empreinte digitale ou reconnaissance faciale
                          </p>
                        </div>
                        <Switch id="biometric" defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                    Niveau de sécurité du compte
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Fort</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">85%</span>
                    </div>
                    <Progress value={85} className="h-2 bg-gray-200 dark:bg-gray-700">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full"
                        style={{ width: "85%" }}
                      />
                    </Progress>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Votre compte est bien sécurisé. Pour une sécurité optimale, activez toutes les options de
                      sécurité.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t p-6 bg-gray-50 dark:bg-gray-900">
                <Button className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700">
                  Enregistrer les préférences
                </Button>
              </CardFooter>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
