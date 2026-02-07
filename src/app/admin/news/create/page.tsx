import { DashboardLayout } from "@/components/admin/dashboard-nav";
import { NewsCreateForm } from "@/components/admin/news-create-form";
import { requireAuth } from "@/lib/session";

export const metadata = {
	title: "Buat Berita | Admin - Yayasan Raden Rahmat",
};

export default async function CreateNewsPage() {
	await requireAuth();

	return (
		<DashboardLayout>
			<NewsCreateForm />
		</DashboardLayout>
	);
}
