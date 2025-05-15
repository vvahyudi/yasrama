"use client"

import { useRef } from "react"
import { motion, useInView } from "motion/react"
import { fontVariants } from "@/lib/fonts"
import { cn } from "@/lib/utils"

// Regular activities data
const regularActivities = [
	"Senin-Sabtu (KBM)",
	"Jum'at (Keagamaan):",
	"- Penguatan karakter ASWAJA",
	"- Praktek Ibadah",
	"- Penguatan Ruhani",
	"- BTQ Tartila",
	"Sabtu :",
	"- Olahraga",
	"- PPTQ (kelas 4-6)",
	"- Tahfidz Juz 30 (kelas 1-3)",
	"Shalat Dhuha Berjama'ah",
	"Ngaji Surah Pilihan:",
	"Yasin, Al-Waqi'ah & Al-Mulk",
	"Shalat Dzuhur Berjama'ah",
	"Dzikir dan do'a",
]

export default function Activities() {
	const sectionRef = useRef(null)
	const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.05,
				delayChildren: 0.1,
			},
		},
	}

	const itemVariants = {
		hidden: { opacity: 0, x: -20 },
		visible: {
			opacity: 1,
			x: 0,
			transition: { duration: 0.4 },
		},
	}

	return (
		<section ref={sectionRef} className="py-16 md:py-20">
			<div className="container mx-auto px-4">
				<motion.div
					initial="hidden"
					animate={isInView ? "visible" : "hidden"}
					variants={containerVariants}
					className="max-w-4xl mx-auto"
				>
					<motion.div
						variants={itemVariants}
						className="flex items-center gap-2 mb-8"
					>
						<span className={cn("text-primary uppercase", fontVariants.bold)}>
							KEGIATAN
						</span>
						<span className="h-px flex-1 bg-primary/75"></span>
					</motion.div>

					<div className="bg-primary/10 rounded-xl p-8 md:p-12 shadow-md">
						<motion.h3
							variants={itemVariants}
							className={cn(
								"text-2xl md:text-3xl text-primary mb-8 text-center",
								fontVariants.bold,
							)}
						>
							KEGIATAN REGULER
						</motion.h3>

						<motion.div
							variants={itemVariants}
							className={cn(
								"text-xl md:text-2xl text-primary mb-6 text-center",
								fontVariants.bold,
							)}
						>
							Kegiatan Reguler di SD Raden Rahmat Sumenep
						</motion.div>

						<motion.ul
							variants={containerVariants}
							className="space-y-2 md:max-w-2xl mx-auto"
						>
							{regularActivities.map((activity, index) => {
								const isSubItem = activity.startsWith("-")
								return (
									<motion.li
										key={index}
										variants={itemVariants}
										className={cn(
											"text-primary",
											fontVariants.medium,
											isSubItem ? "pl-8 list-none" : "list-disc ml-5",
										)}
									>
										{activity}
									</motion.li>
								)
							})}
						</motion.ul>
					</div>
				</motion.div>
			</div>
		</section>
	)
}
