import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import images from "../../components/Images";
import blockies from "blockies";
import Skeleton from "../../components/Skeleton";

const MarketPlace = () => {
  const navigate = useNavigate();
  const agriculturalCommodities = images.agricultural;
  const solidMineralCommodities = images.solidMinerals;

  const [selectedCommodity, setSelectedCommodity] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Define slides based on your top-rated commodities
  const slides = solidMineralCommodities.slice(0, 5); // Adjust the number of slides as needed

  // Handle card click to open the modal with selected commodity details
  const handleCardClick = (commodity) => {
    setSelectedCommodity(commodity);
  };

  // Handle navigation to the purchase page
  const handlePurchaseClick = () => {
    navigate("/buyer-dashboard/purchase-commodity", {
      state: { commodity: selectedCommodity },
    });
  };

  // Slider functions for previous, next, and specific slide navigation
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="bg-gray-900 text-gray-200 py-8 px-16">
      {/* Top Rated Section */}
      <div className="flex">
        {/* Top Rated Slider */}
        <div className="w-3/4 bg-gray-800 p-6 rounded-lg mr-8">
          <h2 className="text-2xl font-bold mb-4">Top Rated</h2>

          {/* Slide Display */}
          <div className="h-[400px] w-full relative group overflow-hidden rounded-lg shadow-lg">
            <img
              src={slides[currentIndex].image}
              alt={slides[currentIndex].name}
              className="w-full h-full object-cover transition-transform duration-300"
            />

            {/* Navigation Arrows */}
            <div
              className="absolute top-1/2 left-0 p-3 cursor-pointer bg-black bg-opacity-50 hover:bg-opacity-75 text-white transform -translate-y-1/2"
              onClick={prevSlide}
            >
              <BsChevronCompactLeft size={30} />
            </div>
            <div
              className="absolute top-1/2 right-0 p-3 cursor-pointer bg-black bg-opacity-50 hover:bg-opacity-75 text-white transform -translate-y-1/2"
              onClick={nextSlide}
            >
              <BsChevronCompactRight size={30} />
            </div>

            {/* Product Info Overlay */}
            <div className="absolute bottom-0 left-0 w-full p-4">
              <div className="bg-primary-500 bg-opacity-90 p-4 rounded-lg">
                <div className="flex justify-between items-center text-white">
                  <div>
                    <h3 className="text-lg font-bold">
                      {slides[currentIndex].name}
                    </h3>
                    <p className="text-sm">
                      Available: {slides[currentIndex].available}
                    </p>
                    <p className="text-sm">
                      Seller: {slides[currentIndex].sellerAddress}
                    </p>
                    <p className="text-sm">{slides[currentIndex].price}</p>
                  </div>
                  <button
                    onClick={handlePurchaseClick}
                    className="bg-gray-900 hover:bg-gray-600 text-white py-2 px-4 rounded-full"
                  >
                    Purchase
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center space-x-2 mt-4">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`h-3 w-3 rounded-full ${
                  currentIndex === index ? "bg-orange-500" : "bg-gray-300"
                }`}
                onClick={() => goToSlide(index)}
              ></button>
            ))}
          </div>
        </div>

        {/* Top Vendors Section */}
        <div className="w-1/4 bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Top Vendors</h2>
          <div className="space-y-4">
            {solidMineralCommodities.slice(0, 5).map((commodity, index) => (
              <div
                key={index}
                className="flex items-center px-4 py-2 bg-gray-700 border border-full rounded-full"
              >
                {/* Blockies Avatar */}
                <img
                  src={blockies({
                    seed: commodity.sellerAddress,
                    size: 16,
                    scale: 3,
                  }).toDataURL()}
                  alt={commodity.name}
                  className="w-10 h-10 object-cover rounded-full"
                />
                <div className="ml-4">
                  <p className="text-lg font-bold">{commodity.sellerAddress}</p>
                  <p className="text-sm text-gray-400">Sold: 30k</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trending Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Trending Commodities</h2>
        <div className="grid grid-cols-4 gap-8">
          {agriculturalCommodities.slice(0, 4).map((commodity, index) => (
            <div
              key={index}
              className="border border-gray-700 rounded-lg shadow-md cursor-pointer bg-gray-700"
              onClick={() => handleCardClick(commodity)}
            >
              <img
                src={commodity.image}
                alt={commodity.name}
                className="h-32 w-full object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">{commodity.name}</h3>
                <p className="text-sm">Price per Kilogram: {commodity.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Agricultural & Solid Mineral Commodities Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">
          Agricultural & Solid Mineral Commodities
        </h2>
        <div className="grid grid-cols-2 gap-8">
          {/* Agricultural Commodities */}
          <div className="bg-gray-800 p-6 rounded-lg space-y-4">
            <h3 className="text-xl font-bold mb-4">Agricultural Commodities</h3>
            <div className="grid grid-cols-2 gap-4">
              {agriculturalCommodities.slice(0, 4).map((commodity, index) => (
                <div
                  key={index}
                  className="border border-gray-700 rounded-lg shadow-md cursor-pointer bg-gray-900 text-white p-4"
                  onClick={() => handleCardClick(commodity)}
                >
                  <div className="relative">
                    <img
                      src={commodity.image}
                      alt={commodity.name}
                      className="h-40 w-full object-cover rounded-lg"
                    />
                    <span className="absolute top-2 left-2 bg-yellow-500 text-black px-2 py-1 text-xs rounded-full">
                      Sold: {commodity.sold}
                    </span>
                    <div className="absolute bottom-2 left-2 text-sm">
                      <span className="text-yellow-500">★ ★ ★ ★ ★</span>
                      <span className="ml-1">Rating</span>
                    </div>
                  </div>
                  <div className="pt-4">
                    <h3 className="text-lg font-bold truncate">
                      {commodity.name}
                    </h3>
                    <p className="text-sm mt-2">
                      Price per Kilogram: {commodity.price}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      Commodity value:{" "}
                      <span className="text-white font-bold">
                        {commodity.value} ETH
                      </span>
                    </p>
                    <div className="mt-4 flex justify-between items-center">
                      <button className="bg-primary-500 text-white px-4 py-2 rounded-full">
                        Purchase
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/market-place/agro-commodities">
              <div className="flex justify-end">
                <button className="bg-primary-500 px-4 py-2  mt-4 rounded-full">
                  See More
                </button>
              </div>
            </Link>
          </div>

          {/* Solid Mineral Commodities */}
          <div className="bg-gray-800 p-6 rounded-lg space-y-4">
            <h3 className="text-xl font-bold mb-4">
              Solid Mineral Commodities
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {solidMineralCommodities.slice(0, 4).map((commodity, index) => (
                <div
                  key={index}
                  className="border border-gray-700 rounded-lg shadow-md cursor-pointer bg-gray-900 text-white p-4"
                  onClick={() => handleCardClick(commodity)}
                >
                  <div className="relative">
                    <img
                      src={commodity.image}
                      alt={commodity.name}
                      className="h-40 w-full object-cover rounded-lg"
                    />
                    <span className="absolute top-2 left-2 bg-yellow-500 text-black px-2 py-1 text-xs rounded-full">
                      Sold: {commodity.sold}
                    </span>
                    <div className="absolute bottom-2 left-2 text-sm">
                      <span className="text-yellow-500">★ ★ ★ ★ ★</span>
                      <span className="ml-1">Rating</span>
                    </div>
                  </div>
                  <div className="pt-4">
                    <h3 className="text-lg font-bold truncate">
                      {commodity.name}
                    </h3>
                    <p className="text-sm mt-2">
                      Price per Kilogram: {commodity.price}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      Commodity value:{" "}
                      <span className="text-white font-bold">
                        {commodity.value} ETH
                      </span>
                    </p>
                    <div className="mt-4 flex justify-between items-center">
                      <button className="bg-primary-500 text-white px-4 py-2 rounded-full">
                        Purchase
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/market-place/solid-commodities">
              <div className="flex justify-end">
                <button className="bg-primary-500 px-4 py-2 mt-4 rounded-full">
                  See More
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Commodity Modal */}
      {selectedCommodity && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-gray-800 text-white h-[300px] text-center p-6 rounded-lg w-1/3">
            <h2 className="text-2xl font-bold mb-4">
              {selectedCommodity.name}
            </h2>
            <p>
              <strong>Available:</strong> {selectedCommodity.available}
            </p>
            <p>
              <strong>Price per Kilogram:</strong> {selectedCommodity.price}
            </p>
            <p>
              <strong>Seller Address:</strong> {selectedCommodity.sellerAddress}
            </p>
            <div className="mt-10 flex justify-center space-x-4">
              <button
                onClick={handlePurchaseClick}
                className="px-6 py-2 text-white bg-primary-500 rounded-full"
              >
                Purchase
              </button>
              <button
                onClick={() => setSelectedCommodity(null)}
                className="px-6 py-2 text-gray-700 bg-gray-300 rounded-full"
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
