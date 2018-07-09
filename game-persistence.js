let persistence = require('./persistence');

let selectPlayerQuery = () => {
	return "SELECT * FROM survive.players WHERE address=$1";
};

let selectAllPlayersQuery = () => {
	return "SELECT * FROM survive.players";
};

let selectPlayerCount = () => {
	return "SELECT count(*) FROM survive.players";
};

let insertPlayerQuery = () => {
	return "INSERT INTO survive.players(address, join_timestamp, block_idx, balance, block_hash) VALUES ($1,to_timestamp($2),$3,$4,$5)";
};

let selectRandomPlayers = (count) => {
	return "SELECT * FROM survive.players WHERE status = 1 ORDER BY random() LIMIT " + count;
};

let updatePlayerStatus = () => {
	return "UPDATE survive.players SET status = $2, status_timestamp = to_timestamp($3) WHERE address = $1";
};

let updateAllPlayerStatuses = () => {
	return "UPDATE survive.players SET status = $1, status_timestamp = to_timestamp($2)";
};

let updatePlayerBalance = () => {
	return "UPDATE survive.players SET balance = $2 WHERE address = $1";
};

exports.upsertPlayer = async (player) => {
	try {
		let result = await persistence.query(selectPlayerQuery(),[player.address.toString()]);

		if (result.rows.length <= 0) {
			result = await persistence.query(insertPlayerQuery(),[player.address.toString(), player.joinTime, player.blockIdx, player.balance, player.blockHash.toString()]);
		}
		return result;
	}
	catch(ex)
	{
		console.error(ex);
	}

	return null;
};

exports.getPlayers = async (address) => {
	try {
		var result = null;
		if (address == null) {
			result = await  persistence.query(selectAllPlayersQuery());
		}
		else {
			result = await persistence.query(selectPlayerQuery(),[player.address.toString()]);
		}
		return result.rows;
	}
	catch(ex)
	{
		console.error(ex);
	}

	return null;
};

exports.getPlayerCount = async () => {
	try {
		let result = await  persistence.query(selectPlayerCount());
		if (result != null)
		{
			return parseInt(result.rows[0].count);
		}
	}
	catch(ex)
	{
		console.error(ex);
	}

	return null;
};

exports.getRandomPlayers = async (count) => {
	try {
		let result = await persistence.query(selectRandomPlayers(count));
		return result.rows;
	}
	catch(ex)
	{
		console.error(ex);
	}

	return null;
};

exports.updatePlayerStatus = async (player) => {
	try {
		var result = null;
		if (player.address == null) {
			result = await persistence.query(updateAllPlayerStatuses(), [player.status, player.statusTime]);
		}
		else {
			result = await persistence.query(updatePlayerStatus(), [player.address, player.status, player.statusTime]);
		}
		return result.rows;
	}
	catch(ex)
	{
		console.error(ex);
	}

	return null;
};

exports.updatePlayerBalance = async (player) => {

	try {
		let result = await persistence.query(updatePlayerBalance(), [player.address, player.balance]);
		return result.rows;
	}
	catch(ex)
	{
		console.error(ex);
	}

	return null;

};
