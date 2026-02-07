import { DashboardLayout } from "@/components/admin/dashboard-nav";
import { requireAuth } from "@/lib/session";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Edit2, Trash2, Shield } from "lucide-react";

export const metadata = {
	title: "Kelola Pengguna | Admin - Yayasan Raden Rahmat",
};

export default async function UsersPage() {
	await requireAuth();

	// TODO: Fetch users from API
	const users = [];

	return (
		<DashboardLayout>
			<div className="p-6 max-w-6xl mx-auto">
				{/* Header */}
				<div className="flex items-center justify-between mb-6">
					<div>
						<h1 className="text-3xl font-bold text-slate-900">
							Kelola Pengguna
						</h1>
						<p className="text-slate-600 text-sm mt-1">
							Kelola admin dan editor yang dapat mengakses dashboard
						</p>
					</div>
					<Button asChild>
						<Link href="/admin/users/create">
							<Plus className="h-4 w-4 mr-2" />
							Tambah Pengguna
						</Link>
					</Button>
				</div>

				{/* Roles Info */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
					<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
						<div className="flex items-center gap-2 mb-2">
							<Shield className="h-5 w-5 text-blue-600" />
							<h3 className="font-medium text-blue-900">Admin</h3>
						</div>
						<p className="text-sm text-blue-700">
							Full access semua fitur dashboard
						</p>
					</div>
					<div className="bg-green-50 border border-green-200 rounded-lg p-4">
						<div className="flex items-center gap-2 mb-2">
							<Shield className="h-5 w-5 text-green-600" />
							<h3 className="font-medium text-green-900">Editor</h3>
						</div>
						<p className="text-sm text-green-700">
							Bisa membuat dan mengedit konten
						</p>
					</div>
					<div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
						<div className="flex items-center gap-2 mb-2">
							<Shield className="h-5 w-5 text-purple-600" />
							<h3 className="font-medium text-purple-900">Viewer</h3>
						</div>
						<p className="text-sm text-purple-700">
							Hanya bisa melihat konten (read-only)
						</p>
					</div>
				</div>

				{/* Table */}
				<div className="bg-white rounded-lg shadow overflow-hidden">
					{users.length === 0 ? (
						<div className="text-center py-12 text-slate-500">
							<p className="mb-4">Belum ada pengguna lain</p>
							<div className="text-sm text-slate-400">
								Gunakan Prisma Studio untuk membuat pengguna:
								<div className="mt-2 font-mono text-xs">npx prisma studio</div>
							</div>
						</div>
					) : (
						<table className="w-full">
							<thead className="bg-slate-50 border-b">
								<tr>
									<th className="px-6 py-3 text-left text-sm font-medium text-slate-900">
										Nama
									</th>
									<th className="px-6 py-3 text-left text-sm font-medium text-slate-900">
										Email
									</th>
									<th className="px-6 py-3 text-left text-sm font-medium text-slate-900">
										Role
									</th>
									<th className="px-6 py-3 text-left text-sm font-medium text-slate-900">
										Status
									</th>
									<th className="px-6 py-3 text-right text-sm font-medium text-slate-900">
										Aksi
									</th>
								</tr>
							</thead>
							<tbody>{/* Users rows will be added here */}</tbody>
						</table>
					)}
				</div>
			</div>
		</DashboardLayout>
	);
}
