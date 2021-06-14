export const mergeContents = (rawContents) => {
    let contents = [];

    const texts = rawContents.texts;
    const videos = rawContents.videos;

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