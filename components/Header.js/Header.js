import React from "react";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <div>
        <i className={`fa-solid fa-magnifying-glass ${styles.icon}`}></i>
      </div>

      <div className={styles.bell}>
        <h6>
          Submit a photo <i className="fa-solid fa-plus"></i>
        </h6>
        <i className={`fa-regular fa-bell ${styles.icon}`}></i>
      </div>
    </div>
  );
}
