import React,{useState} from 'react';
import {Link} from 'react-router-dom'
import {tryNewText, tryNewTextAsReply, tryNewVideo, tryNewVideoAsReply} from '../api';
import {awardAfternoonWideBucks} from '../utils';

const Text = ({text}) => 
    <div className="texts-container">
        <p className="content-item">
            {text.Value}
            {text.Name &&
            <span> 🤡 <Link to={"/user/"+text.UserCreator}>{text.Name}</Link></span>}
        </p>
    </div>

const Video = ({video}) => 
    <div className="texts-container">
        <p className="content-item">
            🎥<Link to={"/video/"+video.VideoId}>{video.Title}</Link>🎥
            {video.Name &&
            <span> 🤡 <Link to={"/user/"+video.UserCreator}>{video.Name}</Link></span>}
        </p>
    </div>

const NewContentBox = ({user,refresh,replyToType,replyToId,replyToItem,resetReply}) => {
    const [newText, setNewText] = useState("");
    const [includeVideo, setIncludeVideo] = useState(false);
    const [videoUrl, setVideoUrl] = useState("");
    const [error, setError] = useState("");

    const sendText = async () => {
        if(newText.length > 0){
            if(replyToId){
                await tryNewTextAsReply(user,newText,replyToId,replyToType);
                resetReply();
            }
            else{
                await tryNewText(user,newText);
            }
            
            await awardAfternoonWideBucks(user.id,10,user.token);

            setNewText("");
            refresh();
        }
    };

    const sendVideo = async () => {
        if(newText.length > 0){
            let result;

            if(replyToId){
                result = await tryNewVideoAsReply(user,newText,videoUrl,replyToId,replyToType);
                resetReply();
            }
            else{
                result = await tryNewVideo(user,newText,videoUrl);
            }

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
                    <p className="video-check-label">include video</p>
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
            {replyToId!=0 && <div>
                <div className="as-reply-to-container">
                    <p className="as-reply-to-item">as reply to:</p>
                    <p className="as-reply-to-item" onClick={resetReply}>❌</p>
                </div>
            {replyToItem && (replyToItem.TextId? 
                    <Text text={replyToItem}/>
                :
                    <Video video={replyToItem}/>
            )}
            </div>}
            {error && <p className="error-text">{error}</p>}    
        </div>
    )
}

export default NewContentBox;