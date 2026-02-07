import { DashboardLayout } from "@/components/admin/dashboard-nav";
import { requireAuth } from "@/lib/session";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Edit2, Trash2, Eye } from "lucide-react";

export const metadata = {
	title: "Kelola Berita | Admin - Yayasan Raden Rahmat",
};

export default async function NewsPage() {
	await requireAuth();

	// TODO: Fetch news from API
	const news = [];

	return (
		<DashboardLayout>
			<div className="p-6 max-w-6xl mx-auto">
				{/* Header */}
				<div className="flex items-center justify-between mb-6">
					<div>
						<h1 className="text-3xl font-bold text-slate-900">Kelola Berita</h1>
						<p className="text-slate-600 text-sm mt-1">
							Kelola semua berita dan pengumuman
						</p>
					</div>
					<Button asChild>
						<Link href="/admin/news/create">
							<Plus className="h-4 w-4 mr-2" />
							Buat Berita
						</Link>
					</Button>
				</div>

				{/* Table */}
				<div className="bg-white rounded-lg shadow overflow-hidden">
					{news.length === 0 ? (
						<div className="text-center py-12 text-slate-500">
							<p className="mb-4">Belum ada berita</p>
							<Button asChild variant="outline" size="sm">
								<Link href="/admin/news/create">Buat Berita Pertama</Link>
							</Button>
						</div>
					) : (
						<table className="w-full">
							<thead className="bg-slate-50 border-b">
								<tr>
									<th className="px-6 py-3 text-left text-sm font-medium text-slate-900">
										Judul
									</th>
									<th className="px-6 py-3 text-left text-sm font-medium text-slate-900">
										Status
									</th>
									<th className="px-6 py-3 text-left text-sm font-medium text-slate-900">
										Penulis
									</th>
									<th className="px-6 py-3 text-left text-sm font-medium text-slate-900">
										Tanggal
									</th>
									<th className="px-6 py-3 text-right text-sm font-medium text-slate-900">
										Aksi
									</th>
								</tr>
							</thead>
							<tbody>{/* News rows will be added here */}</tbody>
						</table>
					)}
				</div>
			</div>
		</DashboardLayout>
	);
}
