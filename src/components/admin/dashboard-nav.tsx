"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	LayoutDashboard,
	FileText,
	Calendar,
	Users,
	LogOut,
	Menu,
	X,
	MessageSquare,
	UserPlus,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const navigation = [
	{
		name: "Dashboard",
		href: "/admin/dashboard",
		icon: LayoutDashboard,
	},
	{
		name: "Berita",
		href: "/admin/news",
		icon: FileText,
	},
	{
		name: "Kegiatan",
		href: "/admin/activities",
		icon: Calendar,
	},
	{
		name: "Kontak Masuk",
		href: "/admin/contacts",
		icon: MessageSquare,
	},
	{
		name: "Pendaftaran",
		href: "/admin/registrations",
		icon: UserPlus,
	},
	{
		name: "Pengguna",
		href: "/admin/users",
		icon: Users,
	},
];

export function DashboardNav() {
	const router = useRouter();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isLoggingOut, setIsLoggingOut] = useState(false);

	async function handleLogout() {
		setIsLoggingOut(true);
		try {
			const response = await fetch("/api/auth/logout", {
				method: "POST",
			});

			if (response.ok) {
				router.push("/admin/login");
			}
		} catch (error) {
			console.error("Logout error:", error);
		} finally {
			setIsLoggingOut(false);
		}
	}

	return (
		<>
			{/* Desktop Sidebar */}
			<aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white flex-col">
				{/* Logo */}
				<div className="p-6 border-b border-slate-700">
					<Link href="/admin/dashboard" className="flex items-center gap-2">
						<div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
							<LayoutDashboard className="h-6 w-6" />
						</div>
						<div>
							<p className="font-bold text-sm">Admin</p>
							<p className="text-xs text-slate-400">Dashboard</p>
						</div>
					</Link>
				</div>

				{/* Navigation */}
				<nav className="flex-1 p-4 space-y-2">
					{navigation.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors group"
						>
							<item.icon className="h-5 w-5 text-slate-400 group-hover:text-primary" />
							<span className="text-sm font-medium">{item.name}</span>
						</Link>
					))}
				</nav>

				{/* Logout */}
				<div className="p-4 border-t border-slate-700">
					<Button
						onClick={handleLogout}
						disabled={isLoggingOut}
						variant="outline"
						className="w-full justify-start"
						size="sm"
					>
						<LogOut className="h-4 w-4 mr-2" />
						{isLoggingOut ? "Keluar..." : "Keluar"}
					</Button>
				</div>
			</aside>

			{/* Mobile Header */}
			<div className="md:hidden fixed top-0 left-0 right-0 bg-slate-900 text-white border-b border-slate-700 z-40">
				<div className="flex items-center justify-between p-4">
					<Link href="/admin/dashboard" className="flex items-center gap-2">
						<div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
							<LayoutDashboard className="h-5 w-5" />
						</div>
					</Link>
					<button
						type="button"
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						className="p-2 hover:bg-slate-800 rounded-lg"
					>
						{isMobileMenuOpen ? (
							<X className="h-6 w-6" />
						) : (
							<Menu className="h-6 w-6" />
						)}
					</button>
				</div>

				{/* Mobile Menu */}
				<AnimatePresence>
					{isMobileMenuOpen && (
						<motion.nav
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							className="border-t border-slate-700 bg-slate-800"
						>
							<div className="p-4 space-y-2">
								{navigation.map((item) => (
									<Link
										key={item.href}
										href={item.href}
										className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors"
										onClick={() => setIsMobileMenuOpen(false)}
									>
										<item.icon className="h-5 w-5 text-slate-400" />
										<span className="text-sm font-medium">{item.name}</span>
									</Link>
								))}
								<Button
									onClick={handleLogout}
									disabled={isLoggingOut}
									variant="outline"
									className="w-full justify-start mt-4"
									size="sm"
								>
									<LogOut className="h-4 w-4 mr-2" />
									{isLoggingOut ? "Keluar..." : "Keluar"}
								</Button>
							</div>
						</motion.nav>
					)}
				</AnimatePresence>
			</div>
		</>
	);
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex h-screen bg-slate-50">
			<DashboardNav />

			{/* Main Content */}
			<main className="flex-1 md:ml-64 mt-16 md:mt-0">
				<div className="h-full overflow-auto">{children}</div>
			</main>
		</div>
	);
}
