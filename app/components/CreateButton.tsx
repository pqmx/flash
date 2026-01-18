"use client";
import React from "react";

interface CreateButtonProps {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateButton = ({ setOpen }: CreateButtonProps) => {
	return (
		<button
			className="bg-blue-300 px-10"
			onClick={() => setOpen(true)}
		>
			<h3>+ Create New Set </h3>
		</button>
	);
};

export default CreateButton;
