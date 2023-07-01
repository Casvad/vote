// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const currentTimestampInSeconds = Math.floor((new Date()).getTime() / 1000);
  const startTime = currentTimestampInSeconds;
  const endTime = currentTimestampInSeconds + 60 * 3; //3 minutes

  const lockedAmount = hre.ethers.utils.parseEther("0.001");

  const Vote = await hre.ethers.getContractFactory("Vote");
  const lock = await Vote.deploy(startTime, endTime);

  await lock.deployed();

  console.log(
    `Vote deployed to ${lock.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
