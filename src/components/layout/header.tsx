"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
const MobileMenu = dynamic(() => import("./mobile-menu"), { ssr: false })
const MainNav = dynamic(() => import("./main-nav"), { ssr: false })

export default function Header() {
	const [isScrolled, setIsScrolled] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50)
		}
		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	return (
		<header
			className={cn(
				"fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
				isScrolled
					? "bg-background/90 backdrop-blur-md shadow-sm border-border py-2"
					: "bg-background py-4",
			)}
		>
			<div className="container mx-auto px-4">
				{/* Bento Grid Layout */}
				<div className="grid grid-cols-3 items-center gap-4">
					{/* Left: Logo */}
					<div className="flex items-center">
						<Link
							href="/"
							className="flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring p-1"
							aria-label="Yayasan Raden Rahmat Home"
						>
							<Image
								src="/yayasan.png"
								alt="Logo Yayasan Raden Rahmat"
								width={48}
								height={48}
								className="h-12 w-12 object-contain"
								priority
							/>
							<div className="hidden sm:block">
								<Image
									src="/yayasan-tulisan-hijau.png"
									alt="Yayasan Raden Rahmat"
									width={320}
									height={96}
									className="h-12 w-auto object-contain"
									priority
								/>
							</div>
						</Link>
					</div>

					{/* Center: Desktop Navigation */}
					<div className="hidden md:flex justify-center mx-auto">
						<MainNav />
					</div>

					{/* Right: Mobile Nav / Call to Action */}
					<div className="flex justify-end md:hidden ml-48">
						<MobileMenu />
					</div>

					{/* Desktop CTA (optional) */}
					<div className="hidden md:flex justify-end">
						<Button variant="default" size="sm">
							Hubungi Kami
						</Button>
					</div>
				</div>
			</div>
		</header>
	)
}
