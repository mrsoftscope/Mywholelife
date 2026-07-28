import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/config";
import Navbar from "../components/Navbar";
import "../styles/Gallery.css";

function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState("All");

  useEffect(() => {
    async function fetchPhotos() {
      const q = query(
        collection(db, "photos"),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPhotos(data);
    }

    fetchPhotos();
  }, []);

  const filteredPhotos = photos.filter((photo) => {
    if (selectedAlbum === "All") return true;
    return (photo.album || "Family") === selectedAlbum;
  });

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
          padding: "40px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          📸 Family Gallery
        </h1>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "35px",
          }}
        >
          <select
            value={selectedAlbum}
            onChange={(e) => setSelectedAlbum(e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "8px",
              fontSize: "16px",
              minWidth: "220px",
              cursor: "pointer",
            }}
          >
            <option value="All">📚 All Albums</option>
            <option value="Family">👨‍👩‍👧 Family</option>
            <option value="Baby">👶 Baby</option>
            <option value="Wedding">💍 Wedding</option>
            <option value="Birthdays">🎂 Birthdays</option>
            <option value="Trips">✈️ Trips</option>
            <option value="Christmas">🎄 Christmas</option>
          </select>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "25px",
          }}
        >
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              style={{
                background: "#1e293b",
                borderRadius: "18px",
                overflow: "hidden",
                cursor: "pointer",
                transition: "0.3s",
                boxShadow: "0 10px 25px rgba(0,0,0,.35)",
              }}
            >
              <img
                src={photo.imageUrl}
                alt={photo.caption}
                style={{
                  width: "100%",
                  height: "280px",
                  objectFit: "cover",
                }}
              />

              <div
                style={{
                  padding: "18px",
                }}
              >
                <p
                  style={{
                    color: "#60a5fa",
                    fontWeight: "bold",
                    marginBottom: "8px",
                  }}
                >
                  {photo.album || "Family"}
                </p>

                <p>{photo.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.9)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "900px",
              width: "100%",
            }}
          >
            <img
              src={selectedPhoto.imageUrl}
              alt={selectedPhoto.caption}
              style={{
                width: "100%",
                borderRadius: "12px",
              }}
            />

            <h3
              style={{
                textAlign: "center",
                color: "#60a5fa",
                marginTop: "20px",
              }}
            >
              {selectedPhoto.album || "Family"}
            </h3>

            <h2
              style={{
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              {selectedPhoto.caption}
            </h2>

            <button
              onClick={() => setSelectedPhoto(null)}
              style={{
                marginTop: "20px",
                width: "100%",
                padding: "12px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "18px",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;