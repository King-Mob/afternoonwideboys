const {_db} = require('./query');

const getAllContents = async () => {
    const db = await _db;

    const texts = await db.TextsWithCreators.find({},{
        order: [{field: 'Created', direction: 'desc'}]
    });

    const videos = await db.VideosWithCreators.find({},{
        order: [{field: 'Created', direction: 'desc'}]
    });

    const result = {
        success: true,
        data: {texts,videos}
    };

    return result;
}

const getContentsFromUser = async (userId) => {
    const db = await _db;

    const texts = await db.Texts.find({
        UserCreator: userId
    },
    {
        order: [{field: 'Created', direction: 'desc'}]
    });

    const videos = await db.Videos.find({},{
        order: [{field: 'Created', direction: 'desc'}]
    });

    const result = {
        success: true,
        data: {texts,videos}
    };

    return result;
}

module.exports = {
    getAllContents,
    getContentsFromUser
}