import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home-page">
      <Navbar />

      <div className="hero">
        <h1 className="hero-title">
          <span className="typewriter">
            Every Secret Comes to Light.
          </span>
        </h1>

        <p className="hero-text">
          Nothing stays hidden forever.
          <br />
          Every choice leaves a trace, and every secret has its day.
          <br />
          The only question is whether you're ready for it.
        </p>

        <Link to="/gallery">
          <button className="hero-btn">
            Check Yours
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;