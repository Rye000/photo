import { Inter } from "next/font/google";
import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Footer from "@/components/Footer/Footer";
import axios from "axios";
import { useRouter } from "next/router";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [userId, setUserId] = useState("");
  const [inputError, setInputError] = useState("");
  const router = useRouter();

  useEffect(() => {
    try {
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        setUserId(storedUserId);
      }
    } catch (error) {
      console.error("Error retrieving data from localStorage:", error);
    }
  }, []);

  const handleLogin = () => {
    const inputNumber = parseFloat(userId.trim());

    if (userId.trim().length === 0) {
      setInputError("未輸入數字");
      return;
    } else if (inputNumber > 10) {
      setInputError("數字不能大於10");
      return;
    } else if (inputNumber === 0) {
      setInputError("數字不是0");
      return;
    } else if (inputNumber < 0) {
      setInputError("數字不能是負的");
      return;
    } else if (!Number.isInteger(inputNumber)) {
      setInputError("請輸入整數");
      return;
    }
    setInputError("");

    axios
      .get(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((response) => {
        const user = response.data;
        if (user.id) {
          console.log("用戶:", user);
         
          localStorage.setItem("userId", userId);
         
          router.push("/Album"); 
        } else {
          console.log("未找到用戶");
         
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.login}>
          <div></div>
          <div className={styles.enter}>
            <input
              type="number"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className={styles.inp}
              placeholder="User ID"
            />
            {inputError && <span className={styles.error}>{inputError}</span>}
            <div>
              <button onClick={handleLogin} className={styles.loginbtn}>
                Log in
              </button>
            </div>
            <h3 className={styles.account}>Don&apos;t have an account?</h3>
            <div className={styles.twobtn}>
              <button className={styles.loginbtn}>Register</button>
              <button className={styles.loginbtn}>Continue with Google</button>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}
