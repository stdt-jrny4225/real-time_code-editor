// frontend/src/components/Editor.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDocumentById, updateDocument } from "../services/api";
import { getSocket } from "../utils/socket";

const AUTO_SAVE_INTERVAL_MS = 3000;

export default function Editor() {
  const { id } = useParams();
  const [socket, setSocket] = useState(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [typingUser, setTypingUser] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [activeUsers, setActiveUsers] = useState([]);

  // Ask user name once (stored in localStorage)
  useEffect(() => {
    const stored = localStorage.getItem("rtce_username");
    if (stored) {
      setUsername(stored);
    } else {
      const name = prompt("Enter your name (for collaboration):") || "Guest";
      setUsername(name);
      localStorage.setItem("rtce_username", name);
    }
  }, []);

  // connect socket + join room when id & username ready
  useEffect(() => {
    if (!id || !username) return;

    const s = getSocket();
    setSocket(s);

    s.emit("join-document", { documentId: id, username });

    s.once("load-document", (docContent) => {
      setContent(docContent || "");
    });

    return () => {
      // keep socket open per tab; if you want, you can disconnect:
      // s.disconnect();
    };
  }, [id, username]);

  // load title/content via REST (for safety)
  useEffect(() => {
    const load = async () => {
      const doc = await getDocumentById(id);
      setTitle(doc.title);
      setContent(doc.content || "");
    };
    load();
  }, [id]);

  // receive changes from other clients + typing + active users
  useEffect(() => {
    if (!socket) return;

    const handleContent = (newContent) => {
      setContent(newContent);
    };

    const handleTyping = (name) => {
      setTypingUser(name);
      setTimeout(() => setTypingUser(""), 2000);
    };

    const handleActiveUsers = (users) => {
      setActiveUsers(users);
    };

    socket.on("receive-changes", handleContent);
    socket.on("user-typing", handleTyping);
    socket.on("active-users", handleActiveUsers);

    return () => {
      socket.off("receive-changes", handleContent);
      socket.off("user-typing", handleTyping);
      socket.off("active-users", handleActiveUsers);
    };
  }, [socket]);

  // when user types
  const handleChange = (e) => {
    const value = e.target.value;
    setContent(value);
    if (socket) {
      socket.emit("send-changes", value);
      socket.emit("typing", { documentId: id, username });
    }
  };

  // manual save button
  const handleSaveClick = async () => {
    if (!socket || !id) return;
    try {
      setIsSaving(true);
      await updateDocument(id, { title, content });
      socket.emit("save-document", { documentId: id, content });
      setSaveMessage("Saved ✓");
      setTimeout(() => setSaveMessage(""), 2000);
    } catch (err) {
      setSaveMessage("Save failed");
      setTimeout(() => setSaveMessage(""), 2000);
    } finally {
      setIsSaving(false);
    }
  };

  // auto-save every few seconds
  useEffect(() => {
    if (!socket || !id) return;

    const interval = setInterval(() => {
      socket.emit("save-document", { documentId: id, content });
      updateDocument(id, { title, content }).catch(() => {});
    }, AUTO_SAVE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [socket, id, content, title]);

  const others = activeUsers.filter((u) => u !== username);

  return (
    <div className="editor-page card">
      <div className="editor-header">
        <div className="left">
          <input
            className="title-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="meta">
            <span className="username">You: {username}</span>
            {others.length > 0 && (
              <span className="active-users">
                Active: {others.join(", ")}
              </span>
            )}
            {typingUser && typingUser !== username && (
              <span className="typing-indicator">{typingUser} is typing…</span>
            )}
          </div>
        </div>

        <div className="right">
          {saveMessage && <span className="save-message">{saveMessage}</span>}
          <button
            className="btn btn-primary"
            onClick={handleSaveClick}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      <textarea
        className="text-editor"
        value={content}
        onChange={handleChange}
        placeholder="Start typing here..."
      />
    </div>
  );
}
