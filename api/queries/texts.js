const {pool} = require('./query');

const getAllTexts = async () => {
    const texts = await pool.query(`SELECT * FROM "TextsWithCreators"`);
    result = texts.rows;

    return result;
}

const createText = async (newText,userId) => {
    const lastText = await pool.query(`SELECT "Id" FROM "Texts" ORDER BY "Id" DESC LIMIT 1;`)
    const newTextId = parseInt(lastText.rows[0]["Id"]) + 1;

    const now = new Date();

    const textQuery = `INSERT INTO "Texts"
                        VALUES(
                        ${newTextId},
                        ${userId},
                        '${newText.value}',
                        '${now.toISOString()}'
    );`;

    try{
        await pool.query(textQuery);
    }
    catch(error){
        console.log(error)
        return "something failed"
    }
    
    return {result: "text successfully created"};
}

module.exports = {
    getAllTexts,
    createText
}