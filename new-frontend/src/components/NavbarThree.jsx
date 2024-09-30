import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Logo from "../assets/images/trade_bridge.png";
import { FaPlus, FaBoxOpen, FaGavel, FaTicketAlt } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [currentAccount, setCurrentAccount] = useState(null); 
  const [isConnected, setIsConnected] = useState(false); 

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  // Function to check if wallet is connected
  const checkIfWalletIsConnected = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.listAccounts();
      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
        setIsConnected(true);
      }
    } else {
      console.log("No wallet found. Please install MetaMask.");
    }
  };

  // Function to connect the wallet
  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setCurrentAccount(accounts[0]);
        setIsConnected(true);
      } else {
        console.log("No wallet found. Please install MetaMask.");
      }
    } catch (error) {
      console.error("Error connecting wallet: ", error);
    }
  };

  return (
    <div className='bg-gray-900 pt-5'>
      {/* Top Navigation Bar */}
      <header className="flex justify-between items-center py-4 px-10 border rounded-full mx-5 bg-gray-800">
       <Link to="/hero">
        <div className="text-2xl font-bold flex gap-2 items-center">
          <img
            src={Logo}
            alt="Trade Bridge Logo"
            className="w-10 md:w-[32px]"
          />
          <span className="mr-4 text-white">Trade<span className='text-orange-500'>Bridge</span></span>
        </div>
        </Link>
        <div className="flex items-center space-x-4">
          {/* Wallet Connect Button */}
          {isConnected && typeof currentAccount === 'string' ? (
            <button className="bg-primary-500 text-white rounded-full px-4 py-2">
              {`${currentAccount.substring(0, 6)}...${currentAccount.substring(currentAccount.length - 4)}`}
            </button>
          ) : (
            <button 
              onClick={connectWallet} 
              className="bg-primary-500 text-white rounded-full px-4 py-2"
            >
              Connect Wallet
            </button>
          )}
         
        </div>
      </header>
           {/* Search Filter Section */}
      <div className="flex justify-between border border-white rounded-full py-4 px-10 items-center mx-5 mt-7">
        <div className="flex space-x-4">
          <button className="text-sm text-white px-4 py-2 bg-gray-700 rounded-full">Categories</button>
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-800 text-gray-300 px-4 py-2 rounded-full"
          />
          <button className="px-8 py-2 bg-primary-500 text-white rounded-full">Search</button>
        </div>
        <button className="px-8 py-2 bg-gray-800 text-white rounded-full border border-primary-500">Filters</button>
      </div>
   
    </div>
  );
}

export default Navbar;
