import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Trips.module.css";

const Trip: NextPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h2>Trip xoxo</h2>
      </div>
    </div>
  );
};

export default Trip
