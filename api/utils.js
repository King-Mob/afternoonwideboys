const tryCreateValidVideoUrl = (videoUrl) => {
    if(!videoUrl.includes('youtube') && !videoUrl.includes('youtu.be'))
        return false;

    if(videoUrl.includes('embed'))
        return videoUrl;
    
    if(videoUrl.includes('youtube')){
        const youtubeId = videoUrl.split('watch?v=')[1].slice(0,11);
        return `https://www.youtube.com/embed/${youtubeId}`;
    }

    if(videoUrl.includes('youtu.be')){
        const youtubeId = videoUrl.split('youtu.be/')[1].slice(0,11);
        return `https://www.youtube.com/embed/${youtubeId}`;
    }
}

module.exports = {
    tryCreateValidVideoUrl
}