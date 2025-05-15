"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "motion/react"
import { fontVariants } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, MapPin, Mail, Send, Goal, MessageSquare } from "lucide-react"
// import { useToast } from "@/components/ui/use-toast"

interface FormEvent {
	target: {
		id: string
		value: string
	}
}

export default function ContactSection() {
	const sectionRef = useRef(null)
	const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
	// const { toast } = useToast()

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		message: "",
	})

	const [isSubmitting] = useState(false)

	const handleChange = (e: FormEvent) => {
		setFormData({ ...formData, [e.target.id]: e.target.value })
	}

	// const handleSubmit = async (e: { preventDefault: () => void }) => {
	// 	e.preventDefault()
	// 	setIsSubmitting(true)

	// 	try {
	// 		await new Promise((resolve) => setTimeout(resolve, 1000))
	// 		const mailtoLink = `mailto:info@yayasanradenrahmat.com?subject=Pesan dari ${
	// 			formData.name
	// 		}&body=${encodeURIComponent(
	// 			`Nama: ${formData.name}\nEmail: ${formData.email}\nTelepon: ${formData.phone}\nPesan:\n${formData.message}`,
	// 		)}`

	// 		window.location.href = mailtoLink

	// 		toast({
	// 			title: "Pesan Terkirim",
	// 			description:
	// 				"Terima kasih telah menghubungi kami. Kami akan segera merespon pesan Anda.",
	// 			variant: "success",
	// 		})

	// 		setFormData({
	// 			name: "",
	// 			email: "",
	// 			phone: "",
	// 			message: "",
	// 		})
	// 	} catch (error) {
	// 		toast({
	// 			title: "Gagal Mengirim Pesan",
	// 			description:
	// 				"Terjadi kesalahan saat mengirim pesan. Silakan coba lagi nanti.",
	// 			variant: "destructive",
	// 		})
	// 	} finally {
	// 		setIsSubmitting(false)
	// 	}
	// }

	// Animation variants
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
			transition: {
				duration: 0.5,
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
				duration: 0.6,
				ease: [0.16, 1, 0.3, 1],
			},
		},
	}

	return (
		<section
			id="kontak"
			className="py-16 sm:py-24 bg-grid bg-primary/25"
			ref={sectionRef}
		>
			<div className="container mx-auto px-4 max-w-7xl">
				<motion.div
					className="text-center mb-12"
					initial="hidden"
					animate={isInView ? "visible" : "hidden"}
					variants={containerVariants}
				>
					<motion.div
						variants={itemVariants}
						className="inline-flex items-center gap-2 mb-4"
					>
						<span className={cn("text-primary font-bold", fontVariants.bold)}>
							KONTAK
						</span>
						<div className="h-px w-12 bg-primary/75" />
					</motion.div>

					<motion.h2
						variants={itemVariants}
						className={cn(
							"text-3xl sm:text-4xl font-bold text-primary mb-4",
							fontVariants.bold,
						)}
					>
						Hubungi Kami
					</motion.h2>

					<motion.p
						variants={itemVariants}
						className="text-muted-foreground max-w-2xl mx-auto text-pretty"
					>
						Silakan hubungi kami untuk informasi lebih lanjut tentang program
						pendidikan dan pendaftaran siswa baru.
					</motion.p>
				</motion.div>

				<motion.div
					className="grid grid-cols-1 gap-4 lg:grid-cols-8 lg:grid-rows-2 lg:gap-5"
					initial="hidden"
					animate={isInView ? "visible" : "hidden"}
					variants={containerVariants}
				>
					{/* Contact Info Card */}
					<motion.div
						className="lg:col-span-3 lg:row-span-2"
						variants={cardVariants}
					>
						<div className="h-full bg-white p-6 rounded-2xl shadow-sm border border-foreground flex flex-col">
							<div className="flex items-center gap-3 mb-6">
								<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
									<MessageSquare className="h-5 w-5 text-primary" />
								</div>
								<h3
									className={cn(
										"text-xl font-bold text-primary",
										fontVariants.bold,
									)}
								>
									Informasi Kontak
								</h3>
							</div>

							<div className="space-y-5 flex-grow">
								<div className="flex items-start gap-4">
									<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 flex-shrink-0">
										<Phone className="h-5 w-5 text-primary" />
									</div>
									<div>
										<p className="text-sm text-primary">Telepon</p>
										<a
											href="tel:0151-475-4450"
											className="text-base font-medium text-primary hover:text-primary transition-colors"
										>
											0151 475 4450
										</a>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 flex-shrink-0">
										<Mail className="h-5 w-5 text-primary" />
									</div>
									<div>
										<p className="text-sm text-gray-500">Email</p>
										<a
											href="mailto:info@yayasanradenrahmat.com"
											className="text-base font-medium text-primary hover:text-primary transition-colors break-all"
										>
											info@yayasanradenrahmat.com
										</a>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 flex-shrink-0">
										<MapPin className="h-5 w-5 text-primary" />
									</div>
									<div>
										<p className="text-sm text-gray-500">Alamat</p>
										<address className="not-italic text-base font-medium text-primary">
											Jl. Adi Poday, Perumahan Permata Resmi II, Kel. Kolor,
											Kec. Kota Sumenep, Jawa Timur, Indonesia 69417
										</address>
									</div>
								</div>
							</div>

							<div className="mt-6 pt-6 border-t border-foreground">
								<div className="text-sm text-gray-500">
									Jam Operasional: Senin - Jumat, 08:00 - 16:00
								</div>
							</div>
						</div>
					</motion.div>

					{/* Vision & Mission Card */}
					<motion.div
						className="lg:col-span-3 lg:row-span-1"
						variants={cardVariants}
					>
						<div className="h-full bg-white p-6 rounded-2xl shadow-sm border border-foreground">
							<div className="flex items-center gap-3 mb-4">
								<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
									<Goal className="h-5 w-5 text-primary" />
								</div>
								<h3
									className={cn(
										"text-xl font-bold text-primary",
										fontVariants.bold,
									)}
								>
									Visi & Misi
								</h3>
							</div>
							<p className="text-primary text-pretty">
								Mewujudkan menjadi Lembaga Unggul Dalam Mempersiapkan Generasi
								Islam Yang Cerdas Secara Intelektual, Emosional Dan Spiritual
								Serta Tumbuh Dalam Budaya Islam Yang Damai bermanfaat bagi
								masyarakat dan lingkungan secara luas baik dunia dan akhirat.
							</p>
						</div>
					</motion.div>

					{/* Map Placeholder Card */}
					<motion.div
						className="lg:col-span-2 lg:row-span-1"
						variants={cardVariants}
					>
						<div className="h-full bg-white rounded-2xl shadow-sm border border-muted-foreground overflow-hidden">
							<div className="aspect-[4/3] bg-muted-foreground flex items-center justify-center">
								<div className="text-center p-4">
									<MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
									<p className="text-gray-500 text-sm">Peta Lokasi</p>
								</div>
							</div>
						</div>
					</motion.div>

					{/* Contact Form Card */}
					<motion.div
						className="lg:col-span-5 lg:row-span-1"
						variants={cardVariants}
					>
						<div className="h-full bg-white p-6 rounded-2xl shadow-sm border border-foreground">
							<div className="flex items-center gap-3 mb-6">
								<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
									<Send className="h-5 w-5 text-primary" />
								</div>
								<h3
									className={cn(
										"text-xl font-bold text-primary",
										fontVariants.bold,
									)}
								>
									Kirim Pesan
								</h3>
							</div>

							<form
								// onSubmit={handleSubmit}
								className="space-y-5"
							>
								<div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
									<div>
										<label
											htmlFor="name"
											className="block text-sm font-medium text-gray-700 mb-2"
										>
											Nama Lengkap
										</label>
										<Input
											id="name"
											type="text"
											placeholder="Masukkan nama lengkap"
											value={formData.name}
											onChange={handleChange}
											required
											disabled={isSubmitting}
											className="focus-visible:ring-primary/50"
										/>
									</div>

									<div>
										<label
											htmlFor="email"
											className="block text-sm font-medium text-gray-700 mb-2"
										>
											Email
										</label>
										<Input
											id="email"
											type="email"
											placeholder="Masukkan email Anda"
											value={formData.email}
											onChange={handleChange}
											required
											disabled={isSubmitting}
											className="focus-visible:ring-primary/50"
										/>
									</div>
								</div>

								<div>
									<label
										htmlFor="phone"
										className="block text-sm font-medium text-gray-700 mb-2"
									>
										Nomor Telepon
									</label>
									<Input
										id="phone"
										type="tel"
										placeholder="Masukkan nomor telepon"
										value={formData.phone}
										onChange={handleChange}
										required
										disabled={isSubmitting}
										className="focus-visible:ring-primary/50"
									/>
								</div>

								<div>
									<label
										htmlFor="message"
										className="block text-sm font-medium text-gray-700 mb-2"
									>
										Pesan Anda
									</label>
									<Textarea
										id="message"
										placeholder="Tulis pesan Anda di sini..."
										rows={4}
										value={formData.message}
										onChange={handleChange}
										required
										disabled={isSubmitting}
										className="focus-visible:ring-primary/50"
									/>
								</div>

								<Button
									type="submit"
									className="w-full bg-primary hover:bg-primary transition-colors shadow-sm"
									disabled={isSubmitting}
								>
									{isSubmitting ? (
										<span className="inline-flex items-center gap-2">
											<svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
												<circle
													className="opacity-25"
													cx="12"
													cy="12"
													r="10"
													stroke="currentColor"
													strokeWidth="4"
												></circle>
												<path
													className="opacity-75"
													fill="currentColor"
													d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
												></path>
											</svg>
											Mengirim...
										</span>
									) : (
										<span className="inline-flex items-center gap-2">
											<Send className="h-4 w-4" />
											Kirim Pesan
										</span>
									)}
								</Button>
							</form>
						</div>
					</motion.div>
				</motion.div>
			</div>
		</section>
	)
}
