function triggerNotes (currentTime) {

    console.log(currentTime)
    const noteArea = document.getElementById("notes");

    const noteTime = 5;
    const noteContent = "Being straight is a curse";

    if(currentTime - noteTime > 0 && currentTime - noteTime < 1){
        const note = document.createElement("p");
        note.innerHTML = noteContent;
        noteArea.append(note);
    }
}