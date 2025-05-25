// Base de données étendue pour le chatbot VIH Niger
export interface ChatbotData {
  id: string
  keywords: string[]
  synonyms: string[]
  response: string
  relatedQuestions: string[]
  category: string
}

export const chatbotDatabase: ChatbotData[] = [
  // Salutations
  {
    id: "greeting",
    keywords: ["bonjour", "salut", "hello", "bonsoir", "bonne journée", "hey", "coucou"],
    synonyms: ["salutation", "accueil", "bienvenue"],
    response:
      "Bonjour et bienvenue ! Je suis Amina, votre assistante virtuelle spécialisée dans les questions sur le VIH au Niger. Comment puis-je vous aider aujourd'hui ? 😊",
    relatedQuestions: [
      "Où faire un test de dépistage ?",
      "Le dépistage est-il gratuit ?",
      "Quels sont les symptômes du VIH ?",
      "Comment se protéger du VIH ?",
    ],
    category: "greeting",
  },

  // Tests et dépistage
  {
    id: "test_general",
    keywords: ["test", "dépistage", "dépister", "tester", "examen", "analyse"],
    synonyms: ["screening", "diagnostic", "vérification", "contrôle"],
    response:
      "Au Niger, le test de dépistage du VIH est gratuit et confidentiel. Vous pouvez vous rendre dans les centres de santé publics, les hôpitaux régionaux comme l'Hôpital National de Niamey, ou les centres CEGIDD. Le test rapide donne des résultats en 15-30 minutes.",
    relatedQuestions: [
      "Où faire un test à Niamey ?",
      "Combien de temps pour les résultats ?",
      "Le test est-il confidentiel ?",
      "Quel type de test choisir ?",
    ],
    category: "testing",
  },

  {
    id: "test_rapide",
    keywords: ["test rapide", "résultat rapide", "test immédiat", "trod"],
    synonyms: ["test instantané", "dépistage rapide"],
    response:
      "Les tests rapides (TROD) sont disponibles dans tous les centres de santé du Niger. Ils donnent des résultats en 15-30 minutes avec une simple goutte de sang. Fiabilité de 99% et totalement gratuits.",
    relatedQuestions: [
      "Où faire un test rapide ?",
      "Quelle est la fiabilité ?",
      "Test rapide vs test classique",
      "Période fenêtre test rapide",
    ],
    category: "testing",
  },

  {
    id: "test_elisa",
    keywords: ["test elisa", "test sanguin", "prise de sang", "laboratoire"],
    synonyms: ["test classique", "sérologie"],
    response:
      "Le test ELISA nécessite une prise de sang et est analysé en laboratoire. Résultats en 1-3 jours. Plus précis que le test rapide, surtout pendant la période fenêtre. Disponible dans tous les hôpitaux régionaux du Niger.",
    relatedQuestions: [
      "Différence avec test rapide",
      "Où faire un test ELISA ?",
      "Combien de temps d'attente ?",
      "Test de confirmation",
    ],
    category: "testing",
  },

  // Centres par région
  {
    id: "centres_niamey",
    keywords: ["niamey", "centre niamey", "hôpital niamey", "dépistage niamey"],
    synonyms: ["capitale", "centre principal"],
    response:
      "À Niamey, vous pouvez vous rendre à : l'Hôpital National de Niamey (Route de Tillabéri), le Centre CEGIDD de Niamey (Quartier Plateau), le Centre de Santé de Gamkalé, la Maternité Issaka Gazoby, ou le Centre de Santé de Yantala. Tous offrent des tests gratuits et confidentiels.",
    relatedQuestions: [
      "Horaires d'ouverture Niamey",
      "Comment s'y rendre ?",
      "Prendre rendez-vous",
      "Services disponibles",
    ],
    category: "centers",
  },

  {
    id: "centres_zinder",
    keywords: ["zinder", "centre zinder", "hôpital zinder"],
    synonyms: ["région zinder"],
    response:
      "À Zinder, vous pouvez faire un test au Centre Hospitalier Régional de Zinder, au Centre de Santé Urbain de Zinder, au Centre CEGIDD de Zinder, ou au Centre de Santé Intégré de Mirriah. Tous ces centres offrent des services gratuits et confidentiels.",
    relatedQuestions: ["Adresses exactes Zinder", "Transport vers Zinder", "Centres ruraux région", "Horaires Zinder"],
    category: "centers",
  },

  {
    id: "centres_maradi",
    keywords: ["maradi", "centre maradi", "hôpital maradi"],
    synonyms: ["région maradi"],
    response:
      "À Maradi, rendez-vous au Centre Hospitalier Régional de Maradi, au Centre de Santé Urbain de Maradi, au Centre CEGIDD de Maradi, ou au Centre de Santé de Madarounfa. Services gratuits avec personnel formé.",
    relatedQuestions: ["Localisation Maradi", "Services spécialisés", "Centres périphériques", "Contact Maradi"],
    category: "centers",
  },

  // Symptômes
  {
    id: "symptomes_precoces",
    keywords: ["symptômes", "signes", "symptome", "manifestation", "premiers signes"],
    synonyms: ["indices", "signaux", "alertes"],
    response:
      "Les premiers symptômes du VIH peuvent apparaître 2-4 semaines après l'infection : fièvre persistante, fatigue intense, maux de gorge, ganglions enflés, éruptions cutanées, diarrhée, perte de poids. Attention : beaucoup de personnes n'ont aucun symptôme pendant des années.",
    relatedQuestions: [
      "Symptômes tardifs",
      "Quand faire un test ?",
      "Symptômes chez la femme",
      "Différencier grippe et VIH",
    ],
    category: "symptoms",
  },

  {
    id: "symptomes_tardifs",
    keywords: ["symptômes tardifs", "sida", "stade avancé", "infections opportunistes"],
    synonyms: ["phase terminale", "complications"],
    response:
      "Au stade SIDA (sans traitement) : infections opportunistes répétées, pneumonie, tuberculose, candidose, perte de poids importante, fièvre prolongée, diarrhée chronique. Avec un traitement ARV, ces symptômes sont évitables.",
    relatedQuestions: ["Prévenir les complications", "Traitement d'urgence", "Suivi médical", "Espérance de vie"],
    category: "symptoms",
  },

  // Prévention
  {
    id: "prevention_generale",
    keywords: ["prévention", "protéger", "éviter", "protection", "sécurité"],
    synonyms: ["prophylaxie", "précaution", "sûreté"],
    response:
      "Au Niger, la prévention du VIH passe par : utilisation systématique de préservatifs (gratuits dans les centres), fidélité mutuelle, dépistage régulier du couple, éviter le partage d'objets tranchants, et pour les personnes à haut risque, la PrEP est disponible.",
    relatedQuestions: [
      "Où trouver des préservatifs ?",
      "Qu'est-ce que la PrEP ?",
      "Prévention mère-enfant",
      "Réduction des risques",
    ],
    category: "prevention",
  },

  {
    id: "preservatifs",
    keywords: ["préservatif", "capote", "condom", "protection"],
    synonyms: ["contraception", "barrière"],
    response:
      "Les préservatifs masculins et féminins sont disponibles gratuitement dans tous les centres de santé du Niger, pharmacies communautaires, et points de distribution. Efficacité de 98% contre le VIH quand utilisés correctement.",
    relatedQuestions: [
      "Comment bien utiliser ?",
      "Préservatif féminin",
      "Où s'en procurer ?",
      "Que faire si rupture ?",
    ],
    category: "prevention",
  },

  // PrEP
  {
    id: "prep",
    keywords: ["prep", "prophylaxie", "prévention exposition", "truvada"],
    synonyms: ["prophylaxie pré-exposition", "prévention médicamenteuse"],
    response:
      "La PrEP (prophylaxie pré-exposition) est disponible au Niger dans certains centres spécialisés de Niamey et bientôt dans d'autres régions. Elle réduit le risque d'infection de 99% chez les personnes à haut risque. Consultez le centre CEGIDD de Niamey.",
    relatedQuestions: [
      "Qui peut prendre la PrEP ?",
      "Effets secondaires PrEP",
      "Coût de la PrEP",
      "Suivi médical PrEP",
    ],
    category: "prevention",
  },

  // Traitement
  {
    id: "traitement_arv",
    keywords: ["traitement", "médicament", "arv", "antirétroviral", "tritérapie"],
    synonyms: ["thérapie", "médication", "soins"],
    response:
      "Au Niger, les traitements antirétroviraux (ARV) sont gratuits et disponibles dans tous les hôpitaux régionaux. Avec un traitement bien suivi, une personne séropositive peut vivre normalement et ne plus transmettre le virus (charge virale indétectable = intransmissible).",
    relatedQuestions: [
      "Effets secondaires ARV",
      "Observance traitement",
      "Charge virale indétectable",
      "Résistance médicamenteuse",
    ],
    category: "treatment",
  },

  {
    id: "charge_virale",
    keywords: ["charge virale", "indétectable", "intransmissible", "u=u"],
    synonyms: ["niveau viral", "quantité virus"],
    response:
      "Une charge virale indétectable signifie que le traitement fonctionne parfaitement. Avec une charge virale indétectable depuis 6 mois, il n'y a aucun risque de transmission (U=U : Undetectable = Untransmittable). Contrôle tous les 6 mois au Niger.",
    relatedQuestions: [
      "Comment atteindre l'indétectable ?",
      "Fréquence des contrôles",
      "Vie normale avec VIH",
      "Relations sexuelles sécurisées",
    ],
    category: "treatment",
  },

  // Grossesse
  {
    id: "grossesse_vih",
    keywords: ["grossesse", "enceinte", "bébé", "transmission mère enfant", "ptme"],
    synonyms: ["maternité", "accouchement", "nouveau-né"],
    response:
      "Au Niger, les femmes enceintes séropositives bénéficient d'un suivi spécialisé gratuit (PTME). Avec un traitement adapté, le risque de transmission à l'enfant est réduit à moins de 2%. Suivi dans tous les hôpitaux régionaux avec équipes formées.",
    relatedQuestions: ["Suivi pendant grossesse", "Accouchement sécurisé", "Allaitement et VIH", "Test du nouveau-né"],
    category: "pregnancy",
  },

  // Confidentialité
  {
    id: "confidentialite",
    keywords: ["confidentiel", "anonyme", "secret", "discrétion", "vie privée"],
    synonyms: ["privé", "discret", "caché"],
    response:
      "Au Niger, tous les tests de dépistage du VIH sont strictement confidentiels selon la loi nigérienne. Dans les centres CEGIDD, vous pouvez même faire un test anonyme sans donner votre identité. Vos résultats ne sont partagés avec personne sans votre consentement.",
    relatedQuestions: ["Test anonyme comment ?", "Droits du patient", "Que dit la loi ?", "Discrimination interdite"],
    category: "confidentiality",
  },

  // Coût
  {
    id: "cout_gratuite",
    keywords: ["gratuit", "coût", "prix", "payer", "argent", "frais"],
    synonyms: ["tarif", "montant", "facture"],
    response:
      "Au Niger, TOUS les services liés au VIH sont gratuits : dépistage, conseil, traitement antirétroviral, suivi médical, examens biologiques. C'est un engagement du gouvernement nigérien avec le soutien des partenaires internationaux. Aucun frais dans les structures publiques.",
    relatedQuestions: ["Pourquoi c'est gratuit ?", "Services inclus", "Structures privées", "Médicaments gratuits"],
    category: "cost",
  },

  // Urgence
  {
    id: "urgence",
    keywords: ["urgence", "numéro", "aide", "secours", "emergency"],
    synonyms: ["SOS", "assistance", "appel"],
    response:
      "Numéros d'urgence VIH au Niger : Ligne VIH/SIDA : 15 15 (gratuit 24h/24), CNLS Niger : +227 20 72 29 42, SOS Médecins Niamey : +227 96 88 88 88. En cas d'exposition récente au VIH, rendez-vous immédiatement à l'Hôpital National pour un TPE.",
    relatedQuestions: [
      "Qu'est-ce que le TPE ?",
      "Exposition récente que faire ?",
      "Urgence week-end",
      "Transport d'urgence",
    ],
    category: "emergency",
  },

  // Soutien psychologique
  {
    id: "soutien",
    keywords: ["soutien", "psychologique", "aide", "accompagnement", "moral"],
    synonyms: ["support", "assistance", "réconfort"],
    response:
      "Au Niger, un soutien psychologique est disponible : Association Nigérienne de Lutte contre le SIDA (ANLS), Réseau des Personnes Vivant avec le VIH (RNP+), services de conseil dans tous les centres de dépistage. Groupes de parole réguliers à Niamey et grandes villes.",
    relatedQuestions: ["Groupes de parole", "Associations d'aide", "Conseil psychologique", "Témoignages positifs"],
    category: "support",
  },
]

