import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Trips.module.css";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useEthersSigner } from "../createTrip";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
const Trip: NextPage = () => {
  const groupAbi = require("../../contracts/groupabi.json");
  const signer = useEthersSigner({ chainId: 80001 });
  const router = useRouter();
  const { contractAddress } = router.query;
  const [contract, setContract] = useState<any>(null);
  const { address } = useAccount();

  useEffect(() => {
    if (contractAddress) {
      const contract = new ethers.Contract(
        contractAddress as string,
        groupAbi,
        signer
      );
      // contract.getParticipantName(address).then((res: any) => console.log(res));
      // console.log(contract.functions);
    }
  }, [contractAddress]);

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h2>Trip xoxo</h2>
      </div>
    </div>
  );
};

export default Trip;
