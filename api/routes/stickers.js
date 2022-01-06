//get texts, create and update them

const {isTokenValid} = require('../queries/auth');
const {getAllStickers, createSticker} = require('../queries/stickers');
const {addView} = require('../queries/views');

const stickersRoutes = [
    {
        method: 'GET',
        path: '/stickers',
        config: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
        handler: async(request)=> {
            if(request.payload.user){
                addView(user);
            }

            const result = getAllStickers();

            return result;
        }
    },
    {
        method: 'POST',
        path: '/stickers',
        config: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
        handler: async(request)=> {
            const {newSticker, userId, token} = request.payload;

            const tokenValid = await isTokenValid(token);

            if(tokenValid == false)
                return {result: "error", errorMessage: "invalid token to add sticker"}

            const result = createSticker(newSticker,userId);

            return result;
        }
    },
];

module.exports = {
    stickersRoutes
}