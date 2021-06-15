import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import {tryGetVideo, tryGetUser, tryGetComments} from '../api';
import InteractionsList from '../components/InteractionsList';
import NewInteractionBox from '../components/NewInteractionBox';

const Video = ({user}) => {
    const {videoId} = useParams();
    const [video, setVideo] = useState();
    const [userCreator, setUserCreator] = useState();
    const [comments, setComments] = useState();
    const [player, setPlayer] = useState();
    const [currentVideoTime, setCurrentVideoTime] = useState(0);

    const getVideo = async () => {
        const result = await tryGetVideo(videoId);

        if(result.success){
            setVideo(result.data);
            getUserCreator(result.data.UserCreator)
        }
    };

    const getUserCreator = async (userId) => {
        const result = await tryGetUser(userId);

        if(result.success){
            setUserCreator(result.data);
        }
    };

    const getComments = async () => {
        const result = await tryGetComments(videoId);

        if(result.success){
            setComments(result.data);
        }
    };

    const setUpYoutubeAPI = () => {
        let player;

        window.onPlayerReady = () => {
            console.log("player is ready")
            setPlayer(player);
        };

        window.onYouTubeIframeAPIReady = () => {
            player = new window.YT.Player('video-player', {
                events: {
                  'onReady':  window.onPlayerReady
                }
            });
        };

        let tag = document.createElement('script');
        tag.id = 'iframe-demo';
        tag.src = 'https://www.youtube.com/iframe_api';
        let firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    };

    useEffect(()=>{
        getVideo();
        getComments();
    },[])

    useEffect(()=>{
        if(video)
            setUpYoutubeAPI();
    },[video]);

    useEffect(()=>{
        if(player){
            const checkTime = setInterval(() => {
                setCurrentVideoTime(player.getCurrentTime());
              }, 200);

            return () => clearInterval(checkTime);
        }
    },[player])

    return (
        <div>
            {video && <div className="video-container">
                <iframe 
                    className="video-frame"
                    width="100%"
                    src={video.Url + '?enablejsapi=1'}
                    id="video-player"
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen>
                </iframe>
                <h2 className="video-title">{video.Title}</h2>
                {userCreator &&
                <p className="video-title">
                    <span> 🤡 <Link to={"/user/"+video.UserCreator}>{userCreator.Name}</Link></span>
                </p>    
                }
            </div>}
            {comments && 
                <InteractionsList interactions={comments} time={currentVideoTime} />
            }
            {user && 
                <NewInteractionBox user={user} videoId={videoId} time={currentVideoTime} refresh={getComments}/>
            }
        </div>
    )
}

export default Video