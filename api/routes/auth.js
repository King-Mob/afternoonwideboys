/*
registration, login routes
TO DO: reset password routes
*/
const {createUser,tryLogin,isTokenValid} = require('../queries/auth');

const authRoutes = [
    {
        method: 'POST',
        path: '/register',
        config: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
        handler: async(request)=> {
            const result = createUser(request.payload);

            return result;
        }
    },
    {
        method: 'POST',
        path: '/login',
        config: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
        handler: async(request)=> {
            const result = tryLogin(request.payload);

            return result;
        }
    },
    {
        method: 'POST',
        path: '/trytoken',
        config: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
        handler: async(request)=> {
            const result = isTokenValid(request.payload.token);

            console.log(result)

            return result;
        }
    },
]

module.exports = {
    authRoutes
}