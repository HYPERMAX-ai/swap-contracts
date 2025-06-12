// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract xUSD is ERC20("Hypermax USD", "xUSD") {
    function mint(address account, uint256 amount) external {
        _mint(account, amount);
    }
}
