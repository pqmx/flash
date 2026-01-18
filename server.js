const express = require("express");
const fileUpload = require("express-fileupload");
const pdfParse = require("pdf-parse");

const app = express();

app.use("/", express.static("app"));
app.use(fileUpload());

const PORT = process.env.PORT || 4000; //testa

app.listen(PORT);
