const dotenv = require('dotenv');
dotenv.config();

const {Pool,Client} = require('pg');
const massive = require('massive');

const dbConfig = {
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
}

let pool,_db;

if(process.env.NODE_ENV == 'production' ){
    pool = new Client(process.env.DATABASE_URL);
    _db = massive(process.env.DATABASE_URL);
}
else{
    pool = new Pool(dbConfig);
    _db = massive(dbConfig);
}   

module.exports = {
    pool,
    _db
}