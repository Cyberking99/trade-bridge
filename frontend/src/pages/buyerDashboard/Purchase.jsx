import React from 'react';
import { useLocation } from 'react-router-dom';

const Purchase = () => {
  const location = useLocation();
  const { commodity } = location.state || {};

  return (
    <div className="p-8 mx-36 w-[900px] mt-40">
      <h1 className="text-3xl font-bold mb-6">Purchase Commodity</h1>
      {commodity ? (
        <div className="border rounded-lg shadow-md p-6">
          <div className="mb-4">
            <p><strong>Commodity:</strong> {commodity.name}</p>
            <p><strong>Available Quantity:</strong> {commodity.available}</p>
            <p><strong>Price per Kilogram:</strong> {commodity.price}</p>
            <p><strong>Seller Address:</strong> <input type="text" value={commodity.sellerAddress} readOnly className="border w-full p-2 mt-1 rounded-lg" /></p>
          </div>
          <div>
            <label className="block mb-2">Quantity:</label>
            <input type="number" placeholder="Enter quantity" className="border w-full p-2 mb-4 rounded-lg" />
          </div>
          <div>
            <label className="block mb-2">Amount:</label>
            <input type="number" placeholder="Enter amount" className="border w-full p-2 mb-4 rounded-lg" />
          </div>
          <button className="px-6 py-2 text-white bg-blue-600 w-full rounded hover:bg-blue-800">Submit Purchase Request</button>
        </div>
      ) : (
        <p>No commodity selected.</p>
      )}
    </div>
  );
};

export default Purchase;
