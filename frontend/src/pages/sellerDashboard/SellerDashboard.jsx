import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const SellerDashboard = ({ signer }) => {
  console.log(window.location)
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-primary-200 text-black text-lg p-6 shadow-lg">
        <h1 className="text-2xl font-bold mt-20 mb-6">Seller</h1>
        <ul className="space-y-4">
          <li>
            <Link
              to="create-commodity"
              className="bg-yellow-500 block p-3 hover:bg-white rounded-lg transition-all duration-300"
            >
              Create Commodity
            </Link>
          </li>
          <li>
            <Link
              to="orders"
              className="bg-yellow-500 block p-3 hover:bg-white rounded-lg transition-all duration-300"
            >
              Orders
            </Link>
          </li>
          <li>
            <Link
              to="my-commodity"
              className="bg-yellow-500 block p-3 hover:bg-white rounded-lg transition-all duration-300"
            >
              My Commodity
            </Link>
          </li>
          <li>
            <Link
              to="dispute"
              className="bg-yellow-500 block p-3 hover:bg-white rounded-lg transition-all duration-300"
            >
              Dispute
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet /> {/* Renders the matched child route component */}
      </main>
    </div>
  );
};

export default SellerDashboard;
