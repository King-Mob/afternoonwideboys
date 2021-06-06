const {_db} = require('./query');

const createInvite = async (newInvite) => {
    const db = await _db;

    const lastToken = await db.Tokens.findOne({}, {
        order: [{field: 'Id', direction: 'desc'}]
    });
    const newTokenId = parseInt(lastToken.Id) + 1;

    await db.Tokens.insert({
        Id: newTokenId,
        Type: 1,
        Value: newInvite.value
    });

    return "invite created";
}

module.exports = {
    createInvite
}