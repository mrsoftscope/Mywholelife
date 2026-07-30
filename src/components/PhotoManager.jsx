import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase/config";

function PhotoManager() {
  const [photos, setPhotos] = useState([]);

  async function loadPhotos() {
    const q = query(
      collection(db, "photos"),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    const data = snapshot.docs.map((docItem) => ({
      id: docItem.id,
      ...docItem.data(),
    }));

    setPhotos(data);
  }

  useEffect(() => {
    loadPhotos();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this photo?")) return;

    try {
      await deleteDoc(doc(db, "photos", id));
      loadPhotos();
    } catch (error) {
      console.error(error);
      alert("Failed to delete photo.");
    }
  };

  return (
    <div>
      <h2
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        Manage Photos
      </h2>

      {photos.length === 0 ? (
        <p style={{ textAlign: "center" }}>
          No photos found.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
          }}
        >
          {photos.map((photo) => (
            <div
              key={photo.id}
              style={{
                background: "#1e293b",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <img
                src={photo.imageUrl}
                alt="Photo"
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                }}
              />

              <div style={{ padding: "15px" }}>
                <button
                  onClick={() => handleDelete(photo.id)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    background: "#dc2626",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Delete Photo
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PhotoManager;