import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
	size?: "sm" | "md" | "lg";
	className?: string;
}

export function LoadingSpinner({
	size = "md",
	className,
}: LoadingSpinnerProps) {
	const sizeClasses = {
		sm: "h-4 w-4 border-2",
		md: "h-8 w-8 border-3",
		lg: "h-12 w-12 border-4",
	};

	return (
		<div
			className={cn(
				"animate-spin rounded-full border-primary border-t-transparent",
				sizeClasses[size],
				className,
			)}
			role="status"
			aria-label="Loading"
		>
			<span className="sr-only">Loading...</span>
		</div>
	);
}

export function PageLoading() {
	return (
		<div className="flex min-h-[400px] items-center justify-center">
			<div className="text-center space-y-4">
				<LoadingSpinner size="lg" />
				<p className="text-muted-foreground">Memuat halaman...</p>
			</div>
		</div>
	);
}

export function FullPageLoading() {
	return (
		<div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
			<div className="text-center space-y-4">
				<LoadingSpinner size="lg" />
				<p className="text-muted-foreground">Memuat...</p>
			</div>
		</div>
	);
}
