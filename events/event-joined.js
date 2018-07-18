let util = require('../blockchain/survive-util');
let gamePersistence = require('../game/game-persistence');
let environment = require('../environment');

var init = async () => {
	let surviveContract = await util.getContract(util.getWeb3(environment.web3Provider_ws));

	//Player Infected Event
	surviveContract.events.playerJoinedEvent({
		fromBlock: 0
	}, async (error, event) => {
		if (!error) {
			let player = {
				address: event.returnValues.player,
				joinTime: parseInt(event.returnValues.joinTime),
				blockIdx: event.blockNumber,
				balance: util.toEther(event.returnValues.balance),
				blockHash: event.blockHash
			};
			var result = await gamePersistence.insertPlayer(player);
			console.log("Player " + player.address + " joined" + " at block " + player.blockIdx);
		}
		else {
			console.error(error);
		}
	}).on('data', (event) => {
		// console.log(event); // same results as the optional callback above
	}).on('changed', (event) => {
		// console.log(event);
	}).on('error', () => {
		init().then(() => {
			console.log("Player-Joined-Event  reconnected");
		});
	});
};

init().then(() => {
	console.log("Player-Joined-Event registered");
});
