const express = require("express");
const fileUpload = require("express-fileupload");
const pdfParse = require("pdf-parse");

const app = express();

app.use("/", express.static("app"));
app.use(fileUpload());

const PORT = process.env.PORT || 3000; //test

app.listen(PORT);

app.post("/upload", async (req, res) => {
	if (!req.files || !req.files.pdf) {
		return res.status(400).send("No PDF uploaded");
	}

	const pdfFile = req.files.pdf;

	try {
		const data = await pdfParse(pdfFile.data);
		res.json({ text: data.text });
	} catch (err) {
		console.error(err);
		res.status(500).send("Failed to parse PDF");
	}
});
