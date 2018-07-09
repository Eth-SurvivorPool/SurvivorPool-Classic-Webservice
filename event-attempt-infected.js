let util = require('./survive-util');
let environment = require('./environment');

var init = async () => {
	let surviveContract = await util.getContract(util.getWeb3(environment.web3Provider_ws));

	//Player Infected Event
	surviveContract.events.playerAttemptInfectEvent({
		fromBlock: 0
	}, async (error, event) => {
		// console.log(event);
	}).on('data', (event) => {
		// console.log(event); // same results as the optional callback above
	}).on('changed', (event) => {
		// console.log(event);
	}).on('error', console.error);
};

init().then((resolve, reject) => {
	console.log("Attempt-Infected-Event registered");
});
