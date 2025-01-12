// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

// contract 是solidity关键字，告诉编译器后面的代码是用来定义智能合约的
contract SimpleStorage {
    // boolean, uint, int, address, bytes
    // uint 是无符号整数，表示这个数字不是可正可负的，只能是正整数 
    // int 可以表示正、负数
    bool hasFavoriteNumber = true;
    uint256 public favoriteNumber = 5;
    string favoriteNumberInText = "Five";
    int256 favoriteInt = -5;
    // address myAddress = 0xcac73b0f07Af26Bb36A2F744eAFCC49DA166Fc89;
    bytes32 favoriteBytes = "cat";

    // People public person = People({
    //     age: 2,
    //     name: "ren"
    // });

    // 定义一个solidity 数组
    People[] public people;
    // 定义一个solidity mapping
    mapping(string => uint256) public stringToAage;

    // solidity 结构体
    // 创建了一个被称为People的新类型，就像uint256或者Boolean和String类型一样使用 
    struct People {
        uint256 age;
        string name;
    }
    // 目前solidity有6种方式存储数据
    // stack, memory,storage,calldata,code,logs
    // calldata和memory意味着这个变量只是暂时存在，其中memory的变量能被修改，calldata的变量不允许修改，storage是可以被修改的永久变量

    // 创建一个函数，往people数组里添加值
    function addPerson(string memory _name, uint256 _age) public {
        // 这是添加数组的另一种写法 
        // People memory newPerson = People({
        //     age: _age,
        //     name: _name
        // });
        // people.push(newPerson);
        people.push(People(_age, _name));
        stringToAage[_name] = _age;
    }

    // solidity 函数学习
    function store (uint256 _favoriteNumber) public virtual {
        favoriteNumber = _favoriteNumber;
        favoriteNumber = favoriteNumber + 1;
    }

    // solidity中有两个关键字，标识函数调用不需要消耗gas 就是view,pure 
    // 不管是view还是pure都不允许修改任何状态，其中pure也不允许读取区块链数据，所以我们不能用pure读取favoriteNumber
    function retrieve() public view  returns (uint256) {
        return  favoriteNumber;
    }

    // pure用法
    function add () public pure returns (uint256) {
        return  1 + 1;
    }

    // 0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8
}