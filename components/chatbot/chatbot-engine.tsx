import { chatbotDatabase, type ChatbotData } from "./chatbot-data"

// Fonction pour calculer la similarité entre deux chaînes
function calculateSimilarity(str1: string, str2: string): number {
  const s1 = str1.toLowerCase()
  const s2 = str2.toLowerCase()

  // Correspondance exacte
  if (s1 === s2) return 1.0

  // Correspondance de sous-chaîne
  if (s1.includes(s2) || s2.includes(s1)) return 0.8

  // Calcul de distance de Levenshtein simplifiée
  const words1 = s1.split(" ")
  const words2 = s2.split(" ")

  let commonWords = 0
  words1.forEach((word1) => {
    if (words2.some((word2) => word2.includes(word1) || word1.includes(word2))) {
      commonWords++
    }
  })

  return commonWords / Math.max(words1.length, words2.length)
}

// Fonction pour trouver la meilleure correspondance
export function findBestMatch(userInput: string): ChatbotData | null {
  const input = userInput.toLowerCase().trim()
  let bestMatch: ChatbotData | null = null
  let bestScore = 0

  chatbotDatabase.forEach((data) => {
    let score = 0

    // Vérifier les mots-clés
    data.keywords.forEach((keyword) => {
      const similarity = calculateSimilarity(input, keyword)
      if (similarity > score) score = similarity

      // Bonus pour les mots contenus
      if (input.includes(keyword) || keyword.includes(input)) {
        score = Math.max(score, 0.7)
      }
    })

    // Vérifier les synonymes
    data.synonyms.forEach((synonym) => {
      const similarity = calculateSimilarity(input, synonym)
      if (similarity > score) score = similarity

      if (input.includes(synonym) || synonym.includes(input)) {
        score = Math.max(score, 0.6)
      }
    })

    // Vérifier les questions liées
    data.relatedQuestions.forEach((question) => {
      const similarity = calculateSimilarity(input, question)
      if (similarity > score) score = similarity
    })

    // Bonus pour les correspondances multiples de mots
    const inputWords = input.split(" ")
    const allKeywords = [...data.keywords, ...data.synonyms].join(" ").split(" ")

    let wordMatches = 0
    inputWords.forEach((word) => {
      if (word.length > 2 && allKeywords.some((kw) => kw.includes(word) || word.includes(kw))) {
        wordMatches++
      }
    })

    if (wordMatches > 1) {
      score += wordMatches * 0.1
    }

    if (score > bestScore && score > 0.3) {
      // Seuil minimum de 0.3
      bestScore = score
      bestMatch = data
    }
  })

  return bestMatch
}

// Fonction pour générer une réponse intelligente
export function generateIntelligentResponse(userInput: string): {
  response: string
  category?: string
  relatedQuestions: string[]
} {
  const bestMatch = findBestMatch(userInput)

  if (bestMatch) {
    return {
      response: bestMatch.response,
      category: bestMatch.category,
      relatedQuestions: bestMatch.relatedQuestions,
    }
  }

  // Réponse par défaut si aucune correspondance
  return {
    response:
      "Je suis désolé, je n'ai pas bien compris votre question. Pourriez-vous reformuler ou choisir l'une des questions fréquentes ci-dessous ? Je suis là pour vous aider avec toutes vos questions sur le VIH au Niger.",
    relatedQuestions: [
      "Où faire un test de dépistage ?",
      "Le dépistage est-il gratuit ?",
      "Quels sont les symptômes du VIH ?",
      "Comment se protéger du VIH ?",
    ],
  }
}

// Fonction pour obtenir des suggestions en temps réel
export function getRealTimeSuggestions(input: string): string[] {
  if (input.length < 2) return []

  const suggestions: string[] = []
  const inputLower = input.toLowerCase()

  chatbotDatabase.forEach((data) => {
    // Chercher dans les mots-clés et synonymes
    const allTerms = [...data.keywords, ...data.synonyms]

    allTerms.forEach((term) => {
      if (term.includes(inputLower) && !suggestions.includes(term)) {
        // Transformer en question naturelle
        const question = data.relatedQuestions[0] || `En savoir plus sur ${term}`
        if (!suggestions.includes(question)) {
          suggestions.push(question)
        }
      }
    })

    // Chercher dans les questions liées
    data.relatedQuestions.forEach((question) => {
      if (question.toLowerCase().includes(inputLower) && !suggestions.includes(question)) {
        suggestions.push(question)
      }
    })
  })

  return suggestions.slice(0, 4)
}

// Fonction pour obtenir des suggestions contextuelles basées sur la réponse et la catégorie
export function getContextualSuggestions(response: string, category?: string): string[] {
  const suggestions: string[] = []

  // Suggestions basées sur la catégorie
  if (category) {
    const categoryData = chatbotDatabase.filter((data) => data.category === category)
    categoryData.forEach((data) => {
      data.relatedQuestions.forEach((question) => {
        if (!suggestions.includes(question) && suggestions.length < 4) {
          suggestions.push(question)
        }
      })
    })
  }

  // Si pas assez de suggestions, ajouter des suggestions générales
  if (suggestions.length < 4) {
    const generalSuggestions = [
      "Où faire un test de dépistage ?",
      "Le dépistage est-il gratuit ?",
      "Quels sont les symptômes du VIH ?",
      "Comment se protéger du VIH ?",
      "Combien de temps pour avoir les résultats ?",
      "Le test est-il confidentiel ?",
      "Qu'est-ce que la PrEP ?",
      "VIH et grossesse",
    ]

    generalSuggestions.forEach((suggestion) => {
      if (!suggestions.includes(suggestion) && suggestions.length < 4) {
        suggestions.push(suggestion)
      }
    })
  }

  return suggestions.slice(0, 4)
}