import React from 'react';
import {Link} from 'react-router-dom';

const Text = ({text}) => 
    <div>
        <p>
            {text.Value}
            {text.Name &&
            <span> 🤡 <Link to={"/user/"+text.UserCreator}>{text.Name}</Link></span>}
        </p>
    </div>

const Video = ({video}) => 
    <div>
        <p>
            🎥<Link to={"/video/"+video.VideoId}>{video.Title}</Link>🎥
            {video.Name &&
            <span> 🤡 <Link to={"/user/"+video.UserCreator}>{video.Name}</Link></span>}
        </p>
    </div>

const ContentsList = ({contents}) => {
    return (
        <div className="texts-container">
            {contents.map(
                 (content,i) => {
                    if(content.type === 'text')
                        return <Text key={i} text={content.content}/>
                    if(content.type === 'video')
                        return <Video key={i} video={content.content}/>
            })}
        </div>
    )
}

export default ContentsList;