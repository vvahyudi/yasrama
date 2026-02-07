"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

export function PageTransition({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();

	return (
		<AnimatePresence mode="wait">
			<motion.div
				key={pathname}
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -20 }}
				transition={{
					duration: 0.3,
					ease: "easeInOut",
				}}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	);
}

export function SmoothScroll() {
	useEffect(() => {
		const handleSmoothScroll = (e: MouseEvent) => {
			const target = e.target as HTMLAnchorElement;
			if (target.tagName === "A" && target.hash) {
				const href = target.getAttribute("href");
				if (href?.startsWith("#")) {
					e.preventDefault();
					const element = document.querySelector(href);
					if (element) {
						element.scrollIntoView({
							behavior: "smooth",
							block: "start",
						});
						// Update URL without jumping
						window.history.pushState(null, "", href);
					}
				}
			}
		};

		document.addEventListener("click", handleSmoothScroll);
		return () => document.removeEventListener("click", handleSmoothScroll);
	}, []);

	return null;
}
