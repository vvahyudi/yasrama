import { requireAuth } from "@/lib/session";
import { DashboardLayout } from "@/components/admin/dashboard-nav";
import { ActivityCreateForm } from "@/components/admin/activity-create-form";

export const metadata = {
	title: "Tambah Kegiatan",
};

export default async function CreateActivityPage() {
	await requireAuth();

	return (
		<DashboardLayout>
			<ActivityCreateForm />
		</DashboardLayout>
	);
}
