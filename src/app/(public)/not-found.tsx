import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search } from "lucide-react"

export default function NotFound() {
	return (
		<div className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center px-4">
			<div className="text-center space-y-6 max-w-md">
				{/* 404 Number */}
				<div className="relative">
					<h1 className="text-9xl font-bold text-primary/10 select-none">
						404
					</h1>
					<div className="absolute inset-0 flex items-center justify-center">
						<Search className="h-24 w-24 text-primary/50" />
					</div>
				</div>

				{/* Message */}
				<div className="space-y-2">
					<h2 className="text-3xl font-bold text-foreground">
						Halaman Tidak Ditemukan
					</h2>
					<p className="text-muted-foreground">
						Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
					</p>
				</div>

				{/* Actions */}
				<div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
					<Button asChild size="lg">
						<Link href="/">
							<Home className="mr-2 h-4 w-4" />
							Kembali ke Beranda
						</Link>
					</Button>
					<Button asChild variant="outline" size="lg">
						<Link href="/pendaftaran">Informasi Pendaftaran</Link>
					</Button>
				</div>

				{/* Quick Links */}
				<div className="pt-8 border-t">
					<p className="text-sm text-muted-foreground mb-3">
						Halaman yang mungkin Anda cari:
					</p>
					<div className="flex flex-wrap gap-2 justify-center">
						<Link
							href="/profil"
							className="text-sm text-primary hover:underline"
						>
							Profil Yayasan
						</Link>
						<span className="text-muted-foreground">•</span>
						<Link
							href="/lembaga/paud"
							className="text-sm text-primary hover:underline"
						>
							PAUD
						</Link>
						<span className="text-muted-foreground">•</span>
						<Link
							href="/lembaga/sd"
							className="text-sm text-primary hover:underline"
						>
							SD
						</Link>
						<span className="text-muted-foreground">•</span>
						<Link
							href="/kegiatan"
							className="text-sm text-primary hover:underline"
						>
							Kegiatan
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
