import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Submit contact form
export async function POST(request: NextRequest) {
	try {
		const { name, email, phone, subject, message } = await request.json();

		// Validation
		if (!name || !email || !subject || !message) {
			return NextResponse.json(
				{ error: "Name, email, subject, dan message wajib diisi" },
				{ status: 400 },
			);
		}

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return NextResponse.json(
				{ error: "Format email tidak valid" },
				{ status: 400 },
			);
		}

		const inquiry = await prisma.contactInquiry.create({
			data: {
				name,
				email,
				phone: phone || null,
				subject,
				message,
				status: "NEW",
			},
		});

		return NextResponse.json(
			{
				success: true,
				message: "Pesan Anda berhasil dikirim. Kami akan segera merespons.",
				data: inquiry,
			},
			{ status: 201 },
		);
	} catch (error) {
		console.error("Contact form error:", error);
		return NextResponse.json(
			{ error: "Terjadi kesalahan server. Silakan coba lagi." },
			{ status: 500 },
		);
	}
}
