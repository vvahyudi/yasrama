import type { Metadata } from "next";

export const metadata: Metadata = {
	title: {
		default: "Dashboard Admin | Yayasan Raden Rahmat",
		template: "%s | Admin Dashboard",
	},
	description: "Dashboard administrasi Yayasan Raden Rahmat",
	robots: {
		index: false,
		follow: false,
	},
};

interface AdminLayoutProps {
	children: React.ReactNode;
}

/**
 * Admin Layout - For admin dashboard pages
 * No Header/Footer - Clean admin interface
 */
export default function AdminLayout({ children }: AdminLayoutProps) {
	return <>{children}</>;
}
