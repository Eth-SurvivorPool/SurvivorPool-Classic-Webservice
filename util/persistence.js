const { Pool } = require('pg');

let connectionString =  process.env.DATABASE_URL || "postgres://nabztrcpypcuxo:d7150a5d61db3d769461f4a6774f6bdc7ca54579b6e1fadc8462adc1ebb85d91@ec2-23-23-93-115.compute-1.amazonaws.com:5432/d4imj14hq6jphr";
const pool = new Pool({
	connectionString: connectionString,
	// connectionString: "postgres://212391398@localhost:5432/212391398",
	ssl: true
});

console.log("DATABASE_URL: " + connectionString);

exports.query = async (query) =>
{
	const client = await pool.connect();
	var results = client.query(query);
	client.release();
	return results;
};

exports.query = async (query, values) =>
{
	const client = await pool.connect();
	var results = client.query(query, values);
	client.release();
	return results;
};
