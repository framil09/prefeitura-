"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface SecretariasPreviewProps {
  secretarias: any[];
}

export function SecretariasPreview({ secretarias }: SecretariasPreviewProps) {
  const safeSecretarias = secretarias ?? [];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Secretarias</h2>
            <p className="text-gray-600 mt-1">Conheça os órgãos da administração municipal</p>
          </div>
          <Link href="/secretarias">
            <Button variant="outline">
              Ver todas
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {safeSecretarias.map((secretaria, index) => (
            <motion.div
              key={secretaria?.id ?? index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/secretarias#${secretaria?.sigla?.toLowerCase() ?? ''}`}>
                <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1 group border-l-4 border-l-blue-600">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-colors">
                        <Building2 className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                          {secretaria?.nome ?? "Secretaria"}
                        </h3>
                        {secretaria?.sigla && (
                          <span className="text-xs text-blue-600 font-medium">
                            {secretaria.sigla}
                          </span>
                        )}
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                          {secretaria?.descricao ?? ""}
                        </p>
                        {secretaria?.telefone && (
                          <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                            <Phone className="w-3 h-3" />
                            {secretaria.telefone}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
