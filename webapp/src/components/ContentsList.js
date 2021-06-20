import React from 'react';
import {Link} from 'react-router-dom';

const Text = ({text,setReplyToId,setReplyToType,setReplyToItem}) => 
    <div>
        <p className={text.HasReply?"content-item-reply":"content-item"}>
            {text.Value}
            {text.Name &&
            <span> 🤡 <Link to={"/user/"+text.UserCreator}>{text.Name}</Link></span>}
            {!text.HasReply && 
                <span> ▪️ <span 
                        onClick={()=>{
                            setReplyToType(1);
                            setReplyToId(text.TextId)
                            setReplyToItem(text)}}
                        className="reply-button"
                    >🦜</span>
                </span>
            }
        </p>
        {text.HasReply && <p className="reply-bar">|</p>}
    </div>

const Video = ({video,setReplyToId,setReplyToType,setReplyToItem}) => 
    <div>
        <p className={video.HasReply?"content-item-reply":"content-item"}>
            🎥<Link to={"/video/"+video.VideoId}>{video.Title}</Link>🎥
            {video.Name &&
            <span> 🤡 <Link to={"/user/"+video.UserCreator}>{video.Name}</Link></span>}
             {!video.HasReply && 
                <span> ▪️ <span 
                        onClick={()=>{
                            setReplyToType(2);
                            setReplyToId(video.VideoId)
                            setReplyToItem(video)}}
                        className="reply-button"
                    >🦜</span>
                </span>
            }
        </p>
        {video.HasReply && <p className="reply-bar">|</p>}
    </div>

const ContentsList = ({contents,setReplyToId,setReplyToType,setReplyToItem}) => {
    return (
        <div className="texts-container">
            {contents.map(
                 (content,i) => {
                    if(content.type === 'text')
                        return (
                            <Text 
                                key={i} 
                                text={content.content} 
                                setReplyToId={setReplyToId}
                                setReplyToType={setReplyToType}
                                setReplyToItem={setReplyToItem}
                            />
                        )
                    if(content.type === 'video')
                        return (
                            <Video 
                                key={i} 
                                video={content.content} 
                                setReplyToId={setReplyToId}
                                setReplyToType={setReplyToType}
                                setReplyToItem={setReplyToItem}
                            />
                        )
            })}
        </div>
    )
}

export default ContentsList;