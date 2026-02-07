import { ArrowRight, Calendar, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/db";

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
			take: 6,
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

export default async function NewsPage() {
	const newsList = await getLatestNews();

	return (
		<div className="container py-12">
			<div className="mb-8 text-center">
				<h1 className="mb-4 text-4xl font-bold">Berita & Pengumuman</h1>
				<p className="mx-auto max-w-2xl text-muted-foreground">
					Ikuti berita terbaru, pengumuman, dan update dari Yayasan Raden Rahmat
				</p>
			</div>

			{newsList.length === 0 ? (
				<div className="rounded-lg border bg-card p-12 text-center">
					<p className="text-muted-foreground">
						Belum ada berita yang dipublikasikan.
					</p>
				</div>
			) : (
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
								<h3 className="mb-2 line-clamp-2 text-xl font-bold group-hover:text-primary">
									{news.title}
								</h3>
								<p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
									{news.description}
								</p>
								<div className="flex items-center justify-between text-xs text-muted-foreground">
									<div className="flex items-center gap-4">
										<span className="flex items-center gap-1">
											<Calendar className="size-3" />
											{new Date(news.createdAt).toLocaleDateString("id-ID", {
												day: "numeric",
												month: "short",
												year: "numeric",
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
			)}

			{newsList.length > 0 && (
				<div className="mt-8 text-center">
					<p className="text-sm text-muted-foreground">
						Menampilkan {newsList.length} berita terbaru
					</p>
				</div>
			)}
		</div>
	);
}
