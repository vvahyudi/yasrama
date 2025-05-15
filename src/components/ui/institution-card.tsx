"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { fontVariants } from "@/lib/fonts"
import { ArrowRight } from "lucide-react"

export default function InstitutionCard({
	institution,
}: {
	institution: { title: string; description: string; icon: any; href: string }
}) {
	const { title, description, icon: Icon, href } = institution

	const cardVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				ease: "easeOut",
			},
		},
		hover: {
			y: -10,
			transition: {
				duration: 0.3,
				ease: "easeOut",
			},
		},
	}

	return (
		<motion.div variants={cardVariants} whileHover="hover" className="group">
			<div className="relative h-full overflow-hidden rounded-2xl bg-card shadow-lg transition-all duration-300 hover:shadow-xl">
				{/* Image */}
				<div className="relative aspect-4/3 overflow-hidden">
					<Image
						src="/ppdb_yasrama.jpg"
						alt={`${title} - Yayasan Raden Rahmat`}
						fill
						className="object-cover transition-transform duration-500 group-hover:scale-105"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
				</div>

				{/* Content */}
				<div className="p-6">
					<div className="flex items-center gap-4 mb-4">
						<div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
							<Icon className="h-6 w-6 text-primary" aria-hidden="true" />
						</div>
						<h3
							className={cn(
								"text-xl font-bold text-primary",
								fontVariants.bold,
							)}
						>
							{title}
						</h3>
					</div>

					<p className="mt-4 text-primary line-clamp-3">{description}</p>

					<div className="mt-6">
						<Link
							href={href}
							className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
						>
							Pelajari Lebih Lanjut
							<ArrowRight
								className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
								aria-hidden="true"
							/>
						</Link>
					</div>
				</div>
			</div>
		</motion.div>
	)
}
