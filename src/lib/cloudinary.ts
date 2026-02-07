import { createHash } from "node:crypto";

type SignatureParams = Record<string, string | number | boolean | null | undefined>;

function getRequiredEnv(name: string): string {
	const value = process.env[name];
	if (!value) {
		throw new Error(`${name} belum di-set`);
	}
	return value;
}

export function getCloudinaryConfig() {
	return {
		cloudName: getRequiredEnv("CLOUDINARY_CLOUD_NAME"),
		apiKey: getRequiredEnv("CLOUDINARY_API_KEY"),
		apiSecret: getRequiredEnv("CLOUDINARY_API_SECRET"),
	};
}

export function signCloudinaryParams(params: SignatureParams): string {
	const { apiSecret } = getCloudinaryConfig();
	const payload = Object.entries(params)
		.filter(([, value]) => value !== undefined && value !== null && value !== "")
		.sort(([a], [b]) => a.localeCompare(b))
		.map(([key, value]) => `${key}=${String(value)}`)
		.join("&");

	return createHash("sha1")
		.update(`${payload}${apiSecret}`)
		.digest("hex");
}

