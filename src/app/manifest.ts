import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "Yayasan Raden Rahmat",
		short_name: "YRR",
		description:
			"Lembaga pendidikan Islam yang mengintegrasikan nilai-nilai Ahlussunnah wal Jama'ah An-Nahdliyah dengan kurikulum modern",
		start_url: "/",
		display: "standalone",
		background_color: "#ffffff",
		theme_color: "#22c55e",
		icons: [
			{
				src: "/yayasan.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				src: "/yayasan.png",
				sizes: "512x512",
				type: "image/png",
			},
		],
	};
}
