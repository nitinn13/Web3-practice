pragma solidity ^0.8.0;

contract Pop{

    struct Person {
        string name;
        uint128 age;
        address addr;
    }

    mapping(address => Person) public pop;

   

    constructor(){
    
    }
    function setp(string memory _name , uint128 _age) public  {
        pop[msg.sender] = Person({
            name : _name,
            age : _age,
            addr : msg.sender
        });

    }


    function getp() public view returns (string memory, uint128, address){

        Person memory p1 = pop[msg.sender];

        
        return (p1.name, p1.age, p1.addr);
    }


}
