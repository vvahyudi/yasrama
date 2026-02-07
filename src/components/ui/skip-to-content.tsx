"use client";

import { useEffect, useState } from "react";

export function SkipToContent() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Tab") {
				setIsVisible(true);
			}
		};

		const handleBlur = () => {
			setIsVisible(false);
		};

		window.addEventListener("keydown", handleKeyDown);
		const skipLink = document.getElementById("skip-link");
		skipLink?.addEventListener("blur", handleBlur);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			skipLink?.removeEventListener("blur", handleBlur);
		};
	}, []);

	return (
		<a
			id="skip-link"
			href="#main-content"
			className={`
				fixed top-2 left-2 z-[100] bg-primary text-primary-foreground 
				px-4 py-2 rounded-md font-medium shadow-lg
				transform transition-transform duration-200
				focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
				${isVisible ? "translate-y-0" : "-translate-y-20"}
			`}
		>
			Skip to main content
		</a>
	);
}
