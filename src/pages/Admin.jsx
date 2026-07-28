import Navbar from "../components/Navbar";
import UploadForm from "../components/UploadForm";
import PhotoManager from "../components/PhotoManager";
import LogoutButton from "../components/LogoutButton";

function Admin() {
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

        <UploadForm />

        <hr
          style={{
            margin: "50px 0",
            borderColor: "#334155",
          }}
        />

        <PhotoManager />
      </div>
    </div>
  );
}

export default Admin;