import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config();

const { SCROLL_TESTNET_URL, PRIVATE_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.26",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      },
      viaIR: true
    }
  },
  networks: {
    scrollTestnet: {
      url: SCROLL_TESTNET_URL || "",
      accounts: [`0x${PRIVATE_KEY}`],
    }
  },
  sourcify: {
    enabled: false
  },
};

export default config;
