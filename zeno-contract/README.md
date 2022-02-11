# clone it and run npm install to install the dependencies

# go to hardhat.config.js
change the network setting as you want. default is Ganache (change its private key in accounts array)

# deploy.js
### deploy your smart contract to the network
### Few contract functions are provided there.

# List of all Payment functions:

## getContractBal()
## userBal()
## pay(address, amount in wei)
## depositInContract({value: amount in wei})
## getAllPaymentsHistory()
## getPaymentHistoryByAddress(address)
## getLastPayment()

# List of all Zeno functions:
## transferTo(address, zeno amount)
## getUserBalance(address)

# to test the functions, go to deploy.js and call the functions.
## run npx hardhat run scripts/deploy.js

# or use it in your own project with ethers.js/web3.js
