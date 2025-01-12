const ethers = require("ethers");
const fs = require('fs-extra');
require('dotenv').config();
async function main() {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);

  //  "ethers": "6.13.4",的版本写法上跟5.x的版本写法不一样，需要有个进度回调函数
  const processCallBack = (progress) => {
    console.log("Encryption progress:", progress);
  };

  // 只需要密码作为参数
  const encrypedJsonKey = await wallet.encrypt(process.env.PASSWORD, processCallBack);
  console.log(encrypedJsonKey);
  fs.outputFileSync('./.encrypedJsonKey.json', encrypedJsonKey);
}

main().catch(console.error);