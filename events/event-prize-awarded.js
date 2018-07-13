let util = require('../blockchain/survive-util');
let gamePersistence = require('../game/game-persistence');
let environment = require('../environment');

var init = async () => {
	let surviveContract = await util.getContract(util.getWeb3(environment.web3Provider_ws));
	//Player Awarded Event
	surviveContract.events.playerAwardedEvent({
		fromBlock: 0
	}, async (error, event) =>  {
		if (!error) {
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
	}).on('error', console.error);
};

init().then((resolve, reject) => {
	console.log("Player-Awarded-Prize-Event registered");
});
