"use client"

import { motion } from "motion/react"
import { fontVariants } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface Program {
	title: string
	description: string
}

export default function ProgramCard({
	program,
	icon: Icon,
}: {
	program: Program
	icon: LucideIcon
}) {
	const { title, description } = program

	const cardVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.5 },
		},
		hover: {
			y: -10,
			transition: { duration: 0.3 },
		},
	}

	return (
		<motion.div
			variants={cardVariants}
			whileHover="hover"
			className="flex flex-col bg-card rounded-xl p-6 gap-4 shadow-md h-full"
		>
			<div className="flex justify-center mb-2">
				<Icon className="h-12 w-12 text-card-foreground" />
			</div>

			<h3
				className={cn(
					"text-xl text-card-foreground text-center",
					fontVariants.bold,
				)}
			>
				{title}
			</h3>

			<p
				className={cn(
					"text-base text-gray-700 text-center flex-grow",
					fontVariants.base,
				)}
			>
				{description}
			</p>

			{/* Hover effect line */}
			<motion.div
				className="h-1 w-0 bg-greenys mx-auto rounded-full"
				initial={{ width: 0 }}
				whileHover={{ width: "50%" }}
				transition={{ duration: 0.3 }}
			/>
		</motion.div>
	)
}
