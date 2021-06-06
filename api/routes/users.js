const {getUser} = require('../queries/users');

const usersRoutes = [
    {
        method: 'GET',
        path: '/users/{userId}',
        config: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
        handler: async(request)=> {
            const result = getUser(request.params.userId);

            return result;
        }
    },
];

module.exports = {
    usersRoutes
}