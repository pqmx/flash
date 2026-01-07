"use client";

import React from "react";
import Image from "next/image";
import FlashCard from "./FlashCard";
import LeftArrow from "../../public/left-arrow.svg";
import RightArrow from "../../public/right-arrow.svg";

const arrowSize = 20;

type User = {
	id: string;
	name: string;
};

const FlashCardShow = () => {
	const [data, setData] = React.useState<User[]>([]); // store array of users
	const [currentIndex, setCurrentIndex] = React.useState(0); // track which card to show

	React.useEffect(() => {
		// fetch data
		fetch("https://jsonplaceholder.typicode.com/users")
			.then((response) => {
				if (!response.ok) throw new Error("Network response was not ok");
				return response.json(); // parse JSON
			})
			.then((users: User[]) => setData(users)) // save data to state
			.catch((error) => console.error(error));
	}, []);

	const nextCard = () => {
		setCurrentIndex((prev) => (prev + 1) % data.length);
	};

	const prevCard = () => {
		setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
	};

	if (data.length === 0) return <div>Loading...</div>; // show loading until data arrives

	return (
		<div>
			<FlashCard
				front={data[currentIndex].name}
				back={`User ID: ${data[currentIndex].id}`}
			/>
			<div className="flex flex-row gap-2 justify-center mt-4">
				<button
					className="hover:bg-gray-100 p-2 rounded-3xl"
					onClick={prevCard}
				>
					<Image
						src={LeftArrow}
						alt="left-arrow"
						height={arrowSize}
						width={arrowSize}
					/>
				</button>
				<button
					className="hover:bg-gray-100 p-2 rounded-3xl"
					onClick={nextCard}
				>
					<Image
						src={RightArrow}
						alt="right-arrow"
						height={arrowSize}
						width={arrowSize}
					/>
				</button>
			</div>
		</div>
	);
};

export default FlashCardShow;
