const hre = require("hardhat");


SETTINGS = {};


async function main() {
    const deployer = (await hre.ethers.getSigners())[0];
    console.log(`Deployer: ${deployer.address}\nHYPE: ${await hre.ethers.provider.getBalance(deployer.address)}`);

    const IERC20Metadata = "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol:IERC20Metadata";

    // const PURR = await hre.ethers.getContractAt(IERC20Metadata, "0xa9056c15938f9aff34CD497c722Ce33dB0C2fD57");
    // console.log(`PURR: ${await PURR.balanceOf(deployer.address)}`);

    const USDC = await hre.ethers.getContractAt(IERC20Metadata, "0x24ac48bf01fd6CB1C3836D08b3EdC70a9C4380cA");
    console.log(`USDC: ${await USDC.balanceOf(deployer.address)}`);

    const xUSD = await hre.ethers.getContractAt(IERC20Metadata, "0xb9f1dfC4BE6a0ef2D5e99bAF6FCd889C1224b383");
    console.log(`xUSD: ${await xUSD.balanceOf(deployer.address)}`);

    const xHYPE = await hre.ethers.getContractAt(IERC20Metadata, "0x9f680eC291ce3d62e4Ac7D72cA348ddE519E00eA");
    console.log(`xHYPE: ${await xHYPE.balanceOf(deployer.address)}`);

    const HYPE = await hre.ethers.getContractAt(IERC20Metadata, "0x5555555555555555555555555555555555555555");
    console.log(`HYPE: ${await HYPE.balanceOf(deployer.address)}`);

    const HMX = await hre.ethers.getContractAt(IERC20Metadata, "0xB4C438036D6419f616237beC09243C594d08eE79");
    console.log(`HMX: ${await HMX.balanceOf(deployer.address)}`);

    const UBTC = await hre.ethers.getContractAt(IERC20Metadata, "0x09F83c5052784c63603184e016e1Db7a24626503");
    console.log(`UBTC: ${await UBTC.balanceOf(deployer.address)}`);

    const UETH = await hre.ethers.getContractAt(IERC20Metadata, "0x5a1A1339ad9e52B7a4dF78452D5c18e8690746f3");
    console.log(`UETH: ${await UETH.balanceOf(deployer.address)}`);


    /* get factory */

    const factory = await hre.ethers.getContractAt("UniswapV3Factory", "0xFA5CEa54b4Bc472D9C5C69850696b8bBec4704a6");
    console.log(`factory: ${await factory.getAddress()}`);


    /* initialize */

    async function init(tokenA, tokenB, fee, amountAHuman, amountBHuman) {
        const addrA = (await tokenA.getAddress()).toLowerCase();
        const addrB = (await tokenB.getAddress()).toLowerCase();

        const [token0, token1, amount0Human, amount1Human] =
            addrA < addrB
                ? [tokenA, tokenB, amountAHuman, amountBHuman]
                : [tokenB, tokenA, amountBHuman, amountAHuman];

        const lpAddress = await factory.getPool(
            await token0.getAddress(),
            await token1.getAddress(),
            fee
        );
        console.log(
            `lpAddress: ${lpAddress} - token0: ${await token0.getAddress()}, token1: ${await token1.getAddress()}`
        );
        const pool = await hre.ethers.getContractAt("IUniswapV3Pool", lpAddress);

        const token0Amount = hre.ethers.parseUnits(
            amount0Human,
            await token0.decimals()
        );
        const token1Amount = hre.ethers.parseUnits(
            amount1Human,
            await token1.decimals()
        );

        const sqrt = (n) => {
            if (n < 2n) return n;
            let x = n, y = (n >> 1n) + 1n;
            while (y < x) {
                x = y;
                y = (y + n / y) >> 1n;
            }
            return x;
        };
        const sqrtPriceX96 = sqrt((token1Amount << 192n) / token0Amount);
        console.log(`sqrtPriceX96: ${sqrtPriceX96}`);

        const tx = await pool.initialize(sqrtPriceX96, SETTINGS);
        console.log(`tx hash: ${(await tx.wait()).hash}`);
    }


    // HYPE<>USDC 3000
    await init(HYPE, USDC, 3000);

    // xHYPE<>USDC 3000
    await init(xHYPE, USDC, 3000);

    // xHYPE<>HYPE 500
    await init(xHYPE, HYPE, 500);

    // xHYPE<>xUSD 3000
    await init(xHYPE, xUSD, 3000);

    // xUSD<>USDC 500
    await init(xUSD, USDC, 500);

    // xUSD<>HYPE 3000
    await init(xUSD, HYPE, 3000);

    // HMX<>HYPE 3000
    await init(HMX, HYPE, 3000, "38.34", "0.005");

    // HYPE<>UBTC 3000
    await init(UBTC, HYPE, 3000);

    // HYPE<>UETH 3000
    await init(UETH, HYPE, 3000);

    // HYPE<>UBTC 500
    await init(UBTC, HYPE, 500, "105064.00", "148.44");

    // HYPE<>UETH 500
    await init(UETH, HYPE, 500, "2535.00", "148.44");

    // HMX<>HYPE 500
    await init(HMX, HYPE, 500, "700.00", "1.00");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
