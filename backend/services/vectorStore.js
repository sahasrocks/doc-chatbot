
// vectorStore.js (Upgraded)
// =======================

const { HfInference } = require("@huggingface/inference");
const faiss = require("faiss-node");

// Hugging Face client (needs HF_API_KEY in .env)
const hf = new HfInference(process.env.HF_API_KEY);

// Our FAISS index will store embeddings (dimension = 384 for MiniLM)
let dim = 384;
let index = new faiss.IndexFlatL2(dim);

// Keep mapping between FAISS vectors and original docs
let documents = [];

// Generate embedding for text using HuggingFace
async function embedText(text) {
  const result = await hf.featureExtraction({
    model: "sentence-transformers/all-MiniLM-L6-v2", // free embedding model
    inputs: text,
  });
  return Float32Array.from(result[0]); // convert to float32 for FAISS
}

// Add a new document (stores embedding + text)
async function addDocument(name, text) {
  const embedding = await embedText(text);

  // add to FAISS index
  index.add([embedding]);

  // track document
  documents.push({ name, text });
  console.log(`✅ Document added: ${name}`);
}

// Search for closest document given query
async function searchDocument(query, topK = 1) {
  const queryEmbedding = await embedText(query);

  // search topK docs
  const { labels, distances } = index.search([queryEmbedding], topK);

  if (labels[0].length > 0 && labels[0][0] !== -1) {
    const bestMatchIndex = labels[0][0];
    return documents[bestMatchIndex].text;
  } else {
    return "No relevant document found.";
  }
}

module.exports = { addDocument, searchDocument };


// let documents = [];

// const addDocument = (name, text) => {
//   documents.push({ name, text });
// };

// // Simple search: return document text that contains most keywords
// const searchDocument = (query) => {
//   const lowerQuery = query.toLowerCase();
//   let bestDoc = "";
//   let maxMatches = 0;
//   documents.forEach(doc => {
//     const matches = doc.text.toLowerCase().split(" ").filter(word => lowerQuery.includes(word)).length;
//     if (matches > maxMatches) {
//       maxMatches = matches;
//       bestDoc = doc.text;
//     }
//   });
//   return bestDoc;
// };

// module.exports = { addDocument, searchDocument };
