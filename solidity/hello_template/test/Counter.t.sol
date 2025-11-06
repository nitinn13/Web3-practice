// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "forge-std/Test.sol";

import "src/Counter.sol";

contract TestCounter is Test {
    Counter c;

    function setUp() public {
        c = new Counter(uint(1));
    }

    function testInc() public {
        c.increase();
        assertEq(c.getNum(), uint(2), "ok");
    }

    function testDec() public {
        c.decrease();
        assertEq(c.getNum(), uint(0) , "ok");
    }

    function test_RevertWhen_DecreasingBelowZero() public {
        c.decrease();

        // Expect the next call to revert
        vm.expectRevert();
        c.decrease();
    }


}
