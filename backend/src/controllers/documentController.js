// backend/src/controllers/documentController.js
const Document = require("../models/Document");

exports.getDocuments = async (req, res) => {
  try {
    const docs = await Document.find().sort({ updatedAt: -1 });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getDocumentById = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Document not found" });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.createDocument = async (req, res) => {
  try {
    const { title } = req.body;
    const newDoc = await Document.create({ title });
    res.status(201).json(newDoc);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateDocument = async (req, res) => {
  try {
    const { content, title } = req.body;
    const updated = await Document.findByIdAndUpdate(
      req.params.id,
      { content, title },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};



exports.deleteDocument = async (req, res) => {
  try {
    await Document.findByIdAndDelete(req.params.id);
    res.json({ message: "Document deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
