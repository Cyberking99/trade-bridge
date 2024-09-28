// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "./TradeBridgeFC.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

interface ITBTK {
    function balanceOf(address account) external view returns (uint);
    function transfer(address recipient, uint amount) external returns (bool);
}

contract TradeBridge is ERC1155Holder {
    uint public transactionFee;
    uint public transactionCount;
    uint public nextCommodityId;
    address public owner;
    ITBTK public tbtkToken;

    struct Commodity {
        uint commodityId;
        string commodityTitle;
        string commodityDescription;
        uint commodityQuantity;
        string quantityMeasurement;
        uint pricePerQuantity;
        string imageOne;
        string imageTwo;
        string imageThree;
        string imageFour;
        address nftContract;
        string commodityLocation;
        bool isAvailable;
        bool hasReceived;
        uint createdAt;
    }

    struct Sale {
        address buyer;
        address seller;
        uint commodityId;
        uint quantity;
    }

    struct Dispute {
        address buyer;
        address seller;
        string report;
        bool isResolved;
    }

    Commodity[] public allCommodities;
    Sale[] public sales;

    mapping(address => uint[]) public userCommodities;
    mapping(address => mapping(uint => bool)) public userCommoditiesInvolved;
    mapping(uint => Dispute) public disputes;

    event CommodityPurchased(address indexed buyer, uint commodityId, uint quantity, uint amount);
    event CommodityAdded(address indexed seller, uint commodityId, string commodityTitle, string commodityDescription, uint commodityQuantity, string quantityMeasurement, string imageOne, string imageTwo, string imageThree, string imageFour, uint createdAt, string commodityLocation);
    event DisputeRaised(address indexed defaulter, address indexed reporter, uint commodityId, string report);
    event DisputeResolved(address indexed defaulter, address indexed reporter, uint commodityId);
    event CommodityReceived(address indexed buyer, uint commodityId);

    constructor(address _tbtkToken) {
        owner = msg.sender;
        nextCommodityId = 1;
        tbtkToken = ITBTK(_tbtkToken);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Error: You are not the owner");
        _;
    }

    function addCommodity(
        string memory _commodityTitle,
        string memory _commodityDescription,
        uint _commodityQuantity,
        string memory _quantityMeasurement,
        uint _pricePerQuantity,
        string memory _imageOne,
        string memory _imageTwo,
        string memory _imageThree,
        string memory _imageFour,
        string memory _commodityLocation
    ) public {
        TBNFT newNFT = new TBNFT(msg.sender);
        
        newNFT.mint(msg.sender, nextCommodityId, _commodityQuantity, "");

        Commodity memory newCommodity = Commodity({
            commodityId: nextCommodityId,
            commodityTitle: _commodityTitle,
            commodityDescription: _commodityDescription,
            commodityQuantity: _commodityQuantity,
            quantityMeasurement: _quantityMeasurement,
            pricePerQuantity: _pricePerQuantity,
            imageOne: _imageOne,
            imageTwo: _imageTwo,
            imageThree: _imageThree,
            imageFour: _imageFour,
            createdAt: block.timestamp,
            nftContract: address(newNFT),
            commodityLocation: _commodityLocation,
            hasReceived: false,
            isAvailable: true
        });
        
        allCommodities.push(newCommodity);
        userCommodities[msg.sender].push(nextCommodityId);
        
        emit CommodityAdded(msg.sender, nextCommodityId, _commodityTitle, _commodityDescription, _commodityQuantity, _quantityMeasurement, _imageOne, _imageTwo, _imageThree, _imageFour, block.timestamp, _commodityLocation);

        nextCommodityId++;
    }

    function getAllCommodities() external view returns (Commodity[] memory) {
        return allCommodities;
    }

    function getCommoditiesByUser(address user) external view returns (Commodity[] memory) {
        uint[] memory userCommodityIds = userCommodities[user];
        Commodity[] memory userCommoditiesArray = new Commodity[](userCommodityIds.length);

        for (uint i = 0; i < userCommodityIds.length; i++) {
            userCommoditiesArray[i] = allCommodities[userCommodityIds[i] - 1];
        }

        return userCommoditiesArray;
    }

    function buyCommodity(uint _commodityId, uint _quantity) external {
        require(_commodityId > 0 && _commodityId < nextCommodityId, "Error: Commodity does not exist");
        Commodity storage commodity = allCommodities[_commodityId - 1];
        require(commodity.commodityQuantity >= _quantity, "Error: Commodity quantity is lower than your quantity");
        require(_quantity > 0, "Error: Quantity cannot be zero");

        uint totalAmount = (commodity.pricePerQuantity * _quantity) + transactionFee;
        require(tbtkToken.balanceOf(msg.sender) >= totalAmount, "Error: Insufficient balance");

        require(tbtkToken.transferFrom(msg.sender, address(this), totalAmount), "Error: Transfer failed");

        IERC1155(commodity.nftContract).safeTransferFrom(commodity.nftContract, msg.sender, _commodityId, _quantity, "");

        commodity.commodityQuantity -= _quantity;

        sales.push(Sale({
            buyer: msg.sender,
            seller: commodity.nftContract,
            commodityId: _commodityId,
            quantity: _quantity
        }));

        userCommoditiesInvolved[msg.sender][_commodityId] = true;

        if (commodity.commodityQuantity == 0) {
            commodity.isAvailable = false;
        }

        emit CommodityPurchased(msg.sender, _commodityId, _quantity, totalAmount);
    }

    function setTransactionFee(uint _fee) external onlyOwner {
        transactionFee = _fee;
    }

    function haveReceived(uint _commodityId) external {
        require(_commodityId > 0 && _commodityId < nextCommodityId, "Error: Commodity does not exist");
        require(userCommoditiesInvolved[msg.sender][_commodityId], "Error: You have not been involved in a sale for this commodity");

        Sale memory sale;
        bool saleFound = false;
        for (uint i = 0; i < sales.length; i++) {
            if (sales[i].buyer == msg.sender && sales[i].commodityId == _commodityId) {
                sale = sales[i];
                saleFound = true;
                break;
            }
        }

        require(saleFound, "Error: Sale not found");

        Commodity storage commodity = allCommodities[_commodityId - 1];
        commodity.hasReceived = true;
        
        uint totalAmount = commodity.pricePerQuantity * sale.quantity;
        require(tbtkToken.balanceOf(address(this)) >= totalAmount, "Error: Insufficient contract balance to transfer to seller");
        
        require(tbtkToken.transfer(sale.seller, totalAmount), "Error: Transfer to seller failed");

        emit CommodityReceived(msg.sender, _commodityId);
    }

    function buyerRaiseDispute(address _defaulter, uint _commodityId, string memory _report) external {
        require(userCommoditiesInvolved[msg.sender][_commodityId], "Error: You cannot raise a dispute for this commodity");

        bool isSeller = false;

        for (uint i = 0; i < sales.length; i++) {
            if (sales[i].commodityId == _commodityId && sales[i].seller == _defaulter && sales[i].buyer == msg.sender) {
                isSeller = true;
                break;
            }
        }

        require(isSeller, "Error: The defaulter is not the seller of this commodity");
        
        disputes[_commodityId] = Dispute({
            buyer: msg.sender,
            seller: _defaulter,
            report: _report,
            isResolved: false
        });

        emit DisputeRaised(_defaulter, msg.sender, _commodityId, _report);
    }

    function resolveDispute(uint _commodityId) external onlyOwner {
        require(disputes[_commodityId].buyer != address(0), "Error: No dispute found.");
        require(!disputes[_commodityId].isResolved, "Error: This dispute has been resolved");

        Commodity storage commodity = allCommodities[_commodityId - 1];
        
        Sale memory sale;
        bool saleFound = false;
        for (uint i = 0; i < sales.length; i++) {
            if (sales[i].commodityId == _commodityId) {
                sale = sales[i];
                saleFound = true;
                break;
            }
        }
        
        require(saleFound, "Error: Sale not found");

        uint totalAmount = commodity.pricePerQuantity * sale.quantity;

        require(tbtkToken.transfer(disputes[_commodityId].buyer, totalAmount), "Error: Transfer to buyer failed");

        disputes[_commodityId].isResolved = true;

        emit DisputeResolved(disputes[_commodityId].seller, disputes[_commodityId].buyer, _commodityId);
    }
}