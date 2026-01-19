"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function ContatoClient() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        {/* Formas de Contato */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl md:text-5xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-12">
            📞 Contato
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            
            {/* WhatsApp */}
            <motion.div 
              whileHover={{ x: 8, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-green-50 overflow-hidden h-full flex flex-col">
                <div className="h-0.5 bg-gradient-to-r from-green-500 to-green-600" />
                <CardContent className="p-6 flex items-start gap-4 flex-1">
                  <motion.div 
                    whileHover={{ rotate: 12 }}
                    className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shrink-0 shadow-md"
                  >
                    <MessageCircle className="w-6 h-6 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">WhatsApp</h3>
                    <motion.a 
                      href="https://wa.me/5535999999999"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      className="text-green-600 font-bold text-lg hover:text-green-700 transition-colors"
                    >
                      (35) 9 9999-9999
                    </motion.a>
                    <p className="text-gray-600 text-sm mt-2">💬 Envie uma mensagem</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* E-mail */}
            <motion.div 
              whileHover={{ x: 8, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-purple-50 overflow-hidden h-full flex flex-col">
                <div className="h-0.5 bg-gradient-to-r from-purple-500 to-purple-600" />
                <CardContent className="p-6 flex items-start gap-4 flex-1">
                  <motion.div 
                    whileHover={{ rotate: 12 }}
                    className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shrink-0 shadow-md"
                  >
                    <Mail className="w-6 h-6 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">E-mail</h3>
                    <motion.a 
                      href="mailto:ouvidoria@lambari.mg.gov.br"
                      whileHover={{ x: 3 }}
                      className="text-purple-600 font-semibold hover:text-purple-700 transition-colors block break-words"
                    >
                      ouvidoria@lambari.mg.gov.br
                    </motion.a>
                    <p className="text-gray-600 text-sm mt-2">📧 Envie um e-mail</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
