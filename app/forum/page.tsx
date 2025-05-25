"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  MessageSquare,
  ThumbsUp,
  Clock,
  Search,
  Filter,
  PlusCircle,
  ChevronRight,
  Info,
  AlertCircle,
  Heart,
  Share2,
  Bookmark,
  TrendingUp,
  Users,
  Eye,
  Star,
  Send,
  X,
  Sparkles,
  Lock,
} from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Mock data for forum posts with enhanced details
const forumPosts = [
  {
    id: 1,
    title: "Première fois au centre de dépistage, à quoi s'attendre ?",
    content:
      "Bonjour à tous, je vais faire mon premier test de dépistage la semaine prochaine et je suis un peu anxieux. Comment ça se passe exactement ? Est-ce que c'est douloureux ? Combien de temps ça prend ? Merci d'avance pour vos réponses.",
    author: "Anonyme123",
    avatar: "A1",
    date: "Il y a 2 jours",
    category: "Dépistage",
    replies: 8,
    likes: 12,
    views: 156,
    isHot: true,
    isPinned: false,
    tags: ["première-fois", "anxiété", "conseils"],
  },
  {
    id: 2,
    title: "Effets secondaires des traitements antirétroviraux",
    content:
      "Je viens de commencer un traitement antirétroviral et j'ai quelques effets secondaires (nausées, fatigue). Est-ce normal ? Combien de temps cela dure-t-il généralement ? Avez-vous des conseils pour les atténuer ?",
    author: "VivrePositif",
    avatar: "VP",
    date: "Il y a 5 jours",
    category: "Traitement",
    replies: 15,
    likes: 23,
    views: 289,
    isHot: true,
    isPinned: true,
    tags: ["traitement", "effets-secondaires", "conseils"],
  },
  {
    id: 3,
    title: "PrEP et autres méthodes de prévention",
    content:
      "Je m'intéresse à la PrEP mais j'ai encore des questions. Comment l'obtenir ? Y a-t-il des effets secondaires ? Est-ce que ça protège contre les autres IST ? Merci de partager vos expériences.",
    author: "InfoSanté",
    avatar: "IS",
    date: "Il y a 1 semaine",
    category: "Prévention",
    replies: 20,
    likes: 34,
    views: 445,
    isHot: false,
    isPinned: false,
    tags: ["prep", "prévention", "ist"],
  },
  {
    id: 4,
    title: "Parler de son statut à ses proches",
    content:
      "J'ai récemment appris ma séropositivité et je ne sais pas comment en parler à ma famille et mes amis. Avez-vous des conseils ou des expériences à partager ? Comment avez-vous géré cette situation ?",
    author: "Courage2023",
    avatar: "C2",
    date: "Il y a 3 jours",
    category: "Vivre avec",
    replies: 12,
    likes: 18,
    views: 203,
    isHot: false,
    isPinned: false,
    tags: ["famille", "révélation", "soutien"],
  },
  {
    id: 5,
    title: "Résultats de test non concluants, que faire ?",
    content:
      "J'ai fait un test rapide qui a donné un résultat ambigu. Le médecin m'a prescrit un test sanguin mais je dois attendre plusieurs jours pour les résultats. Comment gérer cette attente ? Est-ce que quelqu'un a vécu une situation similaire ?",
    author: "Inquiet75",
    avatar: "I7",
    date: "Il y a 4 jours",
    category: "Dépistage",
    replies: 6,
    likes: 9,
    views: 134,
    isHot: false,
    isPinned: false,
    tags: ["résultats", "attente", "stress"],
  },
]

// Categories with colors and icons
const categories = [
  { name: "Tous", color: "gray", count: 45 },
  { name: "Dépistage", color: "blue", count: 12 },
  { name: "Prévention", color: "green", count: 8 },
  { name: "Traitement", color: "purple", count: 15 },
  { name: "Vivre avec", color: "pink", count: 7 },
  { name: "Questions générales", color: "orange", count: 3 },
]

