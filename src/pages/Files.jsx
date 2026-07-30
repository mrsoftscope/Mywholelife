import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "../firebase/config";
import Navbar from "../components/Navbar";


function Files() {

  const [files, setFiles] = useState([]);


  async function loadFiles() {

    const q = query(
      collection(db, "files"),
      orderBy("createdAt", "desc")
    );


    const snapshot = await getDocs(q);


    const data = snapshot.docs.map((docItem) => ({
      id: docItem.id,
      ...docItem.data(),
    }));


    setFiles(data);

  }




  useEffect(() => {

    loadFiles();

  }, []);





  return (

    <div

      style={{
        minHeight:"100vh",
        background:"#020617",
        color:"white",
      }}

    >


      <Navbar />




      <div

        style={{
          maxWidth:"1000px",
          margin:"auto",
          padding:"60px 25px",
        }}

      >



        <h1

          style={{
            fontSize:"clamp(2.5rem,6vw,4rem)",
            textAlign:"center",
            marginBottom:"20px",
          }}

        >

          Case Files

        </h1>





        <p

          style={{
            color:"#cbd5e1",
            fontSize:"18px",
            textAlign:"center",
            marginBottom:"40px",
          }}

        >

          Every story deserves to be remembered.

          <br />

          This section contains written records,
          case files and archived memories.

        </p>







        {files.length === 0 ? (

          <p style={{textAlign:"center"}}>

            No files available.

          </p>


        ) : (


          <div>


            {files.map((file)=>(


              <div

                key={file.id}

                style={{
                  background:"#1e293b",
                  padding:"25px",
                  borderRadius:"12px",
                  marginBottom:"20px",
                }}

              >



                <h2>

                  {file.title}

                </h2>





                <p

                  style={{
                    color:"#cbd5e1",
                    whiteSpace:"pre-wrap",
                    lineHeight:"1.7",
                  }}

                >

                  {file.content}

                </p>



              </div>


            ))}



          </div>


        )}



      </div>


    </div>

  );

}


export default Files;