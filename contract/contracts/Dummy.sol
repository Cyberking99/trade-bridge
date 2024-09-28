// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC1155Factory.sol";  // Ensure the path is correct

contract TokenCaller {
    ERC1155Factory public factory;

    constructor(address factoryAddress) {
        factory = ERC1155Factory(factoryAddress);
    }

    function createNewToken(string memory uri) public {
        // Call the factory to create a new ERC1155 contract
        factory.createERC1155(uri);
    }

    function getDeployedTokens() public view returns (MyERC1155[] memory) {
        return factory.getDeployedContracts();
    }
}
