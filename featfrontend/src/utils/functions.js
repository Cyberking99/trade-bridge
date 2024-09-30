import { ethers } from "ethers";
import { toast } from "toastify";

export async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
        console.log("MetaMask detected");
        console.log('clicked')
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          
          await window.ethereum.request({ method: "eth_requestAccounts" });
          
          const userSigner = await provider.getSigner();
          const accounts = await provider.listAccounts();
          
          return { userSigner, accounts };
        //   setSigner(userSigner);
        //   setAccount(accounts[0]);
        //   setAccountState(accounts[0]);
          console.log("Connected account:", accounts[0]);
        } catch (error) {
          if (error.code === 4001) {
            console.error("User rejected the request.");
            toast.error("You rejected the connection request. Please connect to use the app.");
            return false;
          } else {
            console.error("Error fetching accounts or connecting to MetaMask");
            return false;
          }
        }
      } else {
          console.error("MetaMask not installed. Please install MetaMask to use this app.");
          toast.error("MetaMask not installed. Please install it to proceed.");
          return false;
      }
}

