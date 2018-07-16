let EthTx = require('ethereumjs-tx');
let util = require('./survive-util');
let environment = require('../environment');

let ownerAccount = environment.owner;
let ownerKey = environment.privateKey;
let gasMultiplier = environment.gasMultiplier;

let web3 = util.getWeb3(environment.web3Provider_http);
var surviveContract = null;

let callContractMethod = async (f, account) => {
	var result = null;
	try {
		result = await f.call({from: account});
	}
	catch (err) {
		console.log(err);
	}
	return result;
};

let sendContractMethod = async (f, account, gas) => {
	var result = null;
	try {
		result = await f.send({from: account, gas: gas});
	}
	catch (err) {
		console.log(err);
	}
	return result;
};

let sendTransaction = async (f, account, key, gas) => {
	let privateKey = new Buffer(key, 'hex');

	let nonce = await web3.eth.getTransactionCount(account);

	console.log(nonce);

	let gasPrice = await web3.eth.getGasPrice();
	gas = gas * gasMultiplier; //doubling gas for now

	console.log(gasPrice);

	var txData = f.encodeABI();

	var rawTx = {
		nonce: '0x' + nonce.toString(16),
		gasPrice: '0x' + gasPrice.toString(16),
		gasLimit: '0x' + gas.toString(16),
		to: surviveContract.options.address,
		value: '0x0',
		data: txData
	};

	console.log(rawTx);

	var tx = new EthTx(rawTx);
	tx.sign(privateKey);

	var serializedTx = tx.serialize();

	 let result = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', console.log);
	 return result;
};

let init = async () => {
	surviveContract = await util.getContract(web3);

	//View Methods
	exports.getPlayer = async (playerInfo) => {
		var result = await callContractMethod(surviveContract.methods.getPlayer(playerInfo.address), ownerAccount);
		return result;
	};

	exports.getPlayerCount = async () => {
		var result = await callContractMethod(surviveContract.methods.getPlayerCount(), ownerAccount);
		return result;
	};

	exports.getPlayerAliveCount = async () => {
		var result = await callContractMethod(surviveContract.methods.getAliveCount(), ownerAccount);
		return result;
	};

	exports.getPlayerInfectedCount = async () => {
		var result = await callContractMethod(surviveContract.methods.getInfectedCount(), ownerAccount);
		return result;
	};

	exports.getGameData = async () => {
		var result = await callContractMethod(surviveContract.methods.getGameData(), ownerAccount);
		return result;
	};

	exports.getPrizePool = async () => {
		var result = await callContractMethod(surviveContract.methods.getPrizePool(), ownerAccount);
		return result;
	};

	//Send Methods
	exports.settleGame = async (forceKill, reset) => {
		let gas = await surviveContract.methods.settleGame(forceKill, reset).estimateGas({from: ownerAccount});
		console.log("settleGame, gas required: " + gas);

		return await sendTransaction(surviveContract.methods.settleGame(forceKill, reset), ownerAccount, ownerKey, gas);
	};

	exports.infect = async (playerInfo) => {
		let gas = await surviveContract.methods.infect(playerInfo.address).estimateGas({from: ownerAccount});
		console.log("infect, gas required: " + gas);

		return await sendTransaction(surviveContract.methods.infect(playerInfo.address), ownerAccount, ownerKey, gas);
	};

	exports.kill = async (playerInfo) => {
		let gas = await surviveContract.methods.killPlayer(playerInfo.address).estimateGas({from: ownerAccount});
		console.log("killPlayer, gas required: " + gas);

		return await sendTransaction(surviveContract.methods.killPlayer(playerInfo.address), ownerAccount, ownerKey, gas);
	};

	exports.resetGame = async () => {
		let gas = await surviveContract.methods.resetGame().estimateGas({from: ownerAccount});
		console.log("resetGame, gas required: " + gas);

		return await sendTransaction(surviveContract.methods.resetGame(), ownerAccount, ownerKey, gas);
	};
};

init().then((resolve, reject) => {
	console.log("Contract Interface intialized");
});
