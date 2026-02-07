"use client"

import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { fontVariants } from "@/lib/fonts"
import {
	BookOpen,
	HeartHandshake,
	University as Mosque,
	MapPin,
	ChevronRight,
} from "lucide-react"

const ProfilPage = () => {
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

	const cardVariants = {
		hidden: { opacity: 0, scale: 0.95 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
		},
	}

	const sections = [
		{
			title: "Maksud dan Tujuan",
			icon: <BookOpen className="h-5 w-5" />,
			color: "bg-blue-100 text-blue-800",
			content: (
				<p className="text-primary">
					YASRAMA yang bergerak dibidang sosial, kemanusiaan dan keagamaan:
				</p>
			),
		},
		{
			title: "Sosial",
			icon: <BookOpen className="h-5 w-5" />,
			color: "bg-green-100 text-green-800",
			content: (
				<div className="space-y-4">
					<div>
						<p className="font-semibold mb-2">
							a. Menyelenggarakan Pendidikan Formal:
						</p>
						<ul className="list-disc ml-6 space-y-1 text-gray-600">
							<li>Pendidikan Anak Usia Dini (PAUD)</li>
							<li>Taman Kanak-Kanak (TK)</li>
							<li>Sekolah Dasar (SD)</li>
							<li>Sekolah Menengah Pertama (SMP)</li>
							<li>Sekolah Menengah Atas (SMA)</li>
							<li>Sekolah Menengah Kejuruan (SMK)</li>
						</ul>
					</div>
					<div>
						<p className="font-semibold mb-2">b. Pendidikan Non Formal:</p>
						<ul className="list-disc ml-6 space-y-1 text-gray-600">
							<li>Pusat Kegiatan Belajar Masyarakat (PKBM)</li>
							<li>Lembaga Kursus dan Pelatihan (LKP)</li>
							<li>Lembaga Pelatihan Kerja (LPK)</li>
							<li>Balai Pelatihan Kerja (BPK)</li>
							<li>Taman Baca Masyarakat (TBM)</li>
						</ul>
					</div>
				</div>
			),
		},
		{
			title: "Kemanusiaan",
			icon: <HeartHandshake className="h-5 w-5" />,
			color: "bg-orange-100 text-orange-800",
			content: (
				<ul className="list-disc ml-6 space-y-2 text-gray-600">
					<li>Memberi Bantuan Kepada Korban Bencana Alam</li>
					<li>Memberi Bantuan Kepada Tuna Wisma Fakir Miskin</li>
					<li>Melestarikan Lingkungan Hidup</li>
				</ul>
			),
		},
		{
			title: "Keagamaan",
			icon: <Mosque className="h-5 w-5" />,
			color: "bg-purple-100 text-purple-800",
			content: (
				<ul className="list-disc ml-6 space-y-2 text-gray-600">
					<li>Mendirikan Rumah Ibadah</li>
					<li>Mendirikan Madrasah Ibtidaiyah, Tsanawiyah, dan Aliyah</li>
					<li>Menyelenggarakan Pondok Pesantren</li>
					<li>Menyelenggarakan Majlis Taklim</li>
					<li>Menerima Dan Menyalurkan Infaq, dan Shadaqah</li>
					<li>Melaksanakan Syiar Keagamaan</li>
					<li>Studi Banding Keagamaan</li>
				</ul>
			),
		},
	]

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
								PROFIL LEMBAGA
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
							Yayasan Raden Rahmat Kota Sumenep
						</motion.h1>

						<motion.p
							initial={{ y: 20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ duration: 0.6, delay: 0.4 }}
							className="text-white/80 text-lg max-w-3xl mx-auto"
						>
							Raden Rahmat Kota Sumenep atau lebih populer dengan sebutan{" "}
							<span className="font-semibold text-white">
								YASRAMA (Nomor: AHU-0006594.AH.01.04.Tahun 2024)
							</span>
							, merupakan sebuah lembaga Yayasan yang didirikan pada hari Senin,
							tanggal 21 Ramadhan 1445 H. bertepatan dengan tanggal 01 April
							2024 M.
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
				<div className="space-y-16">
					{/* Maksud dan Tujuan Section */}
					<motion.div
						variants={itemVariants}
						className="text-center max-w-3xl mx-auto"
					>
						<div className="inline-flex items-center justify-center gap-2 mb-6">
							<div className="h-px w-12 bg-primary/75" />
							<span
								className={cn(
									fontVariants.bold,
									"text-primary text-lg uppercase",
								)}
							>
								Maksud dan Tujuan
							</span>
							<div className="h-px w-12 bg-primary/75" />
						</div>
						<p className="text-primary text-lg">
							YASRAMA yang bergerak dibidang sosial, kemanusiaan dan keagamaan
						</p>
					</motion.div>

					{/* Bento Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{sections.slice(1).map((section, index) => (
							<motion.div
								key={index}
								variants={cardVariants}
								className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
								whileHover={{ y: -8, transition: { duration: 0.3 } }}
							>
								<div className={`${section.color} p-5 flex items-center gap-4`}>
									<div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
										{section.icon}
									</div>
									<h2 className={cn(fontVariants.bold, "text-2xl")}>
										{section.title}
									</h2>
								</div>
								<div className="p-6 bg-gradient-to-b from-white to-gray-50">
									{section.content}
								</div>
							</motion.div>
						))}
					</div>

					{/* Address Card */}
					<motion.div
						variants={itemVariants}
						className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl shadow-lg p-8 mt-6 max-w-3xl mx-auto"
					>
						<div className="flex flex-col md:flex-row items-center gap-6 mb-4">
							<div className="p-4 rounded-full bg-blue-600 text-white">
								<MapPin className="h-8 w-8" />
							</div>
							<div>
								<h3
									className={cn(
										fontVariants.bold,
										"text-2xl text-blue-800 mb-2",
									)}
								>
									Alamat Kantor
								</h3>
								<p className="text-blue-700 text-lg">
									Beralamatkan di Graha Abi Sujak, Jl. Jati Emas No. 26B RT.08
									RW.03 Desa Pangarangan, Kecamatan Kota Sumenep Jawa Timur.
								</p>
							</div>
						</div>
					</motion.div>

					{/* CTA Section */}
					<motion.div variants={itemVariants} className="text-center">
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-medium text-lg shadow-lg hover:bg-green-800 transition-colors"
						>
							Hubungi Kami <ChevronRight className="h-5 w-5" />
						</motion.button>
					</motion.div>
				</div>
			</motion.section>
		</div>
	)
}

export default ProfilPage
