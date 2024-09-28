// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CustomERC1155 is ERC1155, Ownable {
    uint256 private _currentTokenId;

    string public name;
    string public symbol;

    constructor(string memory _name, string memory _symbol, string memory _uri) ERC1155(_uri) Ownable () {
        name = _name;
        symbol = _symbol;
    }

    function mint(address account, uint256 amount, bytes memory data) public onlyOwner {
        _currentTokenId++;
        _mint(account, _currentTokenId, amount, data);
    }

    function mintBatch(address to, uint256[] memory amounts, bytes memory data) public onlyOwner {
        uint256[] memory ids = new uint256[](amounts.length);
        for (uint256 i = 0; i < amounts.length; i++) {
            _currentTokenId++;
            ids[i] = _currentTokenId;
        }
        _mintBatch(to, ids, amounts, data);
    }
}

contract ERC1155Factory {
    event ERC1155Created(address tokenAddress, string name, string symbol);

    function createERC1155(string memory name, string memory symbol, string memory uri) public returns (address) {
        CustomERC1155 newToken = new CustomERC1155(name, symbol, uri);
        newToken.transferOwnership(msg.sender);
        
        emit ERC1155Created(address(newToken), name, symbol);
        return address(newToken);
    }
}