"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { fontVariants } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Music } from "lucide-react"

// Social media links config
const socialLinks = [
	{ icon: Music, label: "TikTok", href: "#" }, // Placeholder for TikTok
]

// Footer link sections
const footerSections = [
	{
		title: "Profil",
		links: [
			{ label: "Profil Yayasan", href: "/profil" },
			{ label: "Struktur Organisasi", href: "/profil/struktur-organisasi" },
		],
	},
	{
		title: "Lembaga Pendidikan",
		links: [
			{ label: "PAUD Raden Rahmat", href: "/lembaga/paud" },
			{ label: "SD Raden Rahmat", href: "/lembaga/sd" },
			{ label: "Rumah Tahfidz", href: "#" },
			{ label: "Madrasah Diniyah Takmiliyah", href: "#" },
		],
	},
	{
		title: "Pendaftaran",
		links: [
			{ label: "PAUD Raden Rahmat", href: "/pendaftaran/paud" },
			{ label: "SD Raden Rahmat", href: "/pendaftaran/sd" },
		],
	},
	{
		title: "Link",
		links: [
			{ label: "Kegiatan", href: "/kegiatan" },
			{ label: "Kontak", href: "/#kontak" },
		],
	},
]

export default function Footer() {
	const year = new Date().getFullYear()

	return (
		<footer className={cn("bg-background text-foreground", fontVariants.base)}>
			<div className="mx-auto max-w-7xl px-4 pb-6 pt-16 sm:px-6 lg:px-8 lg:pt-24">
				<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
					{/* Logo and about section */}
					<div className="space-y-6">
						<div className="flex justify-center items-center gap-3 sm:justify-start">
							<Image
								src="/yayasan.png"
								alt="Logo Yayasan Raden Rahmat"
								width={60}
								height={60}
								className="rounded-lg"
							/>
							<Image
								src="/yayasan-tulisan-hijau.png"
								alt="Yayasan Raden Rahmat"
								width={320}
								height={96}
								className="h-12 w-auto object-contain"
								priority
							/>
						</div>

						<p className="mt-6 max-w-md text-center leading-relaxed text-muted-foreground sm:max-w-xs sm:text-left">
							Mewujudkan menjadi Lembaga Unggul Dalam Mempersiapkan Generasi
							Islam Yang Cerdas Secara Intelektual, Emosional Dan Spiritual.
						</p>

						{/* Social media links */}
						<ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
							{socialLinks.map((social) => (
								<li key={social.label}>
									<a
										href={social.href}
										rel="noreferrer"
										target="_blank"
										className="text-muted-foreground hover:text-foreground transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full p-1"
										aria-label={`Follow us on ${social.label}`}
									>
										<social.icon className="h-6 w-6" />
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Footer link sections */}
					<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2">
						{footerSections.map((section) => (
							<div key={section.title} className="text-center sm:text-left">
								<p className={cn("text-lg font-medium", fontVariants.bold)}>
									{section.title}
								</p>

								<ul className="mt-8 space-y-4 text-sm text-muted-foreground">
									{section.links.map((link) => (
										<li key={link.label}>
											<Link
												className="transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded px-1"
												href={link.href}
											>
												{link.label}
											</Link>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>

				{/* Copyright section */}
				<div className="mt-12 border-t border-border pt-6">
					<div className="text-center sm:flex sm:justify-between sm:text-left">
						<p className="text-sm text-muted-foreground">
							<span className="block sm:inline">All rights reserved.</span>{" "}
							<Link
								className="inline-block underline hover:text-foreground transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded px-1"
								href="#"
							>
								Terms & Conditions
							</Link>{" "}
							<span>&middot;</span>{" "}
							<Link
								className="inline-block underline hover:text-foreground transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded px-1"
								href="#"
							>
								Privacy Policy
							</Link>
						</p>

						<p className="mt-4 text-sm text-muted-foreground sm:order-first sm:mt-0">
							&copy; {year} Made with ❤️ by{" "}
							<span className={cn("text-foreground", fontVariants.bold)}>
								ahmadwahyudi
							</span>
						</p>
					</div>
				</div>
			</div>
		</footer>
	)
}
