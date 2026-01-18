import React from "react";

type NewModalProps = {
	open: boolean;
	onClose: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal = ({ open, onClose }: NewModalProps) => {
	return (
		<div
			className={`fixed inset-0 flex justify-center items-center ${open ? "visible" : "invisible"}`}
		>
			<div>
				<div>hi</div>
			</div>
		</div>
	);
};

export default Modal;
