"use client"

import { motion } from "framer-motion"
import { Facebook, Heart, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fillRule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fillOpacity=\'0.05\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
      
      <div className="relative container mx-auto px-4 py-12">
        {/* Main content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
        >
          {/* Brand section */}
          <div className="text-center md:text-left">
            <motion.div 
              className="flex items-center justify-center md:justify-start mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                VIH
              </span>
              <span className="text-3xl font-bold text-white ml-1">Info</span>
            </motion.div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Plateforme moderne de dépistage et sensibilisation VIH au Niger
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              {[Facebook, Twitter, Instagram].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 transition-all duration-300"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-semibold mb-4 text-lg">Liens rapides</h3>
            <div className="space-y-2">
              {[
                { name: "Sensibilisation", href: "/sensibilisation" },
                { name: "Auto-évaluation", href: "/evaluation" },
                { name: "Centres", href: "/centres" },
                { name: "Forum", href: "/forum" }
              ].map((link, index) => (
                <motion.div key={index} whileHover={{ x: 5 }}>
                  <Link 
                    href={link.href}
                    className="block text-gray-300 hover:text-white hover:bg-white/10 px-3 py-1 rounded-lg transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact info */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-semibold mb-4 text-lg">Contact</h3>
            <div className="space-y-3">
              <motion.div 
                className="flex items-center justify-center md:justify-start text-gray-300"
                whileHover={{ x: 5 }}
              >
                <Mail className="w-4 h-4 mr-3 text-indigo-400" />
                <span className="text-sm">contact@vihinfo.ne</span>
              </motion.div>
              <motion.div 
                className="flex items-center justify-center md:justify-start text-gray-300"
                whileHover={{ x: 5 }}
              >
                <Phone className="w-4 h-4 mr-3 text-indigo-400" />
                <span className="text-sm">+227 20 XX XX XX</span>
              </motion.div>
              <motion.div 
                className="flex items-center justify-center md:justify-start text-gray-300"
                whileHover={{ x: 5 }}
              >
                <MapPin className="w-4 h-4 mr-3 text-indigo-400" />
                <span className="text-sm">Niamey, Niger</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Bottom section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-white/10 pt-6 text-center"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} VIHInfo Niger. Tous droits réservés.
            </p>
            <motion.p 
              className="text-gray-400 text-sm flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              Créé avec <Heart className="w-4 h-4 mx-1 text-red-400" /> pour la santé publique
            </motion.p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
