import {tryGetItems, tryUpdateItem, tryCreateItem} from '../api';

export const awardAfternoonWideBucks = async (userId,quantity,token) => {
    const items = await tryGetItems(userId);

    let hasAfternoonWideBucks = false;
    let itemId;
    let itemQuantity;

    items.forEach(item => {
        if(item.Name === "afternoonwidebucks"){
            hasAfternoonWideBucks = true;
            itemId = parseInt(item.Id);
            itemQuantity = parseInt(item.Quantity);
        }
    });

    if(hasAfternoonWideBucks){
        const itemInfo = {
            type: 1,
            userOwner: userId,
            quantity: itemQuantity + quantity,
            id: itemId
        }
        tryUpdateItem(token,itemInfo);
    }
    else{
        const itemInfo = {
            type: 1,
            userOwner: userId,
            quantity: quantity,
        }
        tryCreateItem(token,itemInfo);
    }
}