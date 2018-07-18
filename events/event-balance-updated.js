let util = require('../blockchain/survive-util');
let gamePersistence = require('../game/game-persistence');
let environment = require('../environment');

var init = async () => {
	var surviveContract = await util.getContract(util.getWeb3(environment.getAlternatingWebSocketProvider()));

	//Player Balance Event
	surviveContract.events.playerBalanceUpdatedEvent({
		fromBlock: 0
	}, async (error, event) =>  {
		if (!error) {
			let player = {
				address: event.returnValues.owner,
				balance: util.toEther(event.returnValues.balance)
			};
			var result = await gamePersistence.updatePlayerBalance(player);
			console.log("Player " + player.address + " balanced updated: " + player.balance);
		}
		else
		{
			console.error(error);
		}
	}).on ('data', (event) => {
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
