// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import {UniswapV3Pool} from "../../v3-core/contracts/UniswapV3Pool.sol";

contract Utils {
    // bytes32 internal constant POOL_INIT_CODE_HASH =
    //     0xea19a015c6e60ebd00453e11c51c3ec346db2509ae927b69a6e15638e917a32d;

    function initcodehash() external pure returns (bytes32 bytecode) {
        bytecode = keccak256(type(UniswapV3Pool).creationCode);
    }

    struct PoolKey {
        address token0;
        address token1;
        uint24 fee;
    }

    function computeAddress(
        address factory,
        PoolKey memory key,
        bytes32 POOL_INIT_CODE_HASH
    ) external pure returns (address pool) {
        require(key.token0 < key.token1);
        pool = address(
            uint160(
                uint256(
                    keccak256(
                        abi.encodePacked(
                            hex"ff",
                            factory,
                            keccak256(
                                abi.encode(key.token0, key.token1, key.fee)
                            ),
                            POOL_INIT_CODE_HASH
                        )
                    )
                )
            )
        );
    }
}
