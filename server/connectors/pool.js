/*
/ Rick Fox
/ 01-06-22
/ DB Pool manager
*/

const { Pool } = require('pg')




const pool = new Pool({
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectionLimit : 4,
    // connectTimeout: 30000,
    charset : 'utf8mb4',
    timezone: 'UTC+0',
    // dateStrings: true,
})

pool.on('query', (sql) => {
  console.error('sql', sql)
})

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})
// var pool  = mysql.createPool({
//     database: process.env.DB_DATABASE,
//     host: process.env.DB_HOST,
// 	port: process.env.DB_PORT,
//     user: process.env.DB_USER,
// 	password: process.env.DB_PASSWORD,
//     connectionLimit : 4,
//     connectTimeout: 30000,
//     charset : 'utf8mb4',
//     timezone: 'UTC+0',
//     dateStrings: true,
// });

function getConnection() {
    return new Promise(function (resolve, reject) {
      // pool.getConnection(function (err, connection) {
      //   // connected! (unless `err` is set)
      //   if (err) {
      //     console.log(err);
      //     reject();
      //   } else {
      //     resolve(connection);
      //   }
      // });
      // callback - checkout a client
        pool.connect((err, client, done) => {
          if (err) {
            return reject()
          }
          resolve(client, done)
          
        })
    });
}

module.exports = getConnection