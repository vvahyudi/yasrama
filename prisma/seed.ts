import { PrismaClient } from "@/generated/prisma/client";
import bcryptjs from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
	console.log("🌱 Seeding database...");

	// Delete existing users (for development only)
	await prisma.user.deleteMany();

	// Create admin user
	const hashedPassword = await bcryptjs.hash("admin123", 12);

	const admin = await prisma.user.create({
		data: {
			email: "admin@yasrama.com",
			password: hashedPassword,
			name: "Admin Yayasan",
			role: "ADMIN",
			isActive: true,
		},
	});

	console.log("✅ Admin user created:");
	console.log(`   Email: ${admin.email}`);
	console.log(`   Password: admin123`);
	console.log(`   Role: ${admin.role}`);

	// Create sample users
	const editor = await prisma.user.create({
		data: {
			email: "editor@yasrama.com",
			password: await bcryptjs.hash("editor123", 12),
			name: "Editor Yayasan",
			role: "EDITOR",
			isActive: true,
		},
	});

	console.log(`\n✅ Editor user created:`);
	console.log(`   Email: ${editor.email}`);
	console.log(`   Password: editor123`);
	console.log(`   Role: ${editor.role}`);

	console.log("\n✨ Database seeded successfully!");
	console.log("\n📝 Login credentials:");
	console.log(`   Admin: admin@yasrama.com / admin123`);
	console.log(`   Editor: editor@yasrama.com / editor123`);
}

main()
	.catch((error) => {
		console.error("Error seeding database:", error);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
