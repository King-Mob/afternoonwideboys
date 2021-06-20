const {_db} = require('./query');
const {mergeContents, mergeContentsNoReplies} = require('../utils');

const getAllContents = async () => {
    const db = await _db;

    const texts = await db.TextsWithCreators.find({},{
        order: [{field: 'Created', direction: 'desc'}]
    });

    const videos = await db.VideosWithCreators.find({},{
        order: [{field: 'Created', direction: 'desc'}]
    });

    const replies = await db.Replies.find({},{
        order: [{field: 'Id', direction: 'desc'}]
    });

    const contents = mergeContents({
        texts,
        videos,
        replies
    });

    const result = {
        success: true,
        data: contents
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

    const videos = await db.Videos.find({
        UserCreator: userId
    },{
        order: [{field: 'Created', direction: 'desc'}]
    });

    videos.forEach(video=>
        video.VideoId = video.Id
    );

    const contents = mergeContentsNoReplies({
        texts,
        videos
    });

    const result = {
        success: true,
        data: contents
    };

    return result;
}

module.exports = {
    getAllContents,
    getContentsFromUser
}