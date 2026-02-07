/** biome-ignore-all assist/source/organizeImports: <not impact> */
import Image from "next/image";
import { Calendar, GraduationCap, Star } from "lucide-react";
import { prisma } from "@/lib/db";
import type { ActivitySummary } from "@/lib/content-types";
import { Badge } from "@/components/ui/badge";

function getTypeLabel(type: ActivitySummary["type"]) {
	if (type === "ACADEMIC") return "Akademik";
	if (type === "EXTRACURRICULAR") return "Ekstrakurikuler";
	if (type === "COMMUNITY") return "Kemasyarakatan";
	return "Lainnya";
}

async function getActivities(): Promise<ActivitySummary[]> {
	const activities = await prisma.activity.findMany({
		orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
		take: 12,
		include: {
			author: {
				select: { name: true },
			},
		},
	});

	return activities.map((item) => ({
		id: item.id,
		slug: item.slug,
		title: item.title,
		description: item.description,
		image: item.image,
		type: item.type,
		institution: (item.institution as ActivitySummary["institution"]) ?? null,
		featured: item.featured,
		createdAt: item.createdAt.toISOString(),
		authorName: item.author.name,
	}));
}

export default async function KegiatanPage() {
	const activities = await getActivities();

	return (
		<div className="container py-12">
			<div className="mb-8 text-center">
				<h1 className="mb-3 text-4xl font-bold">Kegiatan Yayasan</h1>
				<p className="mx-auto max-w-2xl text-muted-foreground">
					Dokumentasi kegiatan terbaru dari PAUD dan SD Yayasan Raden Rahmat.
				</p>
			</div>

			{activities.length === 0 ? (
				<div className="rounded-lg border bg-card p-12 text-center">
					<p className="text-muted-foreground">
						Belum ada kegiatan yang dipublikasikan.
					</p>
				</div>
			) : (
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{activities.map((activity) => (
						<article
							key={activity.id}
							className="overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-md"
						>
							<div className="relative aspect-video bg-muted">
								<Image
									src={activity.image || "/placeholder.svg"}
									alt={activity.title}
									fill
									className="object-cover"
								/>
								{activity.featured && (
									<Badge className="absolute right-2 top-2 gap-1 bg-amber-500 text-white">
										<Star className="size-3" />
										Unggulan
									</Badge>
								)}
							</div>

							<div className="space-y-3 p-5">
								<div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
									<Badge variant="secondary">
										{getTypeLabel(activity.type)}
									</Badge>
									{activity.institution && (
										<Badge variant="outline">{activity.institution}</Badge>
									)}
								</div>
								<h2 className="line-clamp-2 text-xl font-bold">
									{activity.title}
								</h2>
								<p className="line-clamp-3 text-sm text-muted-foreground">
									{activity.description}
								</p>
								<div className="flex items-center justify-between text-xs text-muted-foreground">
									<span className="inline-flex items-center gap-1">
										<Calendar className="size-3" />
										{new Date(activity.createdAt).toLocaleDateString("id-ID", {
											day: "numeric",
											month: "short",
											year: "numeric",
										})}
									</span>
									<span className="inline-flex items-center gap-1">
										<GraduationCap className="size-3" />
										{activity.authorName || "Admin"}
									</span>
								</div>
							</div>
						</article>
					))}
				</div>
			)}
		</div>
	);
}
