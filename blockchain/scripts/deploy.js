const { ethers } = require('hardhat');
const fs = require('fs');

async function main() {
  // Compile the contract using Hardhat
  const contractName = 'SmartSaver';
  const contractFactory = await ethers.getContractFactory("SmartSaver");
  
  // Deploy the contract
  const contract = await contractFactory.deploy();

  // Wait for the contract to be mined
  await contract.deployed();

  // Print the contract address and transaction hash
  console.log(`${contractName} deployed at: ${contract.address}`);
  console.log('Transaction hash:', contract.deployTransaction.hash);

  // Write the contract address to a file for later use
  fs.writeFileSync('contractAddress.txt', contract.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
