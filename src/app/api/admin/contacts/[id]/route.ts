import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getUser } from "@/lib/session";

type RouteContext = { params: Promise<{ id: string }> };

// Update contact inquiry status
export async function PATCH(
	request: NextRequest,
	{ params }: RouteContext,
) {
	try {
		const { id } = await params;
		const user = await getUser();
		if (!user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { status } = await request.json();

		if (!["NEW", "READ", "REPLIED", "CLOSED"].includes(status)) {
			return NextResponse.json(
				{ error: "Status tidak valid" },
				{ status: 400 },
			);
		}

		const inquiry = await prisma.contactInquiry.update({
			where: { id },
			data: { status },
		});

		return NextResponse.json({ success: true, data: inquiry }, { status: 200 });
	} catch (error) {
		console.error("Update contact error:", error);
		return NextResponse.json(
			{ error: "Terjadi kesalahan server" },
			{ status: 500 },
		);
	}
}

// Delete contact inquiry
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

		await prisma.contactInquiry.delete({
			where: { id },
		});

		return NextResponse.json(
			{ success: true, message: "Inquiry berhasil dihapus" },
			{ status: 200 },
		);
	} catch (error) {
		console.error("Delete contact error:", error);
		return NextResponse.json(
			{ error: "Terjadi kesalahan server" },
			{ status: 500 },
		);
	}
}
