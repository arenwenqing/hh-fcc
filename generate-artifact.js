const fs = require('fs');
const path = require('path');

// 定义合约文件路径
const abiPath = path.join(__dirname, '.', 'SimpleStorage_sol_SimpleStorage.abi');
const binPath = path.join(__dirname, '.', 'SimpleStorage_sol_SimpleStorage.bin');

// 读取 ABI 和字节码文件
const abi = JSON.parse(fs.readFileSync(abiPath, 'utf8'));
const bytecode = fs.readFileSync(binPath, 'utf8').toString();

// 创建 JSON 对象
const artifact = {
  contractName: 'SimpleStorage',
  abi: abi,
  bytecode: `0x${bytecode}`
};

// 定义输出路径
const outputPath = path.join(__dirname, '.', 'SimpleStorage.json');

// 写入 JSON 文件
fs.writeFileSync(outputPath, JSON.stringify(artifact, null, 2));

console.log(`Artifact generated at ${outputPath}`);