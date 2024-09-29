import React, { useState } from "react";
import { ethers } from "ethers";
import { PinataSDK } from "pinata";
import TradeBridgeABI from "../../../TradeBridge.json";

const CreateCommodity = () => {
  const pinata = new PinataSDK({
    pinataJwt: "YOUR_PINATA_JWT_HERE",
    pinataGateway: "cyan-hilarious-cuckoo-772.mypinata.cloud",
  });

  // State variables for the commodity form
  const [commodityName, setCommodityName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [measurement, setMeasurement] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [imageOne, setImageOne] = useState(null);

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!commodityName) newErrors.commodityName = "Commodity Name is required.";
    if (!quantity) newErrors.quantity = "Quantity is required.";
    if (!measurement) newErrors.measurement = "Measurement is required.";
    if (!price) newErrors.price = "Price is required.";
    if (!description) newErrors.description = "Description is required.";
    if (!location) newErrors.location = "Location is required.";
    if (!imageOne) newErrors.imageOne = "Image is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];

    const maxSize = 10 * 1024 * 1024;
    if (file) {
      if (file.size > maxSize) {
        alert("File size exceeds 10MB. Please upload a smaller file.");
        return;
      }

      const reader = new FileReader();

      reader.onloadend = async () => {
        try {
          const base64Data = reader.result.split(",")[1];
          const blob = new Blob([
            new Uint8Array(
              await (await fetch(`data:image/jpeg;base64,${base64Data}`)).blob()
            ),
          ]);

          const upload = await pinata.upload.file(blob, {
            pinataMetadata: { name: file.name },
          });

          setImageOne(upload.cid);
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contractAddress = import.meta.env.VITE_TRADE_BRIDGE_SCA;

        if (!contractAddress || !ethers.isAddress(contractAddress)) {
          console.error("Invalid contract address:", contractAddress);
          alert("Contract address is not defined or invalid.");
          return;
        }

        const commodityContract = new ethers.Contract(
          contractAddress,
          TradeBridgeABI,
          signer
        );

        const tx = await commodityContract.addCommodity(
          commodityName,
          description,
          quantity,
          measurement,
          price,
          imageOne,
          "imageTwo",
          "imageThree",
          "imageFour",
          location
        );

        await tx.wait();
        alert("Commodity created successfully!");
      } catch (error) {
        console.error("Error creating commodity:", error);
        alert("Failed to create commodity. Check console for details.");
      }
    } else {
      alert("Please install MetaMask to use this feature.");
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <h1 className="text-2xl font-normal text-center mb-8">Add Commodity</h1>
      <div className="flex justify-center">
        <form
          className="bg-gray-800 text-gray-900 rounded-2xl shadow-lg w-full max-w-2xl p-6 space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <label className="font-medium text-white">Commodity Name</label>
            <input
              type="text"
              className="appearance-none bg-transparent mt-2 border-b w-full text-gray-100 mr-3 py-1 px-2 leading-tight focus:outline-none"
              value={commodityName}
              onChange={(e) => setCommodityName(e.target.value)}
            />
            {errors.commodityName && (
              <p className="text-red-500">{errors.commodityName}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-medium text-white">Commodity Quantity</label>
            <input
              type="text"
              className="appearance-none bg-transparent mt-2 border-b w-full text-gray-100 mr-3 py-1 px-2 leading-tight focus:outline-none"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            {errors.quantity && (
              <p className="text-red-500">{errors.quantity}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-medium text-white">
              Quantity Measurement
            </label>
            <input
              type="text"
              className="appearance-none bg-transparent mt-2 border-b w-full text-gray-100 mr-3 py-1 px-2 leading-tight focus:outline-none"
              placeholder="E.g (Kg, tonnes)"
              value={measurement}
              onChange={(e) => setMeasurement(e.target.value)}
            />
            {errors.measurement && (
              <p className="text-red-500">{errors.measurement}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-medium text-white">Price per Quantity</label>
            <input
              type="text"
              className="appearance-none bg-transparent mt-2 border-b w-full text-gray-100 mr-3 py-1 px-2 leading-tight focus:outline-none"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            {errors.price && <p className="text-red-500">{errors.price}</p>}
          </div>

          <div className="flex flex-col">
            <label className="font-medium text-white">Commodity Location</label>
            <input
              type="text"
              className="appearance-none bg-transparent border-b w-full text-gray-100 mr-3 py-1 px-2 leading-tight focus:outline-none"
              placeholder="E.g (Abuja, Accra, etc)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            {errors.location && (
              <p className="text-red-500">{errors.location}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-medium text-white">
              Commodity Description
            </label>
            <textarea
              className="appearance-none bg-transparent mt-2 border-b w-full text-gray-100 mr-3 py-1 px-2 leading-tight focus:outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && (
              <p className="text-red-500">{errors.description}</p>
            )}
          </div>

          {/* Image upload */}
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG, or JPEG (MAX. 10MB)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
            {errors.imageOne && (
              <p className="text-red-500">{errors.imageOne}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-full mt-4"
          >
            Create Commodity
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCommodity;
