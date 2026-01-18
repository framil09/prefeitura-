"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface SecretariasClientProps {
  secretarias: any[];
}

export function SecretariasClient({ secretarias }: SecretariasClientProps) {
  const safeSecretarias = secretarias ?? [];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="space-y-8">
          {safeSecretarias.map((secretaria, index) => (
            <motion.div
              key={secretaria?.id ?? index}
              id={secretaria?.sigla?.toLowerCase() ?? ''}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="grid md:grid-cols-4">
                  {/* Foto do Secretário */}
                  <div className="bg-blue-700 p-6 flex flex-col items-center justify-center text-white">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden bg-blue-600 ring-4 ring-blue-500 mb-4">
                      {secretaria?.fotoSecretario ? (
                        <Image
                          src={secretaria.fotoSecretario}
                          alt={secretaria?.secretario ?? "Secretário"}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <User className="w-12 h-12 text-blue-400" />
                        </div>
                      )}
                    </div>
                    <p className="font-semibold text-center">{secretaria?.secretario ?? "A definir"}</p>
                    <p className="text-blue-200 text-sm">Secretário(a)</p>
                  </div>

                  {/* Informações */}
                  <CardContent className="md:col-span-3 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-xl font-bold text-gray-800">
                          {secretaria?.nome ?? "Secretaria"}
                        </h2>
                        {secretaria?.sigla && (
                          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded mt-1">
                            {secretaria.sigla}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6">
                      {secretaria?.descricao ?? ""}
                    </p>

                    <div className="grid sm:grid-cols-3 gap-4">
                      {secretaria?.telefone && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4 text-blue-600" />
                          <span>{secretaria.telefone}</span>
                        </div>
                      )}
                      {secretaria?.email && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4 text-blue-600" />
                          <span>{secretaria.email}</span>
                        </div>
                      )}
                      {secretaria?.endereco && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4 text-blue-600" />
                          <span>{secretaria.endereco}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