export default function ForumPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tous")
  const [filteredPosts, setFilteredPosts] = useState(forumPosts)
  const [showNewPostModal, setShowNewPostModal] = useState(false)
  const [newPostTitle, setNewPostTitle] = useState("")
  const [newPostContent, setNewPostContent] = useState("")
  const [newPostCategory, setNewPostCategory] = useState("")
  const [likedPosts, setLikedPosts] = useState<number[]>([])
  const [bookmarkedPosts, setBookmarkedPosts] = useState<number[]>([])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const filtered = forumPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = selectedCategory === "Tous" || post.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    setFilteredPosts(filtered)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    const filtered = forumPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = category === "Tous" || post.category === category
      return matchesSearch && matchesCategory
    })
    setFilteredPosts(filtered)
  }

  const handleLike = (postId: number) => {
    setLikedPosts((prev) => (prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]))
  }

  const handleBookmark = (postId: number) => {
    setBookmarkedPosts((prev) => (prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]))
  }

  const handleNewPost = () => {
    if (newPostTitle.trim() && newPostContent.trim() && newPostCategory) {
      // Here you would normally send the post to your backend
      console.log("New post:", { title: newPostTitle, content: newPostContent, category: newPostCategory })
      setShowNewPostModal(false)
      setNewPostTitle("")
      setNewPostContent("")
      setNewPostCategory("")
    }
  }

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
        delayChildren: 0.2,
      },
    },
  }

  const getCategoryColor = (categoryName: string) => {
    const category = categories.find((cat) => cat.name === categoryName)
    return category?.color || "gray"
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-gradient-to-br from-indigo-50 via-white to-violet-50 dark:from-gray-900 dark:via-gray-950 dark:to-indigo-950">
      <div className="container mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-4"
            >
              <Users className="h-4 w-4" />
              Communauté Bienveillante
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              Forum Communautaire
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Échangez anonymement avec d'autres utilisateurs et posez vos questions dans un espace sécurisé et
              bienveillant.
            </p>
          </div>

          {/* Stats Cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
            <motion.div variants={fadeIn}>
              <Card className="border-0 shadow-lg dark:shadow-indigo-900/10 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">45</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Discussions actives</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeIn}>
              <Card className="border-0 shadow-lg dark:shadow-indigo-900/10 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                    <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">1.2k</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Membres actifs</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeIn}>
              <Card className="border-0 shadow-lg dark:shadow-indigo-900/10 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                    <Heart className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">3.4k</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Réactions positives</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeIn}>
              <Card className="border-0 shadow-lg dark:shadow-indigo-900/10 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="rounded-full bg-orange-100 dark:bg-orange-900/30 p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <p className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">98%</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Satisfaction</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            {/* Moderation Alert */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Alert className="mb-8 border-0 shadow-lg dark:shadow-indigo-900/10 bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/30 border-l-4 border-l-indigo-500">
                <AlertCircle className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                <AlertTitle className="text-indigo-800 dark:text-indigo-300 flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Espace modéré et sécurisé
                </AlertTitle>
                <AlertDescription className="text-gray-700 dark:text-gray-300">
                  Ce forum est modéré par des professionnels de santé. Les informations partagées sont vérifiées, mais
                  consultez toujours un médecin pour des conseils personnalisés. Votre anonymat est garanti.
                </AlertDescription>
              </Alert>
            </motion.div>

            {/* Search and Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col lg:flex-row gap-4 mb-8"
            >
              <div className="flex-1">
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Rechercher dans le forum... (titre, contenu, tags)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-4 py-3 rounded-2xl border-gray-200 dark:border-gray-700 focus-visible:ring-indigo-500 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg"
                  />
                  <Button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 px-6"
                  >
                    Rechercher
                  </Button>
                </form>
              </div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={() => setShowNewPostModal(true)}
                  size="lg"
                  className="rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 px-8 py-3 shadow-lg"
                >
                  <PlusCircle className="h-5 w-5 mr-2" />
                  Nouvelle discussion
                </Button>
              </motion.div>
            </motion.div>

            {/* Categories Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <Filter className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                <span className="font-medium text-gray-900 dark:text-gray-100">Filtrer par catégorie :</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {categories.map((category, index) => (
                  <motion.button
                    key={category.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCategoryChange(category.name)}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                      selectedCategory === category.name
                        ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 border border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    {category.name}
                    <Badge
                      variant="secondary"
                      className={`text-xs ${
                        selectedCategory === category.name
                          ? "bg-white/20 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {category.count}
                    </Badge>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Forum Tabs */}
            <Tabs defaultValue="recent" className="mb-8">
              <TabsList className="grid w-full grid-cols-3 mb-8 rounded-2xl p-1 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg">
                <TabsTrigger
                  value="recent"
                  className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-violet-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Récentes
                </TabsTrigger>
                <TabsTrigger
                  value="popular"
                  className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-violet-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Populaires
                </TabsTrigger>
                <TabsTrigger
                  value="unanswered"
                  className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-violet-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Sans réponse
                </TabsTrigger>
              </TabsList>

              <TabsContent value="recent">
                {filteredPosts.length > 0 ? (
                  <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
                    {filteredPosts.map((post, index) => (
                      <motion.div key={post.id} variants={fadeIn} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                        <Card className="border-0 shadow-lg dark:shadow-indigo-900/10 hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm overflow-hidden">
                          {post.isPinned && (
                            <div className="bg-gradient-to-r from-amber-400 to-orange-400 text-white px-4 py-1 text-xs font-medium flex items-center gap-1">
                              <Star className="h-3 w-3" />
                              Discussion épinglée
                            </div>
                          )}
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-4 flex-1">
                                <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400 }}>
                                  <Avatar className="h-12 w-12 ring-2 ring-indigo-100 dark:ring-indigo-800 shadow-lg">
                                    <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-violet-500 text-white font-bold">
                                      {post.avatar}
                                    </AvatarFallback>
                                  </Avatar>
                                </motion.div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-2">
                                    <CardTitle className="text-xl hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer">
                                      <Link href={`/forum/${post.id}`}>{post.title}</Link>
                                    </CardTitle>
                                    {post.isHot && (
                                      <motion.div
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                                      >
                                        <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white border-0">
                                          🔥 Hot
                                        </Badge>
                                      </motion.div>
                                    )}
                                  </div>
                                  <CardDescription className="flex items-center gap-2 text-sm">
                                    <span className="font-medium">{post.author}</span>
                                    <span className="text-gray-400">•</span>
                                    <Clock className="h-3 w-3" />
                                    <span>{post.date}</span>
                                    <span className="text-gray-400">•</span>
                                    <Eye className="h-3 w-3" />
                                    <span>{post.views} vues</span>
                                  </CardDescription>
                                </div>
                              </div>
                              <Badge
                                className={`${
                                  getCategoryColor(post.category) === "blue"
                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                    : getCategoryColor(post.category) === "green"
                                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                      : getCategoryColor(post.category) === "purple"
                                        ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                                        : getCategoryColor(post.category) === "pink"
                                          ? "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300"
                                          : "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
                                } rounded-full px-3 py-1 font-medium`}
                              >
                                {post.category}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="pb-3">
                            <p className="text-gray-700 dark:text-gray-300 line-clamp-2 mb-4 leading-relaxed">
                              {post.content}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {post.tags.map((tag, tagIndex) => (
                                <motion.span
                                  key={tagIndex}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: tagIndex * 0.05 }}
                                  className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full text-xs font-medium hover:bg-indigo-100 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                                >
                                  #{tag}
                                </motion.span>
                              ))}
                            </div>
                          </CardContent>
                          <CardFooter className="pt-0 flex items-center justify-between border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
                            <div className="flex items-center space-x-6">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleLike(post.id)}
                                className={`flex items-center gap-2 text-sm transition-colors ${
                                  likedPosts.includes(post.id)
                                    ? "text-red-500"
                                    : "text-gray-500 dark:text-gray-400 hover:text-red-500"
                                }`}
                              >
                                <ThumbsUp className={`h-4 w-4 ${likedPosts.includes(post.id) ? "fill-current" : ""}`} />
                                <span>{post.likes + (likedPosts.includes(post.id) ? 1 : 0)}</span>
                              </motion.button>
                              <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                                <MessageSquare className="h-4 w-4 mr-1" />
                                <span>{post.replies} réponses</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleBookmark(post.id)}
                                className={`p-2 rounded-full transition-colors ${
                                  bookmarkedPosts.includes(post.id)
                                    ? "text-indigo-600 bg-indigo-100 dark:bg-indigo-900/30"
                                    : "text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                                }`}
                              >
                                <Bookmark
                                  className={`h-4 w-4 ${bookmarkedPosts.includes(post.id) ? "fill-current" : ""}`}
                                />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 rounded-full text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
                              >
                                <Share2 className="h-4 w-4" />
                              </motion.button>
                              <Button
                                asChild
                                variant="ghost"
                                size="sm"
                                className="rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400"
                              >
                                <Link href={`/forum/${post.id}`}>
                                  Lire la suite
                                  <ChevronRight className="ml-1 h-4 w-4" />
                                </Link>
                              </Button>
                            </div>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                    <Card className="border-0 shadow-lg dark:shadow-indigo-900/10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                      <CardContent className="flex flex-col items-center justify-center py-16">
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          className="rounded-full bg-indigo-100 dark:bg-indigo-900/30 p-6 mb-6"
                        >
                          <Info className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
                        </motion.div>
                        <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                          Aucune discussion trouvée
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-center mb-8 max-w-md">
                          Aucune discussion ne correspond à votre recherche. Essayez d'autres termes ou créez une
                          nouvelle discussion.
                        </p>
                        <Button
                          onClick={() => setShowNewPostModal(true)}
                          className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 px-8"
                        >
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Créer une nouvelle discussion
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </TabsContent>

              <TabsContent value="popular">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Card className="border-0 shadow-lg dark:shadow-indigo-900/10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                    <CardContent className="flex flex-col items-center justify-center py-16">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        className="rounded-full bg-orange-100 dark:bg-orange-900/30 p-6 mb-6"
                      >
                        <TrendingUp className="h-12 w-12 text-orange-600 dark:text-orange-400" />
                      </motion.div>
                      <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                        Discussions populaires
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-center mb-8 max-w-md">
                        Cette section affichera bientôt les discussions les plus populaires de la communauté.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="unanswered">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Card className="border-0 shadow-lg dark:shadow-indigo-900/10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                    <CardContent className="flex flex-col items-center justify-center py-16">
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                        className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-6 mb-6"
                      >
                        <MessageSquare className="h-12 w-12 text-purple-600 dark:text-purple-400" />
                      </motion.div>
                      <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                        Questions sans réponse
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-center mb-8 max-w-md">
                        Aidez la communauté en répondant aux questions qui n'ont pas encore reçu de réponse.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </div>

      {/* New Post Modal */}
      <AnimatePresence>
        {showNewPostModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowNewPostModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="border-0 shadow-2xl bg-white dark:bg-gray-900 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      Créer une nouvelle discussion
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowNewPostModal(false)}
                      className="text-white hover:bg-white/20 rounded-full"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  <CardDescription className="text-white/80">
                    Partagez vos questions ou expériences avec la communauté. Tous les messages sont anonymes.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Titre de votre discussion
                    </label>
                    <Input
                      placeholder="Ex: Questions sur mon premier test de dépistage"
                      value={newPostTitle}
                      onChange={(e) => setNewPostTitle(e.target.value)}
                      className="rounded-xl border-gray-200 dark:border-gray-700 focus-visible:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Catégorie</label>
                    <select
                      value={newPostCategory}
                      onChange={(e) => setNewPostCategory(e.target.value)}
                      className="w-full p-3 border rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">Sélectionnez une catégorie</option>
                      {categories
                        .filter((cat) => cat.name !== "Tous")
                        .map((category) => (
                          <option key={category.name} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Contenu de votre message
                    </label>
                    <Textarea
                      placeholder="Décrivez votre situation, posez vos questions... La communauté est là pour vous aider."
                      rows={6}
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      className="rounded-xl border-gray-200 dark:border-gray-700 focus-visible:ring-indigo-500"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t p-6 bg-gray-50 dark:bg-gray-900">
                  <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    <Lock className="h-4 w-4 mr-1 text-indigo-600 dark:text-indigo-400" />
                    Votre anonymat est garanti. Aucune information personnelle n'est partagée.
                  </p>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setShowNewPostModal(false)}
                      className="rounded-full border-gray-200 dark:border-gray-700"
                    >
                      Annuler
                    </Button>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        onClick={handleNewPost}
                        disabled={!newPostTitle.trim() || !newPostContent.trim() || !newPostCategory}
                        className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Publier
                      </Button>
                    </motion.div>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
