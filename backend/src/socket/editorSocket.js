// backend/src/socket/editorSocket.js
const Document = require("../models/Document");

const activeUsersByDoc = new Map(); // documentId -> Set(usernames)

const registerEditorSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("join-document", async ({ documentId, username }) => {
      socket.join(documentId);
      console.log(`Socket ${socket.id} joined room ${documentId} as ${username}`);

      // remember on socket for cleanup
      socket.data.docId = documentId;
      socket.data.username = username;

      // send current document content
      try {
        const doc = await Document.findById(documentId);
        if (doc) {
          socket.emit("load-document", doc.content || "");
        }
      } catch (err) {
        console.error("Error loading document:", err.message);
      }

      // update active users
      let users = activeUsersByDoc.get(documentId) || new Set();
      users.add(username);
      activeUsersByDoc.set(documentId, users);
      io.to(documentId).emit("active-users", Array.from(users));

      // receive content changes
      socket.on("send-changes", (content) => {
        socket.broadcast.to(documentId).emit("receive-changes", content);
      });

      // typing indicator
      socket.on("typing", ({ documentId, username }) => {
        socket.broadcast.to(documentId).emit("user-typing", username);
      });

      // save document
      socket.on("save-document", async ({ documentId, content }) => {
        try {
          await Document.findByIdAndUpdate(documentId, { content });
        } catch (err) {
          console.error("Error saving document:", err.message);
        }
      });
    });

    socket.on("disconnect", () => {
      const { docId, username } = socket.data || {};
      if (docId && username) {
        let users = activeUsersByDoc.get(docId);
        if (users) {
          users.delete(username);
          activeUsersByDoc.set(docId, users);
          // broadcast updated list
          io.to(docId).emit("active-users", Array.from(users));
        }
      }
      console.log("Client disconnected:", socket.id);
    });
  });
};

module.exports = registerEditorSocket;
