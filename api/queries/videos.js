const {_db} = require('./query');

const getVideo = async (videoId) => {
    const db = await _db;

    const video = await db.Videos.findOne({
        Id: videoId
    })

    video.VideoId = video.Id;

    const result = {
        success: video?true:false,
        data: video
    }

    return result;
}

const createVideo = async (newVideo,userId) => {
    const db = await _db;

    let newVideoId;

    const lastVideo = await db.Videos.findOne({}, {
        order: [{field: 'Id', direction: 'desc'}]
    });

    if(lastVideo)
        newVideoId = parseInt(lastVideo.Id) + 1;
    else
        newVideoId = 1;

    const now = new Date();

    await db.Videos.insert({
        Id: newVideoId,
        UserCreator: userId,
        Title: newVideo.title,
        Url: newVideo.videoUrl,
        Created: now.toISOString()
    });
    
    return {success: true, result: "Video successfully created",newVideoId};
}

const createVideoAsReply = async (newVideo,userId) => {
    const db = await _db;

    const {newVideoId} = await createVideo(newVideo, userId);

    const lastReply = await db.Replies.findOne({}, {
        order: [{field: 'Id', direction: 'desc'}]
    });

    const newReplyId = parseInt(lastReply.Id) + 1;

    await db.Replies.insert({
        Id: newReplyId,
        FromType: 1,
        FromId:  parseInt(newVideoId),
        ToType:  parseInt(newVideo.toType),
        ToId:  parseInt(newVideo.toId)
    });

    return {success: true, result: "video with reply created"};
}

module.exports = {
    createVideo,
    getVideo,
    createVideoAsReply
}