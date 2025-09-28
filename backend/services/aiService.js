// require('dotenv').config();
// const { OpenAI } = require("openai");
// const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// const queryAI = async (message, context) => {
//   const prompt = `Answer the question based on this document: ${context}\n\nQuestion: ${message}`;
//   const response = await client.chat.completions.create({
//     model: "gpt-3.5-turbo",
//     messages: [{ role: "user", content: prompt }],
//     temperature: 0.2,
//   });
//   return response.choices[0].message.content;
// };

// module.exports = { queryAI };
// backend/services/aiService.js

//const fetch = require("node-fetch");
// At the very top of aiService.js

// Function to query Hugging Face
// async function queryAI(question, context) {
//   try {
//     const response = await fetch(`https://api-inference.huggingface.co/models/${MODEL}`, {
//       method: "POST",
//       headers: {
//         "Authorization": `Bearer ${HF_API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         inputs: {
//           question: question,
//           context: context || "No context provided.",
//         },
//       }),
//     });

//     const data = await response.json();

//     // Check for errors from HF
//     if (data.error) {
//       throw new Error(data.error);
//     }

//     // For roberta-base-squad2 Q&A, the answer is data.answer
//     return data.answer || data[0]?.generated_text || "No answer found.";
//   } catch (error) {
//     console.error("Hugging Face API error:", error);
//     throw error;
//   }
// }
// require("dotenv").config();
// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


// // Hugging Face API key
// const HF_API_KEY = process.env.HF_API_KEY; // Set this in your .env

// // Example model: gpt2 (text generation) or deepset/roberta-base-squad2 (Q&A)
// const MODEL = "deepset/roberta-base-squad2";

// async function queryAI(message) {
//   try {
//     const response = await fetch(`https://api-inference.huggingface.co/models/${HF_MODEL}`, {
//       method: "POST",
//       headers: {
//         "Authorization": `Bearer ${HF_API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ inputs: message }),
//     });

//     if (!response.ok) {
//       const error = await response.text();
//       console.error("Hugging Face API error:", error);
//       throw new Error(error);
//     }

//     const data = await response.json();
//     return data[0]?.generated_text || "No response from model.";
//   } catch (err) {
//     console.error("Hugging Face API error:", err);
//     throw err;
//   }
// }

// module.exports = { queryAI };


// require("dotenv").config();
// const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

// const HF_API_KEY = process.env.HF_API_KEY;

// // 👇 choose a free Hugging Face model
// const HF_MODEL = "openai-community/gpt2"; 
// // you can also try: "tiiuae/falcon-7b-instruct" (better but slower)

// async function queryAI(message) {
//   try {
//     const response = await fetch(`https://api-inference.huggingface.co/models/${HF_MODEL}`, {
//       method: "POST",
//       headers: {
//         "Authorization": `Bearer ${HF_API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ inputs: message }),
//     });

//     if (!response.ok) {
//       const error = await response.text();
//       console.error("Hugging Face API error:", error);
//       throw new Error(error);
//     }

//     const data = await response.json();
//     return data[0]?.generated_text || "No response from model.";
//   } catch (err) {
//     console.error("Hugging Face API error:", err);
//     throw err;
//   }
// }





module.exports = { queryAI };
require("dotenv").config();
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

const HF_API_KEY = process.env.HF_API_KEY;

// 👇 choose a free Hugging Face model
const HF_MODEL = "google/flan-t5-base"; 
// you can also try: "tiiuae/falcon-7b-instruct" (better but slower)

async function queryAI(message) {
  const API_URL = `https://api-inference.huggingface.co/models/${HF_MODEL}`;
  console.log("👉 Calling Hugging Face model:", HF_MODEL);
  console.log("👉 Endpoint:", API_URL);

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: message }),
    });

    console.log("👉 Response status:", response.status);

    if (!response.ok) {
      const error = await response.text();
      console.error("❌ Hugging Face API raw error:", error);
      throw new Error(error);
    }

    const data = await response.json();
    console.log("✅ Raw Hugging Face response:", JSON.stringify(data, null, 2));

    return data[0]?.generated_text || "No response from model.";
  } catch (err) {
    console.error("🚨 Hugging Face API error (caught):", err);
    throw err;
  }
}

module.exports = { queryAI };


