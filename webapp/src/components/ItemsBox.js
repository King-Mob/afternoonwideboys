import React from 'react';

const ItemsBox = ({items}) => {
    return (
        <div>
            {items && items.length > 0 ?
            
            items.map((item,i)=>{
            if(item.Name === "afternoonwidebucks")
                return <p key={i}>£ {item.Quantity}</p>
            else
                return <p key={i}>{item.Quantity} {item.Name}</p>
            })
            :
            <p>No items</p>
        }
        </div>
    )
}

export default ItemsBox