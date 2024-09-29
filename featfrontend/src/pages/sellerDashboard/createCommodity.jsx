import React, { useState } from "react";
import Buttons from "../../components/Buttons";
// Import ethers and your contract's ABI
import { ethers } from "ethers";
import { PinataSDK } from "pinata";
import TradeBridgeABI from "../../../TradeBridge.json";
import Navbar from "../../components/Navbar";
// require("dotenv").config();

const CreateCommodity = () => {
  const pinata = new PinataSDK({
    pinataJwt:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzYmYxZmFiYy0xYzAxLTRiOTItYTYzOS1iNjNjYTQ1NTY4NmEiLCJlbWFpbCI6Imt2bmc2NTZAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImJkYzg1NGRjMTI4YTMwYjUzNTY0Iiwic2NvcGVkS2V5U2VjcmV0IjoiODlmZmU4NGRkZjQ4MDgwZGRlZDEzZTkwYjJiMzIzODY4M2NkMjY1ODFhOTQwOGFmNjcxNmJkNWM0YmIzN2Q2ZCIsImV4cCI6MTc1ODkyOTU4NH0.8V2wO6sqlAkZGwkA28rf32DyeekyGjjRykhWAx62Iz8",
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
  const [imageTwo, setImageTwo] = useState(null);
  const [imageThree, setImageThree] = useState(null);
  const [imageFour, setImageFour] = useState(null);

  const handleImageUpload = async (event, setImage) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = async () => {
        try {
          const base64Data = reader.result.split(",")[1]; // Get the base64 part of the data URL
          const blob = new Blob([
            new Uint8Array(
              await (await fetch(`data:image/jpeg;base64,${base64Data}`)).blob()
            ),
          ]);

          // Upload to Pinata
          const upload = await pinata.upload.file(blob, {
            pinataMetadata: { name: file.name },
          });
          console.log(upload);

          // Store the image CID in state
          setImageOne(upload.cid);
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  // async function upload() {
  //   try {
  //     const file = new File(["hello"], "Testing.txt", { type: "text/plain" });
  //     const upload = await pinata.upload.file(file);
  //     console.log(upload);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const handleSubmit = async (event) => {
    event.preventDefault();

    await Promise.all([
      imageOne
        ? Promise.resolve(imageOne)
        : handleImageUpload(
            document.querySelector('input[type="file"]'),
            setImageOne
          ),
    ]);

    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const contractAddress = import.meta.env.VITE_TRADE_BRIDGE_SCA;
        console.log("Contract Address:", contractAddress);

        // Check if contractAddress is valid
        if (!contractAddress || !ethers.isAddress(contractAddress)) {
          console.error("Invalid contract address:", contractAddress);
          alert("Contract address is not defined or invalid.");
          return;
        }

        // Create contract instance
        const commodityContract = new ethers.Contract(
          contractAddress,
          TradeBridgeABI,
          signer
        );
        console.log("Contract Object:", commodityContract);
        // console.log(
        //   "Available Functions:",
        //   Object.keys(commodityContract.functions)
        // );

        // Call the createCommodity function
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

        await tx.wait(); // Wait for the transaction to be mined
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
    <div className="bg-gray-900">
       <h1 className="text-xl text-white font-normal p-10 mb-4">Create Commodities</h1>
    <div className="p-10 flex justify-center h-screen">
      {/* Form for creating a commodity */}
      <form className="space-y-2 w-[700px]" onSubmit={handleSubmit}>
        <div>
          <label>Commodity Name</label>
          <input
            type="text"
            className="border rounded-xl w-full p-3"
            placeholder="Enter commodity name"
            value={commodityName}
            onChange={(e) => setCommodityName(e.target.value)}
          />
        </div>
        <div>
          <label>Commodity Quantity</label>
          <input
            type="text"
            className="border rounded-xl w-full p-3"
            placeholder="Enter available quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div>
          <label>Quantity Measurement</label>
          <input
            type="text"
            className="border rounded-xl w-full p-3"
            placeholder="E.g (Kg, tonnes)"
            value={measurement}
            onChange={(e) => setMeasurement(e.target.value)}
          />
        </div>
        <div>
          <label>Price per Quantity</label>
          <input
            type="text"
            className="border rounded-xl w-full p-3"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label>Commodity Locatiion</label>
          <input
            type="text"
            className="border rounded-xl w-full p-3"
            placeholder="E.g (Abuja, Accra, etc)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div>
          <label>Commodity Description</label>
          <textarea
            className="border rounded-xl w-full p-3"
            placeholder="Enter commodity description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Upload Image</label>
          <input
            type="file"
            className="border rounded-lg w-full p-3 h-24 bg-white cursor-pointer hover:border-blue-500"
            accept="image/*"
            onChange={(event) => handleImageUpload(event, setImageOne)}
          />
          {imageOne && (
            <img
              src={imageOne}
              alt="Uploaded Preview"
              className="mt-2 h-40 w-auto rounded-lg"
            />
          )}
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="bg-gradient-to-r from-orange-400 to-yellow-500 text-black px-6 py-3 w-full rounded-full shadow-md hover:scale-105 transform transition duration-300 ease-in-out"
          >
            Create Commodity
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default CreateCommodity;
