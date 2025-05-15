"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { fontVariants } from "@/lib/fonts"
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

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

export default function MainNav() {
	const pathname = usePathname()

	return (
		<NavigationMenu>
			<NavigationMenuList className="flex gap-1">
				{navLinks.map((link, index) => (
					<NavigationMenuItem key={index}>
						{link.submenu ? (
							<>
								<NavigationMenuTrigger
									className={cn(
										"bg-background/80 hover:bg-background/90 text-foreground",
										"data-[state=open]:bg-muted",
										"px-4 py-2 rounded-xl transition-all duration-200 ease-in-out",
										"hover:shadow-sm hover:-translate-y-[2px]",
										"border border-border/20",
										fontVariants.bold,
									)}
								>
									{link.name}
								</NavigationMenuTrigger>
								<NavigationMenuContent className="pt-2">
									<div className="grid w-[280px] gap-2 p-3 bg-background/95 backdrop-blur-lg rounded-xl border border-border shadow-xl">
										<div className="text-sm font-semibold text-muted-foreground px-1">
											{link.submenu[0].name}
										</div>
										{link.submenu[0].items.map((subLink, subIndex) => (
											<Link key={subIndex} href={subLink.path}>
												<span
													className={cn(
														"block px-3 py-2 rounded-lg text-sm transition-all duration-150",
														"hover:bg-accent hover:text-accent-foreground",
														"focus:bg-accent focus:text-accent-foreground",
														pathname === subLink.path &&
															"bg-accent text-accent-foreground",
														fontVariants.medium,
													)}
												>
													{subLink.name}
												</span>
											</Link>
										))}
									</div>
								</NavigationMenuContent>
							</>
						) : (
							<NavigationMenuLink asChild>
								<Link
									href={link.path}
									className={cn(
										navigationMenuTriggerStyle(),
										"bg-background/80 hover:bg-background/90",
										"px-4 py-2 rounded-xl transition-all duration-200 ease-in-out",
										"hover:shadow-sm hover:-translate-y-[2px]",
										"border border-border/20",
										pathname === link.path && "bg-muted text-foreground",
										fontVariants.bold,
									)}
								>
									{link.name}
								</Link>
							</NavigationMenuLink>
						)}
					</NavigationMenuItem>
				))}
			</NavigationMenuList>
		</NavigationMenu>
	)
}
