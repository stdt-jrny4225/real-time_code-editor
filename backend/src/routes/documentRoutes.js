// backend/src/routes/documentRoutes.js
const express = require("express");
const router = express.Router();
const {
  getDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument, 
} = require("../controllers/documentController");

router.get("/", getDocuments);
router.post("/", createDocument);
router.get("/:id", getDocumentById);
router.put("/:id", updateDocument);
router.delete("/:id", deleteDocument); 

module.exports = router;
