import PageHero from "@/components/ui/page-hero"
import BrochureSection from "@/components/sections/brochure-section"

export const metadata = {
	title: "Brosur PPDB | Yayasan Raden Rahmat",
	description:
		"Download brosur Penerimaan Peserta Didik Baru RAISNU (Raden Rahmat Islamic School Nahdlatul Ulama) PAUD & SD Raden Rahmat Sumenep Tahun Ajaran 2025/2026.",
}

export default function BrochurePage() {
	return (
		<>
			<PageHero
				title="Brosur PPDB 2025/2026"
				description="Informasi lengkap penerimaan peserta didik baru untuk PAUD dan SD Raden Rahmat Sumenep"
				backgroundImage="/ppdb_yasrama.jpg"
			/>
			<BrochureSection />
		</>
	)
}
