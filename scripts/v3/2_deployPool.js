const hre = require("hardhat");


SETTINGS = {};


async function main() {
    const deployer = (await hre.ethers.getSigners())[0];
    console.log(`Deployer: ${deployer.address}\nHYPE: ${await hre.ethers.provider.getBalance(deployer.address)}`);

    // const PURR = await hre.ethers.getContractAt("IERC20", "0xa9056c15938f9aff34CD497c722Ce33dB0C2fD57");
    // console.log(`PURR: ${await PURR.balanceOf(deployer.address)}`);

    const USDC = await hre.ethers.getContractAt("IERC20", "0x24ac48bf01fd6CB1C3836D08b3EdC70a9C4380cA");
    console.log(`USDC: ${await USDC.balanceOf(deployer.address)}`);

    const xUSD = await hre.ethers.getContractAt("IERC20", "0xb9f1dfC4BE6a0ef2D5e99bAF6FCd889C1224b383");
    console.log(`xUSD: ${await xUSD.balanceOf(deployer.address)}`);

    const xHYPE = await hre.ethers.getContractAt("IERC20", "0x9f680eC291ce3d62e4Ac7D72cA348ddE519E00eA");
    console.log(`xHYPE: ${await xHYPE.balanceOf(deployer.address)}`);

    const HYPE = await hre.ethers.getContractAt("IERC20", "0x5555555555555555555555555555555555555555");
    console.log(`HYPE: ${await HYPE.balanceOf(deployer.address)}`);

    const HMX = await hre.ethers.getContractAt("IERC20", "0xB4C438036D6419f616237beC09243C594d08eE79");
    console.log(`HMX: ${await HMX.balanceOf(deployer.address)}`);

    const UBTC = await hre.ethers.getContractAt("IERC20", "0x09F83c5052784c63603184e016e1Db7a24626503");
    console.log(`UBTC: ${await UBTC.balanceOf(deployer.address)}`);

    const UETH = await hre.ethers.getContractAt("IERC20", "0x5a1A1339ad9e52B7a4dF78452D5c18e8690746f3");
    console.log(`UETH: ${await UETH.balanceOf(deployer.address)}`);


    /* get factory */

    const factory = await hre.ethers.getContractAt("UniswapV3Factory", "0xFA5CEa54b4Bc472D9C5C69850696b8bBec4704a6");
    console.log(`factory: ${await factory.getAddress()}`);


    /* create pair */


    // HYPE<>USDC 3000
    {
        // deploy
        const tx = await factory.createPool(
            await HYPE.getAddress(),
            await USDC.getAddress(),
            3000,
            SETTINGS
        );
        const txRes = await tx.wait();
        console.log(`tx hash: ${txRes.hash}`);
        // check
        const lpAddress = await factory.getPool(
            await HYPE.getAddress(),
            await USDC.getAddress(),
            3000
        );
        console.log(`lpAddress: ${lpAddress}`);
    }

    // xHYPE<>USDC 3000
    {
        // deploy
        const tx = await factory.createPool(
            await xHYPE.getAddress(),
            await USDC.getAddress(),
            3000,
            SETTINGS
        );
        const txRes = await tx.wait();
        console.log(`tx hash: ${txRes.hash}`);
        // check
        const lpAddress = await factory.getPool(
            await xHYPE.getAddress(),
            await USDC.getAddress(),
            3000
        );
        console.log(`lpAddress: ${lpAddress}`);
    }

    // xHYPE<>HYPE 500
    {
        // deploy
        const tx = await factory.createPool(
            await xHYPE.getAddress(),
            await HYPE.getAddress(),
            500,
            SETTINGS
        );
        const txRes = await tx.wait();
        console.log(`tx hash: ${txRes.hash}`);
        // check
        const lpAddress = await factory.getPool(
            await xHYPE.getAddress(),
            await HYPE.getAddress(),
            500
        );
        console.log(`lpAddress: ${lpAddress}`);
    }

    // xHYPE<>xUSD 3000
    {
        // deploy
        const tx = await factory.createPool(
            await xHYPE.getAddress(),
            await xUSD.getAddress(),
            3000,
            SETTINGS
        );
        const txRes = await tx.wait();
        console.log(`tx hash: ${txRes.hash}`);
        // check
        const lpAddress = await factory.getPool(
            await xHYPE.getAddress(),
            await xUSD.getAddress(),
            3000
        );
        console.log(`lpAddress: ${lpAddress}`);
    }

    // xUSD<>USDC 500
    {
        // deploy
        const tx = await factory.createPool(
            await xUSD.getAddress(),
            await USDC.getAddress(),
            500,
            SETTINGS
        );
        const txRes = await tx.wait();
        console.log(`tx hash: ${txRes.hash}`);
        // check
        const lpAddress = await factory.getPool(
            await xUSD.getAddress(),
            await USDC.getAddress(),
            500
        );
        console.log(`lpAddress: ${lpAddress}`);
    }

    // xUSD<>HYPE 3000
    {
        // deploy
        const tx = await factory.createPool(
            await xUSD.getAddress(),
            await HYPE.getAddress(),
            3000,
            SETTINGS
        );
        const txRes = await tx.wait();
        console.log(`tx hash: ${txRes.hash}`);
        // check
        const lpAddress = await factory.getPool(
            await xUSD.getAddress(),
            await HYPE.getAddress(),
            3000
        );
        console.log(`lpAddress: ${lpAddress}`);
    }

    // HMX<>HYPE 3000
    {
        // deploy
        const tx = await factory.createPool(
            await HMX.getAddress(),
            await HYPE.getAddress(),
            3000,
            SETTINGS
        );
        const txRes = await tx.wait();
        console.log(`tx hash: ${txRes.hash}`);
        // check
        const lpAddress = await factory.getPool(
            await HMX.getAddress(),
            await HYPE.getAddress(),
            3000
        );
        console.log(`lpAddress: ${lpAddress}`);
    }

    // HYPE<>UBTC 500
    {
        // deploy
        const tx = await factory.createPool(
            await HYPE.getAddress(),
            await UBTC.getAddress(),
            500,
            SETTINGS
        );
        const txRes = await tx.wait();
        console.log(`tx hash: ${txRes.hash}`);
        // check
        const lpAddress = await factory.getPool(
            await HYPE.getAddress(),
            await UBTC.getAddress(),
            500
        );
        console.log(`lpAddress: ${lpAddress}`);
    }

    // HYPE<>UETH 500
    {
        // deploy
        const tx = await factory.createPool(
            await HYPE.getAddress(),
            await UETH.getAddress(),
            500,
            SETTINGS
        );
        const txRes = await tx.wait();
        console.log(`tx hash: ${txRes.hash}`);
        // check
        const lpAddress = await factory.getPool(
            await HYPE.getAddress(),
            await UETH.getAddress(),
            500
        );
        console.log(`lpAddress: ${lpAddress}`);
    }

    // HMX<>HYPE 500
    {
        // deploy
        const tx = await factory.createPool(
            await HMX.getAddress(),
            await HYPE.getAddress(),
            500,
            SETTINGS
        );
        const txRes = await tx.wait();
        console.log(`tx hash: ${txRes.hash}`);
        // check
        const lpAddress = await factory.getPool(
            await HMX.getAddress(),
            await HYPE.getAddress(),
            500
        );
        console.log(`lpAddress: ${lpAddress}`);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
