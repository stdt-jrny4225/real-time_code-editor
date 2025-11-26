const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const documentRoutes = require("./routes/documentRoutes");
const registerEditorSocket = require("./socket/editorSocket");

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api/documents", documentRoutes);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

registerEditorSocket(io);

const PORT = process.env.PORT || 5000;
connectDB();

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
