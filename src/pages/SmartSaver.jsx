import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import contractAbi from '../../blockchain/artifacts/contracts/SmartSaver.sol/SmartSaver.json';
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Enter your contract address here
//const contractAbi = []; // Enter your contract ABI here

function SmartSaver() {
  const [balance, setBalance] = useState(0);
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  useEffect(() => {
    // Connect to the contract
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, contractAbi, provider);

    // Get the current balance
    const getBalance = async () => {
      const balance = await contract.getBalance();
      setBalance(balance.toString());
    };
    getBalance();

    // Listen for Deposit events
    contract.on("Deposit", (user, amount) => {
      console.log(`${user} deposited ${amount}`);
      getBalance();
    });

    // Listen for Withdrawal events
    contract.on("Withdrawal", (user, amount) => {
      console.log(`${user} withdrew ${amount}`);
      getBalance();
    });

    // Cleanup
    return () => {
      contract.removeAllListeners("Deposit");
      contract.removeAllListeners("Withdrawal");
    };
  }, []);

  const handleDeposit = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    const tx = await contract.deposit({ value: ethers.utils.parseEther(depositAmount) });
    await tx.wait();
    console.log(`Deposited ${depositAmount}`);
    setDepositAmount("");
  };

  const handleWithdraw = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    const tx = await contract.withdraw(ethers.utils.parseEther(withdrawAmount));
    await tx.wait();
    console.log(`Withdrew ${withdrawAmount}`);
    setWithdrawAmount("");
  };

  return (
    <div>
      <h1>SmartSaver</h1>
      <p>Balance: {balance} ETH</p>
      <div>
        <input type="text" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} />
        <button onClick={handleDeposit}>Deposit</button>
      </div>
      <div>
        <input type="text" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} />
        <button onClick={handleWithdraw}>Withdraw</button>
      </div>
    </div>
  );
}

export default SmartSaver;
