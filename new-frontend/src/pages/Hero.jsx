import React from "react";
import { Link } from "react-router-dom";
import illustration from "../assets/images/illustration.png";
import Abstract from "../assets/images/abstract.png";

const Hero = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      {/* Left Side */}
      <div className="flex-1 flex flex-col justify-between items-start bg-[rgb(20,28,43)] p-6 md:p-16 text-white relative">
        {/* Vertical line on the left */}
        <div className="absolute left-4 top-0 h-[98%] w-[2px] bg-[#FF6B6B]"></div>
        {/* Bottom Horizontal Line */}
        <div className="absolute bottom-4 left-4 w-full h-[2px] bg-[#ff6b6b]"></div>

        {/* Main Content */}
        <div className="flex flex-col items-start justify-between h-full">
          {/* Title at the top */}
          <h1 className="text-xl mt-10 sm:text-3xl md:text-4xl font-semibold leading-loose">
            Take control of your trades <br />
            with our decentralized commodity marketplace—
            <br />
            empowering buyers and sellers to transact directly, without
            intermediaries.
          </h1>

          {/* Vertical Button */}
          <div className="flex flex-col items-center mt-2 -ml-20">
            <div className="h-[200px] w-[2px] bg-[#FF6B6B] mb-[40px]"></div>
            <Link to="/market-place">
              <button className="border-2 rounded-full px-4 py-2 mt-7 transform rotate-90 whitespace-nowrap border-[#FF6B6B] hover:bg-[#FF5050]">
                Explore Marketplace
              </button>
            </Link>
          </div>

          {/* Wallet Buttons at the bottom */}
          <div className="flex flex-col space-y-3 mt-auto">
            <Link
              to="/buyer-dashboard"
              className="flex items-center border-2 border-[#FF6B6B] hover:bg-[#FF5050] text-white py-3 px-6 rounded-full text-lg"
            >
              🦊 <span className="ml-2">Connect wallet as a Buyer</span>
            </Link>
            <Link
              to="/seller-dashboard"
              className="flex items-center border-2 border-[#FF6B6B] hover:bg-[#FF5050] text-white py-3 px-6 rounded-full text-lg"
            >
              🦊 <span className="ml-2">Connect wallet as a Seller</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 bg-[#FF531E] relative overflow-hidden flex flex-col justify-center items-center">
        <div className="absolute right-4 top-0 h-[98.3%] w-[2px] bg-[rgb(20,28,43)]"></div>
        {/* Bottom Horizontal Line */}
        <div className="absolute bottom-4 left-0 w-[98.3%] h-[2px] bg-[rgb(20,28,43)]"></div>
        <img
          src={illustration}
          alt="Person in cart"
          className="object-contain w-[80%] md:w-[60%] h-auto mb-6"
        />
        <div className="text-center mx-5">
          <p className="text-[rgb(20,28,43)] font-bold text-lg md:text-4xl mb-4">
            Discover exclusive commodities and enjoy decentralized ownership in
            every purchase.
          </p>
          <p className="text-white text-base md:text-xl mb-4">
            <span>
              Seamless, secure transactions with token-based payments.
            </span>{" "}
            <br />
            <span>Welcome to the future of e-commerce.</span>
          </p>
        </div>
      </div>

      {/* Abstract Image Positioned between Left and Right Sections */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <img src={Abstract} alt="Abstract Arrow" className="w-[90%] h-auto" />
      </div>
    </div>
  );
};

export default Hero;
