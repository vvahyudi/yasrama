import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = (() => {
	const secret = process.env.JWT_SECRET;
	if (!secret) {
		throw new Error("JWT_SECRET environment variable must be set");
	}
	return secret;
})();
const TOKEN_EXPIRY = "7d";

export async function hashPassword(password: string): Promise<string> {
	return bcryptjs.hash(password, 12);
}

export async function verifyPassword(
	password: string,
	hashedPassword: string,
): Promise<boolean> {
	return bcryptjs.compare(password, hashedPassword);
}

export function generateToken(userId: string, email: string): string {
	return jwt.sign(
		{
			userId,
			email,
			iat: Math.floor(Date.now() / 1000),
		},
		JWT_SECRET,
		{
			expiresIn: TOKEN_EXPIRY,
		},
	);
}

export function verifyToken(
	token: string,
): { userId: string; email: string } | null {
	try {
		const decoded = jwt.verify(token, JWT_SECRET) as {
			userId: string;
			email: string;
		};
		return decoded;
	} catch (error) {
		return null;
	}
}

export async function setAuthCookie(token: string): Promise<void> {
	const cookieStore = await cookies();
	cookieStore.set("auth-token", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		maxAge: 60 * 60 * 24 * 7, // 7 days
		path: "/",
	});
}

export async function getAuthCookie(): Promise<string | undefined> {
	const cookieStore = await cookies();
	return cookieStore.get("auth-token")?.value;
}

export async function clearAuthCookie(): Promise<void> {
	const cookieStore = await cookies();
	cookieStore.delete("auth-token");
}
