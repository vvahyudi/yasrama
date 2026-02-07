import { type NextRequest, NextResponse } from "next/server";

import { NEWS_STATUS, type NewsStatus } from "@/lib/content-types";
import { prisma } from "@/lib/db";
import { getUser } from "@/lib/session";

// Generate slug from title
function generateSlug(title: string): string {
	return title
		.toLowerCase()
		.replace(/[^\w\s-]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-")
		.trim();
}

// Get all news
export async function GET(request: NextRequest) {
	try {
		const user = await getUser();
		if (!user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}
		const { searchParams } = new URL(request.url);
		const rawStatus = searchParams.get("status");
		const status = NEWS_STATUS.includes(rawStatus as NewsStatus)
			? (rawStatus as NewsStatus)
			: undefined;
		const page = parseInt(searchParams.get("page") || "1", 10);
		const limit = 10;

		const where = status ? { status } : {};

		const [news, total] = await Promise.all([
			prisma.news.findMany({
				where,
				select: {
					id: true,
					title: true,
					slug: true,
					description: true,
					status: true,
					featured: true,
					createdAt: true,
					author: {
						select: {
							name: true,
							email: true,
						},
					},
				},
				skip: (page - 1) * limit,
				take: limit,
				orderBy: { createdAt: "desc" },
			}),
			prisma.news.count({ where }),
		]);

		return NextResponse.json(
			{
				success: true,
				data: news,
				pagination: {
					total,
					page,
					limit,
					pages: Math.ceil(total / limit),
				},
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error("Get news error:", error);
		return NextResponse.json(
			{ error: "Terjadi kesalahan server" },
			{ status: 500 },
		);
	}
}

// Create news
export async function POST(request: NextRequest) {
	try {
		const user = await getUser();
		if (!user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { title, description, content, image, status, featured } =
			await request.json();

		if (!title || !description || !content) {
			return NextResponse.json(
				{ error: "Title, description, dan content harus diisi" },
				{ status: 400 },
			);
		}

		const slug = generateSlug(title);

		// Check if slug already exists
		const existing = await prisma.news.findUnique({ where: { slug } });
		if (existing) {
			return NextResponse.json(
				{ error: "Berita dengan judul serupa sudah ada" },
				{ status: 400 },
			);
		}

		const news = await prisma.news.create({
			data: {
				title,
				slug,
				description,
				content,
				image,
				status: status || "DRAFT",
				featured: featured || false,
				authorId: user.userId,
			},
		});

		return NextResponse.json({ success: true, data: news }, { status: 201 });
	} catch (error) {
		console.error("Create news error:", error);
		return NextResponse.json(
			{ error: "Terjadi kesalahan server" },
			{ status: 500 },
		);
	}
}
