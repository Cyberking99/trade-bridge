import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const BuyerDashboard = ({ signer }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-primary-200 text-black text-lg p-6 shadow-lg">
        <h1 className="text-2xl font-bold mt-20 mb-6">Buyer</h1>
        <ul className="space-y-4">
        <li>
            <Link
              to="marketplace"
              className="bg-yellow-500 block p-3 hover:bg-white rounded-lg transition-all duration-300"
            >
              Marketplace
            </Link>
          </li>
          <li>
            <Link
              to="view-purchase"
              className="bg-yellow-500 block p-3 hover:bg-white rounded-lg transition-all duration-300"
            >
              View My Purchases
            </Link>
          </li>
          <li>
            <Link
              to="dispute-sale"
              className="bg-yellow-500 block p-3 hover:bg-white rounded-lg transition-all duration-300"
            >
              Dispute
            </Link>
          </li>
          {/* You can uncomment this if you want to add back the purchase commodity link */}
          {/* <li>
            <Link
              to="purchase-commodity"
              className="block p-3 hover:bg-primary-300 rounded-lg transition-all duration-300"
            >
              Purchase Commodity
            </Link>
          </li> */}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet /> {/* Renders the matched child route component */}
      </main>
    </div>
  );
};

export default BuyerDashboard;
