import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/config";
import Navbar from "../components/Navbar";
import "../styles/Gallery.css";

function Gallery() {

  const [photos, setPhotos] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showImages, setShowImages] = useState(false);
  const [loading, setLoading] = useState(false);


  async function loadPhotos() {
  try {
    setLoading(true);

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
    setShowImages(true);
  } catch (error) {
    console.error("Gallery Error:", error);

    alert(
      `Failed to load images.\n\n${error.message}`
    );
  } finally {
    setLoading(false);
  }
}

  useEffect(() => {

    function handleKeyDown(e) {

      if (selectedIndex === null) return;


      if (e.key === "Escape") {
        setSelectedIndex(null);
      }


      if (e.key === "ArrowRight") {
        nextPhoto();
      }


      if (e.key === "ArrowLeft") {
        previousPhoto();
      }

    }


    window.addEventListener(
      "keydown",
      handleKeyDown
    );


    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );


  }, [selectedIndex, photos]);




  function nextPhoto() {

    if (selectedIndex === null) return;


    if (selectedIndex < photos.length - 1) {

      setSelectedIndex(
        selectedIndex + 1
      );

    }

  }




  function previousPhoto() {

    if (selectedIndex === null) return;


    if (selectedIndex > 0) {

      setSelectedIndex(
        selectedIndex - 1
      );

    }

  }




  const selectedPhoto =
    selectedIndex !== null
      ? photos[selectedIndex]
      : null;




  function closeViewer() {

    setSelectedIndex(null);

  }





  return (

    <div className="gallery-page">


      <Navbar />



      <div className="gallery-container">



        <h1 className="gallery-title">
          The Revelation
        </h1>




        <div className="gallery-buttons">


          <Link
            to="/files"
            className="gallery-btn"
          >
            Your Files
          </Link>




          <button

            className="gallery-btn"

            onClick={loadPhotos}

          >

            Your Images

          </button>





          <Link
            to="/families"
            className="gallery-btn"
          >
            Your Families
          </Link>



        </div>





        {!showImages && (

          <div
            style={{
              textAlign:"center",
              marginTop:"40px",
              color:"#666"
            }}
          >

            Click "Your Images" to view memories

          </div>

        )}






        {loading && (

          <div
            style={{
              textAlign:"center",
              marginTop:"30px"
            }}
          >

            Loading images...

          </div>

        )}







        {showImages && !loading && (

          <div className="gallery-grid">


            {photos.map((photo,index)=>(


              <div

                key={photo.id}

                className="gallery-card"

                onClick={() =>
                  setSelectedIndex(index)
                }

              >



                <img

                  src={photo.imageUrl}

                  alt="memory"

                />



                



              </div>


            ))}


          </div>

        )}



      </div>






      {selectedPhoto && (

        <div

          className="viewer"

          onClick={closeViewer}

        >



          <div

            className="viewer-box"

            onClick={(e)=>e.stopPropagation()}

          >



            <div
              style={{
                display:"flex",
                justifyContent:"space-between",
                alignItems:"center",
                marginBottom:"15px",
                color:"white"
              }}
            >



              <button

                onClick={previousPhoto}

                disabled={selectedIndex===0}

              >

                ◀

              </button>





              <span>

                Image {selectedIndex + 1}
                {" "}of{" "}
                {photos.length}

              </span>





              <button

                onClick={nextPhoto}

                disabled={
                  selectedIndex === photos.length - 1
                }

              >

                ▶

              </button>



            </div>





            <img

              src={selectedPhoto.imageUrl}

              alt="selected memory"

            />




            <button

              className="close-btn"

              onClick={closeViewer}

            >

              Return

            </button>




          </div>


        </div>


      )}



    </div>

  );

}


export default Gallery;