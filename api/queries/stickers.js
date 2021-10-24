const {_db} = require('./query');
const { DateTime } = require("luxon");

const getAllStickers = async () => {
    const db = await _db;

    const stickers = await db.Stickers.find({},{
        order: [{field: 'Created', direction: 'desc'}]
    });

    stickers.forEach(sticker => {
        const stickerDate = DateTime.fromISO(sticker.Created.toISOString());
        const now = DateTime.now();
        const daysOld = now.diff(stickerDate, 'days').days
        sticker.Age = daysOld <= 5? daysOld : 5;
    })

    result = {
        success: true,
        data: stickers
    };

    return result;
}

const createSticker = async (newSticker,userId) => {
    const db = await _db;

    const lastSticker = await db.Stickers.findOne({}, {
        order: [{field: 'Id', direction: 'desc'}]
    });

    const newStickerId = parseInt(lastSticker.Id) + 1;

    const now = new Date();

    await db.Stickers.insert({
        Id: newStickerId,
        UserCreator: userId,
        X: newSticker.x,
        Y: newSticker.y,
        Size: newSticker.size,
        Rotation: newSticker.rotation,
        Colour: newSticker.colour,
        Text: newSticker.text,
        Created: now.toISOString()
    });
    
    return {success: true, result: "sticker successfully created", newStickerId};
}

module.exports = {
    getAllStickers,
    createSticker
}