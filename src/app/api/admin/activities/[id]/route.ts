import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getUser } from "@/lib/session";

type RouteContext = { params: Promise<{ id: string }> };

// Get single activity
export async function GET(_request: NextRequest, { params }: RouteContext) {
	try {
		const { id } = await params;

		const activity = await prisma.activity.findUnique({
			where: { id },
			include: {
				author: {
					select: {
						name: true,
						email: true,
					},
				},
			},
		});

		if (!activity) {
			return NextResponse.json(
				{ error: "Kegiatan tidak ditemukan" },
				{ status: 404 },
			);
		}

		return NextResponse.json(
			{ success: true, data: activity },
			{ status: 200 },
		);
	} catch (error) {
		console.error("Get activity error:", error);
		return NextResponse.json(
			{ error: "Terjadi kesalahan server" },
			{ status: 500 },
		);
	}
}

// Update activity
export async function PUT(request: NextRequest, { params }: RouteContext) {
	try {
		const { id } = await params;
		const user = await getUser();
		if (!user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { title, description, content, image, type, institution, featured } =
			await request.json();

		const activity = await prisma.activity.update({
			where: { id },
			data: {
				title: title || undefined,
				description: description || undefined,
				content: content || undefined,
				image: image || undefined,
				type: type || undefined,
				institution: institution || undefined,
				featured: featured !== undefined ? featured : undefined,
			},
		});

		return NextResponse.json(
			{ success: true, data: activity },
			{ status: 200 },
		);
	} catch (error) {
		console.error("Update activity error:", error);
		return NextResponse.json(
			{ error: "Terjadi kesalahan server" },
			{ status: 500 },
		);
	}
}

// Delete activity
export async function DELETE(_request: NextRequest, { params }: RouteContext) {
	try {
		const { id } = await params;
		const user = await getUser();
		if (!user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		await prisma.activity.delete({
			where: { id },
		});

		return NextResponse.json(
			{ success: true, message: "Kegiatan berhasil dihapus" },
			{ status: 200 },
		);
	} catch (error) {
		console.error("Delete activity error:", error);
		return NextResponse.json(
			{ error: "Terjadi kesalahan server" },
			{ status: 500 },
		);
	}
}
