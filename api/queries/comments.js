const {_db} = require('./query');

const getCommentsForVideo = async (videoId) => {
    const db = await _db;

    const comments = await db.CommentsWithCommenters.find({
        VideoId: videoId
    },{
        order: [
            {field: 'TimelinePosition', direction: 'asc'},
            {field: 'Created', direction: 'asc'}
        ]
    });

    return {success: true, data: comments};
}

const createComment = async (userId,newComment) => {
    const db = await _db;

    const lastComment = await db.Comments.findOne({}, {
        order: [{field: 'Id', direction: 'desc'}]
    });

    const newCommentId = lastComment ? parseInt(lastComment.Id) + 1 :  1;

    const now = new Date();

    await db.Comments.insert({
        Id: newCommentId,
        VideoId: newComment.videoId,
        UserCommenter: userId,
        Value: newComment.value,
        TimelinePosition: newComment.timelinePosition,
        Created: now.toISOString()
    });
    
    return {success: true, result: "comment successfully created"};
}

module.exports = {
    getCommentsForVideo,
    createComment
}