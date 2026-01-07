"use client";
import { useState } from "react";

interface UploadedFile {
	name: string;
	size: number;
	type: string;
	uploadedAt: Date;
}

const FileUpload = () => {
	const [files, setFiles] = useState<UploadedFile[]>([]);
	const [isDragging, setIsDragging] = useState(false);

	const uploadFileToServer = async (file: File) => {
		try {
			const formData = new FormData();
			formData.append("pdf", file);

			const response = await fetch("/upload", {
				method: "POST",
				body: formData,
			});
			if (!response.ok) throw new Error("Upload failed");

			const data = await response.json();
			console.log("Parsed PDF text:", data.text);
			alert(`PDF Text:\n${data.text.substring(0, 500)}...`);
		} catch (err) {
			console.error(err);
			alert("Failed to upload file.");
		}
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const handleDragLeave = () => {
		setIsDragging(false);
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(false);
		// TODO: Handle file upload logic
		const droppedFiles = Array.from(e.dataTransfer.files);
		handleFiles(droppedFiles);
	};

	const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		// TODO: Handle file upload logic
		if (e.target.files) {
			const selectedFiles = Array.from(e.target.files);
			handleFiles(selectedFiles);
		}
	};

	const handleFiles = (newFiles: File[]) => {
		const uploadedFiles: UploadedFile[] = newFiles.map((file) => ({
			name: file.name,
			size: file.size,
			type: file.type,
			uploadedAt: new Date(),
		}));
		setFiles((prev) => [...prev, ...uploadedFiles]);
	};

	const formatFileSize = (bytes: number) => {
		if (bytes === 0) return "0 Bytes";
		const k = 1024;
		const sizes = ["Bytes", "KB", "MB", "GB"];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
	};

	const removeFile = (index: number) => {
		setFiles((prev) => prev.filter((_, i) => i !== index));
	};

	return (
		<div className="flex h-full flex-col border-r border-border bg-muted/30 flex-1">
			{/* Header */}
			<div className="border-b border-border bg-background p-4">
				<h2 className="text-lg font-semibold">Documents</h2>
				<p className="text-sm text-muted-foreground">Upload files to analyze</p>
			</div>

			{/* Upload Area */}
			<div className="p-4">
				<div
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
					onDrop={handleDrop}
					className={`relative cursor-pointer rounded-lg border-2 border-dashed p-4 text-center transition-colors ${
						isDragging
							? "border-primary bg-primary/5"
							: "border-border hover:border-primary/50"
					}`}
				>
					<input
						type="file"
						multiple
						accept=".pdf,.docx,.txt"
						onChange={handleFileInput}
						className="absolute inset-0 cursor-pointer opacity-0"
					/>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="32"
						height="32"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="mx-auto mb-2 text-muted-foreground"
					>
						<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
						<polyline points="17 8 12 3 7 8" />
						<line
							x1="12"
							x2="12"
							y1="3"
							y2="15"
						/>
					</svg>
					<p className="text-xs font-medium">Drop files or click to browse</p>
					<p className="mt-1 text-xs text-muted-foreground">PDF, DOCX, TXT</p>
				</div>
			</div>

			{/* Files List */}
			<div className="flex-1 overflow-auto px-4 pb-4">
				<div className="space-y-2">
					{files.map((file, index) => (
						<div
							key={index}
							className="group flex items-start gap-3 rounded-lg border border-border bg-background p-3 shadow-sm transition-all hover:shadow-md"
						>
							<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="text-primary"
								>
									<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
									<polyline points="14 2 14 8 20 8" />
								</svg>
							</div>
							<div className="flex-1 min-w-0">
								<p className="truncate text-sm font-medium">{file.name}</p>
								<p className="text-xs text-muted-foreground">
									{formatFileSize(file.size)}
								</p>
							</div>
							<button
								onClick={() => removeFile(index)}
								className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M18 6 6 18" />
									<path d="m6 6 12 12" />
								</svg>
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default FileUpload;
