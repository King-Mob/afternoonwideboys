const {pool} = require('./query');

const getItems = async (userId) => {
    const itemQuery = `SELECT * FROM "ItemsWithInfo" WHERE "UserOwner"=${userId}`;
    const result = await pool.query(itemQuery);

    return result.rows;
}

const createItem = async (newItem) => {
    const lastItem = await pool.query('SELECT "Id" FROM "Items" ORDER BY "Id" DESC LIMIT 1;');
    const newItemId = parseInt(lastItem.rows[0]["Id"]) + 1;

    const itemQuery =   `INSERT INTO "Items" 
                        VALUES (
                            ${newItemId},
                            ${newItem.userOwner},
                            ${newItem.type},
                            ${newItem.quantity}
                        );`;

    try{
        await pool.query(itemQuery);
    }
    catch(error){
        console.log(error)
    }

    return "success";
}

const updateItem = async (updatedItem) => {
    const itemQuery = `UPDATE "Items"
                    SET "Type" = ${updatedItem.type},
                        "UserOwner" = ${updatedItem.userOwner},
                        "Quantity" = ${updatedItem.quantity}
                    WHERE "Id" = ${updatedItem.id};
                    `;

    try{
        await pool.query(itemQuery);
    }
    catch(error){
        console.log(error)
    }

    return "success"
}

module.exports = {
    getItems,
    createItem,
    updateItem
}