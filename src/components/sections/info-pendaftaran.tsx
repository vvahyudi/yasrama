"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "motion/react"
import { fontVariants } from "@/lib/fonts"
import { cn } from "@/lib/utils"

import { Calendar } from "lucide-react"
import { MessageCircle, FileDown, MapPin } from "lucide-react"

export default function EnrollmentInfoSection({ lembaga = "RAISNU" }) {
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

	// Contact persons data
	const contactPersons = [
		{
			name: "KH. Hantok Sudarto, M.Fil.I.",
			phone: "0823-3112-0155",
			whatsapp: "6282331120155",
			position: "Panitia Terpadu",
		},
		{
			name: "Ustadzah Azizah, S.Pd.",
			phone: "0853-3489-6660",
			whatsapp: "6285334896660",
			position: "PAUD Raden Rahmat",
		},
		{
			name: "Ustadz Ahmad Wasid, S.Pd.",
			phone: "0813-3141-3541",
			whatsapp: "6281331413541",
			position: "PAUD Raden Rahmat",
		},
		{
			name: "Ustadzah Juhartatik, S.Pd.",
			phone: "0878-5020-9179",
			whatsapp: "6287850209179",
			position: "SD Raden Rahmat",
		},
		{
			name: "Ustadz Ahmad Ja'far Rozi, M.A.",
			phone: "0852-0461-2971",
			whatsapp: "6285204612971",
			position: "SD Raden Rahmat",
		},
	]

	return (
		<section ref={sectionRef} className="py-16 md:py-24 bg-card">
			<div className="container mx-auto px-4">
				<motion.div
					initial="hidden"
					animate={isInView ? "visible" : "hidden"}
					variants={containerVariants}
					className="max-w-5xl mx-auto"
				>
					{/* Banner Image */}
					<motion.div
						variants={itemVariants}
						className="relative rounded-xl overflow-hidden mb-8"
					>
						<Image
							src="/banner_ppdb.jpg"
							alt="Banner PPDB"
							width={1200}
							height={300}
							className="w-full h-auto"
							priority
						/>
					</motion.div>

					{/* Main Content Card */}
					<motion.div
						variants={itemVariants}
						className="bg-accent rounded-2xl shadow-xl p-6 md:p-10"
					>
						{/* Header */}
						<motion.div variants={itemVariants} className="text-center mb-8">
							<h1
								className={cn(
									"text-2xl md:text-3xl lg:text-4xl font-bold uppercase text-primary mb-6",
									fontVariants.bold,
								)}
							>
								Penerimaan Peserta Didik Baru {lembaga}
							</h1>

							<p
								className={cn(
									"text-2xl text-primary py-4",
									fontVariants.arabicBold,
								)}
							>
								اَلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَا تُهُ
							</p>
						</motion.div>

						{/* Registration Methods */}
						<motion.div variants={itemVariants} className="mb-10">
							<p className="mb-6 text-primary">
								Penerimaan Peserta Didik Baru RAISNU (Raden Rahmat Islamic
								School Nahdlatul Ulama) Sumenep di PAUD dan SD Raden Rahmat
								Sumenep akan dilaksanakan secara online/daring dan
								offline/luring, dengan waktu dan tempat sebagai berikut:
							</p>

							<div className="grid md:grid-cols-2 gap-6 mb-6">
								<motion.div
									whileHover={{ scale: 1.02 }}
									className="bg-card rounded-lg p-4 shadow-md"
								>
									<div className="flex items-center gap-3 mb-2">
										<div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
											<Calendar className="w-5 h-5 text-primary" />
										</div>
										<h3
											className={cn(
												"font-bold text-primary",
												fontVariants.bold,
											)}
										>
											ONLINE/Daring
										</h3>
									</div>
									<p className="text-primary">
										Melalui website PPDB masing-masing lembaga
									</p>
								</motion.div>

								<motion.div
									whileHover={{ scale: 1.02 }}
									className="bg-card rounded-lg p-4 shadow-md"
								>
									<div className="flex items-center gap-3 mb-2">
										<div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
											<MapPin className="w-5 h-5 text-primary" />
										</div>
										<h3
											className={cn(
												"font-bold text-primary",
												fontVariants.bold,
											)}
										>
											OFFLINE/Luring
										</h3>
									</div>
									<p className="text-primary">
										Datang ke lokasi di masing-masing Lembaga
									</p>
								</motion.div>
							</div>

							<p className="text-primary">
								Mohon berkenan untuk menyebarkan informasi ini kepada yang
								memerlukan. Atas kerjasamanya kami haturkan terima kasih.
								<strong className="italic ml-1">
									Jazakumullah khairal jaza&apos;
								</strong>
							</p>

							<p
								className={cn(
									"text-center text-primary py-6 text-2xl",
									fontVariants.arabicBold,
								)}
							>
								وَالسَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ
							</p>
						</motion.div>

						{/* Contact Section */}
						<motion.div variants={itemVariants} className="mb-8">
							<h3
								className={cn(
									"text-xl font-bold mb-6 text-primary",
									fontVariants.bold,
								)}
							>
								Narahubung Penerimaan Peserta Didik Baru RAISNU:
							</h3>

							<div className="grid gap-4">
								{contactPersons.map((person, index) => (
									<ContactCard key={index} person={person} />
								))}
							</div>
						</motion.div>

						{/* Forms Section */}
						<div className="grid md:grid-cols-2 gap-8">
							{/* Online Form */}
							<motion.div variants={itemVariants}>
								<h3
									className={cn(
										"text-lg font-bold mb-4 text-primary",
										fontVariants.bold,
									)}
								>
									Formulir Pendaftaran Online:
								</h3>
								<motion.a
									href="https://tally.so/r/w5q96b"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
									whileHover={{ x: 5 }}
								>
									<Calendar className="w-5 h-5" />
									<span className="font-bold underline">
										SD & PAUD Raden Rahmat
									</span>
								</motion.a>
							</motion.div>

							{/* Download Forms */}
							<motion.div variants={itemVariants}>
								<h3
									className={cn(
										"text-lg font-bold mb-4 text-primary",
										fontVariants.bold,
									)}
								>
									Download Formulir Pendaftaran:
								</h3>
								<div className="space-y-3">
									<DownloadLink
										href="https://drive.google.com/file/d/15HnPR9aTkXEIrzbNV5F2gDCc1BXm20js/view"
										label="PAUD Raden Rahmat"
									/>
									<DownloadLink
										href="https://drive.google.com/file/d/1g5jQEWunUf-i3_CHVl-m76zfdRAhjTNR/view"
										label="SD Raden Rahmat"
									/>
								</div>
							</motion.div>
						</div>
					</motion.div>
				</motion.div>
			</div>
		</section>
	)
}

// Contact Card Component
function ContactCard({
	person,
}: {
	person: { name: string; position: string; whatsapp: string; phone: string }
}) {
	return (
		<motion.div
			whileHover={{ scale: 1.02 }}
			className="bg-card rounded-lg p-4 shadow-md"
		>
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<div>
					<h4 className={cn("font-semibold text-primary", fontVariants.medium)}>
						{person.name}
					</h4>
					<p className="text-primary text-sm">{person.position}</p>
				</div>
				<a
					href={`https://wa.me/${person.whatsapp}`}
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
				>
					<MessageCircle className="w-5 h-5" />
					<span className="font-bold underline">{person.phone}</span>
				</a>
			</div>
		</motion.div>
	)
}
// Download Link Component
function DownloadLink({ href, label }: { href: string; label: string }) {
	return (
		<motion.a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
			whileHover={{ x: 5 }}
		>
			<FileDown className="w-5 h-5" />
			<span className="font-bold underline">{label}</span>
		</motion.a>
	)
}
