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

const mergeContents = ({texts,videos,replies}) => {
    let contents = [];

    let videosIndex = 0;

    for(let textsIndex = 0; textsIndex < texts.length;){
        let text = texts[textsIndex];
        let video = videos[videosIndex];

        if(!video || text.Created > video.Created){         
            let reply = replies.find(reply => reply.FromType == '1' && reply.FromId == text.TextId);
            
            if(reply){
                if(reply.ToType == '1'){
                    let previousText = Object.assign({},texts.find(text => text.TextId == reply.ToId));
                    previousText.HasReply = true;
                    contents.push({
                        type: 'text',
                        content: previousText
                    });
                }
                if(reply.ToType == '2'){
                    let previousVideo = Object.assign({},videos.find(video => video.VideoId == reply.ToId));
                    previousVideo.HasReply = true;
                    contents.push({
                        type: 'video',
                        content: previousVideo
                    });
                }
            }

            contents.push({
                type: 'text',
                content: text
            });
            textsIndex++;
        }
        else{
            let reply = replies.find(reply => reply.FromType == '1' && reply.FromId == video.VideoId);
            
            if(reply){
                if(reply.ToType == '1'){
                    let previousText = texts.find(text => text.TextId == reply.ToId);
                    previousText.HasReply = true;
                    contents.push({
                        type: 'text',
                        content: previousText
                    });
                }
                if(reply.ToType == '2'){
                    let previousVideo = videos.find(video => video.VideoId == reply.ToId);
                    previousVideo.HasReply = true;
                    contents.push({
                        type: 'video',
                        content: previousVideo
                    });
                }
            }

            contents.push({
                type: 'video',
                content: video
            });
            videosIndex++;
        }
    };

    if(videosIndex < videos.length){ //this only runs if the final content items are texts, which can only be true on our system if pagination is added or something like that.
        const remainingVideos = videos.slice(videosIndex).map(video=>{
            return {type: 'video', content: video}});
        contents.concat(remainingVideos);
    };

    return contents;
}

const mergeContentsNoReplies = ({texts,videos}) => {    
    let contents = [];
    let videosIndex = 0;
    
    for(let textsIndex = 0; textsIndex < texts.length;){
        let text = texts[textsIndex];
        let video = videos[videosIndex];
    
        if(!video || text.Created > video.Created){
            contents.push({
                type: 'text',
                content: text
            });
            textsIndex++;
        }
        else{
            contents.push({
                type: 'video',
                content: video
            });
            videosIndex++;
        }
    };
    
    if(videosIndex < videos.length){
        const remainingVideos = videos.slice(videosIndex).map(video=>{
            return {type: 'video', content: video}});
            contents.concat(remainingVideos);
    };
    
    return contents;
}

module.exports = {
    tryCreateValidVideoUrl,
    mergeContents,
    mergeContentsNoReplies
}