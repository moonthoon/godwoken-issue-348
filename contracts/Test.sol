//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Test {
    IERC20 Token;

    constructor(address _token) {
        Token = IERC20(_token);
    }

    function test(address _sendTo, uint _amount) public {
        Token.transferFrom(msg.sender, _sendTo, _amount);
    }
}
