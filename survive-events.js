let util = require('./survive-util');
let gamePersistence = require('./game-persistence');
let environment = require('./environment');
let joinedEvent = require('./event-joined');
let infectedEvent = require('./event-infected');
let curedEvent = require('./event-cured');
let killedEvent = require('./event-killed');
let attemptInfectedEvent = require('./event-attempt-infected');
let playerBalanceUpdated = require('./event-balance-updated');
let prizeEventAwarded = require('./event-prize-awarded');
let gameResetEvent = require('./event-game-reset');


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
})

//
// let surviveContract = util.getContract(util.getWeb3("ws://127.0.0.1:8545"));
// // event playerBalanceUpdatedEvent(address owner, uint balance);

// // event gameSettledEvent(uint winners, uint prize, uint contractBalance);
// // event gameResetEvent(uint timestamp);
//
// // surviveContract.getPastEvents('playerInfectedEvent', {
// // 	fromBlock: 0,
// // 	toBlock: 75
// // }, (error, events) => { console.log(events); })
// // 	.then(function(events){
// // 		console.log(events) // same results as the optional callback above
// // 	});

