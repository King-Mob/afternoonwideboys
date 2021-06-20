//get texts, create and update them

const {isTokenValid} = require('../queries/auth');
const {getAllTexts, getTextsFromUser, createText, createTextAsReply} = require('../queries/texts');

const textsRoutes = [
    {
        method: 'GET',
        path: '/texts',
        config: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
        handler: async()=> {
            const result = getAllTexts();

            return result;
        }
    },
    {
        method: 'GET',
        path: '/texts/{userId}',
        config: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
        handler: async(request)=> {
            const result = getTextsFromUser(request.params.userId);

            return result;
        }
    },
    {
        method: 'POST',
        path: '/texts',
        config: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
        handler: async(request)=> {
            const {newText, userId, token} = request.payload;

            const tokenValid = await isTokenValid(token);

            if(tokenValid == false)
                return {result: "error", errorMessage: "invalid token to post text"}

            const result = createText(newText,userId);

            return result;
        }
    },
    {
        method: 'POST',
        path: '/textsasreply',
        config: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
        handler: async(request)=> {
            const {newText, userId, token} = request.payload;

            const tokenValid = await isTokenValid(token);

            if(tokenValid == false)
                return {result: "error", errorMessage: "invalid token to post text"}

            const result = createTextAsReply(newText,userId);

            return result;
        }
    },
];

module.exports = {
    textsRoutes
}