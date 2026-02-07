import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateToken, setAuthCookie, verifyPassword } from "@/lib/auth";

export async function POST(request: NextRequest) {
	try {
		const { email, password } = await request.json();

		if (!email || !password) {
			return NextResponse.json(
				{ error: "Email dan password harus diisi" },
				{ status: 400 },
			);
		}

		// Find user
		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user || !user.isActive) {
			return NextResponse.json(
				{ error: "Email atau password salah" },
				{ status: 401 },
			);
		}

		// Verify password
		const isValidPassword = await verifyPassword(password, user.password);
		if (!isValidPassword) {
			return NextResponse.json(
				{ error: "Email atau password salah" },
				{ status: 401 },
			);
		}

		// Generate token
		const token = generateToken(user.id, user.email);

		// Set cookie
		await setAuthCookie(token);

		return NextResponse.json(
			{
				success: true,
				user: {
					id: user.id,
					email: user.email,
					name: user.name,
					role: user.role,
				},
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error("Login error:", error);
		return NextResponse.json(
			{ error: "Terjadi kesalahan server" },
			{ status: 500 },
		);
	}
}
