"use client";
import { useState, useRef, useEffect } from "react";

interface Message {
	role: "user" | "ai";
	content: string;
}

const ChatInterface = () => {
	const [messages, setMessages] = useState<Message[]>([
		{ role: "ai", content: "Hello! Ask me anything about your document." },
	]);
	const [input, setInput] = useState("");
	const [isTyping, setIsTyping] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const handleSend = () => {
		if (!input.trim()) return;
		setMessages((prev) => [...prev, { role: "user", content: input }]);
		setInput("");
		setIsTyping(true);

		// Simulated AI response
		setTimeout(() => {
			setMessages((prev) => [
				...prev,
				{ role: "ai", content: "This is a sample AI response." },
			]);
			setIsTyping(false);
		}, 1000);
	};

	return (
		<div className="flex h-full flex-1 flex-col overflow-hidden bg-background">
			{/* Messages Area */}
			<div className="flex-1 overflow-auto p-4 space-y-4">
				{messages.map((msg, idx) => (
					<div
						key={idx}
						className={`flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
					>
						{/* Avatar */}
						<div
							className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
								msg.role === "ai"
									? "bg-primary text-primary-foreground"
									: "bg-muted text-muted-foreground"
							}`}
						>
							{msg.role === "ai" ? "AI" : "Me"}
						</div>

						{/* Message Bubble */}
						<div
							className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
								msg.role === "ai"
									? "bg-card text-card-foreground border border-border"
									: "bg-primary text-primary-foreground"
							}`}
						>
							<p>{msg.content}</p>
						</div>
					</div>
				))}

				{/* Typing Indicator */}
				{isTyping && (
					<div className="flex items-start gap-3">
						<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
							AI
						</div>
						<div className="flex items-center gap-1 rounded-2xl bg-card border border-border px-4 py-3 shadow-sm">
							<span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
							<span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
							<span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" />
						</div>
					</div>
				)}

				<div ref={messagesEndRef} />
			</div>

			{/* Input Area */}
			<div className="border-t border-border bg-muted/50 p-4">
				<div className="flex items-end gap-3">
					<textarea
						placeholder="Type a message..."
						className="min-h-11 max-h-32 flex-1 resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
						rows={1}
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter" && !e.shiftKey) {
								e.preventDefault();
								handleSend();
							}
						}}
					/>
					<button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background hover:bg-muted transition-colors">
						<input
							type="file"
							multiple
							accept=".pdf,.docx,.txt"
							className="hidden"
							id="file-upload"
						/>
						<label
							htmlFor="file-upload"
							className="cursor-pointer flex items-center justify-center w-full h-full"
						>
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
						</label>
					</button>
					<button
						onClick={handleSend}
						disabled={!input.trim()}
						className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50 transition-colors"
					>
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
						>
							<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
							<path d="m21.854 2.147-10.94 10.939" />
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
};

export default ChatInterface;
