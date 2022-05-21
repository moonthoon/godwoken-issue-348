const {ethers} = require("hardhat");
const fs = require('fs').promises;
const path = require('path');
const localFilePath = path.resolve(__dirname, '../frontend/src/app/config/contracts.json');
const {abi: tokenABI} = require('../artifacts/contracts/Token.sol/Token.json');
const {abi: testABI} = require('../artifacts/contracts/Test.sol/Test.json');

async function main() {
    const Token = await ethers.getContractFactory("Token");
    const [owner] = await ethers.getSigners();
    const token = await Token.deploy();
    const Test = await ethers.getContractFactory("Test");
    const test = await Test.deploy(token.address);

    console.log('==========================================================')
    console.log('Owner:               ', owner.address);
    console.log('Token:               ', token.address);
    console.log('Test:                ', test.address);
    console.log('==========================================================')

    const data = {
        "token": {
            "address": token.address,
            "abi": tokenABI
        },
        "test": {
            "address": test.address,
            "abi": testABI
        },
    }

    await fs.writeFile(localFilePath, JSON.stringify(data));
    console.log('Local file updated \n')
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });