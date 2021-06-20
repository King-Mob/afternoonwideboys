const {_db} = require('./query');

const getAllTexts = async () => {
    const db = await _db;

    const texts = await db.TextsWithCreators.find({},{
        order: [{field: 'Created', direction: 'desc'}]
    });

    result = {
        success: true,
        data: texts
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
    
    return {success: true, result: "text successfully created", newTextId};
}

const createTextAsReply = async (newText, userId) => {
    const db = await _db;

    const {newTextId} = await createText(newText, userId);

    const lastReply = await db.Replies.findOne({}, {
        order: [{field: 'Id', direction: 'desc'}]
    });

    const newReplyId = parseInt(lastReply.Id) + 1;

    await db.Replies.insert({
        Id: newReplyId,
        FromType: 1,
        FromId:  parseInt(newTextId),
        ToType:  parseInt(newText.toType),
        ToId:  parseInt(newText.toId)
    });

    return {success: true, result: "text with reply created"};
}

module.exports = {
    getAllTexts,
    getTextsFromUser,
    createText,
    createTextAsReply
}