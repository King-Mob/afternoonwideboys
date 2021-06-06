const {createInvite} = require('../queries/invite');
const {isTokenValid} = require('../queries/auth');

const inviteRoutes = [
    {
        method: 'POST',
        path: '/invite',
        config: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
        handler: async(request)=> {
            const {token,newInvite} = request.payload;

            if(await isTokenValid(token) == false)
                return {result: "error", errorMessage: "invalid token to create invite"}

            const result = createInvite(newInvite);

            return result;
        }
    }
]

module.exports = {
    inviteRoutes
}