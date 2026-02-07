import { requireAuth } from "@/lib/session";
import { DashboardLayout } from "@/components/admin/dashboard-nav";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const metadata = {
	title: "Kegiatan Management",
};

export default async function ActivitiesPage() {
	await requireAuth();

	return (
		<DashboardLayout>
			<div className="p-6">
				<div className="mb-6 flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold">Manajemen Kegiatan</h1>
						<p className="text-muted-foreground">
							Kelola kegiatan dan aktivitas sekolah
						</p>
					</div>
					<Link href="/admin/activities/create">
						<Button>
							<Plus className="mr-2 size-4" />
							Tambah Kegiatan
						</Button>
					</Link>
				</div>

				<div className="rounded-lg border bg-card">
					<div className="p-6">
						<div className="mb-4 flex items-center gap-4">
							<input
								type="search"
								placeholder="Cari kegiatan..."
								className="flex h-10 w-full max-w-sm rounded-md border border-input bg-background px-3 py-2 text-sm"
							/>
							<select className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
								<option value="">Semua Tipe</option>
								<option value="ACADEMIC">Akademik</option>
								<option value="EXTRACURRICULAR">Ekstrakurikuler</option>
								<option value="COMMUNITY">Kemasyarakatan</option>
								<option value="OTHER">Lainnya</option>
							</select>
							<select className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
								<option value="">Semua Institusi</option>
								<option value="PAUD">PAUD</option>
								<option value="SD">SD</option>
							</select>
						</div>

						<div className="overflow-x-auto">
							<table className="w-full">
								<thead>
									<tr className="border-b">
										<th className="p-3 text-left font-semibold">Judul</th>
										<th className="p-3 text-left font-semibold">Tipe</th>
										<th className="p-3 text-left font-semibold">Institusi</th>
										<th className="p-3 text-left font-semibold">Featured</th>
										<th className="p-3 text-left font-semibold">Tanggal</th>
										<th className="p-3 text-left font-semibold">Aksi</th>
									</tr>
								</thead>
								<tbody>
									<tr className="border-b">
										<td
											colSpan={6}
											className="p-8 text-center text-muted-foreground"
										>
											Belum ada kegiatan. Klik "Tambah Kegiatan" untuk membuat
											kegiatan baru.
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>

				<div className="mt-6 rounded-lg border bg-blue-50 p-4">
					<h3 className="mb-2 font-semibold text-blue-900">
						💡 Cara Menggunakan
					</h3>
					<ul className="space-y-1 text-sm text-blue-800">
						<li>• Klik "Tambah Kegiatan" untuk membuat kegiatan baru</li>
						<li>
							• Gunakan filter untuk mencari berdasarkan tipe atau institusi
						</li>
						<li>• Kegiatan dengan status "Featured" akan muncul di homepage</li>
						<li>
							• Konten mendukung Markdown untuk formatting yang lebih kaya
						</li>
					</ul>
				</div>
			</div>
		</DashboardLayout>
	);
}
