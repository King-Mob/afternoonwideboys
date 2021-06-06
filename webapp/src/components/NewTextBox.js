import React,{useState} from 'react';
import {tryNewText} from '../api';
import {awardAfternoonWideBucks} from '../utils';

const NewTextBox = ({user,change,setChange}) => {
    const [newText, setNewText] = useState("");

    const handleSend = async () => {
        if(newText.length > 0){
            await tryNewText(user,newText);

            await awardAfternoonWideBucks(user.id,10,user.token);

            setChange(change+1);
        }
    };

    return (
        <div>
            <input value={newText} onChange={e=>setNewText(e.target.value)} placeholder="What?"></input>
            <p onClick={handleSend}>Send</p>
        </div>
    )
}

export default NewTextBox;