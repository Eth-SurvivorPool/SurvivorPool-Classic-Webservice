const { Pool } = require('pg');

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	// connectionString: "postgres://212391398@localhost:5432/212391398",
	ssl: false
});

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
