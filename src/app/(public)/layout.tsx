import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { SkipToContent } from "@/components/ui/skip-to-content";
import { SmoothScroll } from "@/components/ui/page-transition";

interface PublicLayoutProps {
	children: React.ReactNode;
}

/**
 * Public Layout - For public website pages
 * Includes Header, Footer, and accessibility features
 */
export default function PublicLayout({ children }: PublicLayoutProps) {
	return (
		<>
			<SkipToContent />
			<SmoothScroll />
			<Header />
			<main id="main-content" className="min-h-screen pt-20">
				{children}
			</main>
			<Footer />
		</>
	);
}
