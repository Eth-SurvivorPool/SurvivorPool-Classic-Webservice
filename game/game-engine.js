let scheduler = require("node-schedule");
let ethContract = require("../blockchain/contract-interface");
let surviveEvents = require("../blockchain/survive-events");
let gamePersistence = require("./game-persistence");
let util = require("../blockchain/survive-util");


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
		console.log("Infecting player: " + result[i].address );
		var r = await ethContract.infect(result[i]);
	}
};

exports.reconcilePlayers = async () => {
	var playerCount = await ethContract.getPlayerCount();

	for (var i=0; i<playerCount; i++)
	{
		var r = await ethContract.getPlayerByIdx(i);
		let result = await gamePersistence.upsertPlayer(
			{address: r._owner,
				joinTime: new Date().getTime(),
				blockIdx: 0,
				balance: util.toEther(r._balance),
				blockHash: "0x0"}
		);
	}
};

exports.settleGame = async () => {
	var gameData = await exports.getGameData(false);

	var now = new Date();
	console.log("Settling Game @ " + now );
	console.log(gameData);

	var result = await ethContract.settleGame(true, true);
};

var settleGameJob = scheduler.scheduleJob('* * 0 * * *', async () => {
	exports.settleGame();
});

var infectJob = scheduler.scheduleJob('0 */2 * * *', async () => {
	exports.infectRandomPlayer();
});

var reconcilePlayersJob = scheduler.scheduleJob('*/15 * * * *', async () => {
	exports.reconcilePlayers();
});



