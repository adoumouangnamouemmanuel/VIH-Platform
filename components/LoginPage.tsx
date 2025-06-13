"use client";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Eye, EyeOff, Lock, Mail, Shield } from "lucide-react";
import React, { useState } from "react";
import { auth } from "../utils/firebase.config";

/**
 * Composant de page de connexion/inscription pour la plateforme VIH
 * Gère l'authentification des utilisateurs avec Firebase Auth
 */
const LoginPage = () => {
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

  console.log(
    "🔐 LoginPage - Mode actuel:",
    isLogin ? "Connexion" : "Inscription"
  );
  console.log("📝 LoginPage - Données du formulaire:", {
    email: formData.email,
    hasPassword: !!formData.password,
  });

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
      } else {
        console.log("👤 Tentative d'inscription avec email:", formData.email);
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        console.log(
          "✅ Inscription réussie pour l'utilisateur:",
          userCredential.user.uid
        );
      }

      // Réinitialiser les erreurs après succès
      setErrors({});
      console.log("🎉 Authentification terminée avec succès");
    } catch (error: any) {
      console.error("❌ Erreur d'authentification:", error);
      console.error("❌ Code d'erreur:", error.code);
      console.error("❌ Message d'erreur:", error.message);

      // Traduire les erreurs Firebase en français
      let errorMessage = error.message;
      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "Aucun compte n'existe avec cette adresse email";
          break;
        case "auth/wrong-password":
          errorMessage = "Mot de passe incorrect";
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
        default:
          errorMessage = "Une erreur est survenue. Veuillez réessayer.";
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

  /**
   * Bascule entre les modes connexion et inscription
   */
  const toggleMode = () => {
    const newMode = !isLogin;
    console.log(
      "🔄 Basculement vers le mode:",
      newMode ? "Inscription" : "Connexion"
    );

    setIsLogin(newMode);
    setErrors({});
    setFormData({ email: "", password: "", confirmPassword: "" });

    console.log("🧹 Formulaire réinitialisé");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* En-tête avec logo et titre */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Plateforme VIH
          </h1>
          <p className="text-gray-600">
            Système sécurisé de gestion de la santé
          </p>
        </div>

        {/* Conteneur du formulaire */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              {isLogin ? "Bon retour" : "Créer un compte"}
            </h2>
            <p className="text-gray-600">
              {isLogin
                ? "Connectez-vous à votre compte"
                : "Rejoignez notre plateforme dès aujourd'hui"}
            </p>
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

            {/* Champ Confirmation du mot de passe (Inscription seulement) */}
            {!isLogin && (
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.confirmPassword
                        ? "border-red-300"
                        : "border-gray-300"
                    }`}
                    placeholder="Confirmez votre mot de passe"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            )}

            {/* Erreur de soumission */}
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{errors.submit}</p>
              </div>
            )}

            {/* Mot de passe oublié (Connexion seulement) */}
            {isLogin && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                  onClick={() => console.log("🔗 Clic sur mot de passe oublié")}
                >
                  Mot de passe oublié ?
                </button>
              </div>
            )}

            {/* Bouton de soumission */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Traitement en cours...
                </div>
              ) : isLogin ? (
                "Se connecter"
              ) : (
                "Créer le compte"
              )}
            </button>
          </form>

          {/* Basculer entre connexion/inscription */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isLogin
                ? "Vous n'avez pas de compte ?"
                : "Vous avez déjà un compte ?"}
              <button
                type="button"
                onClick={toggleMode}
                className="ml-2 text-blue-600 hover:text-blue-500 font-medium"
              >
                {isLogin ? "S'inscrire" : "Se connecter"}
              </button>
            </p>
          </div>
        </div>

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
};

export default LoginPage;
