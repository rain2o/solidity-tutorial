async function main() {
  const provider = hre.ethers.getDefaultProvider();
  const [, somebodyElse] = await hre.ethers.getSigners();
  const keyboardsContractFactory = await hre.ethers.getContractFactory(
    "Keyboards"
  );
  const keyboardsContract = await keyboardsContractFactory.deploy();
  await keyboardsContract.deployed();

  const keyboardTxn1 = await keyboardsContract.create(0, true, "sepia");
  const keyboardTxn1Receipt = await keyboardTxn1.wait();
  console.log(keyboardTxn1Receipt.events);

  const keyboardTxn2 = await keyboardsContract
    .connect(somebodyElse)
    .create(1, false, "grayscale");
  const keyboardTxn2Receipt = await keyboardTxn2.wait();
  console.log(keyboardTxn2Receipt.events);

  // Tipping
  const balanceBefore = await hre.ethers.provider.getBalance(
    somebodyElse.address
  );
  console.log(
    "somebodyElse balance before: ",
    hre.ethers.utils.formatEther(balanceBefore)
  );

  const tipTxn = await keyboardsContract.tip(1, {
    value: hre.ethers.utils.parseEther("1000"),
  }); // tip the 2nd keyboard as owner
  const tipTxnReceipt = await tipTxn.wait();
  console.log(tipTxnReceipt.events);

  const balanceAfter = await hre.ethers.provider.getBalance(
    somebodyElse.address
  );
  console.log(
    "somebodyElse balance after: ",
    hre.ethers.utils.formatEther(balanceAfter)
  );

  let keyboards = await keyboardsContract.getKeyboards();
  console.log("We got the keyboards!", keyboards);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
