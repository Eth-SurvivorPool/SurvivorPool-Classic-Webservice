let util = require('../blockchain/survive-util');
let gamePersistence = require('../game/game-persistence');
let environment = require('../environment');

var init = async () => {
	let surviveContract = await util.getContract(util.getWeb3(environment.getAlternatingWebSocketProvider()));

	//Player Killed Event
	surviveContract.events.playerKilledEvent({
		fromBlock: 0
	}, async (error, event) => {
		if (!error) {
			let player = {
				address: event.returnValues.owner,
				status: 3,
				statusTime: event.returnValues.killTime
			};
			var result = await gamePersistence.updatePlayerStatus(player);
			console.log("Player " + player.address + " killed at: " + player.statusTime);
		}
		else {
			console.error(error);
		}
	}).on ('data', (event) => {
		// console.log(event); // same results as the optional callback above
	}).on('changed', (event) => {
		// console.log(event);
	}).on('error', () => {
		init().then(() => {
			console.log("Player-Killed-Event reconnected");
		});
	});
};

init().then(() => {
	console.log("Player-Killed-Event registered");
});
