import React from "react";
import { Link } from "react-router-dom";
import illustration from "../assets/images/illustration.png";

const Hero = () => {
  return (
    <div className="mx-40 mt-20">
      <div className="flex items-center justify-center gap-20">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-wrap">
            A decentralized commodity <br /> market place
          </h1>
          <p className="text-wrap text-xl mb-3">
            <span className="block">
              Trade bridge is a decentralized commodity exchange platform
            </span>
            <span className="block">
              that allows buyers and sellers to trade commodities in a trustless
              environment
            </span>
            <span className="block">
              using blockchain technology, incorporated with tokenization,
              decentralized, and NFT minting/burning to represent commodity
              ownership.
            </span>
            <span className="block">
            
            </span>
          </p>

          <div className="mt-8">
          <Link
            to="buyer-dashboard/marketplace"
            className="bg-[#59b5f7] text-white w-5 p-4 px-20 mr-2 rounded-lg"
          >
            Buy
          </Link>

          <Link
            to="seller-dashboard/create-commodity"
            className="bg-[#274ab3] text-white w-5 p-4 px-20 mr-2 rounded-lg transition-all duration-300"
          >
            Sell
          </Link>
          </div>
        </div>
        <div className="mt-20">
        <img src={illustration} alt="Buyer and Seller" className="w-[1020px]" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
