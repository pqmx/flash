import React, { useState } from "react";
import FileUpload from "./FileUpload";

type NewModalProps = {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal = ({ open, setOpen }: NewModalProps) => {
	return (
		<div
			className={`fixed inset-0 flex justify-center items-center transition-opacity ${
				open ? "visible bg-black/40" : "invisible opacity-0"
			}`}
		>
			<div className="relative bg-white w-1/2 h-1/3 p-6 rounded-lg shadow-sm flex flex-col">
				<button
					onClick={() => setOpen(false)}
					className="absolute top-2 right-2 text-gray-700 text-lg font-bold hover:text-gray-900"
				>
					×
				</button>
				<div className="flex-1 flex items-center justify-center text-gray-800 text-lg">
					<FileUpload />
				</div>
			</div>
		</div>
	);
};

export default Modal;
