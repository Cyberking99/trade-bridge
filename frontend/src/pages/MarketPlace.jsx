import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import images from '../components/Images';
import { ethers } from 'ethers';

const MarketPlace = () => {
  const navigate = useNavigate();
  const agriculturalCommodities = images.agricultural;
  const solidMineralCommodities = images.solidMinerals;

  const [commodities, setCommodities] = useState([]);
  const [showMoreAgri, setShowMoreAgri] = useState(false);
  const [showMoreSolid, setShowMoreSolid] = useState(false);

  // Modal state
  const [selectedCommodity, setSelectedCommodity] = useState(null);

  const handleShowMore = (group) => {
    navigate(`/marketplace/${group}`, { state: { group } }); // Pass group as state
  };

  const handleCardClick = (commodity) => {
    setSelectedCommodity(commodity);
  };

    
  useEffect(() => {
    const fetchCommodities = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          
          const contractAddress = import.meta.env.VITE_TRADE_BRIDGE_SCA; 
          const commodityContract = new ethers.Contract(contractAddress, TradeBridgeABI, signer);

         
          const userAddress = await signer.getAddress();
          const userCommodities = await commodityContract.getCommoditiesByOwner(userAddress); 
          setCommodities(userCommodities);
        } catch (error) {
          console.error("Error fetching commodities:", error);
        }
      }
    };

    fetchCommodities();
  }, []);

  const handlePurchaseClick = () => {
    // Pass the selected commodity details (including seller's address) to the Purchase page
    navigate('/buyer-dashboard/purchase-commodity', { state: { commodity: selectedCommodity } });
  };

  return (
    <div className='p-8 mx-40 mt-40'>
      {/* Agricultural Commodities Section */}
      <div className='mb-12'>
        <h1 className='text-2xl font-bold mb-4'>Agricultural Commodities</h1>
        <div className='grid grid-cols-5 gap-12'>
          {agriculturalCommodities.slice(0, showMoreAgri ? agriculturalCommodities.length : 5).map((commodity, index) => (
            <div key={index} className='border rounded-lg shadow-md w-72 cursor-pointer' onClick={() => handleCardClick(commodity)}>
              <div className='h-48 overflow-hidden mb-4'>
                <img src={commodity.image} alt={commodity.name} className='h-full w-full object-contain rounded-t-lg' />
              </div>
              <div className='p-2 h-28 bg-white rounded-b-lg'>
                <h2 className='text-lg font-semibold mb-2'>{commodity.name}</h2>
                <div className='space-y-1'>
                  <div className='flex justify-between'>
                    <p>Available</p>
                    <p>{commodity.available}</p>
                  </div>
                  <div className='flex justify-between'>
                    <p>Price per Kilogram</p>
                    <p>{commodity.price}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='flex justify-end'>
          <button
            onClick={() => handleShowMore('agricultural')}
            className='mt-4 px-6 py-2 text-white bg-primary-200 rounded-full hover:bg-primary-300'
          >
            Show More
          </button>
        </div>
      </div>

      {/* Solid Mineral Commodities Section */}
      <div>
        <h1 className='text-2xl font-bold mb-4'>Solid Mineral Commodities</h1>
        <div className='grid grid-cols-5 gap-12'>
          {solidMineralCommodities.slice(0, showMoreSolid ? solidMineralCommodities.length : 5).map((commodity, index) => (
            <div key={index} className='border rounded-lg shadow-md w-72 cursor-pointer' onClick={() => handleCardClick(commodity)}>
              <div className='h-40 overflow-hidden mb-4'>
                <img src={commodity.image} alt={commodity.name} className='h-full w-full object-cover rounded-t-lg' />
              </div>
              <div className='p-2 h-40 bg-white rounded-b-lg'>
                <h2 className='text-lg font-semibold mb-2'>{commodity.name}</h2>
                <div className='space-y-1'>
                  <div className='flex justify-between'>
                    <p>Available</p>
                    <p>{commodity.available}</p>
                  </div>
                  <div className='flex justify-between'>
                    <p>Price per Ton</p>
                    <p>{commodity.price}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='flex justify-end'>
          <button
            onClick={() => handleShowMore('solid')}
            className='mt-4 px-6 py-2 text-gray-700 bg-primary-200 rounded-full hover:bg-primary-300'
          >
            Show More
          </button>
        </div>
      </div>

      {/* Commodity Modal */}
      {selectedCommodity && (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
          <div className='bg-white p-6 rounded-lg w-1/3'>
            <h2 className='text-2xl font-bold mb-4'>{selectedCommodity.name}</h2>
            <p><strong>Available:</strong> {selectedCommodity.available}</p>
            <p><strong>Price per Kilogram:</strong> {selectedCommodity.price}</p>
            <p><strong>Seller Address:</strong> {selectedCommodity.sellerAddress}</p>
            <div className='mt-6'>
              <button
                onClick={handlePurchaseClick}
                className='px-6 py-2 text-white bg-primary-200 rounded hover:bg-blue-800'
              >
                Purchase
              </button>
              <button
                onClick={() => setSelectedCommodity(null)}
                className='ml-4 px-6 py-2 text-white bg-red-600 rounded hover:bg-red-800'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketPlace;
