import React, { useState, useEffect } from "react";
import styles from "./Album.module.css";
import axios from "axios";
import Link from "next/link";
import Header from "@/components/Header.js/Header";
import Rwdbtn from "@/components/Rwdbtn/Rwdbtn";
import Swal from "sweetalert2";

export default function Album() {
  const [userData, setUserData] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId) {
          // 獲取用戶
          const userResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${storedUserId}`);
          setUserData(userResponse.data);
  
          // 獲取相冊
          const albumsResponse = await axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${storedUserId}`);
          setAlbums(albumsResponse.data);
  
          // 獲取相片
          const photosResponse = await axios.get(`https://jsonplaceholder.typicode.com/photos?userId=${storedUserId}`);
          setPhotos(photosResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  

  
  const photosByAlbum = photos.reduce((acc, photo) => {
    acc[photo.albumId] = acc[photo.albumId] || [];
    if (acc[photo.albumId].length < 4) {
      // 只保留每個相冊的前四張照片
      acc[photo.albumId].push(photo);
    }
    return acc;
  }, {});

  //彈跳視窗
  const handleImageClick = (photo) => {
    Swal.fire({
      html: `
  <div class=swal >
      <span>Download&nbsp;&nbsp;&nbsp;<i class="fa-solid fa-download"></i></span>
      <span>Share&nbsp;&nbsp;&nbsp;<i class='fa-solid fa-share'></i></span>
      <span>info&nbsp;&nbsp;&nbsp;<i class="fa-solid fa-circle-exclamation"></i></span>
      </div>
      <img src="${photo.thumbnailUrl}" class=swalimg>

      <div class=swalfooter>

      <div class=swaltitle >
      <h5 >Title</h5>
      <h2>${photo.title}</h2>
      </div>
      <div class=swalbtn>
      <h5 >Like <i class="fa-regular fa-heart"></i></h5>
      <h5 >save <i class="fa-regular fa-bookmark"></i></h5>

      </div>
      
   </div>     
    `,
      width: "90%",
      background: "#000000",
      imageWidth: "40%",
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonAriaLabel: "Thumbs up, great!",
      cancelButtonAriaLabel: "Thumbs down",
    });
  };

  return (
    <>
      <div>
        <Header />

        {userData && (
          <div className={styles.data}>
            <h1>{userData.name}</h1>
            <h3>
              <i className={`fa-solid fa-share ${styles.save}`}></i>
              <u>{userData.email}</u>
            </h3>
          </div>
        )}

        <div className={styles.albums}>
          {albums.map((album) => (
            <div key={album.id} className={styles.album}>
              <Link
                href={`/Album/${album.id}?title=${encodeURIComponent(
                  album.title
                )}`  }
              >
               
                <span>
                  <i className={`fa-regular fa-bookmark ${styles.save} `}></i>
                  {album.title}
                </span>
              </Link>

              <div className={styles.photos}>
                {photosByAlbum[album.id] &&
                  photosByAlbum[album.id].map((photo) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={photo.id}
                      src={photo.thumbnailUrl}
                      alt={photo.title}
                      className={styles.photo}
                      onClick={()=>handleImageClick(photo)}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
        <Rwdbtn />
      </div>
    </>
  );
}
