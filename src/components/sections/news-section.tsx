import { ArrowRight, Calendar, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/db";
import { fontVariants } from "@/lib/fonts";
import { cn } from "@/lib/utils";

type NewsListItem = {
	id: string;
	slug: string;
	title: string;
	description: string;
	image: string | null;
	featured: boolean;
	createdAt: Date;
	author: {
		name: string | null;
	};
};

async function getLatestNews(): Promise<NewsListItem[]> {
	try {
		const news = await prisma.news.findMany({
			where: { status: "PUBLISHED" },
			take: 3,
			orderBy: { createdAt: "desc" },
			include: {
				author: {
					select: { name: true },
				},
			},
		});
		return news;
	} catch (error) {
		console.error("Error fetching news:", error);
		return [];
	}
}

export async function NewsSection() {
	const newsList = await getLatestNews();

	if (newsList.length === 0) {
		return null; // Don't show section if no news
	}

	return (
		<section className="container py-16">
			<div className="mb-10 text-center">
				<h2
					className={cn(
						"mb-4 text-3xl font-bold md:text-4xl",
						fontVariants.bold,
					)}
				>
					Berita & Pengumuman
				</h2>
				<p className="mx-auto max-w-2xl text-muted-foreground">
					Ikuti berita terbaru dan pengumuman penting dari Yayasan Raden Rahmat
				</p>
			</div>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{newsList.map((news: NewsListItem) => (
					<Link
						key={news.id}
						href={`/berita/${news.slug}`}
						className="group overflow-hidden rounded-lg border bg-card transition-shadow hover:shadow-lg"
					>
						{news.image && (
							<div className="relative aspect-video overflow-hidden">
								<Image
									src={news.image}
									alt={news.title}
									fill
									className="object-cover transition-transform group-hover:scale-105"
								/>
								{news.featured && (
									<Badge className="absolute right-2 top-2 bg-red-600">
										Featured
									</Badge>
								)}
							</div>
						)}
						<div className="p-6">
							<h3 className="mb-2 line-clamp-2 text-xl font-bold transition-colors group-hover:text-primary">
								{news.title}
							</h3>
							<p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
								{news.description}
							</p>
							<div className="flex items-center justify-between text-xs text-muted-foreground">
								<div className="flex items-center gap-3">
									<span className="flex items-center gap-1">
										<Calendar className="size-3" />
										{new Date(news.createdAt).toLocaleDateString("id-ID", {
											day: "numeric",
											month: "short",
										})}
									</span>
									<span className="flex items-center gap-1">
										<User className="size-3" />
										{news.author.name}
									</span>
								</div>
								<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
							</div>
						</div>
					</Link>
				))}
			</div>

			<div className="mt-8 text-center">
				<Link
					href="/berita"
					className="inline-flex items-center rounded-lg border px-6 py-3 font-semibold transition-colors hover:bg-accent"
				>
					Lihat Semua Berita
					<ArrowRight className="ml-2 size-4" />
				</Link>
			</div>
		</section>
	);
}
