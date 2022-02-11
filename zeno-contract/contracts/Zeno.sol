// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Zeno is ERC20, ERC20Burnable, Ownable {
    constructor() ERC20("Zeno", "ZENO") {
        _mint(address(this), 10000000);
    }

    function getTotalSupply() public view returns (uint) {
        return totalSupply();
    }

    function transferTo(address to, uint256 amount)  public returns (bool success) {
        _transfer(address(this), to, amount);
        return true;
    }

    function getUserBalance(address user) public view returns (uint) {
        return balanceOf(user);
    }



}
