import ChatInterface from "./components/ChatInterface";
import FlashCardShow from "./components/FlashCardShow";

export default function Home() {
	return (
		<div className="flex h-screen overflow-hidden">
			<div className="flex-1">
				<ChatInterface />
			</div>
			<div className="flex-1 p-4 flex items-center justify-center">
				<FlashCardShow />
			</div>
		</div>
	);
}
