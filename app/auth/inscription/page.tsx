"use client";

import { auth, googleProvider } from "@/utils/firebase.config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Shield,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

/**
 * Page d'inscription dédiée pour la plateforme VIH Niger
 * Permet aux nouveaux utilisateurs de créer un compte avec validation complète
 */
export default function SignupPage() {
  const router = useRouter();

  // États pour les données du formulaire d'inscription
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  // États pour l'interface utilisateur
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  console.log("👤 SignupPage - Données actuelles:", {
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    hasPassword: !!formData.password,
    acceptedTerms: formData.acceptTerms,
  });

  /**
   * Validation complète du formulaire d'inscription
   * @returns {boolean} - True si tous les champs sont valides
   */
  const validateForm = () => {
    console.log("🔍 Démarrage de la validation du formulaire d'inscription");
    const newErrors: any = {};

    // Validation du prénom
    if (!formData.firstName.trim()) {
      newErrors.firstName = "Le prénom est obligatoire";
      console.log("❌ Erreur: Prénom manquant");
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "Le prénom doit contenir au moins 2 caractères";
      console.log("❌ Erreur: Prénom trop court");
    }

    // Validation du nom de famille
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Le nom de famille est obligatoire";
      console.log("❌ Erreur: Nom de famille manquant");
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName =
        "Le nom de famille doit contenir au moins 2 caractères";
      console.log("❌ Erreur: Nom de famille trop court");
    }

    // Validation de l'email
    if (!formData.email) {
      newErrors.email = "L'adresse email est obligatoire";
      console.log("❌ Erreur: Email manquant");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
      console.log("❌ Erreur: Format email invalide");
    }

    // Validation du mot de passe
    if (!formData.password) {
      newErrors.password = "Le mot de passe est obligatoire";
      console.log("❌ Erreur: Mot de passe manquant");
    } else if (formData.password.length < 8) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 8 caractères";
      console.log("❌ Erreur: Mot de passe trop court");
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre";
      console.log("❌ Erreur: Mot de passe trop faible");
    }

    // Validation de la confirmation du mot de passe
    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        "La confirmation du mot de passe est obligatoire";
      console.log("❌ Erreur: Confirmation mot de passe manquante");
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
      console.log("❌ Erreur: Mots de passe différents");
    }

    // Validation de l'acceptation des conditions
    if (!formData.acceptTerms) {
      newErrors.acceptTerms =
        "Vous devez accepter les conditions d'utilisation";
      console.log("❌ Erreur: Conditions non acceptées");
    }

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    console.log(
      "✅ Résultat validation inscription:",
      isValid ? "Succès" : "Échec",
      newErrors
    );
    return isValid;
  };

  /**
   * Surveille l'état d'authentification de l'utilisateur
   * Redirige automatiquement vers la page de connexion après inscription
   */
  useEffect(() => {
    console.log(
      "🔍 Mise en place du listener d'authentification (inscription)..."
    );

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(
        "👤 État d'authentification changé (inscription):",
        user ? "Connecté" : "Déconnecté"
      );

      if (user && success) {
        console.log("✅ Utilisateur connecté après inscription:", {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });

        // Redirection vers la page de connexion après inscription réussie
        setTimeout(() => {
          console.log(
            "🔄 Redirection vers la page de connexion après inscription..."
          );
          router.push("/auth/connexion");
        }, 2000);
      } else if (user && !success) {
        // Utilisateur déjà connecté, redirection immédiate vers l'accueil
        setIsAuthenticated(true);
        router.push("/");
      } else {
        setIsAuthenticated(false);
      }

      setAuthLoading(false);
    });

    return () => {
      console.log("🧹 Nettoyage du listener d'authentification (inscription)");
      unsubscribe();
    };
  }, [router, success]);

  /**
   * Gère l'inscription avec Google
   */
  const handleGoogleSignUp = async () => {
    console.log("🔍 Tentative d'inscription avec Google...");
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("✅ Inscription Google réussie:", result.user.uid);

      // Déconnecter l'utilisateur après inscription Google pour rediriger vers login
      await signOut(auth);
      console.log("🚪 Déconnexion automatique après inscription Google");

      // Afficher le succès et rediriger vers login
      setErrors({});
      setSuccess(true);
      console.log("🎉 Inscription Google terminée avec succès");

      // Redirection vers login après délai
      setTimeout(() => {
        console.log("🔄 Redirection vers la page de connexion...");
        router.push("/auth/connexion");
      }, 2000);
    } catch (error: any) {
      console.error("❌ Erreur inscription Google:", error);

      let errorMessage = error.message;
      switch (error.code) {
        case "auth/popup-closed-by-user":
          errorMessage = "Inscription annulée par l'utilisateur";
          break;
        case "auth/popup-blocked":
          errorMessage = "Popup bloquée par le navigateur";
          break;
        case "auth/account-exists-with-different-credential":
          errorMessage = "Un compte existe déjà avec cette adresse email";
          break;
        case "auth/network-request-failed":
          errorMessage = "Erreur de connexion réseau";
          break;
        default:
          errorMessage = "Erreur lors de l'inscription avec Google";
      }

      setErrors({ submit: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Gère la soumission du formulaire d'inscription
   * @param {React.FormEvent} e - L'événement de soumission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🚀 Démarrage du processus d'inscription");

    if (!validateForm()) {
      console.log("❌ Validation échouée, arrêt de l'inscription");
      return;
    }

    setLoading(true);
    console.log("⏳ Chargement démarré pour l'inscription");

    try {
      console.log(
        "👤 Création du compte utilisateur avec email:",
        formData.email
      );

      // Vérifier que l'auth est bien initialisé
      if (!auth) {
        throw new Error("Firebase Auth n'est pas initialisé");
      }

      // Créer le compte utilisateur
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      console.log("✅ Compte créé avec succès, UID:", userCredential.user.uid);

      // Mettre à jour le profil avec le nom complet
      const displayName = `${formData.firstName.trim()} ${formData.lastName.trim()}`;
      await updateProfile(userCredential.user, {
        displayName: displayName,
      });

      console.log("✅ Profil mis à jour avec le nom:", displayName);

      // Déconnecter l'utilisateur après inscription pour rediriger vers login
      await signOut(auth);
      console.log("🚪 Déconnexion automatique après inscription");

      // Réinitialiser les erreurs et afficher le succès
      setErrors({});
      setSuccess(true);

      console.log("🎉 Inscription terminée avec succès");

      // Redirection vers login après délai
      setTimeout(() => {
        console.log("🔄 Redirection vers la page de connexion...");
        router.push("/auth/connexion");
      }, 2000);
    } catch (error: any) {
      console.error("❌ Erreur lors de l'inscription:", error);
      console.error("❌ Code d'erreur:", error.code);
      console.error("❌ Message d'erreur:", error.message);

      // Traduire les erreurs Firebase en français
      let errorMessage = error.message;
      switch (error.code) {
        case "auth/configuration-not-found":
          errorMessage =
            "Configuration Firebase manquante. Veuillez contacter l'administrateur.";
          break;
        case "auth/email-already-in-use":
          errorMessage = "Cette adresse email est déjà utilisée";
          break;
        case "auth/weak-password":
          errorMessage = "Le mot de passe est trop faible";
          break;
        case "auth/invalid-email":
          errorMessage = "Format d'email invalide";
          break;
        case "auth/operation-not-allowed":
          errorMessage =
            "L'inscription par email/mot de passe n'est pas activée";
          break;
        case "auth/network-request-failed":
          errorMessage =
            "Erreur de connexion réseau. Vérifiez votre connexion internet.";
          break;
        default:
          errorMessage =
            "Une erreur est survenue lors de l'inscription. Veuillez réessayer.";
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
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    console.log(`📝 Changement dans le champ ${name}:`, newValue);

    setFormData({
      ...formData,
      [name]: newValue,
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

  // Affichage de la page de succès
  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full"
        >
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Inscription réussie !
            </h2>
            <p className="text-gray-600 mb-6">
              Votre compte a été créé avec succès. Vous allez être redirigé vers
              la page de connexion.
            </p>
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-3">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Plateforme VIH Niger
          </h1>
          <p className="text-sm text-gray-600">Créez votre compte sécurisé</p>
        </motion.div>

        {/* Formulaire d'inscription */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6"
        >
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              Créer un compte
            </h2>
            <p className="text-sm text-gray-600">
              Rejoignez notre plateforme de santé sécurisée
            </p>
          </div>

          {/* Bouton Google */}
          <button
            onClick={handleGoogleSignUp}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mb-4"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            S'inscrire avec Google
          </button>

          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white text-gray-500">ou</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Prénom et Nom */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Prénom
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`block w-full pl-9 pr-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm ${
                      errors.firstName ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Prénom"
                  />
                </div>
                {errors.firstName && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nom
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`block w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm ${
                    errors.lastName ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="Nom"
                />
                {errors.lastName && (
                  <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Adresse email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`block w-full pl-9 pr-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm ${
                    errors.email ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="votre@email.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Mot de passe */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`block w-full pl-9 pr-9 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm ${
                    errors.password ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="Min. 8 caractères"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => {
                    setShowPassword(!showPassword);
                    console.log(
                      "👁️ Visibilité mot de passe:",
                      !showPassword ? "Visible" : "Masqué"
                    );
                  }}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-600">{errors.password}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Majuscule, minuscule et chiffre requis
              </p>
            </div>

            {/* Confirmation mot de passe */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`block w-full pl-9 pr-9 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm ${
                    errors.confirmPassword
                      ? "border-red-300"
                      : "border-gray-300"
                  }`}
                  placeholder="Confirmez votre mot de passe"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => {
                    setShowConfirmPassword(!showConfirmPassword);
                    console.log(
                      "👁️ Visibilité confirmation:",
                      !showConfirmPassword ? "Visible" : "Masqué"
                    );
                  }}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Conditions d'utilisation */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="acceptTerms"
                  name="acceptTerms"
                  type="checkbox"
                  checked={formData.acceptTerms}
                  onChange={handleInputChange}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-2 text-xs">
                <label htmlFor="acceptTerms" className="text-gray-700">
                  J'accepte les{" "}
                  <a href="#" className="text-blue-600 hover:text-blue-500">
                    conditions d'utilisation
                  </a>{" "}
                  et la{" "}
                  <a href="#" className="text-blue-600 hover:text-blue-500">
                    politique de confidentialité
                  </a>
                </label>
                {errors.acceptTerms && (
                  <p className="mt-1 text-red-600">{errors.acceptTerms}</p>
                )}
              </div>
            </div>

            {/* Erreur de soumission */}
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-2 flex items-center">
                <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                <p className="text-xs text-red-600">{errors.submit}</p>
              </div>
            )}

            {/* Bouton de soumission */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Création du compte...
                </div>
              ) : (
                "Créer mon compte"
              )}
            </button>
          </form>

          {/* Lien vers la connexion */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Vous avez déjà un compte ?{" "}
              <Link
                href="/auth/connexion"
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
