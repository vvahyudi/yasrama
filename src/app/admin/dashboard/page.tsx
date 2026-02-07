import { DashboardLayout } from "@/components/admin/dashboard-nav";
import { requireAuth } from "@/lib/session";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, BarChart3, FileText, Calendar, Users } from "lucide-react";

export const metadata = {
	title: "Dashboard | Admin - Yayasan Raden Rahmat",
};

export default async function AdminDashboard() {
	await requireAuth();

	const stats = [
		{
			label: "Total Berita",
			value: "12",
			icon: FileText,
			color: "bg-blue-100 text-blue-600",
		},
		{
			label: "Total Kegiatan",
			value: "8",
			icon: Calendar,
			color: "bg-green-100 text-green-600",
		},
		{
			label: "Total Pengguna",
			value: "3",
			icon: Users,
			color: "bg-purple-100 text-purple-600",
		},
		{
			label: "Pengunjung Hari Ini",
			value: "245",
			icon: BarChart3,
			color: "bg-orange-100 text-orange-600",
		},
	];

	return (
		<DashboardLayout>
			<div className="p-6 max-w-6xl mx-auto">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
					<p className="text-slate-600">
						Selamat datang di panel administrasi Yayasan Raden Rahmat
					</p>
				</div>

				{/* Quick Actions */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
					<Button
						asChild
						variant="outline"
						className="justify-start h-auto p-4"
					>
						<Link href="/admin/news/create" className="flex-col gap-2">
							<Plus className="h-5 w-5" />
							Buat Berita
						</Link>
					</Button>
					<Button
						asChild
						variant="outline"
						className="justify-start h-auto p-4"
					>
						<Link href="/admin/activities/create" className="flex-col gap-2">
							<Plus className="h-5 w-5" />
							Buat Kegiatan
						</Link>
					</Button>
					<Button
						asChild
						variant="outline"
						className="justify-start h-auto p-4"
					>
						<Link href="/admin/users" className="flex-col gap-2">
							<Users className="h-5 w-5" />
							Kelola User
						</Link>
					</Button>
					<Button
						asChild
						variant="outline"
						className="justify-start h-auto p-4"
					>
						<Link href="/" className="flex-col gap-2">
							<Plus className="h-5 w-5" />
							Lihat Website
						</Link>
					</Button>
				</div>

				{/* Stats */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					{stats.map((stat) => (
						<div
							key={stat.label}
							className="bg-white rounded-lg shadow p-6 space-y-3"
						>
							<div
								className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}
							>
								<stat.icon className="h-5 w-5" />
							</div>
							<div>
								<p className="text-sm text-slate-600 mb-1">{stat.label}</p>
								<p className="text-2xl font-bold text-slate-900">
									{stat.value}
								</p>
							</div>
						</div>
					))}
				</div>

				{/* Recent Activity */}
				<div className="mt-8 bg-white rounded-lg shadow p-6">
					<h2 className="text-lg font-bold text-slate-900 mb-4">
						Aktivitas Terbaru
					</h2>
					<div className="text-center py-12 text-slate-500">
						<p>Belum ada aktivitas</p>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
}
