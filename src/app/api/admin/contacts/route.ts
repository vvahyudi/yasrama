import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getUser } from "@/lib/session";

// Get all contact inquiries with pagination and filtering
export async function GET(request: NextRequest) {
	try {
		const user = await getUser();
		if (!user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { searchParams } = new URL(request.url);
		const page = Number.parseInt(searchParams.get("page") || "1");
		const limit = Number.parseInt(searchParams.get("limit") || "10");
		const status = searchParams.get("status");

		const skip = (page - 1) * limit;

		// Build where clause
		const where: any = {};
		if (status) where.status = status;

		const [inquiries, total] = await Promise.all([
			prisma.contactInquiry.findMany({
				where,
				skip,
				take: limit,
				orderBy: { createdAt: "desc" },
			}),
			prisma.contactInquiry.count({ where }),
		]);

		return NextResponse.json(
			{
				success: true,
				data: inquiries,
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
		console.error("Get contacts error:", error);
		return NextResponse.json(
			{ error: "Terjadi kesalahan server" },
			{ status: 500 },
		);
	}
}
