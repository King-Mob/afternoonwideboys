const {getAllContents, getContentsFromUser} = require('../queries/contents');

const contentsRoutes = [
    {
        method: 'GET',
        path: '/contents',
        config: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
        handler: async()=> {
            const result = getAllContents();

            return result;
        }
    },
    {
        method: 'GET',
        path: '/contents/{userId}',
        config: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
        handler: async(request)=> {
            const result = getContentsFromUser(request.params.userId);

            return result;
        }
    }
];

module.exports = {
    contentsRoutes
}