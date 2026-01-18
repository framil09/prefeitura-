"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle, MessageCircle, Headphones, FileText, Shield, Upload, X, Image as ImageIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export function ContatoClient() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    assunto: "",
    mensagem: ""
  });
  const [tipoMensagem, setTipoMensagem] = useState("duvida");
  const [foto, setFoto] = useState<File | null>(null);
  const [documento, setDocumento] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFoto(file);
      const reader = new FileReader();
      reader.onload = (evt) => {
        setFotoPreview(evt.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocumentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDocumento(file);
    }
  };

  const removeFoto = () => {
    setFoto(null);
    setFotoPreview("");
  };

  const removeDocumento = () => {
    setDocumento(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("nome", formData.nome);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("assunto", formData.assunto);
      formDataToSend.append("mensagem", formData.mensagem);
      formDataToSend.append("tipo", tipoMensagem);
      
      if (foto) {
        formDataToSend.append("foto", foto);
      }
      if (documento) {
        formDataToSend.append("documento", documento);
      }

      const res = await fetch("/api/contato", {
        method: "POST",
        body: formDataToSend
      });

      if (!res.ok) throw new Error("Erro ao enviar mensagem");
      
      setSuccess(true);
      setFormData({ nome: "", email: "", assunto: "", mensagem: "" });
      setFoto(null);
      setDocumento(null);
      setFotoPreview("");
    } catch (err) {
      setError("Erro ao enviar mensagem. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        {/* Formulário Responsivo - Centrado e Diminuído */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="bg-gradient-to-br from-white to-purple-50 shadow-2xl border border-purple-200 rounded-2xl overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600" />
              <CardContent className="p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-2">🎤 Central de Ouvidoria Municipal</h2>
                <p className="text-gray-600 mb-6 text-sm">Sua voz é importante! Compartilhe suas sugestões, reclamações e elogios conosco.</p>

                {success ? (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-12 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 0.8, times: [0, 0.5, 0.75, 1] }}
                      className="mb-6"
                    >
                      <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
                    </motion.div>
                    <h3 className="text-3xl font-black text-green-900 mb-3">Enviado com Sucesso! 🎉</h3>
                    <p className="text-green-700 mb-2 font-semibold">Obrigado pelo seu contato!</p>
                    <p className="text-sm text-green-600 mb-8 max-w-xs mx-auto">
                      Responderemos em até 2 dias úteis no e-mail <strong>{formData.email}</strong>
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSuccess(false)}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-bold transition-all"
                    >
                      Enviar outro contato
                    </motion.button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Tipo de Mensagem */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <label className="block text-sm font-bold text-gray-800 mb-4">
                        🎯 Tipo de Mensagem *
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { value: "duvida", label: "❓ Dúvida", color: "from-blue-500 to-blue-600" },
                          { value: "reclamacao", label: "⚠️ Reclamação", color: "from-red-500 to-red-600" },
                          { value: "sugestao", label: "💡 Sugestão", color: "from-green-500 to-green-600" },
                          { value: "elogio", label: "⭐ Elogio", color: "from-amber-500 to-amber-600" }
                        ].map((opt) => (
                          <motion.button
                            key={opt.value}
                            type="button"
                            onClick={() => setTipoMensagem(opt.value)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`p-4 rounded-xl font-semibold transition-all text-center ${
                              tipoMensagem === opt.value
                                ? `bg-gradient-to-r ${opt.color} text-white shadow-xl`
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            {opt.label}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>

                    {/* Nome */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      <label className="block text-sm font-bold text-gray-800 mb-2">
                        👤 Nome completo *
                      </label>
                      <Input
                        required
                        value={formData.nome}
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                        placeholder="Seu nome completo"
                        className="border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg h-12 transition-all"
                      />
                    </motion.div>

                    {/* E-mail */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <label className="block text-sm font-bold text-gray-800 mb-2">
                        📧 E-mail *
                      </label>
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="seu@email.com"
                        className="border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg h-12 transition-all"
                      />
                    </motion.div>

                    {/* Assunto */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                    >
                      <label className="block text-sm font-bold text-gray-800 mb-2">
                        💬 Assunto *
                      </label>
                      <Input
                        required
                        value={formData.assunto}
                        onChange={(e) => setFormData({ ...formData, assunto: e.target.value })}
                        placeholder="Resumo da sua mensagem"
                        className="border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg h-12 transition-all"
                      />
                    </motion.div>

                    {/* Mensagem */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label className="block text-sm font-bold text-gray-800 mb-2">
                        📝 Mensagem *
                      </label>
                      <Textarea
                        required
                        rows={6}
                        value={formData.mensagem}
                        onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                        placeholder="Detalhe sua mensagem com clareza... (máximo 500 caracteres)"
                        maxLength={500}
                        className="border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg transition-all resize-none"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {formData.mensagem.length}/500 caracteres
                      </p>
                    </motion.div>

                    {/* Upload de Foto */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                    >
                      <label className="block text-sm font-bold text-gray-800 mb-3">
                        📷 Anexar Foto ou Comprovante (Opcional)
                      </label>
                      {!fotoPreview ? (
                        <label className="block border-2 border-dashed border-purple-300 rounded-xl p-6 cursor-pointer hover:border-purple-600 hover:bg-purple-50 transition-all">
                          <div className="flex flex-col items-center justify-center gap-2">
                            <ImageIcon className="w-8 h-8 text-purple-600" />
                            <span className="text-sm font-bold text-purple-700">
                              Clique para adicionar uma foto
                            </span>
                            <p className="text-xs text-gray-500">JPG, PNG até 5MB</p>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFotoChange}
                            className="hidden"
                          />
                        </label>
                      ) : (
                        <div className="relative rounded-xl overflow-hidden border-2 border-green-400 shadow-md bg-gray-100">
                          <img 
                            src={fotoPreview} 
                            alt="Foto preview" 
                            className="w-full h-40 object-cover"
                          />
                          <div className="absolute top-3 right-3 flex gap-2">
                            <button
                              type="button"
                              onClick={removeFoto}
                              className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-all"
                            >
                              <X className="w-4 h-4" />
                            </button>
                            <label className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 shadow-lg transition-all cursor-pointer">
                              <ImageIcon className="w-4 h-4" />
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleFotoChange}
                                className="hidden"
                              />
                            </label>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-600 to-transparent p-2">
                            <p className="text-xs font-bold text-white">✅ Foto adicionada</p>
                          </div>
                        </div>
                      )}
                    </motion.div>

                    {error && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 bg-red-50 text-red-700 p-4 rounded-lg text-sm border border-red-200"
                      >
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        {error}
                      </motion.div>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit" 
                      className="w-full bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 hover:from-purple-700 hover:via-purple-800 hover:to-purple-900 h-14 font-bold text-white rounded-xl transition-all hover:shadow-2xl shadow-lg disabled:opacity-50"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                          Enviando sua mensagem...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <Send className="w-5 h-5" />
                          Enviar Mensagem
                        </span>
                      )}
                    </motion.button>

                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 p-4 rounded-xl text-center">
                      <p className="text-xs text-gray-700 font-semibold">
                        🔒 Seus dados são 100% confidenciais e protegidos
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Utilizados apenas para responder seu contato
                      </p>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Formas de Contato - Abaixo do Formulário */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">📞 Formas de Contato</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Endereço */}
            <motion.div 
              whileHover={{ x: 8, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-blue-50 overflow-hidden h-full flex flex-col">
                <div className="h-0.5 bg-gradient-to-r from-blue-500 to-blue-600" />
                <CardContent className="p-4 flex items-start gap-3 flex-1">
                  <motion.div 
                    whileHover={{ rotate: 12 }}
                    className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shrink-0 shadow-md"
                  >
                    <MapPin className="w-5 h-5 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1 text-base">Endereço</h3>
                    <p className="text-gray-700 font-semibold text-sm">Rua Tiradentes, 165</p>
                    <p className="text-gray-600 text-xs">Centro, Lambari/MG</p>
                    <p className="text-gray-600 text-xs">CEP: 37.480-000</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Telefone */}
            <motion.div 
              whileHover={{ x: 8, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-green-50 overflow-hidden h-full flex flex-col">
                <div className="h-0.5 bg-gradient-to-r from-green-500 to-green-600" />
                <CardContent className="p-4 flex items-start gap-3 flex-1">
                  <motion.div 
                    whileHover={{ rotate: 12 }}
                    className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shrink-0 shadow-md"
                  >
                    <Phone className="w-5 h-5 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1 text-base">Telefone</h3>
                    <motion.p 
                      className="text-gray-700 font-bold text-lg cursor-pointer hover:text-green-600 transition-colors"
                      whileHover={{ scale: 1.05 }}
                    >
                      0800 035 4011
                    </motion.p>
                    <p className="text-gray-600 text-xs mt-0.5">📞 Ligação gratuita</p>
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
                <CardContent className="p-4 flex items-start gap-3 flex-1">
                  <motion.div 
                    whileHover={{ rotate: 12 }}
                    className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shrink-0 shadow-md"
                  >
                    <Mail className="w-5 h-5 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1 text-base">E-mail</h3>
                    <div className="space-y-0.5 w-full">
                      <motion.a 
                        href="mailto:ouvidoria@lambari.mg.gov.br"
                        whileHover={{ x: 3 }}
                        className="text-purple-600 font-semibold hover:text-purple-700 transition-colors block text-sm break-words whitespace-normal"
                      >
                        ouvidoria@lambari.mg.gov.br
                      </motion.a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Horário */}
            <motion.div 
              whileHover={{ x: 8, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-amber-50 overflow-hidden h-full flex flex-col">
                <div className="h-0.5 bg-gradient-to-r from-amber-500 to-orange-600" />
                <CardContent className="p-4 flex items-start gap-3 flex-1">
                  <motion.div 
                    whileHover={{ rotate: 12 }}
                    className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center shrink-0 shadow-md"
                  >
                    <Clock className="w-5 h-5 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1 text-base">Horário</h3>
                    <p className="text-gray-700 font-semibold text-sm">Segunda a Sexta</p>
                    <p className="text-gray-600 text-xs">8h às 17h</p>
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
