"use client"

import { useRef } from "react"
import { motion, useInView } from "motion/react"
import { fontVariants } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { BookOpen } from "lucide-react"
import ProgramCard from "@/components/ui/program-card"

// Program data
const programsData = [
	{
		id: 1,
		title: "Qur'anic Integreted by Project",
		description:
			"Model pembelajaran yang menerapkan nilai-nilai mulia serta hikmah yang terkandung di dalam al-Qur'an dalam pendidikan dan sosial.",
	},
	{
		id: 2,
		title: "Boarding School",
		description:
			"Menyediakan asrama bagi peserta didik yang ingin bermukim, dapat pelajaran tambahan untuk melatih mandiri, disiplin dan tanggung jawab.",
	},
	{
		id: 3,
		title: "Outdoor Activity",
		description:
			"Aktifitas pendidikan di luar sekolah, seperti Quranic Camping, Outbond, Edu Trip, dll. dengan tujuan melatih dan mengedukasi peserta didik dalam hal kerjasama dan kompetisi tim.",
	},
	{
		id: 4,
		title: "Islamic Carecter by Action",
		description:
			"Membentuk kepribadian yang berkarakter Ahlus Sunnah wal Jama'ah (ASWAJA) melalui budi pekerti, tingkah laku, kejujuran, dll.",
	},
	{
		id: 5,
		title: "Multimedia Learning",
		description:
			"Mengoptimalkan multimedia sebagai bagian dari proses pembelajaran untuk merangsang pikiran, perasaan, perhatian dan kemauan belajar agar proses pembelajaran lebih menarik dan interaktif",
	},
	{
		id: 6,
		title: "Billingual Class",
		description:
			"Program khusus dengan menjadikan B. Arab dan B. Inggris sebagai bahasa pengantar dalam proses pembelajaran.",
	},
]

export default function Programs() {
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

	const headerVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.5 },
		},
	}

	return (
		<section ref={sectionRef} className="py-16 md:py-24 bg-primary/10">
			<div className="container mx-auto px-4">
				<motion.div
					initial="hidden"
					animate={isInView ? "visible" : "hidden"}
					variants={containerVariants}
					className="max-w-6xl mx-auto"
				>
					<motion.div variants={headerVariants} className="text-center mb-12">
						<div className="inline-flex items-center gap-2 mb-4">
							<span
								className={cn(
									"text-primary uppercase font-bold",
									fontVariants.bold,
								)}
							>
								PROGRAM
							</span>
							<div className="h-px w-12 bg-primary/75" />
						</div>

						<h2
							className={cn(
								"text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-4",
								fontVariants.bold,
							)}
						>
							PROGRAM UNGGULAN
						</h2>

						<p className="text-primary max-w-2xl mx-auto">
							SD Raden Rahmat menghadirkan program-program unggulan untuk
							memaksimalkan potensi siswa dalam berbagai aspek keilmuan,
							spiritual, dan keterampilan.
						</p>
					</motion.div>

					<motion.div
						variants={containerVariants}
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
					>
						{programsData.map((program) => (
							<ProgramCard key={program.id} program={program} icon={BookOpen} />
						))}
					</motion.div>
				</motion.div>
			</div>
		</section>
	)
}
