"use client"

import Image from "next/image"
import { motion } from "motion/react" // pastikan kamu pakai `framer-motion`, bukan "motion/react"
import { fontVariants } from "@/lib/fonts"
import { cn, formatDate } from "@/lib/utils"

type Activity = {
	title?: string
	description?: string
	image?: string
	date?: string
}

interface ActivityCardProps {
	activity: Activity
	index: number
	isVisible: boolean
}

export default function ActivityCard({
	activity,
	index,
	isVisible,
}: ActivityCardProps) {
	const { title, description, image, date } = activity

	const cardVariants = {
		hidden: {
			opacity: 0,
			y: 20,
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				delay: 0.1 * index,
			},
		},
		hover: {
			y: -10,
			transition: {
				duration: 0.3,
			},
		},
	}

	return (
		<motion.article
			className="group relative h-[400px] w-full max-w-sm overflow-hidden rounded-2xl bg-card shadow-lg transition-all duration-300 hover:shadow-xl"
			variants={cardVariants}
			initial="hidden"
			animate={isVisible ? "visible" : "hidden"}
			whileHover="hover"
		>
			<div className="relative h-2/3">
				<Image
					src={image || "/ppdb_yasrama.jpg"}
					alt={title || "Kegiatan Yayasan Raden Rahmat"}
					height={1000}
					width={1000}
					// fill
					className="object-cover transition-transform duration-500 group-hover:scale-105"
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
			</div>

			<div className="absolute bottom-0 w-full p-6 text-primary">
				{date && (
					<time className="text-sm text-primary/80" dateTime={date}>
						{formatDate(date)}
					</time>
				)}

				<h3
					className={cn(
						"mt-2 text-xl font-bold line-clamp-2",
						fontVariants.bold,
					)}
				>
					{title || "Kegiatan Yayasan Raden Rahmat"}
				</h3>

				<p className="mt-2 text-sm text-primary/90 line-clamp-2">
					{description ||
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
				</p>
			</div>

			<div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
		</motion.article>
	)
}
