import { ethers } from "ethers";
import * as React from "react";
import { type WalletClient, useWalletClient } from "wagmi";
import { providers } from "ethers";
import { PublicLockV13 } from "@unlock-protocol/contracts";
import { useAccount } from "wagmi";
import styles from "../styles/Trips.module.css";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { bytecode } from "../contracts/bytecode";
import { useRouter } from "next/router";

export function walletClientToSigner(walletClient: WalletClient) {
  const { account, chain, transport } = walletClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new providers.Web3Provider(transport, network);
  const signer = provider.getSigner(account.address);
  return signer;
}

export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: walletClient } = useWalletClient({ chainId });
  return React.useMemo(
    () => (walletClient ? walletClientToSigner(walletClient) : undefined),
    [walletClient]
  );
}

const CreateTrip = () => {
  const groupAbi = require("../contracts/groupabi.json");
  const signer = useEthersSigner({ chainId: 80001 });
  const { address } = useAccount();
  const lockContractAddress = process.env.NEXT_PUBLIC_LOCK as string;
  // const contractAddress = process.env.NEXT_PUBLIC_CONTRACT as string;
  const [isLoading, setIsLoading] = React.useState(false);
  const [contractAddress, setContractAddress] = React.useState("");
  const router = useRouter();

  const handleTripCreation = async (values: any) => {
    const factory = new ethers.ContractFactory(groupAbi, bytecode, signer);
    const contract = await factory.deploy("Paige", values.tripName);
    setContractAddress(contract.address);
    localStorage.setItem("contract", contract.address);
    console.log(contract.address);
    return contract.address;
  };

  const handleKeys = async (values: any, contractAddress: string) => {
    const lockContract = new ethers.Contract(
      lockContractAddress,
      PublicLockV13.abi,
      signer
    );
    const tx2 = await lockContract.grantKeys(
      [values.fren1, values.fren2, values.fren3],
      [0],
      [address]
    );
    if (tx2) {
      console.log("Key TX", tx2);
      router.push(`/trip/${contractAddress}`);
    } else {
      return;
    }
  };

  return (
    <div>
      {/* <button onClick={addParticipant}>+ New Trip</button> */}
      <div className={styles.container}>
        <div className={styles.main}>
          <h2>
            Create a Trip <span>🎉</span>
          </h2>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <Formik
              initialValues={{
                tripName: "",
                fren1: "",
                fren2: "",
                fren3: "",
              }}
              onSubmit={(
                values: any,
                { setSubmitting }: FormikHelpers<any>
              ) => {
                setIsLoading(true);
                handleTripCreation(values).then((contractAddress) => {
                  handleKeys(values, contractAddress);
                });
                setIsLoading(false);
              }}
            >
              <Form>
                <label htmlFor="tripName">Trip Name</label>
                <Field
                  style={{ width: "40vw" }}
                  id="tripName"
                  name="tripName"
                  placeholder="Girls Trip to Miami!"
                />
                <label htmlFor="fren1">Fren 1</label>
                <Field id="fren1" name="fren1" placeholder="paigexx.eth" />
                <label htmlFor="fren2">Fren 2</label>
                <Field
                  id="fren2"
                  name="fren2"
                  placeholder="vitalik.eth"
                  type="fren2"
                />
                <label htmlFor="fren3">Fren 3</label>
                <Field
                  id="fren3"
                  name="fren3"
                  placeholder="0x0..."
                  type="fren3"
                />

                <button type="submit">Submit</button>
              </Form>
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateTrip;
