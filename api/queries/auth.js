const {pool} = require('./query');

const createRoleAndToken = async (userId) => {
    const lastToken = await pool.query('SELECT "Id" FROM "Tokens" ORDER BY "Id" DESC LIMIT 1;');
    const newTokenId = parseInt(lastToken.rows[0]["Id"]) + 1;

    const tokenQuery =   `INSERT INTO "Tokens" 
                        VALUES (
                            ${newTokenId},
                            5,
                            '${Math.random()*1000}'
                        );`;

    await pool.query(tokenQuery);

    const lastRole = await pool.query('SELECT "Id" FROM "Roles" ORDER BY "Id" DESC LIMIT 1;');
    const newRoleId = parseInt(lastRole.rows[0]["Id"]) + 1;

    const roleQuery = `INSERT INTO "Roles"
                        VALUES(
                            ${newRoleId},
                            ${userId},
                            1,
                            ${newTokenId}
                        );`;
    
    await pool.query(roleQuery);
}

const createUser = async (newUser) => {
    const token = await pool.query(`SELECT * FROM "Tokens" WHERE "Value"='${newUser.token}'`)

    if(!token.rows[0])
        return {success:false, errorMessage: "Invite code not recognised."};

    if(parseInt(token.rows[0]["Type"]) != 1)
        return {success:false, errorMessage: "Invite code may have already been used."};

    const lastUser = await pool.query('SELECT "Id" FROM "Users" ORDER BY "Id" DESC LIMIT 1;');
    const newUserId = parseInt(lastUser.rows[0]["Id"]) + 1;

    const today = new Date;

    const userQuery =   `INSERT INTO "Users" 
                        VALUES (
                            ${newUserId},
                            '${newUser.name}',
                            '${newUser.email}',
                            '${newUser.password}',
                            '${today.toISOString()}'
                        );`;
    
    const tokenQuery = `UPDATE "Tokens"
                        SET "Type" = '2'
                        WHERE "Id" = '${token.rows[0]["Id"]}'
    `;

    let result;

    try{
        await pool.query(userQuery);
        result = {success: true};
        await pool.query(tokenQuery);
        createRoleAndToken(newUserId);
    }
    catch(error){
        result = {success:false, errorMessage: "something went wrong", error};
    }

    return result;
}

const tryLogin = async (potentialUser) => {
    const user = await pool.query(`SELECT * FROM "Users" WHERE "Email"='${potentialUser.email}'`);

    if(!user.rows[0])
        return {success: false, errorMessage: "No user found with this email"};

    if(user.rows[0]["Password"] == potentialUser.password){
        const role = await pool.query(`SELECT * FROM "Roles" WHERE "UserHaver"=${parseInt(user.rows[0]["Id"])}`);
        const token = await pool.query(`SELECT * FROM "Tokens" WHERE "Id"=${role.rows[0]["TokenId"]}`)
        return {
            success: true,
            data: {
                id: user.rows[0].Id,
                name: user.rows[0].Name,
                email: user.rows[0].Email,
                token: token.rows[0].Value
            }
        }
    }
    else
        return {success:false, errorMessage: "Password failed to match with email."}
}

const isTokenValid = async (potentialToken) => {
    const token = await pool.query(`SELECT * FROM "Tokens" WHERE "Value"='${potentialToken.value}';`);
    if(token.rows[0])
        if(token.rows[0]["Type"] == potentialToken.type)
            return true;
        else
            return false;
    else
        return false;
}

module.exports = {
    createUser,
    tryLogin,
    isTokenValid
}

