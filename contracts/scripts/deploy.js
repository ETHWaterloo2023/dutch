async function main() {
  const GroupExpenses = await ethers.getContractFactory("GroupExpenses");

  const group_expenses = await GroupExpenses.deploy("Paige", "Girls Trip");
  console.log("Contract deployed to address:", group_expenses.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
