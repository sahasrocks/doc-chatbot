let documents = [];

const addDocument = (name, text) => {
  documents.push({ name, text });
};

// Simple search: return document text that contains most keywords
const searchDocument = (query) => {
  const lowerQuery = query.toLowerCase();
  let bestDoc = "";
  let maxMatches = 0;
  documents.forEach(doc => {
    const matches = doc.text.toLowerCase().split(" ").filter(word => lowerQuery.includes(word)).length;
    if (matches > maxMatches) {
      maxMatches = matches;
      bestDoc = doc.text;
    }
  });
  return bestDoc;
};

module.exports = { addDocument, searchDocument };
