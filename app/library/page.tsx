"use client";
import React from "react";
import LibraryContainer from "../components/LibraryContainer";
import CreateButton from "../components/CreateButton";
import Modal from "../components/Modal";

const Library = () => {
	let [open, setOpen] = React.useState<boolean>(false);
	return (
		<div className="items-center text-center">
			<h1 className="font-black text-4xl pt-1">My Library</h1>
			<LibraryContainer />
			<Modal
				open={open}
				setOpen={setOpen}
			/>
			<CreateButton setOpen={setOpen} />
		</div>
	);
};

export default Library;
