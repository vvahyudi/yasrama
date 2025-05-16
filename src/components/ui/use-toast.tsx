"use client"

import { createContext, useState, useContext, ReactNode } from "react"

const TOAST_REMOVE_DELAY = 5000

interface ToastCustomProps {
	[key: string]: unknown
}

type Toast = {
	id: string
	title?: string
	description?: string
	duration?: number
	visible?: boolean
} & ToastCustomProps

type ToastInput = Omit<Toast, "id" | "visible"> & { id?: string }

type ToastContextType = {
	toasts: Toast[]
	addToast: (toast: ToastInput) => string
	updateToast: (id: string, toast: Partial<Toast>) => void
	dismissToast: (id: string) => void
	removeToast: (id: string) => void
}

let count = 0
function genId(): string {
	count = (count + 1) % Number.MAX_SAFE_INTEGER
	return count.toString()
}

const ToastContext = createContext<ToastContextType>({
	toasts: [],
	addToast: () => "",
	updateToast: () => {},
	dismissToast: () => {},
	removeToast: () => {},
})

type ToastProviderProps = {
	children: ReactNode
}

export function ToastProvider({ children }: ToastProviderProps) {
	const [toasts, setToasts] = useState<Toast[]>([])

	const addToast = (toast: ToastInput): string => {
		const id = toast.id || genId()

		setToasts((prev) => [...prev, { ...toast, id, visible: true }])

		return id
	}

	const updateToast = (id: string, updatedProps: Partial<Toast>) => {
		setToasts((prev) =>
			prev.map((t) => (t.id === id ? { ...t, ...updatedProps } : t)),
		)
	}

	const dismissToast = (id: string) => {
		setToasts((prev) =>
			prev.map((t) => (t.id === id ? { ...t, visible: false } : t)),
		)
	}

	const removeToast = (id: string) => {
		setToasts((prev) => prev.filter((t) => t.id !== id))
	}

	return (
		<ToastContext.Provider
			value={{ toasts, addToast, updateToast, dismissToast, removeToast }}
		>
			{children}
		</ToastContext.Provider>
	)
}

type UseToastReturn = {
	toast: (props: ToastInput) => {
		id: string
		update: (props: Partial<Toast>) => void
		dismiss: () => void
	}
}

export function useToast(): UseToastReturn {
	const { addToast, updateToast, dismissToast, removeToast } =
		useContext(ToastContext)

	return {
		toast: (props: ToastInput) => {
			const id = addToast(props)
			const hideDelay =
				typeof props.duration === "number" ? props.duration : TOAST_REMOVE_DELAY
			const removeDelay = 300

			window.setTimeout(() => {
				dismissToast(id)
				window.setTimeout(() => {
					removeToast(id)
				}, removeDelay)
			}, hideDelay)

			return {
				id,
				update: (updatedProps: Partial<Toast>) => updateToast(id, updatedProps),
				dismiss: () => dismissToast(id),
			}
		},
	}
}

export const Toaster = () => {
	// Replace this return with actual JSX when needed
	return null
}
