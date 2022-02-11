const main = async () => {

  const [deployer] = await hre.ethers.getSigners();

  const deployerAddress = await deployer.getAddress();
  console.log(`Deployer address: ${deployerAddress}`);

  const deployerBalance = await deployer.getBalance();
  console.log(`Deployer balance: ${hre.ethers.utils.formatEther(deployerBalance)}`+" ETH");

  const paymentFactory = await hre.ethers.getContractFactory("Payment");
  const paymentContract = await paymentFactory.deploy({value: hre.ethers.utils.parseEther("1.5")});
  await paymentContract.deployed();

  const paymentContractAddress = await paymentContract.address;
  console.log(`Payment contract address: ${paymentContractAddress}`);

  // let getContractBalance = await hre.ethers.provider.getBalance(paymentContractAddress);
  // console.log(`Payment contract balance: ${hre.ethers.utils.formatEther(getContractBalance)}`+" ETH");

  // let contractBalance = await paymentContract.getContractBal();
  // console.log(`Payment contract balance: ${hre.ethers.utils.formatEther(contractBalance)}`+" ETH");


  // let pay = await paymentContract.pay("0xe3e31aCCb274301cbD0ECe93967073fFd88dE3EE" ,hre.ethers.utils.parseEther("1"));
  // await pay.wait();
  // console.log("Payment done");

  // pay = await paymentContract.pay("0xF19DDb5511f1199d51e970c78a13c45F02A72035" ,hre.ethers.utils.parseEther("1"));
  // await pay.wait();
  // console.log("Payment done");

  // pay = await paymentContract.pay("0xe3e31aCCb274301cbD0ECe93967073fFd88dE3EE" ,hre.ethers.utils.parseEther("1"));
  // await pay.wait();
  // console.log("Payment done")

  // let allPayments = await paymentContract.getAllPaymentsHistory();
  // console.log(`All payments: ${allPayments.toString()}`);

  // let lastPayment = await paymentContract.getLastPayment();
  // console.log(`Last payment: ${lastPayment.toString()}`);

  // let getPaymentByAddress = await paymentContract.getPaymentHistoryByAddress("0xF19DDb5511f1199d51e970c78a13c45F02A72035");
  // console.log(`Payment by address: ${getPaymentByAddress.toString()}`);

  // contractBalance = await paymentContract.getContractBal();
  // console.log(`Payment contract balance: ${hre.ethers.utils.formatEther(contractBalance)}`+" ETH");

  // let sendToContract = await deployer.sendTransaction({ to: paymentContractAddress, value: hre.ethers.utils.parseEther("1")});
  // await sendToContract.wait();
  // console.log("Send to contract done");



  contractBalance = await paymentContract.getContractBal();
  console.log(`Payment contract balance: ${hre.ethers.utils.formatEther(contractBalance)}`+" ETH");

  // const deposit = await paymentContract.depositInContract({value: hre.ethers.utils.parseEther("0.1")});
  // await deposit.wait();
  // console.log("Deposit success");

  // contractBalance = await paymentContract.getContractBal();
  // console.log(`Payment contract balance: ${hre.ethers.utils.formatEther(contractBalance)}`+" ETH");

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