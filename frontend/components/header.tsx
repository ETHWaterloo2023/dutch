import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "../styles/Header.module.css";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <div className={styles.titleSection}>
        <h1 className={styles.titleLink} onClick={() => router.push("/")}>
          Dutch
        </h1>
        <span
          className={styles.subtitleLink}
          onClick={() => router.push("/dash")}
        >
          Home
        </span>
      </div>
      <div className={styles.connectSection}>
        <ConnectButton chainStatus="icon" showBalance={false} />
      </div>
    </header>
  );
};

export default Header;