// Fonction pour trouver les questions liées selon le contexte
export function getContextualSuggestions(lastBotResponse: string, category?: string): string[] {
  const lastResponseData = chatbotDatabase.find((data) => data.response === lastBotResponse)

  if (lastResponseData) {
    return lastResponseData.relatedQuestions
  }

  if (category) {
    const categoryData = chatbotDatabase.filter((data) => data.category === category)
    const suggestions: string[] = []
    categoryData.forEach((data) => {
      suggestions.push(...data.relatedQuestions.slice(0, 1))
    })
    return suggestions.slice(0, 4)
  }

  // Questions par défaut
  return [
    "Où faire un test de dépistage ?",
    "Le dépistage est-il gratuit ?",
    "Quels sont les symptômes du VIH ?",
    "Comment se protéger du VIH ?",
  ]
}

// Fonction pour suggérer des questions basées sur la saisie
export function getSuggestionsFromInput(input: string): string[] {
  const inputLower = input.toLowerCase().trim()

  if (inputLower.length < 2) return []

  const suggestions: string[] = []

  chatbotDatabase.forEach((data) => {
    // Chercher dans les mots-clés
    const keywordMatch = data.keywords.some((keyword) => keyword.includes(inputLower) || inputLower.includes(keyword))

    // Chercher dans les synonymes
    const synonymMatch = data.synonyms.some((synonym) => synonym.includes(inputLower) || inputLower.includes(synonym))

    if (keywordMatch || synonymMatch) {
      suggestions.push(...data.relatedQuestions.slice(0, 2))
    }
  })

  // Retourner les 4 premières suggestions uniques
  return [...new Set(suggestions)].slice(0, 4)
}