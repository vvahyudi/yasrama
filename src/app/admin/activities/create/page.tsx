import { requireAuth } from "@/lib/session";
import { DashboardLayout } from "@/components/admin/dashboard-nav";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const metadata = {
	title: "Tambah Kegiatan",
};

export default async function CreateActivityPage() {
	await requireAuth();

	return (
		<DashboardLayout>
			<div className="p-6">
				<div className="mb-6">
					<Link href="/admin/activities">
						<Button variant="ghost" size="sm" className="mb-4">
							<ArrowLeft className="mr-2 size-4" />
							Kembali
						</Button>
					</Link>
					<h1 className="text-3xl font-bold">Tambah Kegiatan Baru</h1>
					<p className="text-muted-foreground">
						Buat kegiatan atau aktivitas sekolah baru
					</p>
				</div>

				<div className="mx-auto max-w-3xl rounded-lg border bg-card p-6">
					<form className="space-y-6">
						<div>
							<label className="mb-2 block text-sm font-medium">
								Judul Kegiatan <span className="text-red-500">*</span>
							</label>
							<input
								type="text"
								placeholder="Contoh: Peringatan HUT Kemerdekaan RI ke-79"
								className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
								required
							/>
						</div>

						<div>
							<label className="mb-2 block text-sm font-medium">
								Deskripsi Singkat <span className="text-red-500">*</span>
							</label>
							<textarea
								placeholder="Ringkasan singkat tentang kegiatan..."
								rows={3}
								className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
								required
							/>
						</div>

						<div>
							<label className="mb-2 block text-sm font-medium">
								Konten Lengkap <span className="text-red-500">*</span>
							</label>
							<textarea
								placeholder="Tulis konten lengkap kegiatan di sini. Mendukung Markdown formatting."
								rows={10}
								className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono"
								required
							/>
							<p className="mt-1 text-xs text-muted-foreground">
								Tips: Gunakan Markdown untuk formatting (bold, italic, list,
								dll)
							</p>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div>
								<label className="mb-2 block text-sm font-medium">
									Tipe Kegiatan <span className="text-red-500">*</span>
								</label>
								<select
									className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
									required
								>
									<option value="">Pilih tipe</option>
									<option value="ACADEMIC">Akademik</option>
									<option value="EXTRACURRICULAR">Ekstrakurikuler</option>
									<option value="COMMUNITY">Kemasyarakatan</option>
									<option value="OTHER">Lainnya</option>
								</select>
							</div>

							<div>
								<label className="mb-2 block text-sm font-medium">
									Institusi
								</label>
								<select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
									<option value="">Semua</option>
									<option value="PAUD">PAUD</option>
									<option value="SD">SD</option>
								</select>
							</div>
						</div>

						<div>
							<label className="mb-2 block text-sm font-medium">
								URL Gambar
							</label>
							<input
								type="url"
								placeholder="https://example.com/image.jpg"
								className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
							/>
							<p className="mt-1 text-xs text-muted-foreground">
								Upload gambar terlebih dahulu, lalu paste URL-nya di sini
							</p>
						</div>

						<div className="flex items-center gap-2">
							<input
								type="checkbox"
								id="featured"
								className="size-4 rounded border-input"
							/>
							<label htmlFor="featured" className="text-sm font-medium">
								Tampilkan sebagai Featured (muncul di homepage)
							</label>
						</div>

						<div className="flex gap-3">
							<Button type="submit" className="flex-1">
								Simpan Kegiatan
							</Button>
							<Link href="/admin/activities" className="flex-1">
								<Button type="button" variant="outline" className="w-full">
									Batal
								</Button>
							</Link>
						</div>
					</form>
				</div>
			</div>
		</DashboardLayout>
	);
}
