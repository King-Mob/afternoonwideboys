const {pool,_db} = require('./query');

const getAllTexts = async () => {
    const texts = await pool.query(`SELECT * FROM "TextsWithCreators"`);
    result = {
        success: true,
        data: texts.rows
    };

    return result;
}

const getTextsFromUser = async (userId) => {
    const db = await _db;

    const textsWithCreators = await db.Texts.find({
        UserCreator: userId
    },
    {
        order: [{field: 'Created', direction: 'desc'}]
    });

    return textsWithCreators;
}

const createText = async (newText,userId) => {
    const db = await _db;

    const lastText = await db.Texts.findOne({}, {
        order: [{field: 'Id', direction: 'desc'}]
    });

    const newTextId = parseInt(lastText.Id) + 1;

    const now = new Date();

    await db.Texts.insert({
        Id: newTextId,
        UserCreator: userId,
        Value: newText.value,
        Created: now.toISOString()
    });
    
    return {result: "text successfully created"};
}

module.exports = {
    getAllTexts,
    getTextsFromUser,
    createText
}