export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

/**
 * GET /api/health
 * Health check endpoint para monitoramento e load balancers (Azure, Docker)
 */
export async function GET() {
  const start = Date.now();
  const checks: Record<string, { status: string; latency?: number; error?: string }> = {};

  // Check Database
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

  const allHealthy = Object.values(checks).every((c) => c.status !== "unhealthy");
  const totalLatency = Date.now() - start;

  return NextResponse.json(
    {
      status: allHealthy ? "healthy" : "unhealthy",
      version: process.env.APP_VERSION || "1.0.0",
      environment: process.env.NODE_ENV || "development",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      latency: totalLatency,
      checks,
    },
    { status: allHealthy ? 200 : 503 }
  );
}
