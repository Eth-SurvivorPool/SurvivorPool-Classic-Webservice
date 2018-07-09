let util = require('./survive-util');
let gamePersistence = require('./game-persistence');
let environment = require('./environment');

var init = async () => {
	let surviveContract = await util.getContract(util.getWeb3(environment.web3Provider_ws));

	//Player Cured Event
	surviveContract.events.playerCuredEvent({
		fromBlock: 0
	}, async (error, event) => {
		let player = {
			address: event.returnValues.owner,
			status: 2,
			statusTime:  event.returnValues.cureTime
		};
		if (event.returnValues.cured) {
			var result = await gamePersistence.updatePlayerStatus(player);
		}
		console.log("Player " + player.address + " cured: " + event.returnValues.cured);
	}).on('data', (event) => {
		// console.log(event); // same results as the optional callback above
	}).on('changed', (event) => {
		// console.log(event);
	}).on('error', (error) => console.error(error));
};


init().then((resolve, reject) => {
	console.log("Player-Cured-Event registered");
});
