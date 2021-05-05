var tag = document.createElement('script');
          
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementById('player-script');
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
          
// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'XpYrc3eOr68',
    playerVars: {
        'playsinline': 1
    },
    events: {
        'onReady': onPlayerReady,
        //'onStateChange': onPlayerStateChange
        }
    });
}
          
// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
    setInterval(()=>{
        if(player.getPlayerState() == YT.PlayerState.PLAYING)
            triggerEvents(player.getCurrentTime());
    },1000);
}

let eventsFile = "events.md";

const events = [
    {
        type: "note",
        time: 5,
        duration: 2000, 
        content: "Being straight is a curse"
    },
    {
        type: "note",
        time: 11,
        duration: 3000,
        content: "I love Tom's fashion sense"
    },
    {
        type: "quiz",
        time: 19,
        question: "Why do we go inside Tom's shirt?",
        answers: [
            "caress his manly hair",
            "check him for spying equipment",
            "distract from life's despair"
        ],
        correct: 1,
        answered: false
    },
    {
        type: "size-change",
        time: 25,
        height: 1000,
        width: 1500,
    },
    {
        type: "size-change",
        time: 26,
        height: 390,
        width: 640,
    },
    {
        type: "background",
        time: 29,
        url: "https://media.giphy.com/media/xThuWcaa4U4XZQDgvm/giphy.gif",
        duration: 700
    }
    ];
                
function triggerEvents(currentTime){
    events.forEach(event=>{
    const timeDifferential = currentTime - event.time;
    if(timeDifferential > 0 && timeDifferential < 1){
        if(event.type == "note")
            displayNote(event);
        if(event.type == "quiz")
            displayQuiz(event);
        if(event.type == "size-change")
            displaySizeChange(event);
        if(event.type == "background")
            displayBackground(event);
        }
    })
}

function displayNote(note){
    const noteArea = document.getElementById("notes");

    const noteElement = document.createElement("p");
    noteElement.innerHTML = note.content;
    noteArea.append(noteElement);
    setTimeout(()=>{noteElement.style.display = 'none'},
        note.duration)
}
          
function displayQuiz(quiz){
    if(quiz.answered)
        return;

    player.pauseVideo();

    const noteArea = document.getElementById("notes");

    const quizElement = document.createElement("div");
    quizElement.id = 'quiz';

    const questionElement = document.createElement("p");
    questionElement.innerHTML = quiz.question;
    quizElement.append(questionElement);

    quiz.answers.forEach((answer,index)=>{
        const answerElement = document.createElement("button");
        answerElement.innerHTML = answer;
        if(index == quiz.correct)
            answerElement.onclick = () => {
                player.playVideo();
                quizElement.style.display = 'none';
                quiz.answered = true;
            }
        else
            answerElement.onclick = () => {
                player.stopVideo();
                quizElement.style.display = 'none';
            }
        quizElement.append(answerElement);
    })

    noteArea.append(quizElement);
}

function displaySizeChange(sizeChange){
    player.setSize(sizeChange.width,sizeChange.height);
}

function displayBackground(background){
    document.body.style.backgroundImage = `url(${background.url})`;
    document.body.style.backgroundSize = "cover";

    setTimeout(()=>{document.body.style.backgroundImage = 'none'},
        background.duration)
}