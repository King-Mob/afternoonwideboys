import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {tryGetVideo} from '../api';

const Video = () => {
    const {videoId} = useParams();
    const [video, setVideo] = useState();

    console.log(video)

    const getVideo = async () => {
        const result = await tryGetVideo(videoId);

        console.log(result)

        if(result.success)
            setVideo(result.data);
    }

    useEffect(()=>{
        getVideo();
    },[])

    return (
        <div>
            {video &&
            <div>
            <h2>{video.Title}</h2>
            <iframe 
                width="560" 
                height="315" 
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