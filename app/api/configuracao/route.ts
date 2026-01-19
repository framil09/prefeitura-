export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function GET() {
  try {
    const config = await prisma.configuracaoSite.findFirst();
    if (!config) {
      const newConfig = await prisma.configuracaoSite.create({
        data: {
          nomeCidade: "Lambari",
          slogan: "Estância Hidromineral"
        }
      });
      return NextResponse.json(newConfig);
    }
    return NextResponse.json(config);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar configuração" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await req.json();

    // Busca ou cria a configuração
    let config = await prisma.configuracaoSite.findFirst();

    if (!config) {
      config = await prisma.configuracaoSite.create({
        data: {
          nomeCidade: body.nomeCidade || "Lambari",
          slogan: body.slogan || "Estância Hidromineral",
          fotoSlogan: body.fotoSlogan || null,
          logoUrl: body.logoUrl || null,
          bannerUrl: body.bannerUrl || null,
          prefeito: body.prefeito || null,
          fotoPrefeito: body.fotoPrefeito || null,
          vicePrefeito: body.vicePrefeito || null,
          fotoVicePrefeito: body.fotoVicePrefeito || null,
          telefone: body.telefone || null,
          email: body.email || null,
          endereco: body.endereco || null,
          horarioAtendimento: body.horarioAtendimento || null,
          facebookUrl: body.facebookUrl || null,
          instagramUrl: body.instagramUrl || null,
          youtubeUrl: body.youtubeUrl || null
        }
      });
    } else {
      config = await prisma.configuracaoSite.update({
        where: { id: config.id },
        data: {
          nomeCidade: body.nomeCidade || config.nomeCidade,
          slogan: body.slogan || config.slogan,
          fotoSlogan: body.fotoSlogan !== undefined ? body.fotoSlogan : config.fotoSlogan,
          logoUrl: body.logoUrl !== undefined ? body.logoUrl : config.logoUrl,
          bannerUrl: body.bannerUrl !== undefined ? body.bannerUrl : config.bannerUrl,
          prefeito: body.prefeito || config.prefeito,
          fotoPrefeito: body.fotoPrefeito || config.fotoPrefeito,
          vicePrefeito: body.vicePrefeito || config.vicePrefeito,
          fotoVicePrefeito: body.fotoVicePrefeito || config.fotoVicePrefeito,
          telefone: body.telefone || config.telefone,
          email: body.email || config.email,
          endereco: body.endereco || config.endereco,
          horarioAtendimento: body.horarioAtendimento || config.horarioAtendimento,
          facebookUrl: body.facebookUrl || config.facebookUrl,
          instagramUrl: body.instagramUrl || config.instagramUrl,
          youtubeUrl: body.youtubeUrl || config.youtubeUrl
        }
      });
    }

    return NextResponse.json(config, { status: 200 });
  } catch (error) {
    console.error("Erro ao salvar configuração:", error);
    return NextResponse.json({ error: "Erro ao salvar configuração" }, { status: 500 });
  }
}
