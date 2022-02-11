const { ethers } = require("ethers");

const main = async() =>{

    const [deployer] = await hre.ethers.getSigners();

    const deployerAddress = await deployer.getAddress();
    console.log(`Deployer address: ${deployerAddress}`);

    const deployerBalance = await deployer.getBalance();
    console.log(`Deployer balance: ${hre.ethers.utils.formatEther(deployerBalance)}`+" ETH");

    const zenoFactory = await hre.ethers.getContractFactory("Zeno");
    const zenoContract = await zenoFactory.deploy();
    await zenoContract.deployed();

    const zenoContractAddress = await zenoContract.address;
    console.log(`Zeno contract address: ${zenoContractAddress}`);

    let totalSupply = await zenoContract.getTotalSupply();
    console.log(`Total supply: ${totalSupply}`+" ZENO");

    let transferTo = await zenoContract.transferTo("0x89B29F823e1D81ee3FECdB488a10050Aa881821b", 1000);
    await transferTo.wait();
    console.log("Transfer to success");

    let contractBal = await zenoContract.getUserBalance(zenoContractAddress);
    console.log(`contract token balance: ${contractBal}`+" ZENO");

    let userBalance = await zenoContract.getUserBalance("0x89B29F823e1D81ee3FECdB488a10050Aa881821b");
    console.log(`User token balance: ${userBalance}`+" ZENO");

}    



const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
  }
  
  runMain();