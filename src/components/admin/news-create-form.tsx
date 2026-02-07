"use client";

import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Sparkles, UploadCloud, WandSparkles } from "lucide-react";
import { toast } from "sonner";

import { NewsStatus } from "@/lib/content-types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { Textarea } from "@/components/ui/textarea";

type GenerateTone = "FORMAL" | "PROMOTIONAL" | "NARRATIVE";
type GenerateTarget = "description" | "content" | "both";

interface NewsFormState {
	title: string;
	description: string;
	content: string;
	image: string;
	status: NewsStatus;
	featured: boolean;
}

function slugify(value: string): string {
	return value
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9\s-]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-");
}

function hasContent(value: string): boolean {
	const textOnly = value
		.replace(/<[^>]*>/g, " ")
		.replace(/&nbsp;/g, " ")
		.trim();
	return textOnly.length > 0;
}

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const toneOptions: Array<{ value: GenerateTone; label: string }> = [
	{ value: "FORMAL", label: "Formal" },
	{ value: "PROMOTIONAL", label: "Promosional" },
	{ value: "NARRATIVE", label: "Naratif" },
];

const statusOptions: Array<{ value: NewsStatus; label: string; hint: string }> = [
	{
		value: "DRAFT",
		label: "Draft",
		hint: "Disimpan dulu, belum tampil di publik.",
	},
	{
		value: "PUBLISHED",
		label: "Publish",
		hint: "Langsung tampil di halaman berita.",
	},
	{
		value: "ARCHIVED",
		label: "Arsip",
		hint: "Disimpan sebagai dokumentasi internal.",
	},
];

