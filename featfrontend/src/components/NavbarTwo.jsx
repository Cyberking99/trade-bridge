import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Logo from "../assets/images/trade_bridge.png";
import { FaPlus, FaBoxOpen, FaGavel, FaTicketAlt } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [currentAccount, setCurrentAccount] = useState(null); // Track current wallet address
  const [isConnected, setIsConnected] = useState(false); // Track connection status

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
        <div className="text-2xl font-bold flex gap-2 items-center">
          <img
            src={Logo}
            alt="Trade Bridge Logo"
            className="w-10 md:w-[32px]"
          />
          <span className="mr-4 text-white">Trade<span className='text-orange-500'>Bridge</span></span>
        </div>
        <div className="flex items-center space-x-4">
          {/* Wallet Connect Button */}
          {isConnected && typeof currentAccount === 'string' ? (
            <button className="bg-orange-500 text-white rounded-full px-4 py-2">
              {`${currentAccount.substring(0, 6)}...${currentAccount.substring(currentAccount.length - 4)}`}
            </button>
          ) : (
            <button 
              onClick={connectWallet} 
              className="bg-orange-500 text-white rounded-full px-4 py-2"
            >
              Connect Wallet
            </button>
          )}
          <Link to="/market-place" className="px-4 text-white py-2 bg-gray-700 border border-orange-500 rounded-full flex items-center">
            Make Purchase <FaPlus className="ml-2 bg-orange-500 w-6 h-6 p-2 rounded-full" /> 
          </Link>
        </div>
      </header>

      <div className="flex justify-between space-x-4 py-4 px-10 border rounded-full mx-5 mt-4 bg-gray-800">
        <div className='flex gap-4'>
          <Link to="buyer-dashboard/view-purchase" className="px-4 py-2 bg-gray-700 border text-white border-orange-500 hover:bg-orange-500 rounded-full flex items-center">
            View Purchase <FaBoxOpen className="ml-2" /> 
          </Link>
          <Link to="/buyer-dashboard/dispute-sale" className="px-4 py-2 bg-gray-700 border text-white border-orange-500 hover:bg-orange-500 rounded-full flex items-center">
            Disputes <FaGavel className="ml-2" /> 
          </Link>
        </div>
        <div>
          <Link to="/create-ticket" className="px-4 py-2 bg-gray-700 border border-orange-500 text-white rounded-full flex items-center">
            Create a ticket <FaTicketAlt className="ml-2 bg-orange-500 w-7 h-7 p-2 rounded-full" /> 
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
