const ethers = require("ethers")
const fs = require('fs-extra')
require('dotenv').config()
async function main() {
  // 连接到本地节点,类似javascriptVm 
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)

  // Wallet 提供私钥用于签名 这些私钥来自ganache
  // 方式一 这种方式是直接把我们的私钥以明文的形式传给钱包，这样做不安全
  const wallet = new ethers.Wallet(
    process.env.PRIVATE_KEY,
    provider
  );

  // 方式二 我们以密文的形式创建钱包，这样就不怕我们的秘钥暴露
  // const encrypedJson = fs.readFileSync('./.encrypedJsonKey.json', 'utf8');
  // 这里使用let的原因是因为我们必须把这个wallet链接到我们的provider 这里注意ethers v5.0+版本和v6.0+版本是不一样的,fromEncryptedJsonSync在v6版本中是一个静态方法
  // 不用new了，直接调用这个方法
  // let wallet = ethers.Wallet.fromEncryptedJsonSync(encrypedJson, process.env.PASSWORD)
  // wallet = await wallet.connect(provider);

  const balance = await provider.getBalance(wallet.address);
  console.log(`Wallet balance: ${ethers.formatEther(balance)} ETH`);

  
  // ABI 和字节码
  const abi = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.abi', 'utf8');
  const binary = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.bin', 'utf8');
  
  // 在Ethers合约工厂对象只是用来部署合约的对象, 用来部署合约，这个和合约工厂对象是不同的
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);

  console.log('Contract deploying, please wait...');
 
  try {
    // 部署合约
    const contract = await contractFactory.deploy();
    
    // // 等待交易确认
    const receipt = await contract.deploymentTransaction().wait(1);
    const address = receipt.contractAddress;
    console.log(`Contract deployed to address: ${address}`);
    // 下面是手动部署一些合约细节
    // const nonceValue = await wallet.getNonce();
    // const tx = {
    //   nonce: nonceValue,
    //   gasPrice: 2000000000,
    //   gasLimit: 5000000,
    //   to: null,
    //   data: "0x", // 合约字节码
    //   chainId: 1337
    // }
    // 给交易签名
    // const signedTxResponse = await wallet.signTransaction(tx);
    // console.log(signedTxResponse);
    
    // 发送交易
    // const sendTxResponse = await wallet.sendTransaction(tx);
    // await sendTxResponse.wait(1);
    // console.log(sendTxResponse)
    console.log(process.env.PRIVATE_KEY);
    console.log(process.env.RPC_URL);
    const currentFavoriteNumber = await contract.retrieve();
    console.log(currentFavoriteNumber.toString());
    // 这个是操作
    const transactionResponse = await contract.store("7");
    // 这个是等待操作完成后的回执
    const transactionReceipt = await transactionResponse.wait(1);
    const updatedFavoriteNumber = await contract.retrieve();
    console.log(updatedFavoriteNumber.toString());

  } catch (error) {
    console.error("Deployment error:", error);
    if (error.transaction) {
      console.error("Transaction details:", error.transaction);
    }
  }
}

main().catch(error => {
  console.error("Error:", error);
});