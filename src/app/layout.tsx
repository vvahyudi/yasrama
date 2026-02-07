import "../styles/globals.css";
import { noto, notoArabic } from "@/lib/fonts";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: {
		default: "Yayasan Raden Rahmat | Lembaga Pendidikan Islam",
		template: "%s | Yayasan Raden Rahmat",
	},
	description:
		"Lembaga pendidikan Islam yang mengintegrasikan nilai-nilai Ahlussunnah wal Jama'ah An-Nahdliyah dengan kurikulum modern.",
	keywords: [
		"pendidikan islam",
		"sekolah islam",
		"yayasan raden rahmat",
		"PAUD",
		"SD",
		"Sumenep",
		"Nahdlatul Ulama",
	],
	authors: [{ name: "Ahmad Wahyudi" }],
	creator: "Yayasan Raden Rahmat",
	publisher: "Yayasan Raden Rahmat",
	openGraph: {
		type: "website",
		locale: "id_ID",
		url: "https://yayasanradenrahmat.com",
		siteName: "Yayasan Raden Rahmat",
		title: "Yayasan Raden Rahmat | Lembaga Pendidikan Islam",
		description:
			"Lembaga pendidikan Islam yang mengintegrasikan nilai-nilai Ahlussunnah wal Jama'ah An-Nahdliyah dengan kurikulum modern.",
		images: [
			{
				url: "/og-image.jpg",
				width: 1200,
				height: 630,
				alt: "Yayasan Raden Rahmat",
			},
		],
	},
};

interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html
			lang="id"
			className={`${noto.variable} ${notoArabic.variable}`}
			suppressHydrationWarning
		>
			<body className={noto.className}>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
