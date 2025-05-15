"use client"

import { useRef } from "react"
import Image from "next/image"
import { fontVariants } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
import { motion, useInView } from "motion/react"

// Data for features/benefits
const features = [
	"Ilmu, Spiritual, dan Teknologi.",
	"Pembinaan karakter yang baik.",
	"Inovatif",
	"Pelatihan minat dan bakat siswa.",
	"SDM yang berkualitas",
	"Lembaga kesejahteraan sosial",
]

export default function AboutSection() {
	const sectionRef = useRef(null)
	const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

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

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.5 },
		},
	}

	return (
		<section
			id="tentang"
			className="py-16 sm:py-24 bg-background"
			ref={sectionRef}
		>
			<div className="container mx-auto px-4">
				<motion.div
					className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 items-center"
					initial="hidden"
					animate={isInView ? "visible" : "hidden"}
					variants={containerVariants}
				>
					{/* Image */}
					<motion.div
						className="relative aspect-4/3 lg:aspect-3/4 overflow-hidden rounded-2xl shadow-xl"
						variants={itemVariants}
					>
						<Image
							alt="Yayasan Raden Rahmat - Gedung Sekolah"
							src="/ppdb_yasrama.jpg"
							fill
							priority
							className="object-cover hover:scale-105 transition-transform duration-700"
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						/>
					</motion.div>

					{/* Content */}
					<div className="space-y-6">
						<motion.div className="space-y-2" variants={itemVariants}>
							<h2
								className={cn(
									"text-3xl sm:text-4xl font-bold text-primary",
									fontVariants.bold,
								)}
							>
								Tentang Yayasan Raden Rahmat
							</h2>
							<div className="h-1 w-20 bg-primary/50 rounded-full" />
						</motion.div>

						<motion.p
							className="text-lg text-primary leading-relaxed"
							variants={itemVariants}
						>
							Mewujudkan menjadi Lembaga Unggul Dalam Mempersiapkan Generasi
							Islam Yang Cerdas Secara Intelektual, Emosional Dan Spiritual
							Serta Tumbuh Dalam Budaya Islam Yang Damai bermanfaat bagi
							masyarakat dan lingkungan secara luas baik dunia dan akhirat.
						</motion.p>

						<motion.ul className="space-y-4" variants={containerVariants}>
							{features.map((feature, index) => (
								<motion.li
									key={index}
									className="flex items-start gap-3"
									variants={itemVariants}
								>
									<Check
										className="w-5 h-5 text-primary shrink-0 mt-1"
										aria-hidden="true"
									/>
									<span className="text-primary">{feature}</span>
								</motion.li>
							))}
						</motion.ul>
					</div>
				</motion.div>
			</div>
		</section>
	)
}
