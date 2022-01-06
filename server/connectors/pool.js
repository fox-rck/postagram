/*
/ Rick Fox
/ 01-06-22
/ DB Pool manager
*/

const config = require('../config'),
{ Pool } = require("pg");

// Create a pool of clients
const pool = new Pool(config.db);

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

function getConnection() {
  return new Promise(function (resolve, reject) {
    // get a client from the pool
    pool.connect((err, client, done) => {
      if (err) {
        return reject();
      }
      // return the client - use client.release() at end
      resolve(client);
    });
  });
}

module.exports = getConnection;
