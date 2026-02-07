import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Submit registration form
export async function POST(request: NextRequest) {
	try {
		const { parentName, email, phone, studentName, age, institution, message } =
			await request.json();

		// Validation
		if (
			!parentName ||
			!email ||
			!phone ||
			!studentName ||
			!age ||
			!institution
		) {
			return NextResponse.json(
				{
					error:
						"Parent name, email, phone, student name, age, dan institution wajib diisi",
				},
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

		// Age validation
		const ageNum = Number(age);
		if (!Number.isInteger(ageNum) || ageNum < 1 || ageNum > 100) {
			return NextResponse.json({ error: "Umur tidak valid" }, { status: 400 });
		}

		// Institution validation
		if (!["PAUD", "SD"].includes(institution)) {
			return NextResponse.json(
				{ error: "Institution harus PAUD atau SD" },
				{ status: 400 },
			);
		}

		const registration = await prisma.registration.create({
			data: {
				parentName,
				email,
				phone,
				studentName,
				age: ageNum,
				institution,
				message: message || null,
			},
		});

		return NextResponse.json(
			{
				success: true,
				message:
					"Pendaftaran berhasil dikirim. Tim kami akan segera menghubungi Anda.",
				data: registration,
			},
			{ status: 201 },
		);
	} catch (error) {
		console.error("Registration form error:", error);
		return NextResponse.json(
			{ error: "Terjadi kesalahan server. Silakan coba lagi." },
			{ status: 500 },
		);
	}
}
