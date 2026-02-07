import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

type GlobalPrisma = typeof globalThis & {
	prisma?: PrismaClient;
};

const globalForPrisma = globalThis as GlobalPrisma;

export const prisma =
	globalForPrisma.prisma ??
	new PrismaClient({
		adapter,
		log: ["error", "warn"],
	});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
