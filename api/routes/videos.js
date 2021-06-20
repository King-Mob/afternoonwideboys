//get videos, create and update them

const {isTokenValid} = require('../queries/auth');
const {tryCreateValidVideoUrl} = require('../utils');
const {createVideo, getVideo, createVideoAsReply} = require('../queries/videos');

const videosRoutes = [
    {
        method: 'GET',
        path: '/videos/{videoId}',
        config: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
        handler: async(request)=> {
            const result = await getVideo(request.params.videoId);

            console.log(result)

            return result;
        }
    },
    {
        method: 'POST',
        path: '/videos',
        config: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
        handler: async(request)=> {
            const {token,userId,newVideo} = request.payload;

            const tokenValid = await isTokenValid(token);

            if(tokenValid == false)
                return {success: false, errorMessage: "invalid token to post text"};

            const videoEmbedLink = await tryCreateValidVideoUrl(newVideo.videoUrl);

            if(videoEmbedLink == false)
                return {success: false, errorMessage: "no youtube video url detected"}
            else
                newVideo.videoUrl = videoEmbedLink;

            const result = createVideo(newVideo,userId);

            return result;
        }
    },
    {
        method: 'POST',
        path: '/videosasreply',
        config: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
        handler: async(request)=> {
            const {token,userId,newVideo} = request.payload;

            const tokenValid = await isTokenValid(token);

            if(tokenValid == false)
                return {success: false, errorMessage: "invalid token to post text"};

            const videoEmbedLink = await tryCreateValidVideoUrl(newVideo.videoUrl);

            if(videoEmbedLink == false)
                return {success: false, errorMessage: "no youtube video url detected"}
            else
                newVideo.videoUrl = videoEmbedLink;

            const result = createVideoAsReply(newVideo,userId);

            return result;
        }
    },
];

module.exports = {
    videosRoutes
}