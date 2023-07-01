const { expect } = require("chai");
const { ethers } = require("hardhat");
const helpers = require("@nomicfoundation/hardhat-network-helpers");

describe("Vote", function () {
    let owner, voter;
    let vote;

    const isHardHatNetwork = () => {
        return hre.network.name === "hardhat";
    };

    async function waitNextBlock() {
        if (isHardHatNetwork()) {
            return helpers.mine();
        }

        const startBlock = await ethers.provider.getBlockNumber();

        return new Promise((resolve, reject) => {
            const isNextBlock = async () => {
                const currentBlock = await ethers.provider.getBlockNumber();
                if (currentBlock > startBlock) {
                    resolve();
                } else {
                    setTimeout(isNextBlock, 300);
                }
            };
            setTimeout(isNextBlock, 300);
        });
    }

    // Setup only once at the beginning of the test
    this.beforeAll(async function () {
        [owner, voter] = await ethers.getSigners();
        const timestamp = Math.floor((new Date()).getTime() / 1000);
        const startTime = timestamp - 100;
        const endTime = timestamp + 600;
        console.log("Dates: ", startTime, " End: ", endTime);
        const VoteContract = await ethers.getContractFactory('Vote');
        vote = await VoteContract.deploy(startTime, endTime);
    });

    it("Vote owner and voter", async function () {
        
        const rc = await (await vote.vote(1)).wait();
        const rc2 = await (await vote.connect(voter).vote(2)).wait();
        
        expect(rc.events.find((e) => e.event === "UserVote")).to.not.be.undefined;
        expect(rc2.events.find((e) => e.event === "UserVote")).to.not.be.undefined;
    });

    it("Vote owner twice", async function () {
        try {
            const rc = await (await vote.vote(1)).wait();
            rc = await (await vote.vote(1)).wait();
            expect.fail("Expected require error");
          } catch (error) {
            expect(error.message).to.contain("User already voted");
          }
    });
});