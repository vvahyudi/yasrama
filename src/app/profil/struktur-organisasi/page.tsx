"use client"

import { fontVariants } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { motion } from "motion/react" // Fixed import
import { Users, Gavel, Eye } from "lucide-react"
import type { JSX } from "react"

interface Member {
	role: string
	name: string
}

interface Section {
	title: string
	icon: JSX.Element
	color: string
	bgColor: string
	members: Member[]
}

export default function StrukturOrganisasiPage(): JSX.Element {
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

	const sections: Section[] = [
		{
			title: "Pembina",
			icon: <Users className="h-6 w-6" />,
			color: "bg-blue-600 text-white",
			bgColor: "from-blue-50 to-white",
			members: [
				{ role: "Ketua", name: "KH. R. Taufikurrahman Syakoer" },
				{ role: "Anggota", name: "KH. Ach. Fadlan Masykuri" },
				{ role: "Anggota", name: "Januari Effendy" },
			],
		},
		{
			title: "Pengurus",
			icon: <Gavel className="h-6 w-6" />,
			color: "bg-green-600 text-white",
			bgColor: "from-green-50 to-white",
			members: [
				{ role: "Ketua", name: "KH. M. Hantok Sudarto, M. Fil.I." },
				{ role: "Wakil Ketua", name: "Ahmad Mursyidi" },
				{ role: "Sekretaris", name: "Drs. Ahmad Rusydiy, M.Pd." },
				{ role: "Wakil Sekretaris", name: "A. Sutagit" },
				{ role: "Bendahara", name: "Mistari" },
				{ role: "Wakil Bendahara", name: "Mohammad Rasyid, S.Pd.I." },
			],
		},
		{
			title: "Pengawas",
			icon: <Eye className="h-6 w-6" />,
			color: "bg-purple-600 text-white",
			bgColor: "from-purple-50 to-white",
			members: [
				{ role: "Ketua", name: "Drs. H. Moh. Kadarisman, M.SI." },
				{ role: "Anggota", name: "KH. Ahmad Halimy, M.Pd.I" },
				{ role: "Anggota", name: "KH. Sayyid Jakfar Sadik" },
			],
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
								STRUKTUR ORGANISASI
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
							Struktur Organisasi YASRAMA
						</motion.h1>

						<motion.p
							initial={{ y: 20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ duration: 0.6, delay: 0.4 }}
							className="text-white/80 text-lg max-w-3xl mx-auto"
						>
							YASRAMA terdiri dari 3 organ; Pembina, Pengurus dan Pengawas
							dengan tugas dan tanggung jawab masing-masing.
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
					{/* Organizational Structure Cards */}
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{sections.map((section, index) => (
							<motion.div
								key={section.title}
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

								<div className={`p-6 bg-gradient-to-b ${section.bgColor}`}>
									<ul className="space-y-4">
										{section.members.map((member, i) => (
											<motion.li
												key={i}
												className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/80 transition-colors"
												initial={{ opacity: 0, x: -10 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{ delay: 0.1 * i, duration: 0.4 }}
											>
												<div
													className={`w-1.5 h-full self-stretch rounded-full ${section.color
														.replace("bg-", "bg-")
														.replace("text-white", "")
														.trim()}/30`}
												/>
												<div>
													<p
														className={`font-medium ${section.color
															.replace("bg-", "text-")
															.replace("text-white", "")
															.trim()} mb-1`}
													>
														{member.role}
													</p>
													<p className="text-gray-700 font-medium">
														{member.name}
													</p>
												</div>
											</motion.li>
										))}
									</ul>
								</div>
							</motion.div>
						))}
					</div>

					{/* Organizational Structure Info */}
					<motion.div
						variants={itemVariants}
						className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto border border-gray-100"
					>
						<div className="flex items-center gap-4 mb-6">
							<div className="p-3 rounded-full bg-green-100 text-green-700">
								<Gavel className="h-6 w-6" />
							</div>
							<h3 className={cn(fontVariants.bold, "text-2xl text-green-800")}>
								Tentang Struktur Organisasi
							</h3>
						</div>

						<div className="prose prose-lg prose-green max-w-none">
							<p className="text-gray-700 leading-relaxed">
								Struktur organisasi YASRAMA dirancang untuk memastikan tata
								kelola yang baik dan akuntabel. Setiap organ memiliki peran dan
								tanggung jawab yang jelas dalam pengambilan keputusan dan
								pengawasan kegiatan yayasan.
							</p>

							<div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
								<motion.div
									className="p-5 rounded-xl bg-blue-50 border border-blue-100"
									whileHover={{ y: -5 }}
								>
									<h4 className="text-blue-700 font-bold flex items-center gap-2 mb-2">
										<Users className="h-5 w-5" /> Pembina
									</h4>
									<p className="text-blue-800">
										Bertugas memberikan arahan strategis dan kebijakan umum.
									</p>
								</motion.div>

								<motion.div
									className="p-5 rounded-xl bg-green-50 border border-green-100"
									whileHover={{ y: -5 }}
								>
									<h4 className="text-green-700 font-bold flex items-center gap-2 mb-2">
										<Gavel className="h-5 w-5" /> Pengurus
									</h4>
									<p className="text-green-800">
										Melaksanakan operasional sehari-hari yayasan.
									</p>
								</motion.div>

								<motion.div
									className="p-5 rounded-xl bg-purple-50 border border-purple-100"
									whileHover={{ y: -5 }}
								>
									<h4 className="text-purple-700 font-bold flex items-center gap-2 mb-2">
										<Eye className="h-5 w-5" /> Pengawas
									</h4>
									<p className="text-purple-800">
										Melakukan pengawasan terhadap pelaksanaan kegiatan.
									</p>
								</motion.div>
							</div>
						</div>
					</motion.div>

					{/* Organizational Chart Visualization */}
					<motion.div
						variants={itemVariants}
						className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 text-center"
					>
						<h3 className={cn(fontVariants.bold, "text-xl text-gray-700 mb-2")}>
							Struktur organisasi ini disusun berdasarkan Akta Notaris
						</h3>
						<p className="text-gray-600">
							Nomor: AHU-0006594.AH.01.04.Tahun 2024
						</p>
					</motion.div>
				</div>
			</motion.section>
		</div>
	)
}
