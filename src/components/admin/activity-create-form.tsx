"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Sparkles, UploadCloud, WandSparkles } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { Textarea } from "@/components/ui/textarea";

type ActivityType = "ACADEMIC" | "EXTRACURRICULAR" | "COMMUNITY" | "OTHER";
type Institution = "" | "PAUD" | "SD";

interface ActivityFormState {
	title: string;
	description: string;
	content: string;
	image: string;
	type: ActivityType;
	institution: Institution;
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

const typeOptions: Array<{ value: ActivityType; label: string }> = [
	{ value: "ACADEMIC", label: "Akademik" },
	{ value: "EXTRACURRICULAR", label: "Ekstrakurikuler" },
	{ value: "COMMUNITY", label: "Kemasyarakatan" },
	{ value: "OTHER", label: "Lainnya" },
];

export function ActivityCreateForm() {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isUploadingImage, setIsUploadingImage] = useState(false);
	const [isGenerating, setIsGenerating] = useState(false);
	const [aiTopic, setAiTopic] = useState("");
	const [form, setForm] = useState<ActivityFormState>({
		title: "",
		description: "",
		content: "",
		image: "",
		type: "ACADEMIC",
		institution: "",
		featured: false,
	});

	const slugPreview = useMemo(() => slugify(form.title), [form.title]);
	const canSubmit =
		form.title.trim().length > 0 &&
		form.description.trim().length > 0 &&
		hasContent(form.content);

	function updateField<K extends keyof ActivityFormState>(
		key: K,
		value: ActivityFormState[K],
	) {
		setForm((prev) => ({ ...prev, [key]: value }));
	}

