"use client";

import Link from "next/link";
import Image from "next/image";
import {
	Building2,
	Facebook,
	Instagram,
	Mail,
	MapPin,
	Phone,
	Youtube,
} from "lucide-react";

const navSections = [
	{
		title: "Profil",
		links: [
			{ label: "Profil Yayasan", href: "/profil" },
			{ label: "Struktur Organisasi", href: "/profil/struktur-organisasi" },
		],
	},
	{
		title: "Lembaga",
		links: [
			{ label: "PAUD Raden Rahmat", href: "/lembaga/paud" },
			{ label: "SD Raden Rahmat", href: "/lembaga/sd" },
			{ label: "Kegiatan", href: "/kegiatan" },
			{ label: "Berita", href: "/berita" },
		],
	},
	{
		title: "Pendaftaran",
		links: [
			{ label: "Informasi PPDB", href: "/pendaftaran" },
			{ label: "Brosur PPDB", href: "/pendaftaran/brosur" },
		],
	},
];

const socialLinks = [
	{
		label: "Instagram",
		href: process.env.NEXT_PUBLIC_INSTAGRAM_URL,
		icon: Instagram,
	},
	{
		label: "Facebook",
		href: process.env.NEXT_PUBLIC_FACEBOOK_URL,
		icon: Facebook,
	},
	{
		label: "YouTube",
		href: process.env.NEXT_PUBLIC_YOUTUBE_URL,
		icon: Youtube,
	},
	{
		label: "TikTok",
		href: process.env.NEXT_PUBLIC_TIKTOK_URL,
		icon: Building2,
	},
].filter((item) => typeof item.href === "string" && item.href.length > 0);

export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="border-t border-border/60 bg-gradient-to-b from-background to-muted/40">
			<div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
				<div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
					<div className="space-y-5">
						<div className="flex items-center gap-3">
							<Image
								src="/yayasan.png"
								alt="Logo Yayasan Raden Rahmat"
								width={52}
								height={52}
								className="rounded-md"
							/>
							<Image
								src="/yayasan-tulisan-hijau.png"
								alt="Yayasan Raden Rahmat"
								width={220}
								height={64}
								className="h-9 w-auto object-contain"
							/>
						</div>
						<p className="max-w-sm text-sm leading-6 text-muted-foreground">
							Lembaga pendidikan Islam yang berkomitmen membentuk generasi
							cerdas, berakhlak, dan siap menghadapi masa depan.
						</p>
						<div className="space-y-2 text-sm text-muted-foreground">
							<p className="flex items-center gap-2">
								<Mail className="size-4" />
								<span>{process.env.NEXT_PUBLIC_CONTACT_EMAIL}</span>
							</p>
							<p className="flex items-center gap-2">
								<Phone className="size-4" />
								<span>{process.env.NEXT_PUBLIC_CONTACT_PHONE}</span>
							</p>
							<p className="flex items-center gap-2">
								<MapPin className="size-4" />
								<span>{process.env.NEXT_PUBLIC_CONTACT_ADDRESS}</span>
							</p>
						</div>
						{socialLinks.length > 0 && (
							<div className="flex items-center gap-2">
								{socialLinks.map((social) => (
									<Link
										key={social.label}
										href={social.href as string}
										target="_blank"
										rel="noreferrer"
										className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border/70 bg-background text-muted-foreground transition hover:text-foreground"
										aria-label={social.label}
									>
										<social.icon className="size-4" />
									</Link>
								))}
							</div>
						)}
					</div>

					{navSections.map((section) => (
						<div key={section.title}>
							<h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-foreground">
								{section.title}
							</h3>
							<ul className="space-y-2">
								{section.links.map((link) => (
									<li key={link.label}>
										<Link
											href={link.href}
											className="text-sm text-muted-foreground transition hover:text-foreground"
										>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="mt-10 border-t border-border/60 pt-5 text-xs text-muted-foreground">
					<div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
						<p>© {year} Yayasan Raden Rahmat. Seluruh hak cipta dilindungi.</p>
						<div className="flex items-center gap-4">
							<Link href="/profil" className="transition hover:text-foreground">
								Tentang Kami
							</Link>
							<Link href="/#kontak" className="transition hover:text-foreground">
								Hubungi Kami
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}

