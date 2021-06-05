const init = async () => {

    const Hapi = require('@hapi/hapi');
    const {authRoutes} = require('./routes/auth');
    const {textsRoutes} = require('./routes/texts');
    const {itemsRoutes} = require('./routes/items');

    const server = Hapi.server({
        port: 4000,
        host: '192.168.0.10'
    });

    const routes = [
        ...authRoutes,
        ...textsRoutes,
        ...itemsRoutes
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