	async function handleGenerateContent() {
		const topic = aiTopic.trim() || form.title.trim();
		if (!topic) {
			toast.error("Isi topik dulu untuk generate konten.");
			return;
		}

		setIsGenerating(true);
		try {
			const response = await fetch("/api/admin", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					action: "generate_content",
					type: "activity",
					topic,
					extra: `${form.type} ${form.institution}`.trim(),
				}),
			});
			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.error || "Gagal generate konten");
			}

			setForm((prev) => ({
				...prev,
				title: data.data.title || prev.title,
				description: data.data.description || prev.description,
				content: data.data.content || prev.content,
			}));
			toast.success("Draft kegiatan berhasil digenerate.");
		} catch (error) {
			const message =
				error instanceof Error ? error.message : "Terjadi kesalahan saat generate";
			toast.error(message);
		} finally {
			setIsGenerating(false);
		}
	}

	async function handleImageUpload(file: File) {
		if (!file) return;
		if (file.size > 5 * 1024 * 1024) {
			toast.error("Ukuran gambar maksimal 5MB.");
			return;
		}

		setIsUploadingImage(true);
		try {
			const signResponse = await fetch("/api/admin", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					action: "cloudinary_signature",
					folder: "yasrama/activities",
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

			updateField("image", uploadData.secure_url);
			toast.success("Gambar berhasil diupload.");
		} catch (error) {
			const message =
				error instanceof Error ? error.message : "Terjadi kesalahan saat upload";
			toast.error(message);
		} finally {
			setIsUploadingImage(false);
		}
	}

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (!canSubmit || isSubmitting) {
			return;
		}

		setIsSubmitting(true);

		try {
			const response = await fetch("/api/admin/activities", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					title: form.title.trim(),
					description: form.description.trim(),
					content: form.content.trim(),
					image: form.image.trim() || undefined,
					type: form.type,
					institution: form.institution || undefined,
					featured: form.featured,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Gagal membuat kegiatan");
			}

			toast.success("Kegiatan berhasil dibuat.");
			router.push("/admin/activities");
			router.refresh();
		} catch (error) {
			const message =
				error instanceof Error ? error.message : "Terjadi kesalahan server";
			toast.error(message);
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<div className="p-6">
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
				<div className="flex items-center gap-3">
					<Button asChild variant="outline" size="icon">
						<Link href="/admin/activities">
							<ArrowLeft className="h-4 w-4" />
						</Link>
					</Button>
					<div>
						<h1 className="text-3xl font-bold tracking-tight">Tambah Kegiatan Baru</h1>
						<p className="mt-1 text-sm text-muted-foreground">
							Buat konten kegiatan dengan workflow cepat dan minim klik.
						</p>
					</div>
				</div>

				<div className="grid gap-6 lg:grid-cols-[1fr_320px]">
					<form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border bg-card p-6 shadow-sm">
						<div className="space-y-2">
							<label htmlFor="activity-title" className="text-sm font-medium">
								Judul Kegiatan
							</label>
							<Input
								id="activity-title"
								placeholder="Contoh: Gelar Karya Siswa Semester Genap"
								value={form.title}
								onChange={(event) => updateField("title", event.target.value)}
								disabled={isSubmitting}
								required
							/>
						</div>
						<div className="rounded-lg border border-dashed border-slate-300 bg-slate-50/70 p-3">
							<p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-600">
								AI Draft Generator
							</p>
							<div className="flex flex-col gap-2 sm:flex-row">
								<Input
									placeholder="Topik kegiatan, contoh: Lomba Hari Santri"
									value={aiTopic}
									onChange={(event) => setAiTopic(event.target.value)}
									disabled={isSubmitting || isGenerating}
								/>
								<Button
									type="button"
									variant="outline"
									onClick={handleGenerateContent}
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
											Generate
										</>
									)}
								</Button>
							</div>
						</div>

						<div className="space-y-2">
							<label htmlFor="activity-description" className="text-sm font-medium">
								Deskripsi Singkat
							</label>
							<Textarea
								id="activity-description"
								rows={3}
								maxLength={220}
								placeholder="Ringkasan kegiatan untuk daftar kegiatan"
								value={form.description}
								onChange={(event) => updateField("description", event.target.value)}
								disabled={isSubmitting}
								required
							/>
							<p className="text-xs text-muted-foreground">{form.description.length}/220 karakter</p>
						</div>

						<div className="space-y-2">
							<label htmlFor="activity-content" className="text-sm font-medium">
								Konten Lengkap
							</label>
							<RichTextEditor
								value={form.content}
								onChange={(value) => updateField("content", value)}
								placeholder="Tulis detail kegiatan, rundown, dan hasil kegiatan..."
								disabled={isSubmitting}
							/>
							<p className="text-xs text-muted-foreground">
								Editor mendukung heading, list, link, gambar, dan quote.
							</p>
						</div>

						<div className="grid gap-4 md:grid-cols-2">
							<div className="space-y-2">
								<label htmlFor="activity-type" className="text-sm font-medium">
									Tipe Kegiatan
								</label>
								<select
									id="activity-type"
									className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
									value={form.type}
									onChange={(event) =>
										updateField("type", event.target.value as ActivityType)
									}
									disabled={isSubmitting}
								>
									{typeOptions.map((item) => (
										<option key={item.value} value={item.value}>
											{item.label}
										</option>
									))}
								</select>
							</div>
							<div className="space-y-2">
								<label htmlFor="activity-institution" className="text-sm font-medium">
									Institusi
								</label>
								<select
									id="activity-institution"
									className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
									value={form.institution}
									onChange={(event) =>
										updateField("institution", event.target.value as Institution)
									}
									disabled={isSubmitting}
								>
									<option value="">Semua / Umum</option>
									<option value="PAUD">PAUD</option>
									<option value="SD">SD</option>
								</select>
							</div>
						</div>

						<div className="space-y-2">
							<label htmlFor="activity-image" className="text-sm font-medium">
								URL Gambar
							</label>
							<Input
								id="activity-image"
								type="url"
								placeholder="https://contoh.com/kegiatan.jpg"
								value={form.image}
								onChange={(event) => updateField("image", event.target.value)}
								disabled={isSubmitting}
							/>
							<div>
								<label
									htmlFor="activity-image-upload"
									className="mt-2 inline-flex cursor-pointer items-center text-xs font-medium text-primary"
								>
									<UploadCloud className="mr-1 h-3.5 w-3.5" />
									{isUploadingImage ? "Mengupload..." : "Upload dari perangkat"}
								</label>
								<input
									id="activity-image-upload"
									type="file"
									accept="image/*"
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

						<label className="flex items-center gap-3 rounded-lg border p-3 text-sm">
							<input
								type="checkbox"
								className="h-4 w-4 rounded border-input"
								checked={form.featured}
								onChange={(event) => updateField("featured", event.target.checked)}
								disabled={isSubmitting}
							/>
							Tampilkan sebagai kegiatan unggulan di homepage.
						</label>

						<div className="flex flex-col gap-3 sm:flex-row">
							<Button type="submit" className="sm:flex-1" disabled={!canSubmit || isSubmitting}>
								{isSubmitting ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Menyimpan...
									</>
								) : (
									"Simpan Kegiatan"
								)}
							</Button>
							<Button asChild variant="outline" className="sm:flex-1" disabled={isSubmitting}>
								<Link href="/admin/activities">Batal</Link>
							</Button>
						</div>
					</form>

					<aside className="space-y-4 rounded-2xl border bg-gradient-to-b from-emerald-50/60 to-white p-5">
						<div className="flex items-center gap-2 text-slate-800">
							<Sparkles className="h-4 w-4" />
							<h2 className="text-sm font-semibold">Preview Cepat</h2>
						</div>
						<div className="space-y-2 text-sm text-slate-600">
							<p className="text-xs font-medium uppercase tracking-wide text-slate-500">Slug</p>
							<p className="rounded-md bg-white px-3 py-2 font-mono text-xs text-slate-700">
								{slugPreview || "judul-kegiatan-anda"}
							</p>
							<p className="text-xs font-medium uppercase tracking-wide text-slate-500">Kategori</p>
							<p className="rounded-md bg-white px-3 py-2 text-xs text-slate-700">
								{typeOptions.find((item) => item.value === form.type)?.label} | {form.institution || "Umum"}
							</p>
							<p className="text-xs font-medium uppercase tracking-wide text-slate-500">Judul tampil</p>
							<p className="rounded-md bg-white px-3 py-2 text-sm font-medium text-slate-900">
								{form.title.trim() || "Judul kegiatan akan tampil di sini"}
							</p>
						</div>
					</aside>
				</div>
			</div>
		</div>
	);
}
