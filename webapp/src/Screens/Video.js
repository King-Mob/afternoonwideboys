import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import {tryGetVideo, tryGetUser} from '../api';

const Video = () => {
    const {videoId} = useParams();
    const [video, setVideo] = useState();
    const [user, setUser] = useState();

    console.log(video)

    const getVideo = async () => {
        const result = await tryGetVideo(videoId);

        console.log(result)

        if(result.success){
            setVideo(result.data);
            getUser(result.data.UserCreator)
        }
    }

    const getUser = async (userId) => {
        const result = await tryGetUser(userId);

        if(result.success){
            setUser(result.data);
        }
    }

    useEffect(()=>{
        getVideo();
    },[])

    return (
        <div className="video-container">
            {video &&
            <div>
            <h2>{video.Title}</h2>
            {user &&
            <p>
                <span> 🤡 <Link to={"/user/"+video.UserCreator}>{user.Name}</Link></span>
             </p>    
            }
            <iframe 
                className="video-frame"
                width="100%"
                src={video.Url}
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
            </iframe>
            </div>
            }
        </div>
    )
}

export default Video