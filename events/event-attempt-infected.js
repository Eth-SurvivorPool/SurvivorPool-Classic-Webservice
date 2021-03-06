let util = require('../blockchain/survive-util');
let environment = require('../environment');

var init = async () => {
	let surviveContract = await util.getContract(util.getWeb3(environment.getAlternatingWebSocketProvider()));

	//Player Infected Event
	surviveContract.events.playerAttemptInfectEvent({
		fromBlock: 0
	}, async (error, event) => {
		if (!error)
		{
			console.log(event);
		}
		else
		{
			console.error(error);
		}
		// console.log(event);
	}).on('data', (event) => {
		// console.log(event); // same results as the optional callback above
	}).on('changed', (event) => {
		// console.log(event);
	}).on('error', () => {
		init().then(() => {
			console.log("Attempt-Infected-Event reconnected");
		});
	});
};

init().then(() => {
	console.log("Attempt-Infected-Event registered");
});
