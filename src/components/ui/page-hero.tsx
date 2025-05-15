"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { fontVariants } from "@/lib/fonts"
import { cn } from "@/lib/utils"

interface PageHeroProps {
	title: string
	description?: string
	backgroundImage?: string
}

export default function PageHero({
	title,
	description,
	backgroundImage = "/ppdb_yasrama.jpg",
}: PageHeroProps) {
	return (
		<section className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
			{/* Background Image */}
			<div className="absolute inset-0">
				<Image
					src={backgroundImage}
					alt={title}
					fill
					priority
					className="object-cover"
					sizes="100vw"
				/>
				<div className="absolute inset-0 bg-black/60 hero-bg-gradient" />
			</div>

			{/* Content */}
			<div className="relative container mx-auto h-full flex items-center justify-center px-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
					className="max-w-3xl text-center space-y-6 p-6 sm:p-8 rounded-lg backdrop-blur-sm bg-greenbg/40"
				>
					<h1
						className={cn(
							"text-3xl sm:text-4xl md:text-5xl font-bold text-white",
							fontVariants.bold,
						)}
					>
						{title}
					</h1>

					{description && (
						<p
							className={cn(
								"text-base sm:text-lg text-white/90",
								fontVariants.base,
							)}
						>
							{description}
						</p>
					)}
				</motion.div>
			</div>
		</section>
	)
}
