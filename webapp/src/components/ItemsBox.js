import React,{useState, useEffect} from 'react';
import {tryGetItems} from '../api';

const ItemsBox = ({userId, change}) => {
    const [items, setItems] = useState();

    const getItems = async () => {
        const result = await tryGetItems(userId);
        setItems(result);
    }

    useEffect(()=>{
        getItems();
    },[change]);

    return (
        <div>
            {items && items.length > 0 ?
            
            items.map(item=>{
            if(item.Name === "afternoonwidebucks")
                return <p>£ {item.Quantity}</p>
            else
                return <p>{item.Quantity} {item.Name}</p>
            })
            :
            <p>No items</p>
        }
        </div>
    )
}

export default ItemsBox