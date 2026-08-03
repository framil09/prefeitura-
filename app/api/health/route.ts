export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

/**
 * GET /api/health
 * Health check endpoint desacoplado para AWS Load Balancer
 */
export async function GET() {
  const start = Date.now();
  const checks: Record<string, { status: string; latency?: number; error?: string }> = {};

  // Check Database (apenas informativo, sem derrubar o HTTP Status)
  try {
    const dbStart = Date.now();
    await prisma.$queryRaw`SELECT 1`;
    checks.database = { status: "healthy", latency: Date.now() - dbStart };
  } catch (error: any) {
    checks.database = { status: "unhealthy", error: error.message };
  }

  // Check Memory
  const memUsage = process.memoryUsage();
  checks.memory = {
    status: memUsage.heapUsed / memUsage.heapTotal < 0.9 ? "healthy" : "warning",
    latency: Math.round(memUsage.heapUsed / 1024 / 1024), // MB
  };

  const totalLatency = Date.now() - start;

  // IMPORTANTE: Retorna SEMPRE HTTP 200 para o Load Balancer manter a Task viva
  return NextResponse.json(
    {
      status: checks.database.status === "healthy" ? "healthy" : "degraded",
      version: process.env.APP_VERSION || "1.0.0",
      environment: process.env.NODE_ENV || "production",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      latency: totalLatency,
      checks,
    },
    { status: 200 } // <--- RETORNA 200 OBRIGATORIAMENTE
  );
}
