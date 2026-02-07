import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/session";
import { getCloudinaryConfig, signCloudinaryParams } from "@/lib/cloudinary";

type ContentType = "news" | "activity";
type GenerateTarget = "description" | "content" | "both";
type GenerateTone = "FORMAL" | "PROMOTIONAL" | "NARRATIVE";

interface GenerateContentResult {
	description?: string;
	content?: string;
}

function extractJsonObject(text: string): GenerateContentResult | null {
	const start = text.indexOf("{");
	const end = text.lastIndexOf("}");
	if (start < 0 || end <= start) {
		return null;
	}

	try {
		const parsed = JSON.parse(text.slice(start, end + 1));
		const result: GenerateContentResult = {};
		if (typeof parsed?.description === "string") {
			result.description = parsed.description;
		}
		if (typeof parsed?.content === "string") {
			result.content = parsed.content;
		}
		return result.description || result.content ? result : null;
	} catch {
		return null;
	}
}

async function generateWithOpenRouter(input: {
	type: ContentType;
	target: GenerateTarget;
	tone: GenerateTone;
	topic: string;
	extra?: string;
}): Promise<GenerateContentResult> {
	const apiKey = process.env.OPENROUTER_API_KEY;
	if (!apiKey) {
		throw new Error("OPENROUTER_API_KEY belum di-set");
	}

	const model =
		process.env.OPENROUTER_MODEL || "meta-llama/llama-3.1-8b-instruct:free";
	const style = input.type === "news" ? "berita resmi yayasan" : "laporan kegiatan sekolah";
	const toneMap: Record<GenerateTone, string> = {
		FORMAL: "formal dan profesional",
		PROMOTIONAL: "promosional yang menarik namun tetap sopan",
		NARRATIVE: "naratif bercerita yang hangat",
	};
	const formatByTarget: Record<GenerateTarget, string> = {
		description: '{"description":"..."}',
		content: '{"content":"..."}',
		both: '{"description":"...","content":"..."}',
	};
	const prompt = [
		"Kamu adalah penulis konten website sekolah dalam Bahasa Indonesia.",
		`Buatkan ${style} berbentuk JSON valid TANPA markdown code fence.`,
		`Gaya bahasa: ${toneMap[input.tone]}.`,
		`Format wajib: ${formatByTarget[input.target]}`,
		"content harus HTML sederhana (p, h2, h3, ul, li, strong).",
		"description maksimal 220 karakter.",
		`Topik utama: ${input.topic}`,
		input.extra ? `Konteks tambahan: ${input.extra}` : "",
	].join("\n");

	const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${apiKey}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			model,
			temperature: 0.7,
			messages: [
				{
					role: "system",
					content:
						"Keluarkan JSON valid saja. Jangan tambah teks lain di luar JSON.",
				},
				{
					role: "user",
					content: prompt,
				},
			],
		}),
	});

	if (!response.ok) {
		const message = await response.text();
		throw new Error(`OpenRouter error: ${message}`);
	}

	const payload = await response.json();
	const text = payload?.choices?.[0]?.message?.content;
	if (typeof text !== "string") {
		throw new Error("Respons AI tidak valid");
	}

	const parsed = extractJsonObject(text);
	if (!parsed) {
		throw new Error("Gagal parsing hasil AI menjadi JSON");
	}

	return {
		description:
			typeof parsed.description === "string"
				? parsed.description.trim().slice(0, 220)
				: undefined,
		content:
			typeof parsed.content === "string" ? parsed.content.trim() : undefined,
	};
}

export async function POST(request: NextRequest) {
	try {
		const user = await getUser();
		if (!user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const body = await request.json();
		const action = body?.action;

		if (action === "cloudinary_signature") {
			const folder =
				typeof body?.folder === "string" && body.folder.trim() !== ""
					? body.folder.trim()
					: "yasrama";
			const timestamp = Math.floor(Date.now() / 1000);
			const allowedFormats = "jpg,jpeg,png,webp";
			const transformation = "c_limit,w_1600,h_1600,f_auto,q_auto";
			const signature = signCloudinaryParams({
				timestamp,
				folder,
				allowed_formats: allowedFormats,
				transformation,
			});
			const { cloudName, apiKey } = getCloudinaryConfig();

			return NextResponse.json(
				{
					success: true,
					data: {
						cloudName,
						apiKey,
						timestamp,
						folder,
						allowedFormats,
						transformation,
						signature,
					},
				},
				{ status: 200 },
			);
		}

		if (action === "generate_content") {
			const type = body?.type as ContentType;
			const target = body?.target as GenerateTarget;
			const tone = body?.tone as GenerateTone;
			const topic = typeof body?.topic === "string" ? body.topic.trim() : "";
			const extra = typeof body?.extra === "string" ? body.extra.trim() : "";

			if (!topic) {
				return NextResponse.json(
					{ error: "Topik wajib diisi untuk generate konten" },
					{ status: 400 },
				);
			}
			if (type !== "news" && type !== "activity") {
				return NextResponse.json(
					{ error: "Tipe konten tidak valid" },
					{ status: 400 },
				);
			}
			if (
				target !== "description" &&
				target !== "content" &&
				target !== "both"
			) {
				return NextResponse.json(
					{ error: "Target generate tidak valid" },
					{ status: 400 },
				);
			}
			if (
				tone !== "FORMAL" &&
				tone !== "PROMOTIONAL" &&
				tone !== "NARRATIVE"
			) {
				return NextResponse.json(
					{ error: "Tone generate tidak valid" },
					{ status: 400 },
				);
			}

			const content = await generateWithOpenRouter({
				type,
				target,
				tone,
				topic,
				extra,
			});
			return NextResponse.json({ success: true, data: content }, { status: 200 });
		}

		return NextResponse.json({ error: "Action tidak dikenali" }, { status: 400 });
	} catch (error) {
		console.error("Admin helper API error:", error);
		return NextResponse.json(
			{ error: "Terjadi kesalahan server" },
			{ status: 500 },
		);
	}
}
