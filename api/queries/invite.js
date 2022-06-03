const { _db } = require("./query");

const createInvite = async (newInvite) => {
  const db = await _db;

  const lastToken = await db.Tokens.findOne(
    {},
    {
      order: [{ field: "Id", direction: "desc" }],
    }
  );
  const newTokenId = parseInt(lastToken.Id) + 1;

  await db.Tokens.insert({
    Id: newTokenId,
    Type: 1,
    Value: newInvite.value,
  });

  return { success: true, message: "invite created" };
};

const checkRole = async (userId) => {
  const db = await _db;

  const role = await db.Roles.findOne({
    UserHaver: userId,
    Type: 3,
  });

  if (role) return { success: true };
  else return { success: false };
};

module.exports = {
  createInvite,
  checkRole,
};
