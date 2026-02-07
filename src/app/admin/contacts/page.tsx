import { requireAuth } from "@/lib/session";
import { DashboardLayout } from "@/components/admin/dashboard-nav";
import { MessageSquare, Mail, Phone, Calendar } from "lucide-react";

export const metadata = {
	title: "Kontak Masuk",
};

export default async function ContactsPage() {
	await requireAuth();

	return (
		<DashboardLayout>
			<div className="p-6">
				<div className="mb-6">
					<h1 className="text-3xl font-bold">Kontak Masuk</h1>
					<p className="text-muted-foreground">
						Kelola pesan dan inquiry dari form kontak
					</p>
				</div>

				<div className="mb-4 grid gap-4 md:grid-cols-4">
					<div className="rounded-lg border bg-card p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-muted-foreground">Total Pesan</p>
								<p className="text-2xl font-bold">0</p>
							</div>
							<MessageSquare className="size-8 text-muted-foreground" />
						</div>
					</div>
					<div className="rounded-lg border bg-card p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-muted-foreground">Baru</p>
								<p className="text-2xl font-bold text-blue-600">0</p>
							</div>
							<Mail className="size-8 text-blue-600" />
						</div>
					</div>
					<div className="rounded-lg border bg-card p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-muted-foreground">Sudah Dibaca</p>
								<p className="text-2xl font-bold text-yellow-600">0</p>
							</div>
							<Phone className="size-8 text-yellow-600" />
						</div>
					</div>
					<div className="rounded-lg border bg-card p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-muted-foreground">Selesai</p>
								<p className="text-2xl font-bold text-green-600">0</p>
							</div>
							<Calendar className="size-8 text-green-600" />
						</div>
					</div>
				</div>

				<div className="rounded-lg border bg-card">
					<div className="p-6">
						<div className="mb-4 flex items-center gap-4">
							<select className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
								<option value="">Semua Status</option>
								<option value="NEW">Baru</option>
								<option value="READ">Sudah Dibaca</option>
								<option value="REPLIED">Sudah Dibalas</option>
								<option value="CLOSED">Selesai</option>
							</select>
						</div>

						<div className="overflow-x-auto">
							<table className="w-full">
								<thead>
									<tr className="border-b">
										<th className="p-3 text-left font-semibold">Nama</th>
										<th className="p-3 text-left font-semibold">Email</th>
										<th className="p-3 text-left font-semibold">Subject</th>
										<th className="p-3 text-left font-semibold">Status</th>
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
											Belum ada pesan masuk. Pesan dari form kontak akan muncul
											di sini.
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
							• Pesan dari form kontak di website akan otomatis masuk ke sini
						</li>
						<li>• Klik pada baris untuk melihat detail pesan lengkap</li>
						<li>• Update status pesan setelah ditindaklanjuti</li>
						<li>• Gunakan filter untuk melihat pesan berdasarkan status</li>
					</ul>
				</div>
			</div>
		</DashboardLayout>
	);
}
