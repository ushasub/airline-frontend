import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const UploadCSV = () => {
  const [file, setFile] = useState(null);
  const { token } = useContext(AuthContext);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("No file selected");

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:4000/api/airlines/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();
    alert(data.message || "Upload complete");
  };

  return (
    <main>
      <h2>Upload CSV</h2>
      <form onSubmit={handleUpload}>
        <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>
    </main>
  );
};

export default UploadCSV;