"use client";

import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/react";
import {
	Bold,
	Code2,
	Heading2,
	Heading3,
	ImagePlus,
	Italic,
	Link2,
	List,
	ListOrdered,
	Quote,
	Redo2,
	Strikethrough,
	Undo2,
	Unlink2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	disabled?: boolean;
	className?: string;
}

export function RichTextEditor({
	value,
	onChange,
	placeholder = "Tulis konten...",
	disabled = false,
	className,
}: RichTextEditorProps) {
	const [isFocused, setIsFocused] = useState(false);
	const [isEmpty, setIsEmpty] = useState(() => value.trim().length === 0);
	const isSyncingExternalValue = useRef(false);

	const editor = useEditor({
		extensions: [
			StarterKit,
			Link.configure({
				openOnClick: false,
				autolink: true,
				defaultProtocol: "https",
			}),
			Image,
		],
		content: value || "",
		editable: !disabled,
		immediatelyRender: false,
		onUpdate({ editor: tiptap }) {
			if (isSyncingExternalValue.current) {
				return;
			}
			setIsEmpty(tiptap.isEmpty);
			onChange(tiptap.getHTML());
		},
		onFocus() {
			setIsFocused(true);
		},
		onBlur() {
			setIsFocused(false);
		},
	});

	useEffect(() => {
		if (!editor) return;

		const nextValue = value || "";
		const currentValue = editor.getHTML();
		if (currentValue === nextValue) {
			return;
		}

		isSyncingExternalValue.current = true;
		editor.commands.setContent(nextValue);
		setIsEmpty(editor.isEmpty);
		isSyncingExternalValue.current = false;
	}, [editor, value]);

	useEffect(() => {
		if (!editor) return;
		editor.setEditable(!disabled);
	}, [editor, disabled]);

	if (!editor) {
		return null;
	}

	const setLink = () => {
		const previousUrl = editor.getAttributes("link").href as string | undefined;
		const url = window.prompt("Masukkan URL link", previousUrl || "https://");

		if (url === null) {
			return;
		}
		if (url.trim() === "") {
			editor.chain().focus().unsetLink().run();
			return;
		}

		editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
	};

	const setImage = () => {
		const url = window.prompt("Masukkan URL gambar", "https://");
		if (!url || url.trim() === "") {
			return;
		}

		editor.chain().focus().setImage({ src: url.trim() }).run();
	};

	return (
		<div className={cn("rounded-lg border bg-background", className)}>
			<div className="flex flex-wrap gap-2 border-b bg-muted/30 p-2">
				<Button
					type="button"
					variant={editor.isActive("bold") ? "default" : "outline"}
					size="sm"
					onClick={() => editor.chain().focus().toggleBold().run()}
					disabled={disabled}
				>
					<Bold className="size-4" />
				</Button>
				<Button
					type="button"
					variant={editor.isActive("italic") ? "default" : "outline"}
					size="sm"
					onClick={() => editor.chain().focus().toggleItalic().run()}
					disabled={disabled}
				>
					<Italic className="size-4" />
				</Button>
				<Button
					type="button"
					variant={editor.isActive("strike") ? "default" : "outline"}
					size="sm"
					onClick={() => editor.chain().focus().toggleStrike().run()}
					disabled={disabled}
				>
					<Strikethrough className="size-4" />
				</Button>
				<Button
					type="button"
					variant={editor.isActive("heading", { level: 2 }) ? "default" : "outline"}
					size="sm"
					onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
					disabled={disabled}
				>
					<Heading2 className="size-4" />
				</Button>
				<Button
					type="button"
					variant={editor.isActive("heading", { level: 3 }) ? "default" : "outline"}
					size="sm"
					onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
					disabled={disabled}
				>
					<Heading3 className="size-4" />
				</Button>
				<Button
					type="button"
					variant={editor.isActive("bulletList") ? "default" : "outline"}
					size="sm"
					onClick={() => editor.chain().focus().toggleBulletList().run()}
					disabled={disabled}
				>
					<List className="size-4" />
				</Button>
				<Button
					type="button"
					variant={editor.isActive("orderedList") ? "default" : "outline"}
					size="sm"
					onClick={() => editor.chain().focus().toggleOrderedList().run()}
					disabled={disabled}
				>
					<ListOrdered className="size-4" />
				</Button>
				<Button
					type="button"
					variant={editor.isActive("blockquote") ? "default" : "outline"}
					size="sm"
					onClick={() => editor.chain().focus().toggleBlockquote().run()}
					disabled={disabled}
				>
					<Quote className="size-4" />
				</Button>
				<Button
					type="button"
					variant={editor.isActive("codeBlock") ? "default" : "outline"}
					size="sm"
					onClick={() => editor.chain().focus().toggleCodeBlock().run()}
					disabled={disabled}
				>
					<Code2 className="size-4" />
				</Button>
				<Button
					type="button"
					variant={editor.isActive("link") ? "default" : "outline"}
					size="sm"
					onClick={setLink}
					disabled={disabled}
				>
					<Link2 className="size-4" />
				</Button>
				<Button
					type="button"
					variant="outline"
					size="sm"
					onClick={() => editor.chain().focus().unsetLink().run()}
					disabled={disabled}
				>
					<Unlink2 className="size-4" />
				</Button>
				<Button
					type="button"
					variant="outline"
					size="sm"
					onClick={setImage}
					disabled={disabled}
				>
					<ImagePlus className="size-4" />
				</Button>
				<Button
					type="button"
					variant="outline"
					size="sm"
					onClick={() => editor.chain().focus().undo().run()}
					disabled={disabled || !editor.can().undo()}
				>
					<Undo2 className="size-4" />
				</Button>
				<Button
					type="button"
					variant="outline"
					size="sm"
					onClick={() => editor.chain().focus().redo().run()}
					disabled={disabled || !editor.can().redo()}
				>
					<Redo2 className="size-4" />
				</Button>
			</div>
			<div className="relative">
				{isEmpty && !isFocused && (
					<p className="pointer-events-none absolute left-4 top-4 text-sm text-muted-foreground">
						{placeholder}
					</p>
				)}
				<EditorContent
					editor={editor}
					className={cn(
						"tiptap-editor min-h-[280px] p-4 text-sm focus-within:outline-none",
						disabled && "cursor-not-allowed opacity-70",
					)}
				/>
			</div>
		</div>
	);
}
