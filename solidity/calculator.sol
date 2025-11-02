// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Calculator {
    uint256 num;

    constructor (uint256 _num){
        num = _num;
    }

    function add(uint _val) public {
        num += _val;
    }
    function subtract(uint _val) public {
        num -=_val;
    }
    function getval() public view returns (uint256){
        return num;
    }


}

