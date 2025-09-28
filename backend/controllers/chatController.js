//const { queryAI } = require("../services/aiService");
const { addDocument, searchDocument } = require("../services/vectorStore");
const fs = require("fs");
const pdfParse = require("pdf-parse");


const { queryAI } = require("../services/aiService");

async function handleChat(req, res) {
  try {
    const { message } = req.body;
    const context = "Your document text here"; // Replace with uploaded doc content if needed

    const answer = await queryAI(message, context);

    res.json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get response from AI" });
  }
}

module.exports = { handleChat };


const uploadDocument = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    let text = "";
    if (file.mimetype === "application/pdf") {
      const dataBuffer = fs.readFileSync(file.path);
      const data = await pdfParse(dataBuffer);
      text = data.text;
    } else {
      text = fs.readFileSync(file.path, "utf-8");
    }

    addDocument(file.originalname, text);
    fs.unlinkSync(file.path); // cleanup
    res.json({ message: "Document uploaded and processed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "File processing failed" });
  }
};

module.exports = { handleChat, uploadDocument };
