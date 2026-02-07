import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getUser } from "@/lib/session";

// Get all activities with pagination and filtering
export async function GET(request: NextRequest) {
	try {
		const user = await getUser();
		if (!user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}
		const { searchParams } = new URL(request.url);
		const page = Number.parseInt(searchParams.get("page") || "1");
		const limit = Number.parseInt(searchParams.get("limit") || "10");
		const type = searchParams.get("type");
		const institution = searchParams.get("institution");
		const featured = searchParams.get("featured");

		const skip = (page - 1) * limit;

		// Build where clause
		const where: any = {};
		if (type) where.type = type;
		if (institution) where.institution = institution;
		if (featured) where.featured = featured === "true";

		const [activities, total] = await Promise.all([
			prisma.activity.findMany({
				where,
				skip,
				take: limit,
				orderBy: { createdAt: "desc" },
				include: {
					author: {
						select: {
							name: true,
							email: true,
						},
					},
				},
			}),
			prisma.activity.count({ where }),
		]);

		return NextResponse.json(
			{
				success: true,
				data: activities,
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
		console.error("Get activities error:", error);
		return NextResponse.json(
			{ error: "Terjadi kesalahan server" },
			{ status: 500 },
		);
	}
}

// Create new activity
export async function POST(request: NextRequest) {
	try {
		const user = await getUser();
		if (!user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { title, description, content, image, type, institution, featured } =
			await request.json();

		// Validation
		if (!title || !description || !content) {
			return NextResponse.json(
				{ error: "Title, description, dan content wajib diisi" },
				{ status: 400 },
			);
		}

		// Generate slug from title
		const slug = title
			.toLowerCase()
			.replace(/[^a-z0-9\s-]/g, "")
			.replace(/\s+/g, "-")
			.replace(/-+/g, "-")
			.trim();

		// Check if slug already exists
		const existingActivity = await prisma.activity.findUnique({
			where: { slug },
		});

		if (existingActivity) {
			return NextResponse.json(
				{ error: "Slug sudah digunakan, gunakan judul yang berbeda" },
				{ status: 400 },
			);
		}

		const activity = await prisma.activity.create({
			data: {
				title,
				slug,
				description,
				content,
				image: image || null,
				type: type || "OTHER",
				institution: institution || null,
				featured: featured || false,
				authorId: user.userId,
			},
		});

		return NextResponse.json(
			{ success: true, data: activity },
			{ status: 201 },
		);
	} catch (error) {
		console.error("Create activity error:", error);
		return NextResponse.json(
			{ error: "Terjadi kesalahan server" },
			{ status: 500 },
		);
	}
}
