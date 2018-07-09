let util = require('./survive-util');
let gamePersistence = require('./game-persistence');
let ethContract = require('./contract-interface');
let environment = require('./environment');

var init = async () => {
	let surviveContract = await util.getContract(util.getWeb3(environment.web3Provider_ws));

	//Game Reset Event
	surviveContract.events.gameResetEvent({
		fromBlock: 0
	}, async (error, event) =>  {

		var count = 0;
		var players = await gamePersistence.getPlayers(null);
		for (var i=0; i<players.length; i++)
		{
			var playerInfo = await ethContract.getPlayer({"address": players[i].address});
			if (playerInfo._isAlive)
			{
				let player = {
					address: playerInfo._owner,
					status: 1,
					statusTime:  (new Date()).getTime()
				};
				var result = await gamePersistence.updatePlayerStatus(player);
				count++;
			}
		}
		console.log("Game event received, players reset: " + count);
	}).on ('data', (event) => {
		// console.log(event); // same results as the optional callback above
	}).on('changed', (event) => {
		console.log(event);
	}).on('error', console.error);
};

init().then((resolve, reject) => {
	console.log("Game-Reset-Event registered");
});
