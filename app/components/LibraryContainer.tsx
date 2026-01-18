"use client";
import React from "react";
import RemoveButton from "./RemoveButton";
import EditButton from "./EditButton";
import Modal from "./Modal";

const LibraryContainer = () => {
	return (
		<div className="mx-96 my-5 border-2 hover:bg-amber-200">
			<div className="p-2 flex flex-row items-center justify-between">
				<h2 className="font-black text-xl">Title</h2>
				<div className="flex flex-row gap-x-4">
					<EditButton />
					<RemoveButton />
				</div>
			</div>
		</div>
	);
};

export default LibraryContainer;
