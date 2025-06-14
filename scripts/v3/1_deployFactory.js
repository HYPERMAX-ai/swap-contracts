const hre = require("hardhat");


SETTINGS = {};


async function main() {
    const deployer = (await hre.ethers.getSigners())[0];
    console.log(`Deployer: ${deployer.address}\nHYPE: ${await hre.ethers.provider.getBalance(deployer.address)}`);

    /* deploy factory */

    const factory = await hre.ethers.deployContract("UniswapV3Factory");
    await factory.waitForDeployment();
    console.log(`factory: ${await factory.getAddress()}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
