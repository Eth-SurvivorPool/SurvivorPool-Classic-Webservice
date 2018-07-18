let util = require('../blockchain/survive-util');
let gamePersistence = require('../game/game-persistence');
let environment = require('../environment');

var init = async () => {
	let surviveContract = await util.getContract(util.getWeb3(environment.getAlternatingWebSocketProvider()));
	//Player Awarded Event
	surviveContract.events.playerAwardedEvent({
		fromBlock: 0
	}, async (error, event) =>  {
		if (!error) {
			var player = {
				address: event.returnValues.owner,
				prize: event.returnValues.prize,
				winTime: new Date().getTime()
			};
			var result = await gamePersistence.insertWinner(player);
			console.log("Player " + event.returnValues.owner + " awarded: " + event.returnValues.prize);
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
			console.log("Player-Awarded-Prize-Event reconnected");
		});
	});
};

init().then(() => {
	console.log("Player-Awarded-Prize-Event registered");
});