export function NewsCreateForm() {
	const router = useRouter();
	const [aiTopic, setAiTopic] = useState("");
	const [aiTone, setAiTone] = useState<GenerateTone>("FORMAL");
	const [form, setForm] = useState<NewsFormState>({
		title: "",
		description: "",
		content: "",
		image: "",
		status: "DRAFT",
		featured: false,
	});

	const slugPreview = useMemo(() => slugify(form.title), [form.title]);
	const canSubmit =
		form.title.trim().length > 0 &&
		form.description.trim().length > 0 &&
		hasContent(form.content);

	function updateField<K extends keyof NewsFormState>(
		key: K,
		value: NewsFormState[K],
	) {
		setForm((prev) => ({ ...prev, [key]: value }));
	}

	const generateMutation = useMutation({
		mutationFn: async (target: GenerateTarget) => {
			const topic = aiTopic.trim() || form.title.trim();
			if (!topic) {
				throw new Error("Isi topik dulu untuk generate konten.");
			}

			const response = await fetch("/api/admin", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					action: "generate_content",
					type: "news",
					target,
					tone: aiTone,
					topic,
					extra: [
						form.description.trim()
							? `Deskripsi saat ini: ${form.description.trim()}`
							: "",
						hasContent(form.content) ? "Konten saat ini sudah ada." : "",
					]
						.filter(Boolean)
						.join("\n"),
				}),
			});
			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.error || "Gagal generate konten");
			}

			return { data, target };
		},
	});

	const uploadMutation = useMutation({
		mutationFn: async (file: File) => {
			if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
				throw new Error("Format gambar harus JPG, PNG, atau WEBP.");
			}
			if (file.size > 5 * 1024 * 1024) {
				throw new Error("Ukuran gambar maksimal 5MB.");
			}

			const signResponse = await fetch("/api/admin", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					action: "cloudinary_signature",
					folder: "yasrama/news",
				}),
			});
			const signData = await signResponse.json();
			if (!signResponse.ok) {
				throw new Error(signData.error || "Gagal membuat signature upload");
			}

			const uploadBody = new FormData();
			uploadBody.append("file", file);
			uploadBody.append("api_key", signData.data.apiKey);
			uploadBody.append("timestamp", String(signData.data.timestamp));
			uploadBody.append("signature", signData.data.signature);
			uploadBody.append("folder", signData.data.folder);
			uploadBody.append("allowed_formats", signData.data.allowedFormats);
			uploadBody.append("transformation", signData.data.transformation);

			const uploadResponse = await fetch(
				`https://api.cloudinary.com/v1_1/${signData.data.cloudName}/image/upload`,
				{
					method: "POST",
					body: uploadBody,
				},
			);
			const uploadData = await uploadResponse.json();
			if (!uploadResponse.ok) {
				throw new Error(uploadData.error?.message || "Upload gambar gagal");
			}

			return uploadData.secure_url as string;
		},
	});

	const submitMutation = useMutation({
		mutationFn: async () => {
			const response = await fetch("/api/admin/news", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					title: form.title.trim(),
					description: form.description.trim(),
					content: form.content.trim(),
					image: form.image.trim() || undefined,
					status: form.status,
					featured: form.featured,
				}),
			});
			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.error || "Gagal membuat berita");
			}
		},
	});

	const isGenerating = generateMutation.isPending;
	const isUploadingImage = uploadMutation.isPending;
	const isSubmitting = submitMutation.isPending;

	async function handleGenerateContent(target: GenerateTarget) {
		const topic = aiTopic.trim() || form.title.trim();
		if (!topic) {
			toast.error("Isi topik dulu untuk generate konten.");
			return;
		}

		try {
			const { data } = await generateMutation.mutateAsync(target);

			setForm((prev) => ({
				...prev,
				description: data.data.description || prev.description,
				content: data.data.content || prev.content,
			}));
			if (target === "description") {
				toast.success("Deskripsi berita berhasil digenerate.");
			} else if (target === "content") {
				toast.success("Konten berita berhasil digenerate.");
			} else {
				toast.success("Deskripsi dan konten berita berhasil digenerate.");
			}
		} catch (error) {
			const message =
				error instanceof Error ? error.message : "Terjadi kesalahan saat generate";
			toast.error(message);
		}
	}

	async function handleImageUpload(file: File) {
		if (!file) return;
		try {
			const secureUrl = await uploadMutation.mutateAsync(file);
			updateField("image", secureUrl);
			toast.success("Gambar berhasil diupload.");
		} catch (error) {
			const message =
				error instanceof Error ? error.message : "Terjadi kesalahan saat upload";
			toast.error(message);
		}
	}

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (!canSubmit || isSubmitting) {
			return;
		}

		try {
			await submitMutation.mutateAsync();
			toast.success("Berita berhasil dibuat.");
			router.push("/admin/news");
			router.refresh();
		} catch (error) {
			const message =
				error instanceof Error ? error.message : "Terjadi kesalahan server";
			toast.error(message);
		}
	}

	return (
		<div className="p-6">
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
				<div className="flex items-center gap-3">
					<Button asChild variant="outline" size="icon">
						<Link href="/admin/news">
							<ArrowLeft className="h-4 w-4" />
						</Link>
					</Button>
					<div>
						<h1 className="text-3xl font-bold tracking-tight text-slate-900">
							Buat Berita Baru
						</h1>
						<p className="mt-1 text-sm text-slate-600">
							Form ringkas dengan preview cepat agar input lebih nyaman.
						</p>
					</div>
				</div>

				<div className="grid gap-6 lg:grid-cols-[1fr_320px]">
					<form
						onSubmit={handleSubmit}
						className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
					>
						<div className="space-y-2">
							<label htmlFor="news-title" className="text-sm font-medium text-slate-900">
								Judul Berita
							</label>
							<Input
								id="news-title"
								placeholder="Contoh: Wisuda Tahfidz Semester Ganjil"
								value={form.title}
								onChange={(event) => updateField("title", event.target.value)}
								disabled={isSubmitting}
								required
							/>
						</div>
						<div className="rounded-lg border border-dashed border-slate-300 bg-slate-50/70 p-3">
							<p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-600">
								AI Generate Deskripsi & Konten
							</p>
							<div className="grid gap-2 md:grid-cols-[1fr_180px]">
								<Input
									placeholder="Topik berita, contoh: Wisuda Tahfidz 2026"
									value={aiTopic}
									onChange={(event) => setAiTopic(event.target.value)}
									disabled={isSubmitting || isGenerating}
								/>
								<select
									className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none"
									value={aiTone}
									onChange={(event) =>
										setAiTone(event.target.value as GenerateTone)
									}
									disabled={isSubmitting || isGenerating}
								>
									{toneOptions.map((tone) => (
										<option key={tone.value} value={tone.value}>
											Tone: {tone.label}
										</option>
									))}
								</select>
							</div>
							<div className="mt-2 grid gap-2 sm:grid-cols-3">
								<Button
									type="button"
									variant="outline"
									onClick={() => handleGenerateContent("description")}
									disabled={isSubmitting || isGenerating}
								>
									{isGenerating ? (
										<>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											Generate...
										</>
									) : (
										<>
											<WandSparkles className="mr-2 h-4 w-4" />
											Deskripsi
										</>
									)}
								</Button>
								<Button
									type="button"
									variant="outline"
									onClick={() => handleGenerateContent("content")}
									disabled={isSubmitting || isGenerating}
								>
									<WandSparkles className="mr-2 h-4 w-4" />
									Konten
								</Button>
								<Button
									type="button"
									variant="outline"
									onClick={() => handleGenerateContent("both")}
									disabled={isSubmitting || isGenerating}
								>
									<WandSparkles className="mr-2 h-4 w-4" />
									Keduanya
								</Button>
							</div>
						</div>

						<div className="space-y-2">
							<label htmlFor="news-description" className="text-sm font-medium text-slate-900">
								Deskripsi Singkat
							</label>
							<Textarea
								id="news-description"
								rows={3}
								maxLength={220}
								placeholder="Ringkasan berita untuk halaman daftar berita"
								value={form.description}
								onChange={(event) => updateField("description", event.target.value)}
								disabled={isSubmitting}
								required
							/>
							<p className="text-xs text-slate-500">{form.description.length}/220 karakter</p>
						</div>

						<div className="space-y-2">
							<label htmlFor="news-content" className="text-sm font-medium text-slate-900">
								Isi Berita
							</label>
							<RichTextEditor
								value={form.content}
								onChange={(value) => updateField("content", value)}
								placeholder="Tulis isi berita lengkap di sini..."
								disabled={isSubmitting}
							/>
							<p className="text-xs text-slate-500">
								Gunakan toolbar untuk heading, list, link, dan gambar.
							</p>
						</div>

						<div className="grid gap-4 md:grid-cols-2">
							<div className="space-y-2">
								<label htmlFor="news-image" className="text-sm font-medium text-slate-900">
									URL Gambar
								</label>
								<Input
									id="news-image"
									type="url"
									placeholder="https://contoh.com/berita.jpg"
									value={form.image}
									onChange={(event) => updateField("image", event.target.value)}
									disabled={isSubmitting}
								/>
								<div>
									<label
										htmlFor="news-image-upload"
										className="mt-2 inline-flex cursor-pointer items-center text-xs font-medium text-primary"
									>
										<UploadCloud className="mr-1 h-3.5 w-3.5" />
										{isUploadingImage ? "Mengupload..." : "Upload dari perangkat"}
									</label>
									<input
										id="news-image-upload"
										type="file"
										accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
										className="hidden"
										disabled={isSubmitting || isUploadingImage}
										onChange={(event) => {
											const file = event.target.files?.[0];
											if (file) {
												void handleImageUpload(file);
											}
											event.currentTarget.value = "";
										}}
									/>
								</div>
							</div>
							<div className="space-y-2">
								<label htmlFor="news-status" className="text-sm font-medium text-slate-900">
									Status
								</label>
								<select
									id="news-status"
									className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
									value={form.status}
									onChange={(event) =>
										updateField("status", event.target.value as NewsStatus)
									}
									disabled={isSubmitting}
								>
									{statusOptions.map((status) => (
										<option key={status.value} value={status.value}>
											{status.label}
										</option>
									))}
								</select>
							</div>
						</div>

						<label className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 text-sm">
							<input
								type="checkbox"
								className="h-4 w-4 rounded border-slate-300"
								checked={form.featured}
								onChange={(event) => updateField("featured", event.target.checked)}
								disabled={isSubmitting}
							/>
							Tampilkan sebagai berita unggulan di halaman utama.
						</label>

						<div className="flex flex-col gap-3 sm:flex-row">
							<Button type="submit" className="sm:flex-1" disabled={!canSubmit || isSubmitting}>
								{isSubmitting ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Menyimpan...
									</>
								) : (
									"Simpan Berita"
								)}
							</Button>
							<Button asChild variant="outline" className="sm:flex-1" disabled={isSubmitting}>
								<Link href="/admin/news">Batal</Link>
							</Button>
						</div>
					</form>

					<aside className="space-y-4 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-5">
						<div className="flex items-center gap-2 text-slate-800">
							<Sparkles className="h-4 w-4" />
							<h2 className="text-sm font-semibold">Preview Cepat</h2>
						</div>
						<div className="space-y-2 text-sm text-slate-600">
							<p className="text-xs font-medium uppercase tracking-wide text-slate-500">Slug</p>
							<p className="rounded-md bg-white px-3 py-2 font-mono text-xs text-slate-700">
								{slugPreview || "judul-berita-anda"}
							</p>
							<p className="text-xs font-medium uppercase tracking-wide text-slate-500">Status</p>
							<p className="rounded-md bg-white px-3 py-2 text-xs text-slate-700">
								{statusOptions.find((item) => item.value === form.status)?.hint}
							</p>
							<p className="text-xs font-medium uppercase tracking-wide text-slate-500">Judul tampil</p>
							<p className="rounded-md bg-white px-3 py-2 text-sm font-medium text-slate-900">
								{form.title.trim() || "Judul berita akan tampil di sini"}
							</p>
						</div>
					</aside>
				</div>
			</div>
		</div>
	);
}
