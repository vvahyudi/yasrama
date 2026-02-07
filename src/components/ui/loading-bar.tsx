"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

export function LoadingBar() {
	const pathname = usePathname();
	const [isLoading, setIsLoading] = useState(false);
	const [progress, setProgress] = useState(0);
	const prevPathnameRef = useRef(pathname);

	useEffect(() => {
		// Start loading bar when pathname changes
		if (prevPathnameRef.current !== pathname) {
			setIsLoading(true);
			setProgress(0);
			prevPathnameRef.current = pathname;

			// Auto-complete after 500ms (App Router navigation is typically fast)
			const timer = setTimeout(() => {
				setProgress(100);
				setTimeout(() => setIsLoading(false), 200);
			}, 500);

			return () => clearTimeout(timer);
		}
	}, [pathname]);

	useEffect(() => {
		// Animate progress from 0 to 90% while loading
		if (!isLoading || progress >= 90) return;

		const interval = setInterval(() => {
			setProgress((prev) => Math.min(prev + Math.random() * 10, 90));
		}, 200);

		return () => clearInterval(interval);
	}, [isLoading, progress]);

	return (
		<AnimatePresence>
			{isLoading && (
				<motion.div
					className="fixed top-0 left-0 right-0 z-50 h-1 bg-primary/20"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<motion.div
						className="h-full bg-primary"
						initial={{ width: "0%" }}
						animate={{ width: `${progress}%` }}
						transition={{ duration: 0.3, ease: "easeOut" }}
					/>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
