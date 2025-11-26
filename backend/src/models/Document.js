// backend/src/models/Document.js
const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Untitled Document",
    },
    content: {
      type: String, // we’ll store the HTML from React-Quill
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Document", DocumentSchema);
