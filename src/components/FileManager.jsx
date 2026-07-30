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


function FileManager() {

  const [files, setFiles] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");



  async function loadFiles() {

    const q = query(
      collection(db, "files"),
      orderBy("createdAt", "desc")
    );


    const snapshot = await getDocs(q);


    const data = snapshot.docs.map((docItem)=>({

      id: docItem.id,
      ...docItem.data(),

    }));


    setFiles(data);

  }





  useEffect(()=>{

    loadFiles();

  },[]);







  async function handleAdd(e){

    e.preventDefault();


    if(!title || !content){

      alert("Please fill all fields.");

      return;

    }



    try{


      await addDoc(
        collection(db,"files"),
        {
          title,
          content,
          createdAt: serverTimestamp(),
        }
      );


      setTitle("");

      setContent("");


      loadFiles();


      alert("File added successfully.");


    }catch(error){

      console.error(error);

      alert("Failed to add file.");

    }

  }








  async function handleDelete(id){


    if(!window.confirm("Delete this file?")) return;



    try{


      await deleteDoc(
        doc(db,"files",id)
      );


      loadFiles();



    }catch(error){

      console.error(error);

      alert("Failed to delete file.");

    }


  }









  async function handleEdit(file){


    const newTitle = prompt(
      "Enter new title:",
      file.title
    );


    if(newTitle === null) return;



    const newContent = prompt(
      "Enter new content:",
      file.content
    );


    if(newContent === null) return;





    try{


      await updateDoc(

        doc(db,"files",file.id),

        {
          title:newTitle,
          content:newContent,
        }

      );



      loadFiles();


      alert("File updated successfully.");



    }catch(error){

      console.error(error);

      alert("Failed to update file.");

    }


  }







  return (

    <div>


      <h2
        style={{
          textAlign:"center",
          marginBottom:"30px",
        }}
      >
        Manage Files
      </h2>





      <form

        onSubmit={handleAdd}

        style={{
          background:"#1e293b",
          padding:"20px",
          borderRadius:"12px",
          marginBottom:"40px",
        }}

      >


        <h3>
          Add New File
        </h3>




        <input

          type="text"

          placeholder="File title"

          value={title}

          onChange={(e)=>setTitle(e.target.value)}

          style={{
            width:"100%",
            padding:"10px",
            marginBottom:"10px",
            borderRadius:"8px",
            border:"none",
          }}

        />





        <textarea

          placeholder="Write content"

          value={content}

          onChange={(e)=>setContent(e.target.value)}

          rows="5"

          style={{
            width:"100%",
            padding:"10px",
            borderRadius:"8px",
            border:"none",
            marginBottom:"10px",
          }}

        />






        <button

          type="submit"

          style={{
            width:"100%",
            padding:"10px",
            background:"#2563eb",
            color:"white",
            border:"none",
            borderRadius:"8px",
            cursor:"pointer",
          }}

        >

          Add File

        </button>




      </form>







      {files.length === 0 ? (

        <p style={{textAlign:"center"}}>
          No files found.
        </p>


      ) : (


        <div>


          {files.map((file)=>(


            <div

              key={file.id}

              style={{
                background:"#1e293b",
                padding:"20px",
                borderRadius:"12px",
                marginBottom:"20px",
              }}

            >



              <h3>
                {file.title}
              </h3>




              <p
                style={{
                  color:"#cbd5e1",
                  whiteSpace:"pre-wrap",
                }}
              >
                {file.content}
              </p>





              <button

                onClick={()=>handleEdit(file)}

                style={{
                  width:"100%",
                  padding:"10px",
                  marginBottom:"10px",
                  background:"#2563eb",
                  color:"white",
                  border:"none",
                  borderRadius:"8px",
                  cursor:"pointer",
                }}

              >

                Edit File

              </button>






              <button

                onClick={()=>handleDelete(file.id)}

                style={{
                  width:"100%",
                  padding:"10px",
                  background:"#dc2626",
                  color:"white",
                  border:"none",
                  borderRadius:"8px",
                  cursor:"pointer",
                }}

              >

                Delete File

              </button>



            </div>


          ))}


        </div>


      )}



    </div>

  );

}


export default FileManager;