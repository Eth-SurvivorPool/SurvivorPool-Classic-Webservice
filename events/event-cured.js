let util = require('../blockchain/survive-util');
let gamePersistence = require('../game/game-persistence');
let environment = require('../environment');

var init = async () => {
	let surviveContract = await util.getContract(util.getWeb3(environment.getAlternatingWebSocketProvider()));

	//Player Cured Event
	surviveContract.events.playerCuredEvent({
		fromBlock: 0
	}, async (error, event) => {
		if (!error) {
			let player = {
				address: event.returnValues.owner,
				status: 1,
				statusTime: event.returnValues.cureTime
			};
			if (event.returnValues.cured) {
				var result = await gamePersistence.updatePlayerStatus(player);
			}
			console.log("Player " + player.address + " cured: " + event.returnValues.cured);
		}
		else
		{
			console.error(error);
		}
	}).on('data', (event) => {
		// console.log(event); // same results as the optional callback above
	}).on('changed', (event) => {
		// console.log(event);
	}).on('error', () => {
		init().then(() => {
			console.log("Player-Infected-Event reconnected");
		});
	});
};


init().then(() => {
	console.log("Player-Infected-Event registered");
});
