require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
require("@unlock-protocol/hardhat-plugin");

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "polygon_mumbai",
  networks: {
    hardhat: {},
    polygon_mumbai: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    zkEVM: {
      url: `https://rpc.public.zkevm-test.net`,
      accounts: [process.env.PRIVATE_KEY],
    },
    unlock: {
      12345: {
        name: "Unlock ",
        unlockAddress: "0x9B7c18a71a98acD2f1271e2D1fe63750A70bC52B", // your own unlock deployment address
      },
    },
  },
};
