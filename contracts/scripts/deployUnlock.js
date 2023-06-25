import { unlock } from "hardhat";

async function main() {
  // deploy the Unlock contract
  await unlock.deployUnlock();
  // deploy the template
  await unlock.deployPublicLock();
  // deploy the entire protocol (localhost only)
  await unlock.deployProtocol();
  const lockArgs = {
    expirationDuration: 60 * 60 * 24 * 7, // 7 days
    currencyContractAddress: null, // null for ETH or erc20 address
    keyPrice: "0", // in wei
    maxNumberOfKeys: 10,
    name: "Group Expense Lock",
  };
  await unlock.createLock(lockArgs);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
