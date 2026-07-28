import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/Home.css";

function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #0f172a, #1e293b)",
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Navbar />

      {/* Hero Section */}
      <div
        style={{
          textAlign: "center",
          padding: "120px 20px",
          maxWidth: "900px",
          margin: "auto",
        }}
      >
        <h1
          style={{
            fontSize: "60px",
            marginBottom: "20px",
          }}
        >
          Every Memory Matters ❤️
        </h1>

        <p
          style={{
            fontSize: "22px",
            lineHeight: "1.8",
            color: "#d1d5db",
          }}
        >
          Welcome to our family's digital memory book.
          Every smile, every celebration, every milestone,
          all preserved in one beautiful place.
        </p>

        <Link to="/gallery">
          <button
            style={{
              marginTop: "40px",
              padding: "16px 35px",
              fontSize: "18px",
              borderRadius: "50px",
              border: "none",
              cursor: "pointer",
              background: "#2563eb",
              color: "white",
            }}
          >
            View Gallery
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;