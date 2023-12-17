import React from 'react'
import styles from './Rwdbtn.module.css'
export default function Rwdbtn() {
  return (
    <div className={styles.bg}>
    <i className={`fa-regular fa-copy  ${styles.select}`}></i>
    <i className={`fa-solid fa-magnifying-glass ${styles.select}`}></i>
    <i className={`fa-regular fa-bell ${styles.select}`}></i>
  </div>
  
  )
}
