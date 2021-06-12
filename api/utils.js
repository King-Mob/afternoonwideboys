const isVideoUrlValid = (videoUrl) => {
    if(videoUrl.includes('y'))
        return true;
    else
        return false;
}

module.exports = {
    isVideoUrlValid
}