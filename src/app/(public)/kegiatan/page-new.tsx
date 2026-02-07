import { ArrowRight, Calendar, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import PageHero from "@/components/ui/page-hero";
import { prisma } from "@/lib/db";
import { fontVariants } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const metadata = {
	title: "Kegiatan",
	description:
		"Berbagai kegiatan dan aktivitas yang dilakukan oleh Yayasan Raden Rahmat",
};

type ActivityListItem = {
	id: string;
	title: string;
	description: string;
	image: string | null;
	type: string;
	institution: string | null;
	createdAt: Date;
	author: {
		name: string | null;
	};
};

async function getActivities(): Promise<ActivityListItem[]> {
	try {
		const activities = await prisma.activity.findMany({
			where: { featured: true },
			orderBy: { createdAt: "desc" },
			take: 12,
			include: {
				author: {
					select: { name: true },
				},
			},
		});
		return activities;
	} catch (error) {
		console.error("Error fetching activities:", error);
		return [];
	}
}

const activityTypeLabels: Record<string, string> = {
	ACADEMIC: "Akademik",
	EXTRACURRICULAR: "Ekstrakurikuler",
	COMMUNITY: "Kemasyarakatan",
	OTHER: "Lainnya",
};

const activityTypeColors: Record<string, string> = {
	ACADEMIC: "bg-blue-100 text-blue-800",
	EXTRACURRICULAR: "bg-green-100 text-green-800",
	COMMUNITY: "bg-purple-100 text-purple-800",
	OTHER: "bg-gray-100 text-gray-800",
};

export default async function KegiatanPage() {
	const activities = await getActivities();

	return (
		<div>
			<PageHero
				title="Kegiatan Yayasan"
				description="Berbagai kegiatan dan aktivitas yang dilakukan oleh Yayasan Raden Rahmat dalam rangka mengembangkan pendidikan dan memberdayakan masyarakat"
			/>

			<section className="container py-12">
				{activities.length === 0 ? (
					<div className="rounded-lg border bg-card p-12 text-center">
						<p className="text-muted-foreground">
							Belum ada kegiatan yang dipublikasikan.
						</p>
					</div>
				) : (
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{activities.map((activity: ActivityListItem) => (
							<div
								key={activity.id}
								className="group overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg"
							>
								{activity.image && (
									<div className="relative aspect-video overflow-hidden">
										<Image
											src={activity.image}
											alt={activity.title}
											fill
											className="object-cover transition-transform group-hover:scale-105"
										/>
									</div>
								)}
								<div className="p-6">
									<div className="mb-3 flex items-center gap-2">
										<Badge
											className={cn(
												"text-xs",
												activityTypeColors[activity.type] ||
													activityTypeColors.OTHER,
											)}
										>
											<Tag className="mr-1 size-3" />
											{activityTypeLabels[activity.type] || "Lainnya"}
										</Badge>
										{activity.institution && (
											<Badge variant="outline" className="text-xs">
												{activity.institution}
											</Badge>
										)}
									</div>

									<h3
										className={cn(
											"mb-2 line-clamp-2 text-xl font-bold transition-colors group-hover:text-primary",
											fontVariants.bold,
										)}
									>
										{activity.title}
									</h3>

									<p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
										{activity.description}
									</p>

									<div className="flex items-center justify-between text-xs text-muted-foreground">
										<span className="flex items-center gap-1">
											<Calendar className="size-3" />
											{new Date(activity.createdAt).toLocaleDateString(
												"id-ID",
												{
													day: "numeric",
													month: "short",
													year: "numeric",
												},
											)}
										</span>
										<span className="flex items-center gap-1 text-primary">
											Selengkapnya
											<ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
										</span>
									</div>
								</div>
							</div>
						))}
					</div>
				)}

				{activities.length > 0 && (
					<div className="mt-8 text-center">
						<p className="text-sm text-muted-foreground">
							Menampilkan {activities.length} kegiatan featured
						</p>
					</div>
				)}
			</section>

			<section className="container pb-16">
				<div className="rounded-lg border bg-gradient-to-br from-primary/5 to-primary/10 p-8 text-center">
					<h2 className={cn("mb-4 text-2xl font-bold", fontVariants.bold)}>
						Ingin Berpartisipasi?
					</h2>
					<p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
						Kami selalu terbuka untuk kolaborasi dan dukungan dari masyarakat.
						Mari bersama-sama memajukan pendidikan dan memberdayakan generasi
						masa depan.
					</p>
					<Link href="/profil">
						<Button
							asChild
							type="button"
							className="rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
						>
							Hubungi Kami
						</Button>
					</Link>
				</div>
			</section>
		</div>
	);
}
