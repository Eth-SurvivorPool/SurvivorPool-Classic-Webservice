let express = require('express');
let bodyParser = require('body-parser');
let ethContract = require('./blockchain/contract-interface');
let gameEngine = require('./game/game-engine');
let gamePersistence = require('./game/game-persistence');
let cors = require('cors');

let jsonParser = bodyParser.json();
let app = express();

app.use(cors());
app.set('port', (process.env.PORT || 5000));

app.post('/bet', jsonParser, async (req, res) => {
  return res.json("{}")
});

app.get('/results', async (req, res) => {
    return res.json("{}")
});

app.get('/players', async (req, res) => {
    var result = {};

    result.playerCount = await ethContract.getPlayerCount();
    result.infectedCount = await ethContract.getPlayerInfectedCount();
    result.aliveCount = await ethContract.getPlayerAliveCount();

    return res.json(result);
});

app.get('/winners', async (req, res) => {
	var result = await gamePersistence.getRecentWinners();
	return res.json(result);
});

app.get('/players/:address', async (req, res) => {
	var playerInfo = {
	    address: req.params.address
    };

    var player = await ethContract.getPlayer(playerInfo);

	var result = {
	    address: player._owner,
	    isAlive: player._isAlive,
	    isInfected: player._isInfected,
	    infectedTime: player._infectedTime,
	    immuneTime: player._immuneTime,
		balance: player._balance,
		initialized: player._initialized
    };

	return res.json(result);
});

app.get('/all', async (req, res) => {
	var result = await gamePersistence.getPlayers(null);
	return res.json(result);
});

app.get('/game', async (req, res) => {
    var result = await gameEngine.getGameData();
    return res.json(result);
});

app.get('/clock', (req, res) => {
  var date = new Date();
  res.json({"timestamp": date.getTime() })
});



//////////////////////////////////////////
////////    APP
//////////////////////////////////////////

app.listen(app.get('port'), () => console.log('Survive API') );
