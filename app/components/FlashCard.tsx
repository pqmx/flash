"use client";
import { useState } from "react";

interface FlashCardProps {
	front: string;
	back: string;
}

const FlashCard = ({ front, back }: FlashCardProps) => {
	const [flipped, setFlipped] = useState(false);

	return (
		<div
			className="w-100 h-60 cursor-pointer"
			style={{ perspective: "1000px" }}
			onClick={() => setFlipped(!flipped)}
		>
			<div
				className="relative w-full h-full transition-transform duration-500"
				style={{
					transformStyle: "preserve-3d",
					transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
				}}
			>
				{/* Front */}
				<div
					className="absolute w-full h-full rounded-lg bg-card text-card-foreground shadow-[0_0_10px_rgba(0,0,0,0.25)] flex items-center justify-center p-4"
					style={{ backfaceVisibility: "hidden" }}
				>
					{front}
				</div>

				{/* Back */}
				<div
					className="absolute w-full h-full rounded-lg bg-card text-card-foreground shadow-[0_0_10px_rgba(0,0,0,0.25)] flex items-center justify-center p-4"
					style={{
						backfaceVisibility: "hidden",
						transform: "rotateY(180deg)",
					}}
				>
					{back}
				</div>
			</div>
		</div>
	);
};

export default FlashCard;
