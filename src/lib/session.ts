import { getAuthCookie, verifyToken } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function requireAuth() {
	const token = await getAuthCookie();

	if (!token) {
		redirect("/admin/login");
	}

	const decoded = verifyToken(token);
	if (!decoded) {
		redirect("/admin/login");
	}

	return decoded;
}

export async function getUser() {
	try {
		const token = await getAuthCookie();
		if (!token) return null;

		const decoded = verifyToken(token);
		return decoded;
	} catch (error) {
		return null;
	}
}
