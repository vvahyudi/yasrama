import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getUser } from "@/lib/session";

type RouteContext = { params: Promise<{ id: string }> };

// Get single news
export async function GET(request: NextRequest, { params }: RouteContext) {
	try {
		const { id } = await params;
		const news = await prisma.news.findUnique({
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

		if (!news) {
			return NextResponse.json(
				{ error: "Berita tidak ditemukan" },
				{ status: 404 },
			);
		}

		return NextResponse.json({ success: true, data: news }, { status: 200 });
	} catch (error) {
		console.error("Get news error:", error);
		return NextResponse.json(
			{ error: "Terjadi kesalahan server" },
			{ status: 500 },
		);
	}
}

// Update news
export async function PUT(request: NextRequest, { params }: RouteContext) {
	try {
		const { id } = await params;
		const user = await getUser();
		if (!user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { title, description, content, image, status, featured } =
			await request.json();

		const news = await prisma.news.update({
			where: { id },
			data: {
				title: title || undefined,
				description: description || undefined,
				content: content || undefined,
				image: image || undefined,
				status: status || undefined,
				featured: featured !== undefined ? featured : undefined,
			},
		});

		return NextResponse.json({ success: true, data: news }, { status: 200 });
	} catch (error) {
		console.error("Update news error:", error);
		return NextResponse.json(
			{ error: "Terjadi kesalahan server" },
			{ status: 500 },
		);
	}
}

// Delete news
export async function DELETE(request: NextRequest, { params }: RouteContext) {
	try {
		const { id } = await params;
		const user = await getUser();
		if (!user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		await prisma.news.delete({
			where: { id },
		});

		return NextResponse.json(
			{ success: true, message: "Berita berhasil dihapus" },
			{ status: 200 },
		);
	} catch (error) {
		console.error("Delete news error:", error);
		return NextResponse.json(
			{ error: "Terjadi kesalahan server" },
			{ status: 500 },
		);
	}
}
