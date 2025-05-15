"use client"

import { useRef } from "react"
import { motion, useInView } from "motion/react"
import { fontVariants } from "@/lib/fonts"
import { cn } from "@/lib/utils"

// Mission statements data
const missionData = [
	"Menanamkan nilai-nilai mulia yang terkandung di dalam Al-Qur&apos;an.",
	"Mengamalkan ajaran Ahlus Sunnah wal Jama&apos;ah An-Nahdliyah (ASWAJA NU).",
	"Membekali peserta didik dengan teknologi melalui pembelajaran IT.",
	"Menciptakan suasana pembelajaran yang aktif, kreatif, inovatif, kolaboratif dan menyenangkan.",
	"Mencetak generasi yang berkualitas, kompetitif dan unggul.",
	"Menumbuhkan rasa cinta pada Agama, Nusa dan Bangsa (Tanah Air).",
]

export default function VisionMission() {
	const sectionRef = useRef(null)
	const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.1,
			},
		},
	}

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.5 },
		},
	}

	return (
		<section ref={sectionRef} className="py-16 md:py-20">
			<div className="container mx-auto px-4">
				<motion.div
					initial="hidden"
					animate={isInView ? "visible" : "hidden"}
					variants={containerVariants}
					className="max-w-4xl mx-auto bg-primary/10 rounded-xl p-8 md:p-12 shadow-sm"
				>
					<motion.div
						variants={itemVariants}
						className="flex items-center gap-2 mb-8"
					>
						<span className={cn("text-primary uppercase", fontVariants.bold)}>
							VISI & MISI
						</span>
						<span className="h-px flex-1 bg-primary/75"></span>
					</motion.div>

					{/* Vision Section */}
					<motion.div variants={containerVariants} className="mb-12">
						<motion.h3
							variants={itemVariants}
							className={cn(
								"text-2xl md:text-3xl text-primary mb-4 text-center",
								fontVariants.bold,
							)}
						>
							VISI
						</motion.h3>
						<motion.p
							variants={itemVariants}
							className={cn(
								"text-lg text-primary text-center italic",
								fontVariants.base,
							)}
						>
							&quot;Mencetak generasi Qur&apos;ani, cerdas, berprestasi dan
							berkarakter ASWAJA.&quot;
						</motion.p>
					</motion.div>

					{/* Mission Section */}
					<motion.div variants={containerVariants}>
						<motion.h3
							variants={itemVariants}
							className={cn(
								"text-2xl md:text-3xl text-primary mb-6 text-center",
								fontVariants.bold,
							)}
						>
							MISI
						</motion.h3>
						<motion.ol
							variants={containerVariants}
							className="space-y-3 pl-6 md:pl-10"
						>
							{missionData.map((mission, index) => (
								<motion.li
									key={index}
									variants={itemVariants}
									className={cn(
										"text-primary leading-relaxed list-decimal",
										fontVariants.base,
									)}
								>
									{mission}
								</motion.li>
							))}
						</motion.ol>
					</motion.div>
				</motion.div>
			</div>
		</section>
	)
}
