// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IERC721Receiver} from "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract Treasury is IERC721Receiver {
    address public immutable initialOwner;
    mapping(address => bool) public owners;

    constructor(address _initialOwner) {
        initialOwner = _initialOwner;
        owners[_initialOwner] = true;
    }

    receive() external payable {}

    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external pure returns (bytes4) {
        operator;
        from;
        tokenId;
        data;
        return IERC721Receiver.onERC721Received.selector;
    }

    /* Owner */

    modifier onlyInitialOwner() {
        require(msg.sender == initialOwner, "Not an initial owner.");
        _;
    }

    modifier onlyOwner() {
        require(owners[msg.sender], "Not an owner.");
        _;
    }

    function modifyOwner(address owner, bool flag) external onlyInitialOwner {
        owners[owner] = flag;
    }

    /* Call */

    function execute(
        address dest,
        uint256 value,
        bytes calldata func
    ) external onlyOwner {
        _call(dest, value, func);
    }

    function executeBatch(
        address[] calldata dest,
        uint256[] calldata value,
        bytes[] calldata func
    ) external onlyOwner {
        require(
            dest.length == func.length &&
                (value.length == 0 || value.length == func.length),
            "wrong array length"
        );
        if (value.length == 0) {
            for (uint256 i = 0; i < dest.length; i++) {
                address _dest = dest[i];
                bytes calldata _func = func[i];
                _call(_dest, 0, _func);
            }
        } else {
            for (uint256 i = 0; i < dest.length; i++) {
                address _dest = dest[i];
                bytes calldata _func = func[i];
                _call(_dest, value[i], _func);
            }
        }
    }

    function _call(address target, uint256 value, bytes memory data) internal {
        (bool success, bytes memory result) = target.call{value: value}(data);
        if (success) {
            /* pass */
        } else {
            assembly {
                revert(add(result, 32), mload(result))
            }
        }
    }

    /* Withdraw */

    function withdrawTokens(
        address[] calldata tokens,
        uint256[] calldata amounts,
        address receipent
    ) external onlyOwner {
        for (uint256 i = 0; i < tokens.length; i++) {
            IERC20(tokens[i]).transfer(receipent, amounts[i]);
        }
    }

    function withdraw(address receipent, uint256 amount) external onlyOwner {
        (bool success, ) = payable(receipent).call{value: amount}("");
        require(success, "Fail to send.");
    }
}
