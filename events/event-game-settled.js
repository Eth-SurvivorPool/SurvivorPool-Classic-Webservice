let util = require('../blockchain/survive-util');
let gamePersistence = require('../game/game-persistence');
let environment = require('../environment');

var init = async () => {
	let surviveContract = await util.getContract(util.getWeb3(environment.web3Provider_ws));

	// event gameSettledEvent(uint winners, uint prize, uint contractBalance);
	//Game Reset Event
	surviveContract.events.gameSettledEvent({
		fromBlock: 0
	}, async (error, event) =>  {
		if (!error) {
			console.log("Game settled: " + event.returnValues);
		}
		else
		{
			console.error(error);
		}
	}).on ('data', (event) => {
		// console.log(event); // same results as the optional callback above
	}).on('changed', (event) => {
		// console.log(event);
	}).on('error', console.error);
};

init().then((resolve, reject) => {
	console.log("Game-Reset-Event registered");
});
