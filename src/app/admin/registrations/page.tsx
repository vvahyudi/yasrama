import { requireAuth } from "@/lib/session";
import { DashboardLayout } from "@/components/admin/dashboard-nav";
import { UserPlus, Users, GraduationCap, Baby } from "lucide-react";

export const metadata = {
	title: "Pendaftaran PPDB",
};

export default async function RegistrationsPage() {
	await requireAuth();

	return (
		<DashboardLayout>
			<div className="p-6">
				<div className="mb-6">
					<h1 className="text-3xl font-bold">Pendaftaran PPDB</h1>
					<p className="text-muted-foreground">
						Kelola data pendaftaran siswa baru
					</p>
				</div>

				<div className="mb-4 grid gap-4 md:grid-cols-4">
					<div className="rounded-lg border bg-card p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-muted-foreground">Total Pendaftar</p>
								<p className="text-2xl font-bold">0</p>
							</div>
							<Users className="size-8 text-muted-foreground" />
						</div>
					</div>
					<div className="rounded-lg border bg-card p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-muted-foreground">PAUD</p>
								<p className="text-2xl font-bold text-blue-600">0</p>
							</div>
							<Baby className="size-8 text-blue-600" />
						</div>
					</div>
					<div className="rounded-lg border bg-card p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-muted-foreground">SD</p>
								<p className="text-2xl font-bold text-green-600">0</p>
							</div>
							<GraduationCap className="size-8 text-green-600" />
						</div>
					</div>
					<div className="rounded-lg border bg-card p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-muted-foreground">Hari Ini</p>
								<p className="text-2xl font-bold text-purple-600">0</p>
							</div>
							<UserPlus className="size-8 text-purple-600" />
						</div>
					</div>
				</div>

				<div className="rounded-lg border bg-card">
					<div className="p-6">
						<div className="mb-4 flex items-center gap-4">
							<input
								type="search"
								placeholder="Cari nama siswa atau orang tua..."
								className="flex h-10 w-full max-w-sm rounded-md border border-input bg-background px-3 py-2 text-sm"
							/>
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
										<th className="p-3 text-left font-semibold">Nama Siswa</th>
										<th className="p-3 text-left font-semibold">Umur</th>
										<th className="p-3 text-left font-semibold">
											Nama Orang Tua
										</th>
										<th className="p-3 text-left font-semibold">Kontak</th>
										<th className="p-3 text-left font-semibold">Institusi</th>
										<th className="p-3 text-left font-semibold">Tanggal</th>
										<th className="p-3 text-left font-semibold">Aksi</th>
									</tr>
								</thead>
								<tbody>
									<tr className="border-b">
										<td
											colSpan={7}
											className="p-8 text-center text-muted-foreground"
										>
											Belum ada pendaftaran. Data pendaftaran dari form PPDB
											akan muncul di sini.
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
						<li>
							• Data pendaftaran dari form PPDB akan otomatis masuk ke sini
						</li>
						<li>• Klik pada baris untuk melihat detail lengkap pendaftar</li>
						<li>
							• Gunakan filter untuk melihat pendaftar berdasarkan institusi
						</li>
						<li>• Export data untuk proses seleksi atau administrasi</li>
					</ul>
				</div>
			</div>
		</DashboardLayout>
	);
}
