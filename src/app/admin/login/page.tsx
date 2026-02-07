"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";
import { Loader2, AlertCircle, LogIn } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	async function handleLogin(e: React.FormEvent) {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		try {
			const response = await fetch("/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			const data = await response.json();

			if (!response.ok) {
				setError(data.error || "Login gagal");
				return;
			}

			// Redirect to dashboard
			router.push("/admin/dashboard");
		} catch (err) {
			console.error("Login error:", err);
			setError("Terjadi kesalahan. Silakan coba lagi.");
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center p-4">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="w-full max-w-md"
			>
				<div className="bg-background rounded-2xl shadow-xl p-8 space-y-6">
					{/* Logo & Header */}
					<div className="text-center space-y-3">
						<div className="flex justify-center">
							<div className="h-16 w-16 bg-primary rounded-lg flex items-center justify-center">
								<LogIn className="h-8 w-8 text-primary-foreground" />
							</div>
						</div>
						<div>
							<h1 className="text-2xl font-bold text-foreground">
								Admin Dashboard
							</h1>
							<p className="text-sm text-muted-foreground">
								Masuk untuk mengelola website
							</p>
						</div>
					</div>

					{/* Error Message */}
					{error && (
						<motion.div
							initial={{ opacity: 0, x: -10 }}
							animate={{ opacity: 1, x: 0 }}
							className="bg-destructive/10 border border-destructive rounded-lg p-3 flex gap-2"
						>
							<AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
							<p className="text-sm text-destructive">{error}</p>
						</motion.div>
					)}

					{/* Form */}
					<form onSubmit={handleLogin} className="space-y-4">
						<div className="space-y-2">
							<label className="text-sm font-medium text-foreground">
								Email
							</label>
							<Input
								type="email"
								placeholder="admin@example.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								disabled={isLoading}
								required
								className="h-10"
							/>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium text-foreground">
								Password
							</label>
							<Input
								type="password"
								placeholder="••••••••"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								disabled={isLoading}
								required
								className="h-10"
							/>
						</div>

						<Button
							type="submit"
							disabled={isLoading}
							className="w-full h-10"
							size="lg"
						>
							{isLoading ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Loading...
								</>
							) : (
								<>
									<LogIn className="mr-2 h-4 w-4" />
									Masuk
								</>
							)}
						</Button>
					</form>

					{/* Footer */}
					<div className="pt-4 border-t text-center text-sm text-muted-foreground">
						<p>
							Belum punya akun?{" "}
							<Link
								href="/"
								className="text-primary hover:underline font-medium"
							>
								Kembali ke website
							</Link>
						</p>
					</div>

					{/* Demo Credentials (remove in production) */}
					<div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground">
						<p className="font-medium mb-1">Demo Credentials:</p>
						<p>Email: admin@yasrama.com</p>
						<p>Password: admin123</p>
					</div>
				</div>
			</motion.div>
		</div>
	);
}
