import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

function UploadForm() {
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [album, setAlbum] = useState("Family");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageUrl) {
      alert("Please enter an image URL.");
      return;
    }

    try {
      await addDoc(collection(db, "photos"), {
        imageUrl,
        caption,
        album,
        createdAt: serverTimestamp(),
      });

      alert("Photo added successfully!");

      setImageUrl("");
      setCaption("");
      setAlbum("Family");

    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        maxWidth: "500px",
        margin: "40px auto",
      }}
    >
      <h2>Add New Photo</h2>

      <input
        type="text"
        placeholder="Paste Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        style={{ padding: "12px" }}
      />

      <input
        type="text"
        placeholder="Write a caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        style={{ padding: "12px" }}
      />

      <select
        value={album}
        onChange={(e) => setAlbum(e.target.value)}
        style={{ padding: "12px" }}
      >
        <option value="Family">👨‍👩‍👧 Family</option>
        <option value="Baby">👶 Baby</option>
        <option value="Wedding">💍 Wedding</option>
        <option value="Birthdays">🎂 Birthdays</option>
        <option value="Trips">✈️ Trips</option>
        <option value="Christmas">🎄 Christmas</option>
      </select>

      <button
        type="submit"
        style={{
          padding: "12px",
          cursor: "pointer",
        }}
      >
        Save Photo
      </button>
    </form>
  );
}

export default UploadForm;