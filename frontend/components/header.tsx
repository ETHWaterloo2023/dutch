import React from 'react';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "../styles/Header.module.css";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.titleSection}>Dutch</h1>
      <div className={styles.connectSection}>
        <ConnectButton />
      </div>
    </header>
  );
}

export default Header;
