const hre = require("hardhat");


SETTINGS = {};


async function main() {
    const deployer = (await hre.ethers.getSigners())[0];
    console.log(`Deployer: ${deployer.address}\nHYPE: ${await hre.ethers.provider.getBalance(deployer.address)}`);

    /* deploy router */

    const router = await hre.ethers.deployContract(
        "SwapRouter",
        [
            "0xFA5CEa54b4Bc472D9C5C69850696b8bBec4704a6",  // factory
            "0x5555555555555555555555555555555555555555"  // weth9
        ],
        SETTINGS
    );
    await router.waitForDeployment();
    console.log(`router: ${await router.getAddress()}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
