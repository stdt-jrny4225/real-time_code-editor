require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");
const documentRoutes = require("./routes/documentRoutes");
const registerEditorSocket = require("./socket/editorSocket");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Real-time Editor API is running");
});

app.use("/api/documents", documentRoutes);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

registerEditorSocket(io);

const PORT = process.env.PORT;
connectDB();

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
