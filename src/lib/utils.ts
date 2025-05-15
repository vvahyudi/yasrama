import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}
/**
 * Formats a date to locale string
 * @param date - Date to format (Date object or ISO string)
 * @param options - Intl.DateTimeFormat options
 * @returns Formatted date string
 */
export function formatDate(
	date: Date | string,
	options: Intl.DateTimeFormatOptions = {},
): string {
	const defaultOptions: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "long",
		day: "numeric",
	}

	const mergedOptions = { ...defaultOptions, ...options }

	return new Date(date).toLocaleDateString("id-ID", mergedOptions)
}

/**
 * Formats a number as currency
 * @param amount - Amount to format
 * @param currency - Currency code (default: "IDR")
 * @returns Formatted currency string
 */
export function formatCurrency(
	amount: number,
	currency: string = "IDR",
): string {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency,
		minimumFractionDigits: 0,
	}).format(amount)
}

/**
 * Truncates text to a specified length
 * @param text - Text to truncate
 * @param length - Maximum length (default: 100)
 * @returns Truncated text
 */
export function truncateText(
	text: string | null | undefined,
	length: number = 100,
): string {
	if (!text || text.length <= length) return text || ""
	return text.slice(0, length).trim() + "..."
}
