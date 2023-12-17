import React, { useState, useEffect } from "react";
import styles from "./Album.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import Header from "@/components/Header.js/Header";
import Rwdbtn from "@/components/Rwdbtn/Rwdbtn";
import Swal from "sweetalert2";

export default function AlbumPhotos() {
  const [photos, setPhotos] = useState([]);
  const router = useRouter();
  const { albumId } = router.query;
  const title = router.query.title
    ? decodeURIComponent(router.query.title)
    : "";

  useEffect(() => {
    if (albumId) {
      const fetchPhotos = async () => {
        try {
          const res = await axios.get(
            `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`
          );
          setPhotos(res.data);
        } catch (error) {
          console.error("獲得失敗");
        }
      };

      fetchPhotos();
    }
  }, [albumId]);

  //彈跳視窗
  const handleImageClick = (photo) => {
    Swal.fire({
      html: `
  <div class=swal >
      <span>Download&nbsp;&nbsp;<i class="fa-solid fa-download"></i></span>
      <span>Share&nbsp;&nbsp;<i class='fa-solid fa-share'></i></span>
      <span>info&nbsp;&nbsp;<i class="fa-solid fa-circle-exclamation"></i></span>
      </div>
      <img src="${photo.url}" class=swalimg>

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
      width: "80%",
      background: "#000000",
      imageWidth: "50%",
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonAriaLabel: "Thumbs up, great!",
      cancelButtonAriaLabel: "Thumbs down",
    });
  };

  return (
    <div>
      <Header />
      <h1 className={styles.tltle}>{title}</h1>
      <div className={styles.albumlist}>
        {photos.map((photo) => (
          <div key={photo.id} onClick={() => handleImageClick(photo)}>
            {/* eslint-disable-next-line @next/next/no-img-element  */}
            <img src={photo.url} alt={photo.title} />
          </div>
        ))}
      </div>
      <Rwdbtn />
    </div>
  );
}
