const {getCommentsForVideo, createComment} = require('../queries/comments');
const {isTokenValid} = require('../queries/auth');


const commentsRoutes = [
    {
        method: 'GET',
        path: '/comments/{videoId}',
        config: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
        handler: async(request)=> {
            const result = getCommentsForVideo(request.params.videoId);

            return result;
        }
    },
    {
        method: 'POST',
        path: '/comments',
        config: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
        handler: async(request)=> {
            const {token,userId,newComment} = request.payload;

            const tokenValid = await isTokenValid(token);

            if(tokenValid == false)
                return {result: "error", errorMessage: "invalid token to create comment"}

            console.log(newComment)

            const result = createComment(userId,newComment);

            return result;
        }
    }
];

module.exports = {
    commentsRoutes
}