const {Pool} = require('pg');
const massive = require('massive');

const dbConfig = {
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
}


const pool = new Pool(dbConfig);
const _db = massive(dbConfig);

module.exports = {
    pool,
    _db
}