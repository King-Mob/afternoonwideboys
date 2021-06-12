//get videos, create and update them

const {isTokenValid} = require('../queries/auth');
const {isVideoUrlValid} = require('../utils');
const {createVideo, getVideo} = require('../queries/videos');

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

            const videoValid = await isVideoUrlValid(newVideo.videoUrl);

            if(videoValid == false)
                return {success: false, errorMessage: "invalid youtube video url"}

            const result = createVideo(newVideo,userId);

            return result;
        }
    },
];

module.exports = {
    videosRoutes
}