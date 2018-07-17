
let scheduler = require("node-schedule");
let ethContract = require("../blockchain/contract-interface");
let surviveEvents = require("../blockchain/survive-events");
let gamePersistence = require("./game-persistence");


exports.getGameData = async () => {
	let result = {};

	var gameData = await ethContract.getGameData();

	result.entryFee = gameData._entryFee;
	result.cureFee = gameData._cureFee;
	result.killTime = gameData._killTime;
	result.cooldown = gameData._cooldown;
	result.roundBalance = gameData._roundBalance;
	result.numberOfPlayerAddresses = await ethContract.getPlayerCount();
	result.totalPlayersInDB = await gamePersistence.getPlayerCount();
	result.totalPrizePool = await ethContract.getPrizePool();

	return result;
};

exports.infectRandomPlayer = async () => {

	var now = new Date();

	console.log("Infecting players @ " + now );

	var count = await gamePersistence.getPlayerCount();
	var randomCount = Math.min(count / 10, 1);
	var result = await gamePersistence.getRandomPlayers(randomCount);

	for (var i=0; i<result.length; i++)
	{
		console.log("Infecting player: " + result[i] );
		var r = await ethContract.infect(result[i]);
		console.log(r);
	}
};

var settleGameJob = scheduler.scheduleJob('* * 0 * * *', async () => {

	var gameData = await exports.getGameData(false);

	var now = new Date();
	console.log("Settling Game @ " + now );
	console.log(gameData);

	var result = await ethContract.settleGame(true, true);
	console.log(result);
});

var infectJob = scheduler.scheduleJob('* 0 */2 * * *', async () => {
	exports.infectRandomPlayer();
});

var infectJob = scheduler.scheduleJob('* */5 * * * *', async () => {
	exports.infectRandomPlayer();
});
