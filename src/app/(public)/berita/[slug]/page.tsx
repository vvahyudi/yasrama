import { ArrowLeft, Calendar, Eye, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db";

type NewsDetail = {
	id: string;
	slug: string;
	title: string;
	description: string;
	content: string;
	image: string | null;
	views: number;
	status: string;
	createdAt: Date;
	author: {
		name: string | null;
		email: string;
	};
};
type NewsCardItem = {
	id: string;
	slug: string;
	title: string;
	description: string;
	image: string | null;
};
type PageProps = { params: Promise<{ slug: string }> };

async function getNewsbySlug(slug: string): Promise<NewsDetail | null> {
	try {
		const news = await prisma.news.findUnique({
			where: { slug },
			include: {
				author: {
					select: { name: true, email: true },
				},
			},
		});

		if (news) {
			// Increment views
			await prisma.news.update({
				where: { id: news.id },
				data: { views: { increment: 1 } },
			});
		}

		return news;
	} catch (error) {
		console.error("Error fetching news:", error);
		return null;
	}
}

async function getRelatedNews(
	currentId: string,
	limit = 3,
): Promise<NewsCardItem[]> {
	try {
		const related = await prisma.news.findMany({
			where: {
				status: "PUBLISHED",
				NOT: { id: currentId },
			},
			take: limit,
			orderBy: { createdAt: "desc" },
		});
		return related;
	} catch (error) {
		console.error("Error fetching related news:", error);
		return [];
	}
}

export async function generateMetadata({ params }: PageProps) {
	const { slug } = await params;
	const news = await getNewsbySlug(slug);
	if (!news) return { title: "Berita Tidak Ditemukan" };

	return {
		title: news.title,
		description: news.description,
		openGraph: {
			title: news.title,
			description: news.description,
			images: news.image ? [news.image] : [],
		},
	};
}

export default async function NewsDetailPage({ params }: PageProps) {
	const { slug } = await params;
	const news = await getNewsbySlug(slug);

	if (!news || news.status !== "PUBLISHED") {
		notFound();
	}

	const relatedNews = await getRelatedNews(news.id);

	return (
		<div className="container py-12">
			<div className="mx-auto max-w-4xl">
				<Link href="/berita">
					<Button variant="ghost" size="sm" className="mb-6">
						<ArrowLeft className="mr-2 size-4" />
						Kembali ke Berita
					</Button>
				</Link>

				<article>
					{news.image && (
						<div className="relative mb-8 aspect-video overflow-hidden rounded-lg">
							<Image
								src={news.image}
								alt={news.title}
								fill
								className="object-cover"
								priority
							/>
						</div>
					)}

					<header className="mb-8">
						<h1 className="mb-4 text-4xl font-bold">{news.title}</h1>
						<div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
							<span className="flex items-center gap-1">
								<Calendar className="size-4" />
								{new Date(news.createdAt).toLocaleDateString("id-ID", {
									day: "numeric",
									month: "long",
									year: "numeric",
								})}
							</span>
							<span className="flex items-center gap-1">
								<User className="size-4" />
								{news.author.name}
							</span>
							<span className="flex items-center gap-1">
								<Eye className="size-4" />
								{news.views} views
							</span>
						</div>
					</header>

					<div className="prose prose-lg max-w-none dark:prose-invert">
						<ReactMarkdown
							remarkPlugins={[remarkGfm]}
							rehypePlugins={[rehypeRaw, rehypeSanitize]}
						>
							{news.content}
						</ReactMarkdown>
					</div>
				</article>

				{relatedNews.length > 0 && (
					<section className="mt-12 border-t pt-12">
						<h2 className="mb-6 text-2xl font-bold">Berita Terkait</h2>
						<div className="grid gap-6 md:grid-cols-3">
							{relatedNews.map((item: NewsCardItem) => (
								<Link
									key={item.id}
									href={`/berita/${item.slug}`}
									className="group overflow-hidden rounded-lg border bg-card transition-shadow hover:shadow-lg"
								>
									{item.image && (
										<div className="relative aspect-video overflow-hidden">
											<Image
												src={item.image}
												alt={item.title}
												fill
												className="object-cover transition-transform group-hover:scale-105"
											/>
										</div>
									)}
									<div className="p-4">
										<h3 className="mb-2 line-clamp-2 font-semibold group-hover:text-primary">
											{item.title}
										</h3>
										<p className="line-clamp-2 text-sm text-muted-foreground">
											{item.description}
										</p>
									</div>
								</Link>
							))}
						</div>
					</section>
				)}
			</div>
		</div>
	);
}
