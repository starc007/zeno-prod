// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import "hardhat/console.sol";

contract Payment {

    constructor() payable {
        console.log("Constructor called");
    }

    function getContractBal() public view returns (uint256){
        return address(this).balance;
    }

    function userBal() public view returns (uint256){
        return msg.sender.balance;
    }
    
    struct Pay {
        address to;
        uint256 amount;
        uint256 timestamp;
    }

    Pay[] public paymentsArray;

    mapping(address => Pay) public paymentsMap;

    function pay(address payable _to, uint256 _amount) public payable {
        require(_amount > 0);
        require(_to != address(this));
        paymentsMap[_to].amount = _amount;
        paymentsMap[_to].timestamp = block.timestamp;
        paymentsMap[_to].to = _to;
        _to.transfer(_amount);
        paymentsArray.push(Pay(_to, _amount, block.timestamp));
        console.log("Payment Done of %s to %s", _amount, _to);  
    }

    function depositInContract() external payable {
        console.log("Deposit of %s Successfull.", msg.value);
    }


    function getAllPaymentsHistory() public view returns (Pay[] memory){
        return paymentsArray;
    }

    function getPaymentHistoryByAddress(address _address) public view returns (Pay memory){
        return paymentsMap[_address];
    }


    function getLastPayment() public view returns (Pay memory){
        return paymentsArray[paymentsArray.length - 1];
    }

    
}