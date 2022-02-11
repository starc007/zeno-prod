require("@nomiclabs/hardhat-waffle");

const PRIVATE_KEY = process.env.PRIVATE_KEY; 

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
  solidity: "0.8.4",

  defaultNetwork: "ganache",

  networks: {

    ganache: {
      url: "http://127.0.0.1:7545",
      accounts: ["84706ddc87453e2dd1cb3c8adba8010a63c5dbf8300f412687e521444448aa43"]
    },
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/Eu7hr-4WpgitKwcKArO0QPgG5xbnToGM",
      accounts: [PRIVATE_KEY],
    },
    matic: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/Eu7hr-4WpgitKwcKArO0QPgG5xbnToGM",
      accounts: [PRIVATE_KEY],
    }

  },

};
