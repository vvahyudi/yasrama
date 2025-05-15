import { Noto_Sans, Noto_Naskh_Arabic } from "next/font/google"

export const noto = Noto_Sans({
	subsets: ["latin"],
	weight: ["400", "500", "700", "800"],
	variable: "--font-noto",
	display: "swap",
})

export const notoArabic = Noto_Naskh_Arabic({
	subsets: ["arabic"],
	weight: ["400", "700"],
	variable: "--font-noto-arabic",
	display: "swap",
})

// Individual font variants for direct use in className
export const fontVariants = {
	base: noto.className,
	medium: `${noto.className} font-medium`,
	bold: `${noto.className} font-bold`,
	black: `${noto.className} font-extrabold`,
	arabic: notoArabic.className,
	arabicBold: `${notoArabic.className} font-bold`,
}
