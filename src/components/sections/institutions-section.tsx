"use client"

import { useRef } from "react"
import { fontVariants } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { motion, useInView } from "motion/react"
import { School, Users, BookOpen, Bookmark } from "lucide-react"
import InstitutionCard from "@/components/ui/institution-card"

// Data for educational institutions
const institutionsData = [
	{
		id: 1,
		title: "PAUD Raden Rahmat",
		description:
			"Menyediakan pendidikan dini yang berkualitas dengan pendekatan pembelajaran yang menyenangkan dan interaktif, membantu anak-anak mengembangkan keterampilan kognitif, motorik, dan sosial sejak usia dini.",
		icon: Users,
		href: "/lembaga/paud",
	},
	{
		id: 2,
		title: "SD Raden Rahmat",
		description:
			"Menawarkan kurikulum yang seimbang antara pendidikan umum dan pendidikan agama, serta mengutamakan pembentukan karakter siswa melalui kegiatan ekstrakurikuler yang beragam.",
		icon: School,
		href: "/lembaga/sd",
	},
	{
		id: 3,
		title: "Rumah Tahfidz",
		description:
			"Fokus pada penghafalan Al-Qur'an dengan lingkungan yang religius dan mendukung. Selain menghafal, santri juga mempelajari tafsir, tajwid, dan ilmu agama lainnya dengan bimbingan intensif dari ustadz dan ustadzah berpengalaman.",
		icon: BookOpen,
		href: "#",
	},
	{
		id: 4,
		title: "Madrasah Diniyah Takmiliyah",
		description:
			"Memberikan pendidikan agama yang mendalam dan komprehensif, dengan jadwal fleksibel yang tidak mengganggu sekolah formal, dan menekankan pembentukan akhlak dan karakter Islami yang baik.",
		icon: Bookmark,
		href: "#",
	},
]

export default function InstitutionsSection() {
	const sectionRef = useRef(null)
	const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.15,
				delayChildren: 0.2,
			},
		},
	}

	const headerVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.5, ease: "easeOut" },
		},
	}

	return (
		<section className="py-16 sm:py-24 bg-secondary/10" ref={sectionRef}>
			<div className="container mx-auto px-4">
				<motion.div
					className="text-center mb-12"
					initial="hidden"
					animate={isInView ? "visible" : "hidden"}
					variants={headerVariants}
				>
					<h2
						className={cn(
							"text-3xl sm:text-4xl font-bold text-primary mb-4",
							fontVariants.bold,
						)}
					>
						Lembaga Pendidikan Kami
					</h2>
					<p className="text-primary max-w-2xl mx-auto">
						Yayasan Raden Rahmat menyediakan berbagai program pendidikan yang
						komprehensif untuk membentuk generasi yang cerdas, berakhlak, dan
						berprestasi.
					</p>
				</motion.div>

				<motion.div
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
					initial="hidden"
					animate={isInView ? "visible" : "hidden"}
					variants={containerVariants}
				>
					{institutionsData.map((institution) => (
						<InstitutionCard key={institution.id} institution={institution} />
					))}
				</motion.div>
			</div>
		</section>
	)
}
