import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Trips.module.css";

const CreateTrip: NextPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h2>Create a Trip</h2>
        <form>
          <div>
            <label>
              <span>Trip Name</span>
              <input></input>
            </label>
          </div>
          <div>
            <input placeholder="Fren's wallet address"></input>
            <input placeholder="Fren's wallet address"></input>
            <input placeholder="Fren's wallet address"></input>
          </div>
          <div className={styles.formFooter}>
            <button className="button">Create Trip</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTrip
