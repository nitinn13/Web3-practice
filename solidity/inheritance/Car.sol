pragma solidity ^0.8.0;

import "./Vehicle.sol";

contract Car is Vehicle{
    uint public doors;

    constructor(uint _doors, string memory _brand) Vehicle(_brand) {
        doors = _doors;
    }

    function desc() public pure override returns (string memory){
        return "This is a car";
    }


}



