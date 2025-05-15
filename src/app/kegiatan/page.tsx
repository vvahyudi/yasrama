"use client"

import { fontVariants } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import {
	BookOpen,
	HeartHandshake,
	ChurchIcon as Mosque,
	Calendar,
	Users,
	GraduationCap,
	Leaf,
	Filter,
	ChevronRight,
	MapPin,
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Activity {
	id: number
	title: string
	description: string
	date: string
	category: "pendidikan" | "sosial" | "keagamaan" | "lingkungan"
	image: string
	location: string
}

export default function KegiatanPage() {
	const [filter, setFilter] = useState<string | null>(null)

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
			transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
		},
	}

	const activities: Activity[] = [
		{
			id: 1,
			title: "Pelatihan Guru PAUD",
			description:
				"Program pelatihan untuk meningkatkan kualitas pengajaran guru-guru PAUD di wilayah Sumenep.",
			date: "15 April 2024",
			category: "pendidikan",
			image: "/placeholder.svg?height=400&width=600",
			location: "Graha Abi Sujak, Sumenep",
		},
		{
			id: 2,
			title: "Santunan Anak Yatim",
			description:
				"Pemberian santunan kepada 50 anak yatim di sekitar wilayah Kota Sumenep dalam rangka bulan Ramadhan.",
			date: "10 April 2024",
			category: "sosial",
			image: "/placeholder.svg?height=400&width=600",
			location: "Masjid Al-Hidayah, Sumenep",
		},
		{
			id: 3,
			title: "Kajian Rutin Mingguan",
			description:
				"Kajian rutin yang diadakan setiap minggu dengan tema 'Membangun Karakter Islami dalam Kehidupan Sehari-hari'.",
			date: "Setiap Ahad",
			category: "keagamaan",
			image: "/placeholder.svg?height=400&width=600",
			location: "Masjid Jami' Sumenep",
		},
		{
			id: 4,
			title: "Penanaman 1000 Pohon",
			description:
				"Kegiatan penanaman 1000 pohon di area sekitar Sumenep sebagai bentuk kepedulian terhadap lingkungan.",
			date: "22 April 2024",
			category: "lingkungan",
			image: "/placeholder.svg?height=400&width=600",
			location: "Berbagai lokasi di Sumenep",
		},
		{
			id: 5,
			title: "Seminar Pendidikan Karakter",
			description:
				"Seminar untuk guru dan orang tua tentang pentingnya pendidikan karakter bagi anak-anak di era digital.",
			date: "5 Mei 2024",
			category: "pendidikan",
			image: "/placeholder.svg?height=400&width=600",
			location: "Aula SMK Negeri 1 Sumenep",
		},
		{
			id: 6,
			title: "Bantuan Korban Banjir",
			description:
				"Penyaluran bantuan berupa sembako, pakaian, dan obat-obatan untuk korban banjir di wilayah Madura.",
			date: "2 April 2024",
			category: "sosial",
			image: "/placeholder.svg?height=400&width=600",
			location: "Desa Tanjung, Sumenep",
		},
		{
			id: 7,
			title: "Festival Anak Sholeh",
			description:
				"Kompetisi tahfidz, adzan, dan ceramah untuk anak-anak usia SD dan SMP se-Kabupaten Sumenep.",
			date: "20 Mei 2024",
			category: "keagamaan",
			image: "/placeholder.svg?height=400&width=600",
			location: "Pondok Pesantren Al-Karimah",
		},
		{
			id: 8,
			title: "Pembukaan Taman Baca Masyarakat",
			description:
				"Peresmian Taman Baca Masyarakat yang menyediakan berbagai buku pendidikan, agama, dan umum untuk masyarakat.",
			date: "12 April 2024",
			category: "pendidikan",
			image: "/placeholder.svg?height=400&width=600",
			location: "Desa Pangarangan, Sumenep",
		},
	]

	const getCategoryIcon = (category: string) => {
		switch (category) {
			case "pendidikan":
				return <GraduationCap className="h-5 w-5" />
			case "sosial":
				return <HeartHandshake className="h-5 w-5" />
			case "keagamaan":
				return <Mosque className="h-5 w-5" />
			case "lingkungan":
				return <Leaf className="h-5 w-5" />
			default:
				return <BookOpen className="h-5 w-5" />
		}
	}

	const getCategoryColor = (category: string) => {
		switch (category) {
			case "pendidikan":
				return "bg-blue-100 text-blue-800 border-blue-200"
			case "sosial":
				return "bg-orange-100 text-orange-800 border-orange-200"
			case "keagamaan":
				return "bg-purple-100 text-purple-800 border-purple-200"
			case "lingkungan":
				return "bg-green-100 text-green-800 border-green-200"
			default:
				return "bg-gray-100 text-gray-800 border-gray-200"
		}
	}

	const getCategoryName = (category: string) => {
		switch (category) {
			case "pendidikan":
				return "Pendidikan"
			case "sosial":
				return "Sosial"
			case "keagamaan":
				return "Keagamaan"
			case "lingkungan":
				return "Lingkungan"
			default:
				return category
		}
	}

	const filteredActivities = filter
		? activities.filter((activity) => activity.category === filter)
		: activities

	return (
		<div className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
			{/* Hero Section */}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				className="relative bg-gradient-to-r from-green-900 to-green-700 text-white py-16 overflow-hidden"
			>
				<div className="absolute inset-0 overflow-hidden">
					<div className="absolute -right-10 -top-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
					<div className="absolute left-1/4 bottom-0 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
				</div>

				<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
					<div className="max-w-4xl mx-auto text-center">
						<motion.div
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className="inline-flex items-center gap-2 mb-4 bg-white/10 px-4 py-1 rounded-full"
						>
							<span className={cn(fontVariants.black, "text-white font-bold")}>
								KEGIATAN YASRAMA
							</span>
							<div className="h-px w-12 bg-white/75" />
						</motion.div>

						<motion.h1
							initial={{ y: 20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ duration: 0.6, delay: 0.3 }}
							className={cn(
								fontVariants.black,
								"text-3xl md:text-4xl lg:text-5xl mb-6",
							)}
						>
							Program & Kegiatan Yayasan
						</motion.h1>

						<motion.p
							initial={{ y: 20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ duration: 0.6, delay: 0.4 }}
							className="text-white/80 text-lg max-w-3xl mx-auto"
						>
							Berbagai kegiatan yang telah dan akan dilaksanakan oleh Yayasan
							Raden Rahmat Kota Sumenep dalam bidang pendidikan, sosial,
							keagamaan, dan lingkungan.
						</motion.p>
					</div>
				</div>
			</motion.div>

			{/* Main Content */}
			<motion.section
				initial="hidden"
				animate="visible"
				variants={containerVariants}
				className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
			>
				<div className="space-y-12">
					{/* Filter Section */}
					<motion.div
						variants={itemVariants}
						className="flex flex-wrap items-center justify-center gap-3"
					>
						<div className="flex items-center gap-2 mr-2">
							<Filter className="h-5 w-5 text-gray-500" />
							<span className="text-gray-700 font-medium">Filter:</span>
						</div>
						<Button
							variant={filter === null ? "default" : "outline"}
							onClick={() => setFilter(null)}
							className="rounded-full"
						>
							Semua
						</Button>
						<Button
							variant={filter === "pendidikan" ? "default" : "outline"}
							onClick={() => setFilter("pendidikan")}
							className="rounded-full"
						>
							<GraduationCap className="h-4 w-4 mr-2" /> Pendidikan
						</Button>
						<Button
							variant={filter === "sosial" ? "default" : "outline"}
							onClick={() => setFilter("sosial")}
							className="rounded-full"
						>
							<HeartHandshake className="h-4 w-4 mr-2" /> Sosial
						</Button>
						<Button
							variant={filter === "keagamaan" ? "default" : "outline"}
							onClick={() => setFilter("keagamaan")}
							className="rounded-full"
						>
							<Mosque className="h-4 w-4 mr-2" /> Keagamaan
						</Button>
						<Button
							variant={filter === "lingkungan" ? "default" : "outline"}
							onClick={() => setFilter("lingkungan")}
							className="rounded-full"
						>
							<Leaf className="h-4 w-4 mr-2" /> Lingkungan
						</Button>
					</motion.div>

					{/* Activities Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{filteredActivities.map((activity) => (
							<motion.div
								key={activity.id}
								variants={itemVariants}
								className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
								whileHover={{ y: -8, transition: { duration: 0.3 } }}
							>
								<div className="relative h-48 overflow-hidden">
									<img
										src={activity.image || "/placeholder.svg"}
										alt={activity.title}
										className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
									/>
									<div className="absolute top-4 right-4">
										<Badge
											className={`${getCategoryColor(
												activity.category,
											)} px-3 py-1 text-xs font-medium`}
										>
											{getCategoryName(activity.category)}
										</Badge>
									</div>
								</div>

								<div className="p-6">
									<div className="flex items-center gap-2 mb-3 text-gray-500">
										<Calendar className="h-4 w-4" />
										<span className="text-sm">{activity.date}</span>
									</div>

									<h3
										className={cn(
											fontVariants.bold,
											"text-xl mb-2 text-gray-800",
										)}
									>
										{activity.title}
									</h3>

									<p className="text-gray-600 mb-4 line-clamp-3">
										{activity.description}
									</p>

									<div className="flex items-center gap-2 text-gray-500 mb-4">
										<MapPin className="h-4 w-4 flex-shrink-0" />
										<span className="text-sm">{activity.location}</span>
									</div>

									<Button variant="outline" className="w-full mt-2 group">
										Lihat Detail
										<ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
									</Button>
								</div>
							</motion.div>
						))}
					</div>

					{/* Upcoming Events Section */}
					<motion.div
						variants={itemVariants}
						className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl shadow-lg p-8 mt-12"
					>
						<div className="flex flex-col md:flex-row items-center justify-between gap-6">
							<div>
								<h3
									className={cn(
										fontVariants.bold,
										"text-2xl text-gray-800 mb-2",
									)}
								>
									Jadwal Kegiatan Mendatang
								</h3>
								<p className="text-gray-600">
									Dapatkan informasi terbaru tentang kegiatan-kegiatan yang akan
									datang.
								</p>
							</div>

							<Button className="bg-green-600 hover:bg-green-700 text-white px-6">
								<Calendar className="h-4 w-4 mr-2" />
								Lihat Kalender Kegiatan
							</Button>
						</div>
					</motion.div>

					{/* Get Involved Section */}
					<motion.div
						variants={itemVariants}
						className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center"
					>
						<div className="max-w-3xl mx-auto">
							<h3
								className={cn(fontVariants.bold, "text-2xl text-gray-800 mb-4")}
							>
								Bergabung Bersama Kami
							</h3>
							<p className="text-gray-600 mb-6">
								Anda dapat berpartisipasi dalam berbagai kegiatan YASRAMA
								sebagai relawan, donatur, atau mitra. Mari bersama-sama
								memberikan kontribusi positif untuk masyarakat.
							</p>

							<div className="flex flex-wrap justify-center gap-4">
								<Button className="bg-green-600 hover:bg-green-700 text-white px-6">
									<Users className="h-4 w-4 mr-2" />
									Daftar Relawan
								</Button>
								<Button variant="outline" className="px-6">
									<HeartHandshake className="h-4 w-4 mr-2" />
									Jadi Donatur
								</Button>
							</div>
						</div>
					</motion.div>
				</div>
			</motion.section>
		</div>
	)
}
