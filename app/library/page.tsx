"use client";
import React from "react";
import LibraryContainer from "../components/LibraryContainer";
import CreateButton from "../components/CreateButton";
import Modal from "../components/Modal";

const Library = () => {
	let [open, setOpen] = React.useState<boolean>(true);
	return (
		<div className="items-center text-center">
			<h1 className="font-black text-4xl pt-1">My Library</h1>
			<LibraryContainer />
			<Modal
				open={open}
				onClose={() => setOpen(true)}
			/>
			<CreateButton />
		</div>
	);
};

export default Library;
