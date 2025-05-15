import PageHero from "@/components/ui/page-hero"
import EnrollmentInfoSection from "@/components/sections/info-pendaftaran"

export const metadata = {
	title: "Pendaftaran PPDB | Yayasan Raden Rahmat",
	description:
		"Informasi lengkap Penerimaan Peserta Didik Baru RAISNU (Raden Rahmat Islamic School Nahdlatul Ulama) untuk PAUD dan SD Raden Rahmat Sumenep.",
}

export default function EnrollmentPage() {
	return (
		<>
			<PageHero
				title="Pendaftaran PPDB 2025/2026"
				description="Informasi lengkap penerimaan peserta didik baru untuk PAUD dan SD Raden Rahmat Sumenep"
				backgroundImage="/ppdb_yasrama.jpg"
			/>
			<EnrollmentInfoSection lembaga="RAISNU (Raden Rahmat Islamic School Nahdlatul Ulama)" />
		</>
	)
}
