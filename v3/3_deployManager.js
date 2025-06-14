const hre = require("hardhat");


SETTINGS = {};


async function main() {
    const deployer = (await hre.ethers.getSigners())[0];
    console.log(`Deployer: ${deployer.address}\nHYPE: ${await hre.ethers.provider.getBalance(deployer.address)}`);

    /* deploy NFTDescriptor */
    const desc = await hre.ethers.deployContract(
        "NFTDescriptor",
        SETTINGS
    );
    await desc.waitForDeployment();
    console.log(`desc: ${await desc.getAddress()}`);

    /* deploy NonfungibleTokenPositionDescriptor */
    const nftdesc = await hre.ethers.deployContract(
        "NonfungibleTokenPositionDescriptor",
        [
            "0x5555555555555555555555555555555555555555",  // _WETH9
            "0x4859504500000000000000000000000000000000000000000000000000000000"  // _nativeCurrencyLabelBytes
        ],
        {
            libraries: {
                NFTDescriptor: await desc.getAddress(),
            },
        },
        SETTINGS
    );
    await nftdesc.waitForDeployment();
    console.log(`nftdesc: ${await nftdesc.getAddress()}`);

    /* deploy NonfungiblePositionManager */
    const manager = await hre.ethers.deployContract(
        "NonfungiblePositionManager",
        [
            "0xFA5CEa54b4Bc472D9C5C69850696b8bBec4704a6",  // _factory
            "0x5555555555555555555555555555555555555555",  // _WETH9
            await nftdesc.getAddress()  // _tokenDescriptor_
        ],
        SETTINGS
    );
    await manager.waitForDeployment();
    console.log(`manager: ${await manager.getAddress()}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
