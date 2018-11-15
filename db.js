const MONGODB_PRODUCTION = require('./secret');

module.exports = {
    DB: 'mongodb://localhost:27017/myPostManager',
    PDB: MONGODB_PRODUCTION.DB_PRODUCTION
}