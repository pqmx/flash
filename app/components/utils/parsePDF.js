// parse pdf to text

import FormData from "form-data";

const parsePDF = async (file) => {
	try {
		const pdfToText = await fetch("http://localhost:5001/upload", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		});
	} catch (err) {
		console.error(err.message);
	}
};
// call python flashcard aws api
// call crud api get.
// woohoo!

export default parsePDF;
