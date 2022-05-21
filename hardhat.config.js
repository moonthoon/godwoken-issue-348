require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.7",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000
      }
    }
  },
  networks: {
    gw_testnet_v1: {
      url: "https://godwoken-testnet-v1.ckbapp.dev",
      chainId: 71401,
      accounts: [
        //test wallet 1
        "0x901abd5bcc1d9af874bc5cdaf470421b29fae32e556d2599c9fc44890aee1e5d"
      ]
    }
  }
};
