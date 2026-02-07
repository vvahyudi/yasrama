import { DashboardLayout } from "@/components/admin/dashboard-nav";
import { requireAuth } from "@/lib/session";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
	title: "Buat Berita | Admin - Yayasan Raden Rahmat",
};

export default async function CreateNewsPage() {
	await requireAuth();

	return (
		<DashboardLayout>
			<div className="p-6 max-w-4xl mx-auto">
				{/* Header */}
				<div className="flex items-center gap-4 mb-6">
					<Button asChild variant="outline" size="icon">
						<Link href="/admin/news">
							<ArrowLeft className="h-4 w-4" />
						</Link>
					</Button>
					<div>
						<h1 className="text-3xl font-bold text-slate-900">
							Buat Berita Baru
						</h1>
						<p className="text-slate-600 text-sm mt-1">
							Tambahkan berita dan pengumuman baru
						</p>
					</div>
				</div>

				{/* Form */}
				<div className="bg-white rounded-lg shadow p-6">
					<form className="space-y-6">
						{/* Title */}
						<div>
							<label className="block text-sm font-medium text-slate-900 mb-2">
								Judul
							</label>
							<input
								type="text"
								placeholder="Masukkan judul berita"
								className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
								required
							/>
						</div>

						{/* Description */}
						<div>
							<label className="block text-sm font-medium text-slate-900 mb-2">
								Deskripsi
							</label>
							<textarea
								placeholder="Masukkan deskripsi singkat"
								rows={2}
								className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
								required
							/>
						</div>

						{/* Content */}
						<div>
							<label className="block text-sm font-medium text-slate-900 mb-2">
								Konten
							</label>
							<textarea
								placeholder="Masukkan konten berita"
								rows={8}
								className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-mono text-sm"
								required
							/>
						</div>

						{/* Status */}
						<div>
							<label className="block text-sm font-medium text-slate-900 mb-2">
								Status
							</label>
							<select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none">
								<option value="DRAFT">Draft</option>
								<option value="PUBLISHED">Published</option>
								<option value="ARCHIVED">Archived</option>
							</select>
						</div>

						{/* Actions */}
						<div className="flex gap-4">
							<Button type="submit" className="flex-1">
								Simpan Berita
							</Button>
							<Button asChild variant="outline" className="flex-1">
								<Link href="/admin/news">Batal</Link>
							</Button>
						</div>
					</form>
				</div>
			</div>
		</DashboardLayout>
	);
}
