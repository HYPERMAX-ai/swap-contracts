const hre = require("hardhat");


SETTINGS = {};


async function main() {
    const deployer = (await hre.ethers.getSigners())[0];
    console.log(`Deployer: ${deployer.address}\nHYPE: ${await hre.ethers.provider.getBalance(deployer.address)}`);

    /* deploy quoter */

    const quoter = await hre.ethers.deployContract(
        "QuoterV2",
        [
            "0xFA5CEa54b4Bc472D9C5C69850696b8bBec4704a6", // _factory
            "0x5555555555555555555555555555555555555555" // _WETH9
        ],
        SETTINGS
    );
    await quoter.waitForDeployment();
    console.log(`quoter: ${await quoter.getAddress()}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
