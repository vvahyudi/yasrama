import React from "react"
import PageHero from "@/components/ui/page-hero"
import SchoolDescription from "@/components/sections/school/school-description"
import VisionMission from "@/components/sections/school/vision-mision"
import Programs from "@/components/sections/school/programs"
import Activities from "@/components/sections/school/activities"
import ContactSection from "@/components/sections/contact-section"

export const metadata = {
	title: "PAUD Raden Rahmat | Lembaga Pendidikan Islam",
	description:
		"PAUD Raden Rahmat Islamic School Nahdlatul Ulama (PAUD RAISNU) merupakan lembaga pendidikan yang berada di bawah naungan Lembaga Pendidikan Ma'arif Nahdlatul Ulama (LP Ma'arif NU) MWC Kota Sumenep.",
}

// Content text for SD description
const descriptionContent = [
	"PAUD Raden Rahmat Sumenep merupakan sekolah Swasta yang menerapkan nilai-nilai keislaman dan terbuka untuk siswa-siswi dari berbagai latar belakang. Berdiri secara resmi pada Senin, 09 Muharram 1446 H. bertepatan dengan tanggal 15 Juli 2024 M. dan beralamatkan di Jl. Adi Poday, Perumahan Permata Resmi II, Kel. Kolor, Kec. Kota Sumenep Jawa Timur.",
	"PAUD Raden Rahmat Sumenep didirikan oleh para pengurus Majelis Wakil Cabang Nahdlatul Ulama (MWC NU) Kota Sumenep, dan satu-satunya Lembaga Pendidikan yang murni milik Nahdlatul Ulama Kota Sumenep, oleh karenanya, PAUD Raden Rahmat Sumenep mempunyai kurikulum Khas, yaitu perpaduan Kurikulum Nasional dengan Kurikulum Ahlussunnah wal Jama'ah An-Nahdliyah (ASWAJA NU). Pengenalan dan penanaman Pendidikan karakter diterapkan melalui pembiasaan yang dilakukan dalam kehidupan sehari-hari baik di sekolah maupun di luar sekolah.",
]

export default function SDPage() {
	return (
		<>
			<PageHero
				title="PAUD RAISNU Raden Rahmat"
				description="PAUD Raden Rahmat Islamic School Nahdlatul Ulama (PAUD RAISNU) merupakan lembaga pendidikan yang berada di bawah naungan Lembaga Pendidikan Ma'arif Nahdlatul Ulama (LP Ma'arif NU) MWC Kota Sumenep dengan Ustadz dan Ustadzah yang professional."
				backgroundImage="/ppdb_yasrama.jpg"
			/>
			<SchoolDescription
				title="PAUD RADEN RAHMAT SUMENEP"
				paragraphs={descriptionContent}
			/>
			<VisionMission />
			<Programs />
			<Activities />
			<ContactSection />
		</>
	)
}
