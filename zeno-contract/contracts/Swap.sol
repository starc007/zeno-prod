// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import "hardhat/console.sol";
import '@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol';
import '@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol';

contract SwapToken {
    
    ISwapRouter public immutable swapRouter;

    address public zeno = 0x2E379753aE52602c2E9F812e12f57504c744cACE;
    address public test = 0xc60761df8602FEB6982a1236418D107d9f1bC55B;

    uint24 public constant poolFee = 3000;

    constructor(ISwapRouter _swapRouter) public {
        swapRouter = _swapRouter;
    }

    
    function swapExactInputSingle(uint256 amountIn) external returns (uint256 amountOut) {
        // msg.sender must approve this contract

        // Transfer the specified amount of zeno to this contract.
        TransferHelper.safeTransferFrom(zeno, msg.sender, address(this), amountIn);

        // Approve the router to spend zeno.
        TransferHelper.safeApprove(zeno, address(swapRouter), amountIn);

        // Naively set amountOutMinimum to 0. In production, use an oracle or other data source to choose a safer value for amountOutMinimum.
        // We also set the sqrtPriceLimitx96 to be 0 to ensure we swap our exact input amount.
        ISwapRouter.ExactInputSingleParams memory params =
            ISwapRouter.ExactInputSingleParams({
                tokenIn: zeno,
                tokenOut: test,
                fee: poolFee,
                recipient: msg.sender,
                deadline: block.timestamp,
                amountIn: amountIn,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });

        // The call to `exactInputSingle` executes the swap.
        amountOut = swapRouter.exactInputSingle(params);
    }


    /// @notice swapExactOutputSingle swaps a minimum possible amount of zeno for a fixed amount of test.
    /// @dev The calling address must approve this contract to spend its zeno for this function to succeed. As the amount of input zeno is variable,
    /// the calling address will need to approve for a slightly higher amount, anticipating some variance.
    /// @param amountOut The exact amount of test9 to receive from the swap.
    /// @param amountInMaximum The amount of zeno we are willing to spend to receive the specified amount of test9.
    /// @return amountIn The amount of zeno actually spent in the swap.
    function swapExactOutputSingle(uint256 amountOut, uint256 amountInMaximum) external returns (uint256 amountIn) {
        // Transfer the specified amount of zeno to this contract.
        TransferHelper.safeTransferFrom(zeno, msg.sender, address(this), amountInMaximum);

        // Approve the router to spend the specifed `amountInMaximum` of zeno.
        // In production, you should choose the maximum amount to spend based on oracles or other data sources to acheive a better swap.
        TransferHelper.safeApprove(zeno, address(swapRouter), amountInMaximum);

        ISwapRouter.ExactOutputSingleParams memory params =
            ISwapRouter.ExactOutputSingleParams({
                tokenIn: zeno,
                tokenOut: test,
                fee: poolFee,
                recipient: msg.sender,
                deadline: block.timestamp,
                amountOut: amountOut,
                amountInMaximum: amountInMaximum,
                sqrtPriceLimitX96: 0
            });

        // Executes the swap returning the amountIn needed to spend to receive the desired amountOut.
        amountIn = swapRouter.exactOutputSingle(params);

        // For exact output swaps, the amountInMaximum may not have all been spent.
        // If the actual amount spent (amountIn) is less than the specified maximum amount, we must refund the msg.sender and approve the swapRouter to spend 0.
        if (amountIn < amountInMaximum) {
            TransferHelper.safeApprove(zeno, address(swapRouter), 0);
            TransferHelper.safeTransfer(zeno, msg.sender, amountInMaximum - amountIn);
        }
    }
}