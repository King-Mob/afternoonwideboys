import React,{useState} from 'react';
import {tryNewComment} from '../api';
import {awardAfternoonWideBucks} from '../utils';

const NewInteractionBox = ({user,videoId, time, refresh}) => {
    const [newComment, setNewComment] = useState("");

    const sendInteraction = async () => {
        if(newComment.length > 0){
            const possibleComment = {
                value: newComment,
                videoId,
                timelinePosition: time
            };
            
            await tryNewComment(user,possibleComment);
            await awardAfternoonWideBucks(user.id,1,user.token);

            setNewComment("");
            refresh();
        }
    };

    return (
        <div className="new-interaction-container">
            <div className="new-text-container">
                <input value={newComment} onChange={e=>setNewComment(e.target.value)} placeholder="What?"></input>
                <p className="new-text-button" style={{opacity: newComment.length > 0? 1: 0.5}}
                    onClick={sendInteraction}>Send</p>
            </div> 
        </div>
    )
}

export default NewInteractionBox;