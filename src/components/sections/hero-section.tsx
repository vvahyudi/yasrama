"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { fontVariants } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

export default function HeroSection({
	title = "Yayasan Raden Rahmat",
	description = "Lembaga pendidikan Islam yang mengintegrasikan nilai-nilai Ahlussunnah wal Jama'ah An-Nahdliyah",
}) {
	const heroRef = useRef(null);

	// Simple parallax effect on scroll
	useEffect(() => {
		const handleScroll = () => {
			if (!heroRef.current) return;
			const scrollY = window.scrollY;
			const element = heroRef.current as HTMLDivElement;
			element.style.transform = `translateY(${scrollY * 0.3}px)`;
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<section
			className={cn(
				"relative w-full h-[600px] sm:h-[700px] overflow-hidden",
				fontVariants.base,
			)}
		>
			{/* Background Image with Parallax Effect */}
			<div ref={heroRef} className="absolute inset-0 h-[800px]">
				<Image
					src="/ppdb_yasrama.jpg"
					alt="Yayasan Raden Rahmat Background"
					fill
					priority
					className="object-cover"
					sizes="100vw"
					placeholder="blur"
					blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
				/>

				<div className="absolute inset-0 bg-black/60 hero-bg-gradient" />
			</div>

			{/* Content */}
			<div className="relative container mx-auto h-full flex items-center justify-center">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
					className="max-w-3xl text-center space-y-6 p-6 sm:p-8 rounded-lg backdrop-blur-sm bg-foreground/40"
				>
					<h1
						className={cn(
							"text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-background",
							fontVariants.bold,
						)}
					>
						{title}
					</h1>

					<p
						className={cn(
							"text-base sm:text-lg md:text-xl text-background/90",
							fontVariants.base,
						)}
					>
						{description}
					</p>

					<motion.div
						className="flex flex-col sm:flex-row gap-4 justify-center"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.5, duration: 0.8 }}
					>
						<Button
							size="lg"
							className="bg-greenys hover:bg-greenys/90 text-background"
							asChild
						>
							<a href="/pendaftaran">Daftar Sekarang</a>
						</Button>

						<Button
							size="lg"
							variant="outline"
							className="border-primary text-primary hover:bg-primary/10"
							asChild
						>
							<a href="#tentang">Pelajari Lebih Lanjut</a>
						</Button>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
