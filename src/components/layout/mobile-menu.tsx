"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { fontVariants } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"

const navLinks = [
	{
		name: "Beranda",
		path: "/",
	},
	{
		name: "Profil",
		path: "/profil",
		submenu: [
			{
				name: "Profil Yayasan",
				items: [
					{ name: "Profil Yayasan", path: "/profil" },
					{ name: "Struktur Organisasi", path: "/profil/struktur-organisasi" },
				],
			},
		],
	},
	{
		name: "Lembaga",
		path: "/lembaga",
		submenu: [
			{
				name: "Lembaga Pendidikan",
				items: [
					{ name: "SD Raden Rahmat", path: "/lembaga/sd" },
					{ name: "PAUD Raden Rahmat", path: "/lembaga/paud" },
				],
			},
		],
	},
	{
		name: "PPDB",
		path: "/pendaftaran",
		submenu: [
			{
				name: "PPDB 2025",
				items: [
					{ name: "Informasi", path: "/pendaftaran" },
					{ name: "Brosur", path: "/pendaftaran/brosur" },
				],
			},
		],
	},
	{
		name: "Kegiatan",
		path: "/kegiatan",
	},
]

export default function MobileMenu() {
	const pathname = usePathname()
	const [isOpen, setIsOpen] = useState(false)

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="bg-background/70 hover:bg-background/90 rounded-xl border border-border/20 hover:shadow-md hover:translate-y-[-2px] transition-all duration-200"
					aria-label="Open menu"
				>
					<Menu className="h-5 w-5" />
				</Button>
			</SheetTrigger>
			<SheetContent
				side="right"
				className="w-full sm:w-[400px] bg-background/95 backdrop-blur-md border-l border-border/20"
			>
				{/* Logo Section */}
				<div className="flex flex-col items-center justify-center py-6">
					<Link
						href="/"
						className="flex flex-col items-center gap-4 p-4 rounded-xl bg-background/80 hover:bg-background transition-all"
						aria-label="Yayasan Raden Rahmat Home"
						onClick={() => setIsOpen(false)}
					>
						<div className="p-2 rounded-lg bg-background/90 border border-border/20">
							<Image
								src="/yayasan.png"
								alt="Logo Yayasan Raden Rahmat"
								width={80}
								height={80}
								className="h-20 w-20 object-contain"
								priority
							/>
						</div>
						<div className="p-2 rounded-lg bg-background/90 border border-border/20">
							<Image
								src="/yayasan-tulisan-hijau.png"
								alt="Yayasan Raden Rahmat"
								width={250}
								height={80}
								className="h-12 w-auto object-contain"
								priority
							/>
						</div>
					</Link>
				</div>

				{/* Navigation Links */}
				<nav className="px-2 space-y-2" aria-label="Mobile navigation">
					{navLinks.map((link, index) => (
						<Accordion key={index} type="single" collapsible>
							<AccordionItem value={link.name} className="border-none">
								{link.submenu ? (
									<>
										<AccordionTrigger
											className={cn(
												"px-4 py-3 rounded-lg hover:bg-accent transition-colors",
												"text-foreground hover:text-foreground",
												fontVariants.bold,
											)}
										>
											{link.name}
										</AccordionTrigger>
										<AccordionContent className="pt-1 pl-2">
											<div className="space-y-1 pl-2 border-l-2 border-border/20">
												<div className="px-3 py-1 text-sm text-muted-foreground">
													{link.submenu[0].name}
												</div>
												{link.submenu[0].items.map((item, itemIndex) => (
													<Link
														key={itemIndex}
														href={item.path}
														className={cn(
															"block px-3 py-2 rounded-lg text-sm transition-colors",
															"hover:bg-accent hover:text-accent-foreground",
															pathname === item.path &&
																"bg-accent text-accent-foreground",
															fontVariants.medium,
														)}
														onClick={() => setIsOpen(false)}
													>
														{item.name}
													</Link>
												))}
											</div>
										</AccordionContent>
									</>
								) : (
									<Link
										href={link.path}
										className={cn(
											"block px-4 py-3 rounded-lg font-bold transition-colors",
											"hover:bg-accent hover:text-accent-foreground",
											pathname === link.path &&
												"bg-accent text-accent-foreground",
											fontVariants.bold,
										)}
										onClick={() => setIsOpen(false)}
									>
										{link.name}
									</Link>
								)}
							</AccordionItem>
						</Accordion>
					))}
				</nav>
			</SheetContent>
		</Sheet>
	)
}
