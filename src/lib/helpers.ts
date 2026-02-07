export function generateBlurDataURL(width = 10, height = 10): string {
	// Simple blur data URL generator for placeholder
	const canvas =
		typeof document !== "undefined" ? document.createElement("canvas") : null
	if (!canvas) {
		// Fallback blur data URL
		return "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
	}

	canvas.width = width
	canvas.height = height
	const ctx = canvas.getContext("2d")
	if (!ctx) return ""

	// Create gradient
	const gradient = ctx.createLinearGradient(0, 0, width, height)
	gradient.addColorStop(0, "#e0e0e0")
	gradient.addColorStop(1, "#f5f5f5")

	ctx.fillStyle = gradient
	ctx.fillRect(0, 0, width, height)

	return canvas.toDataURL("image/jpeg", 0.1)
}

export function formatDate(date: Date | string): string {
	const d = typeof date === "string" ? new Date(date) : date
	return new Intl.DateTimeFormat("id-ID", {
		year: "numeric",
		month: "long",
		day: "numeric",
	}).format(d)
}

export function formatPhoneNumber(phone: string): string {
	// Format Indonesian phone number
	const cleaned = phone.replace(/\D/g, "")
	if (cleaned.startsWith("62")) {
		return `+62 ${cleaned.slice(2, 5)}-${cleaned.slice(5, 9)}-${cleaned.slice(9)}`
	}
	return phone
}
