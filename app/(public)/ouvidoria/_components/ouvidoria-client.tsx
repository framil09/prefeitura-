"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageCircle, CheckCircle, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function OuvidoriaClient() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    assunto: "",
    mensagem: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({ nome: "", email: "", assunto: "", mensagem: "" });
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Erro ao enviar:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        {/* Formulário de Ouvidoria */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <div className="max-w-2xl mx-auto">
            <Card className="bg-gradient-to-br from-white to-purple-50 shadow-2xl border border-purple-200 rounded-2xl overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600" />
              <CardContent className="p-6 md:p-8">
                <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-2">
                  🎤 Central de Ouvidoria Municipal
                </h1>
                <p className="text-gray-600 mb-8 text-base">
                  Sua voz é importante! Compartilhe suas sugestões, reclamações, elogios e contribuições para melhorar nosso município.
                </p>

                {success ? (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-12 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl"
                  >
                    <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-black text-green-900 mb-2">Enviado com Sucesso! 🎉</h3>
                    <p className="text-green-700 font-semibold">Obrigado pelo seu contato! Responderemos em breve.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Nome */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                      <label className="block text-sm font-bold text-gray-800 mb-2">
                        👤 Nome completo *
                      </label>
                      <Input
                        required
                        value={formData.nome}
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                        placeholder="Seu nome completo"
                        className="border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg h-12"
                      />
                    </motion.div>

                    {/* E-mail */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                      <label className="block text-sm font-bold text-gray-800 mb-2">
                        📧 E-mail *
                      </label>
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="seu@email.com"
                        className="border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg h-12"
                      />
                    </motion.div>

                    {/* Assunto */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                      <label className="block text-sm font-bold text-gray-800 mb-2">
                        💬 Assunto *
                      </label>
                      <Input
                        required
                        value={formData.assunto}
                        onChange={(e) => setFormData({ ...formData, assunto: e.target.value })}
                        placeholder="Resumo da sua mensagem"
                        className="border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg h-12"
                      />
                    </motion.div>

                    {/* Mensagem */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                      <label className="block text-sm font-bold text-gray-800 mb-2">
                        📝 Mensagem *
                      </label>
                      <Textarea
                        required
                        rows={5}
                        value={formData.mensagem}
                        onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                        placeholder="Detalhe sua mensagem..."
                        maxLength={500}
                        className="border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg resize-none"
                      />
                      <p className="text-xs text-gray-500 mt-1">{formData.mensagem.length}/500 caracteres</p>
                    </motion.div>

                    {/* Botão */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 h-12 font-bold text-white gap-2"
                      >
                        {loading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Enviar Mensagem
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Formas Alternativas de Contato */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-8 text-center">📞 Outras Formas de Contato</h2>
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
