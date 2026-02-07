import type { Metadata } from "next";
import HeroSection from "@/components/sections/hero-section";
import AboutSection from "@/components/sections/about-section";
import InstitutionsSection from "@/components/sections/institutions-section";
import ActivitiesSection from "@/components/sections/activities-section";
import { NewsSection } from "@/components/sections/news-section";
import ContactSection from "@/components/sections/contact-section";
import ScrollToTopButton from "@/components/ui/scroll-to-top";

export const metadata: Metadata = {
	title: "Beranda | Yayasan Raden Rahmat",
	description:
		"Yayasan Raden Rahmat - Lembaga pendidikan Islam yang mengintegrasikan nilai-nilai Ahlussunnah wal Jama'ah An-Nahdliyah dengan kurikulum modern.",
};

export default function HomePage() {
	return (
		<>
			<HeroSection
				title="Yayasan Raden Rahmat"
				description="Lembaga pendidikan Islam yang mengintegrasikan nilai-nilai Ahlussunnah wal Jama'ah An-Nahdliyah dengan kurikulum modern untuk membentuk generasi yang cerdas, berakhlak, dan berprestasi."
			/>
			<AboutSection />
			<InstitutionsSection />
			<NewsSection />
			<ActivitiesSection />
			<ContactSection />
			<ScrollToTopButton />
		</>
	);
}
