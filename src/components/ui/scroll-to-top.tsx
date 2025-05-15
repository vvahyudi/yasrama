"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

export default function ScrollToTopButton() {
	const [isVisible, setIsVisible] = useState(false)

	// Show button when page is scrolled down
	useEffect(() => {
		const toggleVisibility = () => {
			if (window.scrollY > 500) {
				setIsVisible(true)
			} else {
				setIsVisible(false)
			}
		}

		window.addEventListener("scroll", toggleVisibility)
		return () => window.removeEventListener("scroll", toggleVisibility)
	}, [])

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		})
	}

	// Animation variants
	const buttonVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.3,
			},
		},
		exit: {
			opacity: 0,
			y: 20,
			transition: {
				duration: 0.2,
			},
		},
	}

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.button
					className={cn(
						"fixed bottom-8 right-8 p-3 rounded-full bg-greenys text-white shadow-lg z-40",
						"hover:bg-greenbg focus:outline-none focus:ring-2 focus:ring-greenbg focus:ring-offset-2",
						"transition-colors duration-300",
					)}
					onClick={scrollToTop}
					aria-label="Scroll to top"
					initial="hidden"
					animate="visible"
					exit="exit"
					variants={buttonVariants}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.95 }}
				>
					<ArrowUp className="h-6 w-6" />
				</motion.button>
			)}
		</AnimatePresence>
	)
}
