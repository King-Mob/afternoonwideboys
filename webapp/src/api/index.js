import {config} from '../config';

export const trySignUp = async (signUpInfo) => {
    const signUpRequest = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(signUpInfo)
    }

    const result = await fetch(`${config.baseUrl}/register`,signUpRequest);
    return result.json();
}

export const tryLogin = async (loginInfo) => {
    const loginRequest = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(loginInfo)
    };

    const result = await fetch(`${config.baseUrl}/login`,loginRequest);
    return result.json();
}

export const tryGetTexts = async () => {
    const result = await fetch(`${config.baseUrl}/texts`);
    return result.json();
}

export const tryNewText = async (user,newText) => {
    const newTextRequest = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify({
            newText:{
                value: newText
            },
            userId: user.id,
            token: {
                type: 5,
                value: user.token
            }
        })
    };

    const result = await fetch(`${config.baseUrl}/texts`,newTextRequest);
    return result.json();
}

export const tryGetUser = async (userId) => {
    const result = await fetch(`${config.baseUrl}/users/${userId}`);
    return result.json();
}

export const tryGetUserTexts = async (userId) => {
    const result = await fetch(`${config.baseUrl}/texts/${userId}`);
    return result.json();
}

export const tryGetItems = async (userId) => {
    const result = await fetch(`${config.baseUrl}/items/${userId}`);
    return result.json();
}

export const tryUpdateItem = async (token,updatedItem) => {
    const itemRequest = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify({
            updatedItem,
            token: {
                type: 5,
                value: token
            }
        })
    };

    const result = await fetch(`${config.baseUrl}/items`,itemRequest);
    return result.json();
}

export const tryCreateItem = async (token,newItem) => {
    const itemRequest = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify({
            newItem,
            token: {
                type: 5,
                value: token
            }
        })
    };

    const result = await fetch(`${config.baseUrl}/items`,itemRequest);
    return result.json();
}