import React,{useState} from 'react';
import {tryNewText, tryNewVideo} from '../api';
import {awardAfternoonWideBucks} from '../utils';

const NewContentBox = ({user,refresh}) => {
    const [newText, setNewText] = useState("");
    const [includeVideo, setIncludeVideo] = useState(false);
    const [videoUrl, setVideoUrl] = useState("");
    const [error, setError] = useState("");

    const sendText = async () => {
        if(newText.length > 0){
            await tryNewText(user,newText);
            await awardAfternoonWideBucks(user.id,10,user.token);

            setNewText("");
            refresh();
        }
    };

    const sendVideo = async () => {
        if(newText.length > 0){
            const result = await tryNewVideo(user,newText,videoUrl);

            if(result.success){
                await awardAfternoonWideBucks(user.id,50,user.token);

                setNewText("");
                setIncludeVideo(false);
                setVideoUrl("");
                setError("");
                refresh();
            }
            else{
                setError(result.errorMessage);
            }    
        }
    };

    return (
        <div>
            <div className="new-text-container">
                <input value={newText} onChange={e=>setNewText(e.target.value)} placeholder="What?"></input>
                <p className="new-text-button" style={{opacity: newText.length > 0? 1: 0.5}}
                    onClick={includeVideo? sendVideo: sendText}>Send</p>
            </div>
            <div className="new-video-container">
                <section className="check-container">
                    <input type="checkbox" 
                        className="video-check" 
                        value={includeVideo}
                        onChange={()=>setIncludeVideo(!includeVideo)}>    
                    </input>
                    <label className="video-check-label">include video</label>
                </section>
                <input 
                    value={videoUrl} 
                    onChange={e=>setVideoUrl(e.target.value)} 
                    placeholder="embed link to youtube video"
                    style={{opacity: includeVideo? 1:0}}
                    disabled={!includeVideo}
                >
                </input>
            </div>
            {error && <p className="error-text">{error}</p>}    
        </div>
    )
}

export default NewContentBox;