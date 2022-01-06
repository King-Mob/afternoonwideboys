const init = async () => {

    const Hapi = require('@hapi/hapi');
    const {authRoutes} = require('./routes/auth');
    const {textsRoutes} = require('./routes/texts');
    const {itemsRoutes} = require('./routes/items');
    const {usersRoutes} = require('./routes/users');
    const {inviteRoutes} = require('./routes/invite');
    const {videosRoutes} = require('./routes/videos');
    const {contentsRoutes} = require('./routes/contents');
    const {commentsRoutes} = require('./routes/comments');
    const {stickersRoutes} = require('./routes/stickers');
    const {emailsRoutes} = require('./routes/emails');

    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST
    });

    const routes = [
        ...authRoutes,
        ...textsRoutes,
        ...itemsRoutes,
        ...usersRoutes,
        ...inviteRoutes,
        ...videosRoutes,
        ...contentsRoutes,
        ...commentsRoutes,
        ...stickersRoutes,
        ...emailsRoutes
    ];

    server.route(routes);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();