const {_db} = require('./query');

const createRoleAndToken = async (userId) => {
    const db = await _db;

    const lastToken = await db.Tokens.findOne({}, {
        order: [{field: 'Id', direction: 'desc'}]
    });
    const newTokenId = parseInt(lastToken.Id) + 1;

    await db.Tokens.insert({
        Id: newTokenId,
        Type: 5,
        Value: Math.random()*1000000000
    });

    const lastRole = await db.Roles.findOne({}, {
        order: [{field: 'Id', direction: 'desc'}]
    });
    const newRoleId = parseInt(lastRole.Id) + 1;

    await db.Roles.insert({
        Id: newRoleId,
        UserHaver: userId,
        Type: 1,
        TokenId: newTokenId
    })
}

const createUser = async (newUser) => {
    const db = await _db;

    const token = await db.Tokens.findOne({
        Value: newUser.token
    })

    if(!token)
        return {success: false, errorMessage: "Invite code not recognised."};

    if(parseInt(token.Type) != 1)
        return {success:false, errorMessage: "Invite code may have already been used."};

    const lastUser = await db.Users.findOne({}, {
        order: [{field: 'Id', direction: 'desc'}]
    });
    
    const newUserId = parseInt(lastUser.Id) + 1;

    const today = new Date;

    await db.Users.insert({
        Id: newUserId,
        Name: newUser.name,
        Email: newUser.email,
        Password: newUser.password,
        Created: today.toISOString()
    })
    
   await db.Tokens.update({
        Id: token.Id
    },{
        Type: 2
    });
    
    createRoleAndToken(newUserId);
  
    return {success: true};
}

const tryLogin = async (potentialUser) => {
    const db = await _db;

    const user = await db.Users.findOne({
        Email: potentialUser.email
    });

    if(!user)
        return {success: false, errorMessage: "No user found with this email"};

    if(user.Password == potentialUser.password){
        const role = await db.Roles.findOne({
            UserHaver: user.Id
        })
        const token = await db.Tokens.findOne({
            Id: role.TokenId
        })
        
        return {
            success: true,
            data: {
                id: user.Id,
                name: user.Name,
                email: user.Email,
                token: token.Value
            }
        }
    }
    else
        return {success:false, errorMessage: "Password failed to match with email."}
}

const isTokenValid = async (potentialToken) => {
    const db = await _db;

    const token = await db.Tokens.findOne({
        Value: potentialToken.value
    });
    
    if(token)
        return (token.Type == potentialToken.type && token.Value == potentialToken.value);
    else
        return false;
}

module.exports = {
    createUser,
    tryLogin,
    isTokenValid
}

