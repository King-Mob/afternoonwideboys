const {_db} = require('./query');

const getItems = async (userId) => {
    const db = await _db;

    items = await db.ItemsWithInfo.find({
        UserOwner: userId
    });

    return items;
}

const createItem = async (newItem) => {
    const db = await _db;

    const lastItem = await db.Items.findOne({}, {
        order: [{field: 'Id', direction: 'desc'}]
    });

    const newItemId = parseInt(lastItem.Id) + 1;

    await db.Items.insert({
        Id: newItemId,
        UserOwner: newItem.userOwner,
        Type: newItem.type,
        Quantity: newItem.quantity
    });
    
    return {result: "text successfully created"};
}

const updateItem = async (updatedItem) => {
    const db = await _db;

    await db.Items.update({
        Id: updatedItem.id
    },{
        Type: updatedItem.type,
        UserOwner: updatedItem.userOwner,
        Quantity: updatedItem.quantity,
    });
    
    return {result: "items successfully created"};
}

module.exports = {
    getItems,
    createItem,
    updateItem
}