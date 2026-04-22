import { PrismaClient } from "@prisma/client";

// В dev-режиме Next перезагружает модули на каждый запрос — без singleton мы быстро
// исчерпаем коннекшны к SQLite.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
