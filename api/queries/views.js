const {_db} = require('./query');

const addView = async (user) => {
    const db = await _db;

    const lastView  = await db.Views.findOne({}, {
        order: [{field: 'Id', direction: 'desc'}]
    });
    const newViewId = lastView.Id + 1;

    await db.Views.insert({
        Id: newViewId,
        UserLogger: user.id,
        Time: new Date().toISOString()
    });

    return {success: true};
}

module.exports = {
    addView
}