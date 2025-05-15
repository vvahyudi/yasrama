"use client"

import { useRef, useState } from "react"
import { fontVariants } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { motion, useInView } from "motion/react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ActivityCard from "../ui/activity-card"

type Activity = {
	id: number
	title: string
	description: string
	image: string
	date: string
}

const activitiesData: Activity[] = [
	{
		id: 1,
		title: "Pembukaan Tahun Ajaran Baru",
		description:
			"Acara pembukaan tahun ajaran baru dengan berbagai kegiatan menarik dan pembagian seragam sekolah.",
		image: "/ppdb_yasrama.jpg",
		date: "2025-07-15",
	},
	{
		id: 2,
		title: "Kegiatan Tahfidz Al-Qur'an",
		description:
			"Program menghafal Al-Qur'an untuk siswa dengan bimbingan ustadz dan ustadzah berpengalaman.",
		image: "/ppdb_yasrama.jpg",
		date: "2025-07-20",
	},
	{
		id: 3,
		title: "Kegiatan Ekstrakurikuler",
		description:
			"Berbagai kegiatan ekstrakurikuler untuk mengembangkan bakat dan minat siswa.",
		image: "/ppdb_yasrama.jpg",
		date: "2025-07-25",
	},
	{
		id: 4,
		title: "Kegiatan Sosial",
		description:
			"Program bakti sosial dan pengabdian masyarakat untuk membentuk karakter peduli sosial.",
		image: "/ppdb_yasrama.jpg",
		date: "2025-07-30",
	},
	{
		id: 5,
		title: "Kegiatan Sosial",
		description:
			"Program bakti sosial dan pengabdian masyarakat untuk membentuk karakter peduli sosial.",
		image: "/ppdb_yasrama.jpg",
		date: "2025-07-30",
	},
]

export default function ActivitiesSection() {
	const sectionRef = useRef<HTMLElement | null>(null)
	const carouselRef = useRef<HTMLDivElement | null>(null)
	const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
	const [activeIndex, setActiveIndex] = useState<number>(0)

	const scrollPrev = () => {
		if (!carouselRef.current) return

		const card = carouselRef.current.querySelector(
			"[data-activity-card]",
		) as HTMLDivElement | null
		const cardWidth = card?.offsetWidth ?? 0
		const gap = 24

		carouselRef.current.scrollBy({
			left: -(cardWidth + gap),
			behavior: "smooth",
		})

		setActiveIndex((prev) => Math.max(0, prev - 1))
	}

	const scrollNext = () => {
		if (!carouselRef.current) return

		const card = carouselRef.current.querySelector(
			"[data-activity-card]",
		) as HTMLDivElement | null
		const cardWidth = card?.offsetWidth ?? 0
		const gap = 24

		carouselRef.current.scrollBy({
			left: cardWidth + gap,
			behavior: "smooth",
		})

		setActiveIndex((prev) => Math.min(activitiesData.length - 1, prev + 1))
	}

	const scrollToIndex = (index: number) => {
		if (!carouselRef.current) return

		const cards = carouselRef.current.querySelectorAll("[data-activity-card]")
		const targetCard = cards[index] as HTMLDivElement | undefined

		if (targetCard) {
			targetCard.scrollIntoView({
				behavior: "smooth",
				inline: "center",
				block: "nearest",
			})

			setActiveIndex(index)
		}
	}

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.2,
			},
		},
	}

	const titleVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.5 },
		},
	}

	return (
		<section className="py-16 sm:py-24 bg-card" ref={sectionRef}>
			<div className="container mx-auto px-4">
				<motion.div
					className="text-center mb-12"
					initial="hidden"
					animate={isInView ? "visible" : "hidden"}
					variants={containerVariants}
				>
					<motion.div
						variants={titleVariants}
						className="inline-flex items-center gap-2 mb-4"
					>
						<span className={cn("text-primary font-bold", fontVariants.bold)}>
							KEGIATAN
						</span>
						<div className="h-px w-12 bg-primary/75" />
					</motion.div>

					<motion.h2
						variants={titleVariants}
						className={cn(
							"text-3xl sm:text-4xl font-bold text-primary mb-4",
							fontVariants.bold,
						)}
					>
						Kegiatan Yayasan Raden Rahmat
					</motion.h2>

					<motion.p
						variants={titleVariants}
						className="text-primary max-w-2xl mx-auto"
					>
						Berbagai kegiatan menarik yang diselenggarakan untuk mengembangkan
						potensi siswa dan membentuk karakter yang baik.
					</motion.p>
				</motion.div>

				<div className="relative">
					<button
						onClick={scrollPrev}
						className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-card/80 hover:bg-card p-2 rounded-full shadow-lg transition-all"
						aria-label="Previous slide"
						disabled={activeIndex === 0}
					>
						<ChevronLeft
							className={cn(
								"h-6 w-6",
								activeIndex === 0 ? "text-primary/50" : "text-primary",
							)}
						/>
					</button>

					<button
						onClick={scrollNext}
						className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-card/80 hover:bg-card p-2 rounded-full shadow-lg transition-all"
						aria-label="Next slide"
						disabled={activeIndex === activitiesData.length - 1}
					>
						<ChevronRight
							className={cn(
								"h-6 w-6",
								activeIndex === activitiesData.length - 1
									? "text-primary/50"
									: "text-primary",
							)}
						/>
					</button>

					<motion.div
						ref={carouselRef}
						className="flex gap-6 pb-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
						style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
						initial="hidden"
						animate={isInView ? "visible" : "hidden"}
						variants={containerVariants}
					>
						{activitiesData.map((activity, index) => (
							<div
								key={activity.id}
								className="snap-center shrink-0"
								data-activity-card
							>
								<ActivityCard
									activity={activity}
									index={index}
									isVisible={isInView}
								/>
							</div>
						))}
					</motion.div>

					<div className="flex justify-center gap-2 mt-6">
						{activitiesData.map((_, index) => (
							<button
								key={index}
								onClick={() => scrollToIndex(index)}
								className={cn(
									"w-2 h-2 rounded-full transition-all",
									index === activeIndex
										? "bg-primary w-4"
										: "bg-primary/30 hover:bg-primary/50",
								)}
								aria-label={`Go to slide ${index + 1}`}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
