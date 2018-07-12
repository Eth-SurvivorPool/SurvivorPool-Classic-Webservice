let util = require('./survive-util');
let gamePersistence = require('../game/game-persistence');
let environment = require('../environment');
let joinedEvent = require('../events/event-joined');
let infectedEvent = require('../events/event-infected');
let curedEvent = require('../events/event-cured');
let killedEvent = require('../events/event-killed');
let attemptInfectedEvent = require('../events/event-attempt-infected');
let playerBalanceUpdated = require('../events/event-balance-updated');
let prizeEventAwarded = require('../events/event-prize-awarded');
let gameResetEvent = require('../events/event-game-reset');


let init = async() => {
	let surviveContract = await util.getContract(util.getWeb3(environment.web3Provider_ws));

	// All Events
	surviveContract.events.allEvents({
		fromBlock: 0,
		toBlock: 'latest'
	    },
		(error, event) => {
			// console.log(event);
		})
		.on('data', function(event){
			// console.log(event); // same results as the optional callback above
		})
		.on('changed', function(event){
			// remove event from local database
			// console.log(event);
		})
		.on('error', console.error);
};

var i = init().then((resolve, reject) => {
	console.log("All-Events registered");
});
