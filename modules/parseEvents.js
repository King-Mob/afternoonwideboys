// this parser can only do m:ss for the time, and no extra " in the content of notes.
function parseEvents (eventsFile) {
    let eventsSection = eventsFile.split("## Events")[1];

    let finished = false;
    let lastEvent = 0;
    let events = [];

    while(!finished){
        let eventStart = eventsSection.indexOf("@",lastEvent+1);
        if(eventStart == -1)
            finished = true;
        else{
            const timeString = eventsSection.slice(eventStart + 1, eventStart + 5);
            const time = 60*parseInt(timeString[0]) + parseInt(timeString.slice(2));
            const type = eventsSection.slice(eventStart + 5, eventStart + 17).split(" ")[1];

            if(type == "note"){
                const content = eventsSection.slice(eventStart).split("\"")[1];
                const endOfContent = eventStart + 12 + eventsSection.slice(eventStart + 12).indexOf("\"");
                const duration = parseInt(eventsSection.slice(endOfContent + 2, endOfContent + 6));

                events.push({
                    type: type,
                    time: time,
                    content: content,
                    duration: duration
                });
            }
            if(type == "quiz"){
                const question = eventsSection.slice(eventStart).split("\"")[1];
                const endOfQuestion = eventStart + 12 + eventsSection.slice(eventStart + 12).indexOf("\"");
                const endOfQuiz = 
                eventsSection.slice(eventStart + 12).indexOf("@") != -1 ?
                    eventStart + 12 + eventsSection.slice(eventStart + 12).indexOf("@")
                    :
                    eventStart + 12 + eventsSection.slice(eventStart + 12).length
                ;

                let answers = [];
                let answer = "";
                let insideQuotes = true;
                let correct = parseInt(eventsSection[endOfQuiz-3]);

                const quizString = eventsSection.slice(endOfQuestion,endOfQuiz);
                
                for(let i = 0;i<quizString.length;i++){
                    let character = quizString[i];
                    if(insideQuotes)
                        if(character != "\"")
                            answer += character;
                        else{
                            insideQuotes = false;
                            answers.push(answer);
                            answer = "";
                        }
                    else{
                        if(character == "\"")
                            insideQuotes = true;
                    }
                }
                answers = answers.slice(1);
                
                events.push({
                    type: type,
                    time: time,
                    question: question,
                    answers: answers,
                    correct: correct,
                    answered: false
                });
            }
            if(type == "size-change"){
                const endOfSizeChange = 
                eventsSection.slice(eventStart + 12).indexOf("@") != -1 ?
                    eventStart + 12 + eventsSection.slice(eventStart + 12).indexOf("@")
                    :
                    eventStart + 12 + eventsSection.slice(eventStart + 12).length
                ;
                const height = parseInt(eventsSection.slice(eventStart + 17, endOfSizeChange).split(" ")[1]);
                const width = parseInt(eventsSection.slice(eventStart + 17, endOfSizeChange).split(" ")[2]);

                events.push({
                    type: type,
                    time: time,
                    height: height,
                    width: width
                })
            }
            if(type == "background"){
                const endOfBackground = 
                    eventsSection.slice(eventStart + 12).indexOf("@") != -1 ?
                        eventStart + 12 + eventsSection.slice(eventStart + 12).indexOf("@")
                        :
                        eventStart + 12 + eventsSection.slice(eventStart + 12).length
                    ;
                const url = eventsSection.slice(eventStart + 12, endOfBackground).split(" ")[1].slice(1,-1);
                const duration = parseInt(eventsSection.slice(eventStart + 12, endOfBackground).split(" ")[2]);

                events.push({
                    type: type,
                    time: time,
                    url: url,
                    duration: duration
                })
            }
            
            lastEvent = eventStart;
        }
    }

    console.log(events);
    return events;
}