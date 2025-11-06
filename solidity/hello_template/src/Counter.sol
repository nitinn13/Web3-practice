// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

contract Counter { 
    uint private value;

    constructor(uint _val){
        value = _val;
    }


    function increase() public {
        value++;
    }

    function decrease() public {
        value--;
    }

    function getNum() public view returns(uint){
        return value;
    }


}
