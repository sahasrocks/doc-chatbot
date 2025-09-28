# 🤖 AI Document Chatbot – Hugging Face Powered Chatbot

A **document-based AI chatbot** built with **Node.js, Express, Multer, and Hugging Face**.  
It allows users to upload documents and ask questions in natural language.

---

## 🚀 Features

* **Document Upload Service**
  * Upload PDF, TXT, or DOCX files
  * Stores files locally or on cloud storage
* **AI Query Service**
  * Sends user queries to Hugging Face models
  * Returns generated responses based on uploaded documents
* **API**
  * REST endpoints to upload documents and chat with the AI
  * Modular architecture to support multiple AI models
* **Environment Configurable**
  * Hugging Face API key & model can be configured via `.env`

---

## 🏗️ Architecture

         +-------------------+
         |   API Gateway     |
         | (Routing + Auth)  |
         +---------+---------+
                   |
    -------------------------------
    |                             |
    | Document Upload | | AI Query |
    | Service | | Service |
    | (Multer + FS) | | (Hugging Face) |
   
                     |
              +------v------+
                | Response |
                | to Client |
                +-------------+




---

## ⚙️ Tech Stack

* **Backend:** Node.js, Express
* **File Upload:** Multer
* **AI Models:** Hugging Face Inference API
* **Environment Variables:** dotenv
* **HTTP Client:** node-fetch

---

## 📂 Services & Ports

| Service              | Port | Description                        |
| -------------------- | ---- | ---------------------------------- |
| API Gateway / Server | 5000 | Entry point, handles chat requests |
| Document Upload      | 5000 | Handles uploaded documents         |
| AI Query Service     | 5000 | Calls Hugging Face API             |

---

## 🔑 Example API Endpoints

### Upload Document

```bash
curl -X POST http://localhost:5000/upload \
  -F "file=@document.pdf"
curl -X POST http://localhost:5000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Summarize the document"}'
{
  "response": "The document explains..."
}


🛠️ Setup & Run
1. Clone the repo
git clone https://github.com/yourusername/doc-chatbot.git
cd doc-chatbot/backend

2. Install dependencies
npm install

3. Configure .env
PORT=5000
HF_API_KEY=your_huggingface_api_key
HF_MODEL=tiiuae/falcon-7b-instruct


HF_MODEL can be any publicly available Hugging Face inference model.

4. Run the server
node server.js


Server will run at http://localhost:5000
