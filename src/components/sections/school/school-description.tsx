"use client"

import { useRef } from "react"
import { motion, useInView } from "motion/react"
import { fontVariants } from "@/lib/fonts"
import { cn } from "@/lib/utils"

export default function SchoolDescription({
	title,
	paragraphs,
}: {
	title: string
	paragraphs: string[]
}) {
	const sectionRef = useRef(null)
	const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
				delayChildren: 0.1,
			},
		},
	}

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.5 },
		},
	}

	return (
		<section ref={sectionRef} className="py-16 md:py-20">
			<div className="container mx-auto px-4">
				<motion.div
					initial="hidden"
					animate={isInView ? "visible" : "hidden"}
					variants={containerVariants}
					className="max-w-4xl mx-auto"
				>
					<motion.div
						variants={itemVariants}
						className="flex items-center gap-2 mb-6"
					>
						<span className={cn("text-primary uppercase", fontVariants.bold)}>
							TENTANG
						</span>
						<span className="h-px flex-1 bg-primary/75"></span>
					</motion.div>

					<motion.h2
						variants={itemVariants}
						className={cn(
							"text-2xl md:text-3xl lg:text-4xl text-primary mb-8",
							fontVariants.bold,
						)}
					>
						{title}
					</motion.h2>

					<motion.div
						variants={containerVariants}
						className="flex flex-col gap-6 p-6 md:p-8 text-primary bg-primary/10 rounded-lg shadow-lg"
					>
						{paragraphs.map((paragraph, index) => (
							<motion.p
								key={index}
								variants={itemVariants}
								className={cn("text-base md:text-lg", fontVariants.base)}
							>
								{paragraph}
							</motion.p>
						))}
					</motion.div>
				</motion.div>
			</div>
		</section>
	)
}
