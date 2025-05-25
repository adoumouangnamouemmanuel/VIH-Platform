import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail, Phone, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-12 px-4 md:px-6">
        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-8 md:p-12 mb-12 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Restez informé</h3>
              <p className="text-white/90 mb-0 md:pr-12">
                Inscrivez-vous à notre newsletter pour recevoir les dernières informations sur le VIH, la prévention et
                nos services.
              </p>
            </div>
            <div>
              <form className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Votre adresse email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-white"
                />
                <Button className="bg-white text-indigo-600 hover:bg-white/90">S'inscrire</Button>
              </form>
              <p className="text-white/70 text-sm mt-3">
                Nous respectons votre vie privée. Vous pouvez vous désinscrire à tout moment.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center mb-6">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                VIH
              </span>
              <span className="text-2xl font-bold text-gray-800 dark:text-white">Info</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Plateforme d'Accès et de Suivi du Dépistage du VIH. Nous facilitons l'accès aux tests de dépistage et
              offrons un suivi personnalisé.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
              >
                <Facebook size={20} />
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
              >
                <Twitter size={20} />
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
              >
                <Instagram size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">Services</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/sensibilisation"
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Sensibilisation
                </Link>
              </li>
              <li>
                <Link
                  href="/evaluation"
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Auto-évaluation
                </Link>
              </li>
              <li>
                <Link
                  href="/centres"
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Centres de dépistage
                </Link>
              </li>
              <li>
                <Link
                  href="/chatbot"
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Chatbot d'assistance
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">Liens utiles</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/a-propos"
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/confidentialite"
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link
                  href="/conditions"
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Conditions d'utilisation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                <Mail className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                <span>contact@vihinfo.org</span>
              </li>
              <li className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                <Phone className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                <span>+33 1 23 45 67 89</span>
              </li>
              <li className="pt-4">
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 border-0"
                >
                  <Link href="/contact">Nous contacter</Link>
                </Button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            &copy; {new Date().getFullYear()} VIHInfo. Tous droits réservés.
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-sm flex items-center justify-center">
            Créé avec <Heart className="h-4 w-4 mx-1 text-red-500" /> pour la santé publique
          </p>
        </div>
      </div>
    </footer>
  )
}
