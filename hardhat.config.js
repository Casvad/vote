require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    local: {
      url: "http://127.0.0.1:8545",
      chainId: 54320,
      accounts: [
        "48f0289357fff68bc02eccae570a5a883799014b9ad2676d8023a6a0e9219b9b",
        "bfa31a41344b1592684c1c9b2d81692f6a7d286abcd3bc885d03699bb507ee90",
      ],
    },
  },
};
