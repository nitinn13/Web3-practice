// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract Will {
    address public owner;
    address public recipient; 
    uint256 public amount;
    uint256 public lastCalled; 

    constructor( address _rec) {
        owner = msg.sender;
        recipient = _rec;
        lastCalled = block.timestamp;
    }

    function deposit() public payable {
        amount += msg.value;
    }

    function ping() public {
        require(msg.sender == owner, "only owner can ping");
        lastCalled = block.timestamp;
    }

    function drain() public {
        require(msg.sender == recipient, "not the recipient");
        require(block.timestamp > lastCalled + 30 days, "Owner recently pinged");

        payable(recipient).transfer(amount);
        amount = 0;
    }
}

