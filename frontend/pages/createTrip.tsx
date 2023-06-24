import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Trips.module.css";

const CreateTrip: NextPage = () => {
  return (
    <div className={styles.container}>
      <h2>Create a Trip</h2>
      <form>
        <label>
          <span>Trip Name</span>
          <input></input>
        </label>
        <button className="button">Create Trip</button>
      </form>
    </div>
  );
};

export default CreateTrip
