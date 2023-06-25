import type { NextPage } from "next";
import styles from "../../styles/Trips.module.css";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useEthersSigner } from "../createTrip";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
const Trip: NextPage = () => {
  const groupAbi = require("../../contracts/groupabi.json");
  const signer = useEthersSigner({ chainId: 11155111 });
  const router = useRouter();
  const { contractAddress } = router.query;
  const [contract, setContract] = useState<any>(null);
  const { address } = useAccount();
  const [tripName, setTripName] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (contractAddress) {
      const contract = new ethers.Contract(
        contractAddress as string,
        groupAbi,
        signer
      );
      // contract.getTripName().then((res: any) => {
      //   setTripName(res);
      // });
      // contract.getBalance(address).then((res: any) => {
      //   console.log(ethers.utils.formatEther(res));
      // });
    }
  }, [contractAddress]);

  return (
    <div className={styles.container}>
      {/* {tripName && ( */}
      <div className={styles.main}>
        <h2>Trip Details</h2>
        <table style={{ width: "60vw", textAlign: "left" }}>
          <thead>
            <tr>
              <th>Fren</th>
              <th>Address</th>
              <th>Balance</th>
              <th>Add Money</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Paige</td>
              <td>0x9B7c18a71a98...</td>
              <td>-50</td>
              <td>
                <input type={"number"} min={10} max={50}></input>
              </td>
              <td>
                <button style={{ height: 50, width: 50, padding: 0 }}>+</button>
              </td>
            </tr>
            <tr>
              <td>Paige</td>
              <td>0x9B7c18a71a98...</td>
              <td>-50</td>
              <td>
                <input type={"number"} min={10} max={50}></input>
              </td>
              <td>
                <button style={{ height: 50, width: 50, padding: 0 }}>+</button>
              </td>
            </tr>
            <tr>
              <td>Paige</td>
              <td>0x9B7c18a71a98...</td>
              <td>-50</td>
              <td>
                <input type={"number"} min={10} max={50}></input>
              </td>
              <td>
                <button style={{ height: 50, width: 50, padding: 0 }}>+</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* )} */}
    </div>
  );
};

export default Trip;
