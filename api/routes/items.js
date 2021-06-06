//get items for users, create and update them

const {getItems, createItem, updateItem} = require('../queries/items');
const {isTokenValid} = require('../queries/auth');

const itemsRoutes = [
    {
        method: 'GET',
        path: '/items/{userId}',
        config: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
        handler: async(request)=> {
            const result = getItems(request.params.userId);

            return result;
        }
    },
    {
        method: 'POST',
        path: '/items',
        config: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
        handler: async(request)=> {
            const {token,newItem} = request.payload;

            if(await isTokenValid(token) == false)
                return {result: "error", errorMessage: "invalid token to create item"}

            const result = createItem(newItem);

            return result;
        }
    },
    {
        method: 'PUT',
        path: '/items',
        config: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
        handler: async(request)=> {
            const {token,updatedItem} = request.payload;

            if(await isTokenValid(token) == false)
                return {result: "error", errorMessage: "invalid token to update item"}

            const result = updateItem(updatedItem);

            return result;
        }
    },
]

module.exports = {
    itemsRoutes
}