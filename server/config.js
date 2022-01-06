/*
/ Rick Fox
/ 01-06-22
/ Applications config
*/

module.exports = {
	db: {
		database: process.env.DB_DATABASE,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		connectionLimit: 4,
		// connectTimeout: 30000,
		charset: "utf8mb4",
		timezone: "UTC+0",
	},
};
