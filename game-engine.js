
let scheduler = require("node-schedule");
let ethContract = require("./contract-interface");
let surviveEvents = require("./survive-events");
let gamePersistence = require("./game-persistence");


exports.getGameData = async () => {
	let result = {};

	var gameData = await ethContract.getGameData();

	result.entryFee = gameData._entryFee;
	result.cureFee = gameData._cureFee;
	result.killTime = gameData._killTime;
	result.cooldown = gameData._cooldown;
	result.totalPlayers = await gamePersistence.getPlayerCount();
	result.totalPrizePool = await ethContract.getPrizePool();

	return result;
};

exports.infectRandomPlayer = async () => {
	var count = await gamePersistence.getPlayerCount();
	var randomCount = Math.min(count / 10, 1);
	var result = await gamePersistence.getRandomPlayers(randomCount);

	for (var i=0; i<result.length; i++)
	{
		var r = await ethContract.infect(result[i]);
		console.log(r);
	}
};

var settleGameJob = scheduler.scheduleJob('* * 0 * * *', async () => {

	var gameData = await exports.getGameData(false);

	console.log("Settling Game");
	console.log(gameData);

	var result = await ethContract.settleGame();
	console.log(result);
});

var infectJob = scheduler.scheduleJob('00 * * * *', async () => {
	exports.infectRandomPlayer();
});
