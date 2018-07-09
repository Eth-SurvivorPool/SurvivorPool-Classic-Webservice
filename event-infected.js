let util = require('./survive-util');
let gamePersistence = require('./game-persistence');
let environment = require('./environment');

var init = async () => {
	let surviveContract = await util.getContract(util.getWeb3(environment.web3Provider_ws));

	//Player Infected Event
	surviveContract.events.playerInfectedEvent({
		fromBlock: 0
	}, async (error, event) =>  {
		let player = {
			address: event.returnValues.owner,
			status: 2,
			statusTime:  event.returnValues.infectedTime
		};
		var result = await gamePersistence.updatePlayerStatus(player);
		console.log("Player " + player.address + " infected at: " + player.statusTime);
	}).on ('data', (event) => {
		// console.log(event); // same results as the optional callback above
	}).on('changed', (event) => {
		// console.log(event);
	}).on('error', console.error);
};

init().then((resolve, reject) => {
	console.log("Player-Infected-Event registered");
});
