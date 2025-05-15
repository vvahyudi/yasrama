"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "motion/react"
import { fontVariants } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { ArrowRight, Printer } from "lucide-react"

export default function BrochureSection() {
	const sectionRef = useRef(null)
	const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.15,
				delayChildren: 0.1,
			},
		},
	}

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
				ease: [0.16, 1, 0.3, 1],
			},
		},
	}

	const cardVariants = {
		hidden: { opacity: 0, scale: 0.95 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				duration: 0.7,
				ease: [0.16, 1, 0.3, 1],
			},
		},
	}

	const brochures = [
		{
			category: "PAUD",
			title: "PAUD Raden Rahmat",
			images: [
				{ src: "/brosur_paud_depan.jpg", alt: "Brosur PAUD - Halaman Depan" },
				{
					src: "/brosur_paud_belakang.jpg",
					alt: "Brosur PAUD - Halaman Belakang",
				},
			],
			download: "/downloads/brosur_paud.pdf",
		},
		{
			category: "SD",
			title: "SD Raden Rahmat",
			images: [
				{ src: "/brosur_sd_depan.jpg", alt: "Brosur SD - Halaman Depan" },
				{ src: "/brosur_sd_belakang.jpg", alt: "Brosur SD - Halaman Belakang" },
			],
			download: "/downloads/brosur_sd.pdf",
		},
	]

	return (
		<section
			ref={sectionRef}
			className="py-16 md:py-24 bg-grid bg-card/50"
			id="brosur"
		>
			<div className="container mx-auto px-4 max-w-7xl">
				<motion.div
					initial="hidden"
					animate={isInView ? "visible" : "hidden"}
					variants={containerVariants}
				>
					{/* Header */}
					<motion.div variants={itemVariants} className="text-center mb-12">
						<div className="inline-flex items-center gap-2 mb-4">
							<span className={cn("text-primary font-bold", fontVariants.bold)}>
								BROSUR
							</span>
							<div className="h-px w-12 bg-primary/75" />
						</div>

						<h1
							className={cn(
								"text-3xl md:text-4xl font-bold text-primary mb-4",
								fontVariants.bold,
							)}
						>
							Penerimaan Peserta Didik Baru
						</h1>

						<p
							className={cn(
								"text-lg text-primary/80 max-w-3xl mx-auto",
								fontVariants.base,
							)}
						>
							Brosur Penerimaan Peserta Didik Baru RAISNU (Raden Rahmat Islamic
							School Nahdlatul Ulama) PAUD & SD Raden Rahmat Sumenep Tahun
							Ajaran 2025/2026
						</p>
					</motion.div>

					{/* Brochure Grid */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						{brochures.map((brochure, index) => (
							<motion.div
								key={brochure.category}
								variants={cardVariants}
								className="bg-card rounded-2xl shadow-sm border border-card overflow-hidden"
							>
								<div className="p-6">
									<div className="flex items-center gap-3 mb-6">
										<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
											<span className="text-primary font-bold">
												{index + 1}
											</span>
										</div>
										<h2
											className={cn(
												"text-xl md:text-2xl font-bold text-primary",
												fontVariants.bold,
											)}
										>
											{brochure.title}
										</h2>
									</div>

									<div className="grid grid-cols-1 sm:grid-cols-1 gap-4 mb-6">
										{brochure.images.map((image, imgIndex) => (
											<motion.div
												key={imgIndex}
												whileHover={{ scale: 1.02 }}
												className="relative rounded-lg overflow-hidden shadow-md cursor-pointer border border-card"
											>
												<Image
													src={image.src}
													alt={image.alt}
													width={500}
													height={700}
													className="w-full h-auto"
													priority={index === 0 && imgIndex === 0}
												/>
												{/* <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-3">
													<span className="text-card text-sm font-medium">
														{image.alt}
													</span>
												</div> */}
											</motion.div>
										))}
									</div>

									<div className="flex justify-center gap-4">
										<PrintButton images={brochure.images} />
									</div>
								</div>
							</motion.div>
						))}
					</div>

					{/* Additional Info Card */}
					<motion.div
						variants={cardVariants}
						className="mt-6 bg-card rounded-2xl shadow-sm border border-card overflow-hidden"
					>
						<div className="p-6 md:p-8">
							<div className="flex items-center gap-3 mb-6">
								<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
									<ArrowRight className="h-5 w-5 text-primary" />
								</div>
								<h2
									className={cn(
										"text-xl md:text-2xl font-bold text-primary",
										fontVariants.bold,
									)}
								>
									Informasi Pendaftaran
								</h2>
							</div>

							<div className="grid md:grid-cols-2 gap-6">
								<div className="space-y-4">
									<h3
										className={cn(
											"text-lg font-semibold text-primary",
											fontVariants.medium,
										)}
									>
										Persyaratan Pendaftaran
									</h3>
									<ul className="space-y-2 text-primary">
										<li className="flex items-start gap-2">
											<span className="text-primary mt-1">•</span>
											<span>Mengisi formulir pendaftaran</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="text-primary mt-1">•</span>
											<span>Fotokopi akta kelahiran</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="text-primary mt-1">•</span>
											<span>Fotokopi kartu keluarga</span>
										</li>
									</ul>
								</div>

								<div className="space-y-4">
									<h3
										className={cn(
											"text-lg font-semibold text-primary",
											fontVariants.medium,
										)}
									>
										Jadwal Pendaftaran
									</h3>
									<ul className="space-y-2 text-primary">
										<li className="flex items-start gap-2">
											<span className="text-primary mt-1">•</span>
											<span>Pendaftaran dibuka: 1 Januari 2025</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="text-primary mt-1">•</span>
											<span>Pendaftaran ditutup: 30 Juni 2025</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="text-primary mt-1">•</span>
											<span>Pengumuman: 15 Juli 2025</span>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</motion.div>
				</motion.div>
			</div>
		</section>
	)
}

function PrintButton({ images }: { images: { src: string; alt: string }[] }) {
	const handlePrint = () => {
		const printWindow = window.open("", "_blank")
		if (!printWindow) return

		const printContent = `
			<!DOCTYPE html>
			<html>
			<head>
				<title>Print Brochure</title>
				<style>
					body { margin: 0; padding: 20px; }
					img { max-width: 100%; height: auto; margin-bottom: 20px; }
					@media print {
						body { padding: 0; }
						img { page-break-after: always; }
					}
				</style>
			</head>
			<body>
				${images
					.map((image) => `<img src="${image.src}" alt="${image.alt}" />`)
					.join("")}
			</body>
			</html>
		`

		printWindow.document.write(printContent)
		printWindow.document.close()
		printWindow.print()
	}

	return (
		<motion.button
			onClick={handlePrint}
			className={cn(
				"inline-flex items-center gap-3 px-6 py-3 bg-accent text-primary rounded-lg hover:bg-accent/80 transition-colors shadow-sm",
				fontVariants.medium,
			)}
			whileHover={{ y: -2 }}
			whileTap={{ scale: 0.98 }}
		>
			<Printer className="h-5 w-5" />
			Download to PDF
		</motion.button>
	)
}
