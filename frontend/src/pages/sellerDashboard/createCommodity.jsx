import React, { useState } from "react";
import { ethers } from "ethers";
import { PinataSDK } from "pinata";
import TradeBridgeABI from "../../../TradeBridge.json";
// import 'dotenv/config';

// require("dotenv").config();

// console.log(process.env)

// const { CONTRACT_ADDRESS } = process.env;

const CreateCommodity = () => {
  const pinata = new PinataSDK({
    pinataJwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzYmYxZmFiYy0xYzAxLTRiOTItYTYzOS1iNjNjYTQ1NTY4NmEiLCJlbWFpbCI6Imt2bmc2NTZAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImJkYzg1NGRjMTI4YTMwYjUzNTY0Iiwic2NvcGVkS2V5U2VjcmV0IjoiODlmZmU4NGRkZjQ4MDgwZGRlZDEzZTkwYjJiMzIzODY4M2NkMjY1ODFhOTQwOGFmNjcxNmJkNWM0YmIzN2Q2ZCIsImV4cCI6MTc1ODkyOTU4NH0.8V2wO6sqlAkZGwkA28rf32DyeekyGjjRykhWAx62Iz8",
    pinataGateway: "https://gateway.pinata.cloud",
  });
  
  const [commodityName, setCommodityName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [measurement, setMeasurement] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [imageOne, setImageOne] = useState(null);
  const [file, setFile] = useState(null);
  const [filePrev, setFilePrev] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file)
    if (file) {
      const reader = new FileReader();

      reader.onloadend = async () => {
        try {
          const base64Data = reader.result.split(",")[1];
          console.log(base64Data)
          setFile(e.target.files[0]);
          setImageOne(e.target.files[0].name)
          setFilePrev(base64Data)
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const upload = await pinata.pinFileToIPFS(file, {
          pinataMetadata: { name: file.name },
        });
        setImageOne(upload.IpfsHash); // Store the IPFS hash
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract("0x4BF47939E4f6f463AFF6f2Eb9E617902B4D186b9", TradeBridgeABI, signer);
        
        const imageURL = `https://gateway.pinata.cloud/ipfs/${imageOne}`

        console.log(
          commodityName,
          description,
          quantity,
          measurement,
          price,
          imageOne,
          imageURL,
          location
        )
        const tx = await contract.addCommodity(
          commodityName,
          description,
          quantity,
          measurement,
          price,
          imageOne,
          imageURL,
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
    <div className="mt-20 justify-center items-center mx-24">
      <h1 className="text-3xl font-bold mb-4">Create Commodity</h1>
      <form className="space-y-2 w-[700px]" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Commodity Name"
          value={commodityName}
          onChange={(e) => setCommodityName(e.target.value)}
          className="border rounded-xl w-full p-3"
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border rounded-xl w-full p-3"
          required
        />
        <input
          type="text"
          placeholder="Measurement (Kg, tonnes)"
          value={measurement}
          onChange={(e) => setMeasurement(e.target.value)}
          className="border rounded-xl w-full p-3"
          required
        />
        <input
          type="number"
          placeholder="Price per Quantity"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border rounded-xl w-full p-3"
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border rounded-xl w-full p-3"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded-xl w-full p-3"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100
                    border rounded-lg w-full p-3 h-15
                    bg-white cursor-pointer"
          required
        />
        {file && (
          <div class="flex items-center justify-center">
          <img
            src={`data:image/png;base64,${filePrev}`}
            alt="Uploaded Preview"
            className="mt-2 h-40 w-auto rounded-lg"
          />
          </div>
        )}
        <button
          type="submit"
          className="bg-gradient-to-r from-orange-400 to-yellow-500 text-black px-6 py-3 w-full rounded-full shadow-md hover:scale-105 transform transition duration-300 ease-in-out"
        >
          Create Commodity
        </button>
      </form>
    </div>
  );
};

export default CreateCommodity;
