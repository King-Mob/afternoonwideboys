const {sendNotifications} = require('../queries/emails');

const emailsRoutes = [
    {
        method: 'GET',
        path: '/emails',
        config: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
        handler: async(request)=> {
            const result = await sendNotifications();

            return result;
        }
    },
]

module.exports = {
    emailsRoutes
}