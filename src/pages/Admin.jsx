import { useState } from "react";
import Navbar from "../components/Navbar";
import UploadForm from "../components/UploadForm";
import PhotoManager from "../components/PhotoManager";
import FileManager from "../components/FileManager";
import FamilyManager from "../components/FamilyManager";
import LogoutButton from "../components/LogoutButton";

function Admin() {
  const [activeSection, setActiveSection] = useState("upload");

  function toggleSection(section) {
    setActiveSection((current) =>
      current === section ? "" : section
    );
  }

  const sectionStyle = {
    background: "#1e293b",
    borderRadius: "12px",
    marginBottom: "20px",
    overflow: "hidden",
    border: "1px solid #334155",
  };

  const headerStyle = {
    padding: "18px 20px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "18px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#172554",
    userSelect: "none",
  };

  const bodyStyle = {
    padding: "20px",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
      }}
    >
      <Navbar />

      <div
        style={{
          maxWidth: "1000px",
          margin: "40px auto",
          padding: "20px",
        }}
      >
        <LogoutButton />

        <h1
          style={{
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          Admin Dashboard
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#cbd5e1",
            marginBottom: "40px",
          }}
        >
          Welcome! Only you can manage your family memories.
        </p>

        {/* Upload Photos */}
        <div style={sectionStyle}>
          <div
            style={headerStyle}
            onClick={() => toggleSection("upload")}
          >
            <span>📷 Upload Photos</span>
            <span>
              {activeSection === "upload" ? "▼" : "▶"}
            </span>
          </div>

          {activeSection === "upload" && (
            <div style={bodyStyle}>
              <UploadForm />
            </div>
          )}
        </div>

        {/* Manage Photos */}
        <div style={sectionStyle}>
          <div
            style={headerStyle}
            onClick={() => toggleSection("photos")}
          >
            <span>🖼️ Manage Photos</span>
            <span>
              {activeSection === "photos" ? "▼" : "▶"}
            </span>
          </div>

          {activeSection === "photos" && (
            <div style={bodyStyle}>
              <PhotoManager />
            </div>
          )}
        </div>

        {/* Manage Files */}
        <div style={sectionStyle}>
          <div
            style={headerStyle}
            onClick={() => toggleSection("files")}
          >
            <span>📁 Manage Files</span>
            <span>
              {activeSection === "files" ? "▼" : "▶"}
            </span>
          </div>

          {activeSection === "files" && (
            <div style={bodyStyle}>
              <FileManager />
            </div>
          )}
        </div>

        {/* Manage Family Members */}
        <div style={sectionStyle}>
          <div
            style={headerStyle}
            onClick={() => toggleSection("families")}
          >
            <span>👨‍👩‍👧‍👦 Manage Family Members</span>
            <span>
              {activeSection === "families" ? "▼" : "▶"}
            </span>
          </div>

          {activeSection === "families" && (
            <div style={bodyStyle}>
              <FamilyManager />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;