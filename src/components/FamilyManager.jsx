import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  addDoc,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/config";

function FamilyManager() {
  const [families, setFamilies] = useState([]);

  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [birthday, setBirthday] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  async function loadFamilies() {
    const q = query(
      collection(db, "families"),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    const data = snapshot.docs.map((docItem) => ({
      id: docItem.id,
      ...docItem.data(),
    }));

    setFamilies(data);
  }

  useEffect(() => {
    loadFamilies();
  }, []);

  async function handleAdd(e) {
    e.preventDefault();

    if (!name || !relationship || !birthday) {
      alert("Please complete all required fields.");
      return;
    }

    try {
      await addDoc(collection(db, "families"), {
        name,
        relationship,
        birthday,
        photoUrl,
        createdAt: serverTimestamp(),
      });

      setName("");
      setRelationship("");
      setBirthday("");
      setPhotoUrl("");

      loadFamilies();

      alert("Family member added successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to add family member.");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this family member?")) return;

    try {
      await deleteDoc(doc(db, "families", id));
      loadFamilies();
    } catch (error) {
      console.error(error);
      alert("Failed to delete family member.");
    }
  }

  async function handleEdit(member) {
    const newName = prompt("Name:", member.name);
    if (newName === null) return;

    const newRelationship = prompt(
      "Relationship:",
      member.relationship
    );
    if (newRelationship === null) return;

    const newBirthday = prompt(
      "Birthday (YYYY-MM-DD):",
      member.birthday
    );
    if (newBirthday === null) return;

    const newPhotoUrl = prompt(
      "Photo URL (optional):",
      member.photoUrl || ""
    );
    if (newPhotoUrl === null) return;

    try {
      await updateDoc(doc(db, "families", member.id), {
        name: newName,
        relationship: newRelationship,
        birthday: newBirthday,
        photoUrl: newPhotoUrl,
      });

      loadFamilies();

      alert("Family member updated successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to update family member.");
    }
  }

  return (
    <div>
      <h2
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        Manage Family Members
      </h2>

      <form
        onSubmit={handleAdd}
        style={{
          background: "#1e293b",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "40px",
        }}
      >
        <h3>Add Family Member</h3>

        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Relationship"
          value={relationship}
          onChange={(e) => setRelationship(e.target.value)}
          style={inputStyle}
        />

        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          style={inputStyle}
        />

        <input
          type="url"
          placeholder="Photo URL (optional)"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
          style={inputStyle}
        />

        <button
          type="submit"
          style={buttonStyle}
        >
          Add Family Member
        </button>
      </form>

      {families.length === 0 ? (
        <p style={{ textAlign: "center" }}>
          No family members found.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: "20px",
          }}
        >
          {families.map((member) => (
            <div
              key={member.id}
              style={{
                background: "#1e293b",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              {member.photoUrl ? (
                <img
                  src={member.photoUrl}
                  alt={member.name}
                  style={{
                    width: "100%",
                    height: "250px",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div
                  style={{
                    height: "250px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "80px",
                    background: "#334155",
                  }}
                >
                  👤
                </div>
              )}

              <div style={{ padding: "20px" }}>
                <h3>{member.name}</h3>

                <p>{member.relationship}</p>

                <p>🎂 {member.birthday}</p>

                <button
                  onClick={() => handleEdit(member)}
                  style={{
                    ...buttonStyle,
                    marginTop: "15px",
                    marginBottom: "10px",
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(member.id)}
                  style={{
                    ...buttonStyle,
                    background: "#dc2626",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "12px",
  border: "none",
  borderRadius: "8px",
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

export default FamilyManager;