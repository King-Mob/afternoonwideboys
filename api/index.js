const init = async () => {

    const Hapi = require('@hapi/hapi');
    const {authRoutes} = require('./routes/auth');
    const {textsRoutes} = require('./routes/texts');
    const {itemsRoutes} = require('./routes/items');
    const {usersRoutes} = require('./routes/users');

    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST
    });

    const routes = [
        ...authRoutes,
        ...textsRoutes,
        ...itemsRoutes,
        ...usersRoutes
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