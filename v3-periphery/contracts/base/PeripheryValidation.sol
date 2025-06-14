// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.20;

import './BlockTimestamp.sol';

abstract contract PeripheryValidation is BlockTimestamp {
    modifier checkDeadline(uint256 deadline) {
        require(_blockTimestamp() <= deadline, 'Transaction too old');
        _;
    }
}
