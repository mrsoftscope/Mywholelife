import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "../firebase/config";
import Navbar from "../components/Navbar";

function Families() {
  const [families, setFamilies] = useState([]);

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

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "white",
      }}
    >
      <Navbar />

      <div
        style={{
          maxWidth: "1100px",
          margin: "auto",
          padding: "60px 25px",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(2.5rem,6vw,4rem)",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Family Records
        </h1>

        <p
          style={{
            color: "#cbd5e1",
            fontSize: "18px",
            textAlign: "center",
            marginBottom: "50px",
          }}
        >
          Every family has a history.
          <br />
          Meet the people who are part of our story.
        </p>

        {families.length === 0 ? (
          <p
            style={{
              textAlign: "center",
              color: "#94a3b8",
            }}
          >
            No family members have been added yet.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: "25px",
            }}
          >
            {families.map((member) => (
              <div
                key={member.id}
                style={{
                  background: "#1e293b",
                  borderRadius: "16px",
                  overflow: "hidden",
                  textAlign: "center",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
                }}
              >
                {member.photoUrl ? (
                  <img
                    src={member.photoUrl}
                    alt={member.name}
                    style={{
                      width: "100%",
                      height: "300px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      height: "300px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "90px",
                      background: "#334155",
                    }}
                  >
                    👤
                  </div>
                )}

                <div style={{ padding: "20px" }}>
                  <h2
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    {member.name}
                  </h2>

                  <p
                    style={{
                      color: "#60a5fa",
                      fontWeight: "bold",
                      marginBottom: "12px",
                    }}
                  >
                    {member.relationship}
                  </p>

                  <p
                    style={{
                      color: "#cbd5e1",
                    }}
                  >
                    🎂 {member.birthday}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Families;