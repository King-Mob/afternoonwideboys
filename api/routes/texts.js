//get texts, create and update them

const {isTokenValid} = require('../queries/auth');
const {getAllTexts, getTextsFromUser, createText} = require('../queries/texts');

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
            const newText = request.payload.newText;
            const userId = request.payload.userId;

            const token = request.payload.token;

            if(await isTokenValid(token) == false)
                return {result: "error", errorMessage: "invalid token to post text"}

            const result = createText(newText,userId);

            return result;
        }
    },
];

module.exports = {
    textsRoutes
}