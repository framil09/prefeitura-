/**
 * Utilitários de validação e sanitização de inputs para a API.
 */

/**
 * Remove tags HTML e scripts de uma string para prevenir XSS.
 */
export function sanitizeString(input: string): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<[^>]*>/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .trim();
}

/**
 * Sanitiza um objeto recursivamente.
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const sanitized = { ...obj };
  for (const key of Object.keys(sanitized)) {
    if (typeof sanitized[key] === "string") {
      (sanitized as any)[key] = sanitizeString(sanitized[key]);
    } else if (
      typeof sanitized[key] === "object" &&
      sanitized[key] !== null &&
      !Array.isArray(sanitized[key]) &&
      !(sanitized[key] instanceof Date)
    ) {
      (sanitized as any)[key] = sanitizeObject(sanitized[key]);
    }
  }
  return sanitized;
}

/**
 * Valida formato de email.
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valida força de senha (mínimo 8 chars, 1 maiúscula, 1 número).
 */
export function isStrongPassword(password: string): boolean {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password)
  );
}

/**
 * Valida e sanitiza um ID (CUID format).
 */
export function isValidId(id: string): boolean {
  return /^c[a-z0-9]{20,30}$/.test(id);
}

/**
 * Limita o tamanho de uma string.
 */
export function truncateString(input: string, maxLength: number): string {
  if (typeof input !== "string") return "";
  return input.length > maxLength ? input.substring(0, maxLength) : input;
}

/**
 * Sanitiza parâmetros de paginação.
 */
export function sanitizePagination(
  page?: number | string,
  limit?: number | string
): { page: number; limit: number; skip: number } {
  const p = Math.max(1, parseInt(String(page || 1), 10) || 1);
  const l = Math.min(100, Math.max(1, parseInt(String(limit || 20), 10) || 20));
  return { page: p, limit: l, skip: (p - 1) * l };
}

/**
 * Rate limiter simples em memória (para produção, usar Redis).
 */
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(
  identifier: string,
  maxRequests: number = 60,
  windowMs: number = 60000
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  if (!record || now > record.resetAt) {
    rateLimitStore.set(identifier, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  record.count++;
  return { allowed: true, remaining: maxRequests - record.count };
}
