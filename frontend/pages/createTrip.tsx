import { ethers } from "ethers";
import * as React from "react";
import { type WalletClient, useWalletClient } from "wagmi";
import { providers } from "ethers";
import { PublicLockV13 } from "@unlock-protocol/contracts";
import { useContractRead } from "wagmi";
import { useAccount } from "wagmi";

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
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT as string;

  const addParticipant = async () => {
    const contract = new ethers.Contract(contractAddress, groupAbi, signer);
    const tx = await contract.participants(
      "0x6e62FF0591d4D8a0E5A1C274AbCFd2D716F1035E"
    );

    const lockContract = new ethers.Contract(
      lockContractAddress,
      PublicLockV13.abi,
      signer
    );
    const tx2 = await lockContract.keyPrice();
    console.log(tx2);
    console.log(tx);
  };

  return (
    <div>
      <h1>Create Trip</h1>
      <button onClick={addParticipant}>+ New Trip</button>
    </div>
  );
};
export default CreateTrip;
