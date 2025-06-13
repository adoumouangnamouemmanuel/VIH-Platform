"use client";

import { auth } from "@/utils/firebase.config";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, Shield } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

/**
 * Composant de page de connexion pour la plateforme VIH
 * Gère l'authentification des utilisateurs avec Firebase Auth et redirection
 */
export default function LoginPage() {
  // États pour gérer le mode d'affichage (connexion/inscription)
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // États pour les données du formulaire
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // États pour la gestion des erreurs et du chargement
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // État pour surveiller l'authentification
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  console.log(
    "🔐 LoginPage - Mode actuel:",
    isLogin ? "Connexion" : "Inscription"
  );
  console.log("📝 LoginPage - Données du formulaire:", {
    email: formData.email,
    hasPassword: !!formData.password,
  });

  /**
   * Surveille l'état d'authentification de l'utilisateur
   * Redirige automatiquement vers la page d'accueil si connecté
   */
  useEffect(() => {
    console.log("🔍 Mise en place du listener d'authentification...");

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(
        "👤 État d'authentification changé:",
        user ? "Connecté" : "Déconnecté"
      );

      if (user) {
        console.log("✅ Utilisateur connecté:", {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });
        setIsAuthenticated(true);

        // Redirection vers la page d'accueil
        console.log("🔄 Redirection vers la page d'accueil...");
        router.push("/");
      } else {
        console.log("❌ Aucun utilisateur connecté");
        setIsAuthenticated(false);
      }

      setAuthLoading(false);
    });

    // Cleanup function pour désabonner le listener
    return () => {
      console.log("🧹 Nettoyage du listener d'authentification");
      unsubscribe();
    };
  }, [router]);

  /**
   * Valide les champs du formulaire selon les règles métier
   * @returns {boolean} - True si tous les champs sont valides
   */
  const validateForm = () => {
    console.log("✅ Validation du formulaire en cours...");
    const newErrors: any = {};

    // Validation de l'email
    if (!formData.email) {
      newErrors.email = "L'adresse email est obligatoire";
      console.log("❌ Erreur validation: Email manquant");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
      console.log("❌ Erreur validation: Format email invalide");
    }

    // Validation du mot de passe
    if (!formData.password) {
      newErrors.password = "Le mot de passe est obligatoire";
      console.log("❌ Erreur validation: Mot de passe manquant");
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 6 caractères";
      console.log("❌ Erreur validation: Mot de passe trop court");
    }

    // Validation de la confirmation du mot de passe (inscription seulement)
    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
      console.log("❌ Erreur validation: Mots de passe différents");
    }

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    console.log(
      "✅ Résultat validation:",
      isValid ? "Succès" : "Échec",
      newErrors
    );
    return isValid;
  };

  /**
   * Gère la soumission du formulaire (connexion ou inscription)
   * @param {React.FormEvent} e - L'événement de soumission du formulaire
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🚀 Soumission du formulaire démarrée");

    // Validation des données avant envoi
    if (!validateForm()) {
      console.log("❌ Validation échouée, arrêt de la soumission");
      return;
    }

    setLoading(true);
    console.log(
      "⏳ Chargement démarré pour:",
      isLogin ? "connexion" : "inscription"
    );

    try {
      // Vérifications détaillées de Firebase Auth
      console.log("🔍 Vérification de Firebase Auth...");
      console.log("Auth object:", auth);

      if (!auth) {
        console.error("❌ Firebase Auth n'est pas initialisé");
        throw new Error("Firebase Auth n'est pas initialisé");
      }

      console.log("✅ Firebase Auth semble correctement initialisé");

      if (isLogin) {
        console.log("🔑 Tentative de connexion avec email:", formData.email);

        const userCredential = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        console.log(
          "✅ Connexion réussie pour l'utilisateur:",
          userCredential.user.uid
        );
        console.log("📧 Email vérifié:", userCredential.user.emailVerified);
        console.log("👤 Nom d'affichage:", userCredential.user.displayName);

        // Réinitialiser les erreurs après succès
        setErrors({});
        console.log("🎉 Authentification terminée avec succès");

        // Note: La redirection sera gérée par useEffect via onAuthStateChanged
        console.log("⏳ En attente de la redirection automatique...");
      } else {
        // Rediriger vers la page d'inscription dédiée
        console.log("🔄 Redirection vers la page d'inscription");
        router.push("/auth/inscription");
        return;
      }
    } catch (error: any) {
      console.error("❌ Erreur d'authentification:", error);
      console.error("❌ Code d'erreur:", error.code);
      console.error("❌ Message d'erreur:", error.message);

      // Traduire les erreurs Firebase en français
      let errorMessage = error.message;
      switch (error.code) {
        case "auth/configuration-not-found":
          errorMessage =
            "Configuration Firebase manquante. Veuillez contacter l'administrateur.";
          break;
        case "auth/user-not-found":
          errorMessage = "Aucun compte n'existe avec cette adresse email";
          break;
        case "auth/wrong-password":
        case "auth/invalid-credential":
          errorMessage = "Email ou mot de passe incorrect";
          break;
        case "auth/invalid-email":
          errorMessage = "Format d'email invalide";
          break;
        case "auth/user-disabled":
          errorMessage = "Ce compte a été désactivé";
          break;
        case "auth/too-many-requests":
          errorMessage =
            "Trop de tentatives de connexion. Veuillez réessayer plus tard.";
          break;
        case "auth/network-request-failed":
          errorMessage =
            "Erreur de connexion réseau. Vérifiez votre connexion internet.";
          break;
        default:
          errorMessage = `Une erreur est survenue: ${error.code}. Veuillez réessayer.`;
      }

      setErrors({ submit: errorMessage });
    } finally {
      setLoading(false);
      console.log("⏳ Chargement terminé");
    }
  };

  /**
   * Gère les changements dans les champs de saisie
   * @param {React.ChangeEvent<HTMLInputElement>} e - L'événement de changement
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(`📝 Changement dans le champ ${name}:`, value);

    setFormData({
      ...formData,
      [name]: value,
    });

    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
      console.log(`🧹 Erreur effacée pour le champ: ${name}`);
    }
  };

  // Afficher un loader pendant la vérification de l'authentification
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Vérification de l'authentification...</p>
        </motion.div>
      </div>
    );
  }

  // Si l'utilisateur est déjà connecté, afficher un message de redirection
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Connexion réussie !
          </h2>
          <p className="text-gray-600 mb-6">
            Vous êtes maintenant connecté. Redirection en cours...
          </p>
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* En-tête avec logo et titre */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Plateforme VIH Niger
          </h1>
          <p className="text-gray-600">
            Système sécurisé de gestion de la santé
          </p>
        </motion.div>

        {/* Conteneur du formulaire */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Connexion
            </h2>
            <p className="text-gray-600">Connectez-vous à votre compte</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Champ Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Adresse email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.email ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="Saisissez votre email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Champ Mot de passe */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.password ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="Saisissez votre mot de passe"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => {
                    setShowPassword(!showPassword);
                    console.log(
                      "👁️ Visibilité du mot de passe:",
                      !showPassword ? "Visible" : "Masqué"
                    );
                  }}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Erreur de soumission */}
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{errors.submit}</p>
              </div>
            )}

            {/* Mot de passe oublié */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                onClick={() => console.log("🔗 Clic sur mot de passe oublié")}
              >
                Mot de passe oublié ?
              </button>
            </div>

            {/* Bouton de soumission */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Connexion en cours...
                </div>
              ) : (
                "Se connecter"
              )}
            </button>
          </form>

          {/* Lien vers l'inscription */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Vous n'avez pas de compte ?{" "}
              <Link
                href="/auth/inscription"
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                S'inscrire
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Pied de page avec mentions légales */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            En continuant, vous acceptez nos{" "}
            <a href="#" className="text-blue-600 hover:text-blue-500">
              Conditions d'utilisation
            </a>{" "}
            et notre{" "}
            <a href="#" className="text-blue-600 hover:text-blue-500">
              Politique de confidentialité
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
