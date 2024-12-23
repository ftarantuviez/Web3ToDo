const hre = require("hardhat");

async function main() {
  console.log("Deploying ToDo contract...");

  // Deploy the contract
  const ToDo = await hre.ethers.getContractFactory("ToDo");
  const todo = await ToDo.deploy();

  await todo.waitForDeployment();
  const address = await todo.getAddress();

  console.log("ToDo contract deployed to:", address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
