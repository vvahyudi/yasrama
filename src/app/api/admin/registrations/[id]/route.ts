import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getUser } from "@/lib/session";

type RouteContext = { params: Promise<{ id: string }> };

// Delete registration
export async function DELETE(
	request: NextRequest,
	{ params }: RouteContext,
) {
	try {
		const { id } = await params;
		const user = await getUser();
		if (!user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		await prisma.registration.delete({
			where: { id },
		});

		return NextResponse.json(
			{ success: true, message: "Registration berhasil dihapus" },
			{ status: 200 },
		);
	} catch (error) {
		console.error("Delete registration error:", error);
		return NextResponse.json(
			{ error: "Terjadi kesalahan server" },
			{ status: 500 },
		);
	}
}
