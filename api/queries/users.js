const {_db} = require('../queries/query');

const getUser = async (userId) => {
    const db = await _db;

    const user = await db.Users.findOne({
        Id: userId
    });

    const result = {
        success: user?true:false,
        data: user
    }

    return result;
}

module.exports = {
    getUser
}