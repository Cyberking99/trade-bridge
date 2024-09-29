import React from 'react';
import { useLocation } from 'react-router-dom';

const Purchase = () => {
  const location = useLocation();
  const { commodity } = location.state || {};

  return (
    <div className='bg-gray-900 text-white min-h-screen p-8'>
      <h1 className="text-3xl text-white text-center font-normal mb-6">Purchase Commodity</h1>
      <div className="flex justify-center">
        {commodity ? (
          <div className="border rounded-lg shadow-md space-y-3 p-6 w-full max-w-lg"> {/* Adjust width here */}
            <div className="mb-4">
              <p><strong>Commodity:</strong> {commodity.name}</p>
              <p className='mt-2'><strong>Available Quantity:</strong> {commodity.available}</p>
              <p className='mt-2'><strong>Price per Kilogram:</strong> {commodity.price}</p>
              <p className='mt-5'><strong>Seller Address:</strong> <input type="text" value={commodity.sellerAddress} readOnly className="appearance-none bg-transparent mt-2 border-b w-full text-gray-100 mr-3 py-1 px-2 leading-tight focus:outline-none" /></p>
            </div>
            <div className='space-y-3 mt-2'>
              <label className="block mb-2">Quantity:</label>
              <input type="number" className="appearance-none bg-transparent mt-1 border-b w-full text-gray-100 mr-3 py-1 px-2 leading-tight focus:outline-none" />
            </div>
            <div className='mt-5'>
              <label className="block">Amount:</label>
              <input type="number" className="appearance-none bg-transparent mt-1 border-b w-full text-gray-100 mr-3 py-1 px-2 leading-tight focus:outline-none" />
            </div>
            <button className="px-6 py-2 text-white bg-orange-500 w-full mt-10 rounded-full hover:bg-orange-700">Submit Purchase Request</button>
          </div>
        ) : (
          <p>No commodity selected.</p>
        )}
      </div>
    </div>
  );
};

export default Purchase;
