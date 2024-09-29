import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import TradeBridgeABI from "../../../TradeBridge.json"; // Update the path as needed

const MyCommodity = () => {
  const [commodities, setCommodities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [commoditiesPerPage] = useState(2); // Display 2 commodities per page

  useEffect(() => {
    const fetchCommodities = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();

          const contractAddress = import.meta.env.VITE_TRADE_BRIDGE_SCA;
          const commodityContract = new ethers.Contract(
            contractAddress,
            TradeBridgeABI,
            signer
          );

          const userAddress = await signer.getAddress();
          const userCommodities = await commodityContract.getCommoditiesByOwner(
            userAddress
          );
          setCommodities(userCommodities);
        } catch (error) {
          console.error("Error fetching commodities:", error);
        }
      }
    };

    fetchCommodities();
  }, []);

  // Logic for displaying commodities on the current page
  const indexOfLastCommodity = currentPage * commoditiesPerPage;
  const indexOfFirstCommodity = indexOfLastCommodity - commoditiesPerPage;
  const currentCommodities = commodities.slice(
    indexOfFirstCommodity,
    indexOfLastCommodity
  );

  // Pagination
  const totalPages = Math.ceil(commodities.length / commoditiesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="bg-gray-900">
      <div className="flex justify-between items-center p-8">
        <h1 className="text-2xl text-white font-normal">My Products</h1>
       
      </div>

      <div className="p-10 flex justify-center min-h-screen">
        <div className="space-y-6 w-full max-w-4xl">
          {currentCommodities.map((commodity, index) => (
            <div key={index} className="bg-gray-800 rounded-lg shadow-lg">
              <div className="flex">
                <div className="w-1/3 h-64 overflow-hidden rounded-l-lg">
                  <img
                    src={commodity.image}
                    alt={commodity.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="w-2/3 p-4">
                  <h2 className="text-white text-xl font-semibold mb-2">
                    {commodity.name}
                  </h2>
                  <p className="text-gray-400 mb-4">
                    {commodity.description || "No description provided"}
                  </p>
                  <div className="text-gray-300 flex justify-between mb-4">
                    <p>Available</p>
                    <p>{commodity.available}</p>
                  </div>
                  <div className="text-gray-300 flex justify-between">
                    <p>Price</p>
                    <p>{commodity.price} ETH</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end p-4 space-x-4">
                <button className="text-gray-300 hover:text-red-500">
                  <i className="fas fa-trash-alt"></i>
                </button>
                <button className="text-gray-300 hover:text-blue-500">
                  <i className="fas fa-edit"></i>
                </button>
              </div>
            </div>
          ))}

          {/* Pagination Controls */}
          <div className="flex justify-center space-x-4 mt-6">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md ${
                currentPage === 1
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
              } text-white`}
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
              } text-white`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCommodity;
