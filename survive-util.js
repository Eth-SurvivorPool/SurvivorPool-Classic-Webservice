let Web3 = require('web3');
let environment = require('./environment');

let contractABI = [
	{
		"constant": false,
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "unpause",
		"outputs": [
			{
				"name": "_paused",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "payer",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "refund",
		"outputs": [
			{
				"name": "_refunded",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "pause",
		"outputs": [
			{
				"name": "_paused",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "isPaused",
		"outputs": [
			{
				"name": "_paused",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "payer",
				"type": "address"
			}
		],
		"name": "refund",
		"outputs": [
			{
				"name": "_refunded",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_entryFee",
				"type": "uint256"
			},
			{
				"name": "_cureFee",
				"type": "uint256"
			},
			{
				"name": "_killTime",
				"type": "uint256"
			},
			{
				"name": "_cooldown",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "owner",
				"type": "address"
			}
		],
		"name": "playerAttemptInfectEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "infectedTime",
				"type": "uint256"
			}
		],
		"name": "playerInfectedEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "killTime",
				"type": "uint256"
			}
		],
		"name": "playerKilledEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "prize",
				"type": "uint256"
			}
		],
		"name": "playerAwardedEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "cured",
				"type": "bool"
			},
			{
				"indexed": false,
				"name": "cureTime",
				"type": "uint256"
			}
		],
		"name": "playerCuredEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "balance",
				"type": "uint256"
			}
		],
		"name": "playerBalanceUpdatedEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "player",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "joinTime",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "balance",
				"type": "uint256"
			}
		],
		"name": "playerJoinedEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "winners",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "prize",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "contractBalance",
				"type": "uint256"
			}
		],
		"name": "gameSettledEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "gameResetEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "payer",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "refundIssued",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "currentOwner",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "ownerTransferred",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "join",
		"outputs": [
			{
				"name": "_joined",
				"type": "bool"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "cure",
		"outputs": [
			{
				"name": "_cured",
				"type": "bool"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "infect",
		"outputs": [
			{
				"name": "_infectedCount",
				"type": "uint256"
			},
			{
				"name": "_infected",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_forceKillInfectedPlayers",
				"type": "bool"
			}
		],
		"name": "settleGame",
		"outputs": [
			{
				"name": "_prize",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_ownerAddress",
				"type": "address"
			}
		],
		"name": "killPlayer",
		"outputs": [
			{
				"name": "_owner",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "resetGame",
		"outputs": [
			{
				"name": "_reset",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_ownerAddress",
				"type": "address"
			}
		],
		"name": "getPlayer",
		"outputs": [
			{
				"name": "_owner",
				"type": "address"
			},
			{
				"name": "_isAlive",
				"type": "bool"
			},
			{
				"name": "_isInfected",
				"type": "bool"
			},
			{
				"name": "_infectedTime",
				"type": "uint256"
			},
			{
				"name": "_immuneTime",
				"type": "uint256"
			},
			{
				"name": "_balance",
				"type": "uint256"
			},
			{
				"name": "_initialized",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getGameData",
		"outputs": [
			{
				"name": "_entryFee",
				"type": "uint256"
			},
			{
				"name": "_cureFee",
				"type": "uint256"
			},
			{
				"name": "_killTime",
				"type": "uint256"
			},
			{
				"name": "_cooldown",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getInfectedCount",
		"outputs": [
			{
				"name": "_infectedCount",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getAliveCount",
		"outputs": [
			{
				"name": "_aliveCount",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getPlayerCount",
		"outputs": [
			{
				"name": "_playerCount",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getPrizePool",
		"outputs": [
			{
				"name": "_prize",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_ownerAddress",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint256"
			},
			{
				"name": "add",
				"type": "bool"
			}
		],
		"name": "_updateBalance",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
let contractAddress = environment.contractAddress;

//testing scope
let fs = require('fs');

let loadAbi = async (filename) => {
	return new Promise(function(resolve, reject)
	{
		fs.readFile( filename, (err, result) => {
			if (!err) {
				resolve(JSON.parse(result.toString()));
			}
			else {
				reject(err);
			}
		});
	});
};

exports.getWeb3 = (provider) => {
	return new Web3(Web3.givenProvider || provider);
};

exports.getContract = async (web3) => {
	if (exports.contractABI == null) {
		var result = await loadAbi('/Users/212391398/source/sandbox/eth72/build/contracts/Survive.json');
		exports.contractABI = result.abi;
	}
	return new web3.eth.Contract(contractABI, contractAddress);
};

exports.callContractMethod = async (f, account) => {
	var result = null;
	try {
		result = await f.call({from: account});
	}
	catch (err) {
		console.log(err);
	}
	return result;
};

exports.toEther = (gwei) => {
   return	Web3.utils.fromWei(gwei, "ether")
};
