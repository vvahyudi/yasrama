"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function ErrorBoundary({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		// Log error to error reporting service
		console.error("Error caught by boundary:", error)
	}, [error])

	return (
		<div className="flex min-h-[400px] flex-col items-center justify-center space-y-4 p-4">
			<div className="text-center space-y-2">
				<h2 className="text-2xl font-bold text-destructive">
					Oops! Terjadi Kesalahan
				</h2>
				<p className="text-muted-foreground max-w-md">
					Maaf, terjadi kesalahan yang tidak terduga. Silakan coba lagi atau
					hubungi administrator jika masalah berlanjut.
				</p>
				{error.message && (
					<p className="text-sm text-muted-foreground mt-2">
						Detail: {error.message}
					</p>
				)}
			</div>
			<div className="flex gap-2">
				<Button
					onClick={() => reset()}
					variant="default"
				>
					Coba Lagi
				</Button>
				<Button
					onClick={() => (window.location.href = "/")}
					variant="outline"
				>
					Kembali ke Beranda
				</Button>
			</div>
		</div>
	)
}
