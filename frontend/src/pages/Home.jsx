// frontend/src/pages/Home.jsx
import { useEffect, useState } from "react";
import { getDocuments, createDocument, deleteDocument } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [docs, setDocs] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const loadDocs = async () => {
    const data = await getDocuments();
    setDocs(data);
  };

  useEffect(() => {
    loadDocs();
  }, []);

  const handleCreate = async () => {
    if (!title.trim()) return;
    const doc = await createDocument(title.trim());
    setTitle("");
    await loadDocs();
    navigate(`/documents/${doc._id}`);
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation(); // prevent navigation when clicking delete
    const ok = window.confirm("Are you sure you want to delete this document?");
    if (!ok) return;
    await deleteDocument(id);
    loadDocs();
  };

  return (
    <div className="card">
      <div className="home-header">
        <input
          type="text"
          placeholder="New document title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={handleCreate}>Create</button>
      </div>

      <h3>Your Documents</h3>
      <ul className="doc-list">
        {docs.map((d) => (
          <li
            key={d._id}
            className="doc-item"
            onClick={() => navigate(`/documents/${d._id}`)}
          >
            <div>
              <strong>{d.title}</strong>
              <div style={{ fontSize: 12, color: "#6b7280" }}>
                Last updated: {new Date(d.updatedAt).toLocaleString()}
              </div>
            </div>

            <button
              className="btn btn-danger"
              onClick={(e) => handleDelete(e, d._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
