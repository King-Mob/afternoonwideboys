import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {tryGetStickers, tryNewSticker} from '../api';

function multiTouchElement(elmnt){
    let distanceInsideX;
    let distanceInsideY;

    elmnt.ontouchstart = touchStart;

    let secondTouchDistance;
    let fontSize = 0;

    function touchStart (event) {
        let e = event.targetTouches[0];
        console.log(event)

        // get the mouse cursor position on the element:
        distanceInsideX = (100 * e.clientX/window.innerWidth) - elmnt.style.marginLeft.split("vw")[0];
        distanceInsideY = (100 * e.clientY/window.innerHeight) - elmnt.style.marginTop.split("vh")[0];

        event.target.ontouchmove = touchMove;
    }

    function touchMove(event){
        event.preventDefault();
        //console.log(event)
        
        let e = event.targetTouches[0];

        elmnt.style.marginLeft = (100 * e.clientX/window.innerWidth) - distanceInsideX + "vw";
        elmnt.style.marginTop = (100 * e.clientY/window.innerHeight) - distanceInsideY + "vh";
    
        if(event.targetTouches[1]){
            let e2 = event.targetTouches[1];
            if(!secondTouchDistance){
                secondTouchDistance = Math.abs(e.clientX - e2.clientX); 
            }
            if(Math.abs(e.clientX - e2.clientX) - secondTouchDistance > 2){
                fontSize += 10;
                console.log(fontSize)
                console.log(elmnt.children[0].style.fontSize)
                elmnt.children[0].style.fontSize = (parseInt(elmnt.children[0].style.fontSize.split("px")[0]) + 1) + "px";
                secondTouchDistance = Math.abs(e.clientX - e2.clientX); 
            }
            if(Math.abs(e.clientX - e2.clientX) - secondTouchDistance < -2){
                fontSize -= 10;
                console.log(fontSize)
                elmnt.children[0].style.fontSize = (parseInt(elmnt.children[0].style.fontSize.split("px")[0]) - 1) + "px";
                secondTouchDistance = Math.abs(e.clientX - e2.clientX); 
            }         
        }    
    }
}

function dragElement(elmnt) {
  let distanceInsideX;
  let distanceInsideY;
  elmnt.onmousedown = dragMouseDown;
  
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();

    console.log((100 * e.clientX/window.innerWidth))
    // get the mouse cursor position on the element:
    distanceInsideX = (100 * e.clientX/window.innerWidth) - elmnt.style.marginLeft.split("vw")[0];
    distanceInsideY = (100 * e.clientY/window.innerHeight) - elmnt.style.marginTop.split("vh")[0];

    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();

    //elmnt.style.left = (100 * e.clientX/window.innerWidth) - distanceInsideX + "vw";
    //elmnt.style.top = (100 * e.clientY/window.innerHeight) - distanceInsideY + "vh";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

const Wall = ({user}) => {
    const [loading, setLoading] = useState(true);
    const [stickers, setStickers] = useState([]);
    const [newText, setNewText] = useState("");
    const [colour, setColour] = useState("white");

    const getStickers = async () => {
        const result = await tryGetStickers();
        if(result.success){
            setStickers(result.data);
        }
    }

    const addSticker = async () => {
        if(newText.length > 0){
            const stickerElement = document.getElementById("dragging");
            const newSticker = {
                text: newText,
                rotation: 0,
                x: parseInt(stickerElement.style.marginLeft.split("vw")[0]),
                y: parseInt(stickerElement.style.marginTop.split("vh")[0]),
                size: parseInt(stickerElement.children[0].style.fontSize.split("px")[0]),
                colour
            };
            const result = await tryNewSticker(user, newSticker);
            if(result.success){
                await getStickers();
                setNewText("");
                stickerElement.style.fontSize = "30px";
                stickerElement.style.marginLeft = "0vw";
                stickerElement.style.marginTop = "0vh";
            }
        }
    }

    useEffect(()=>{
        getStickers();
        dragElement(document.getElementById("dragging"));
        multiTouchElement(document.getElementById("dragging"));
        document.getElementById("sticker-input").focus();
    },[loading])

    const enterText = (e) => {
        e.target.focus();
    }

    return (<>
        <div className="wall-toolbar">
            {
            user?
            <>
            <div className="colours">
                <p onClick={()=>setColour("white")} style={{color: "white"}}>white</p>
                <p onClick={()=>setColour("red")} style={{color: "red"}}>red</p>
                <p onClick={()=>setColour("blue")} style={{color: "blue"}}>blue</p>
                <p onClick={()=>setColour("green")} style={{color: "green"}}>green</p>
            </div>
            <p 
                className="new-sticker-button" style={{opacity: newText.length > 0? 1: 0.5}}
                onClick={addSticker}
            >
                add sticker
            </p>
            </>
            :
            <>
                <p><Link to="/login">login</Link> or <Link to="/signup">sign up</Link> to add stickers</p>
            </>
            }   
            
        </div>
        <div className="wall-container">
            {stickers.map(sticker => 
                <p
                    className="sticker"
                    style={{
                        zIndex: 0,
                        position: 'absolute',
                        fontSize: sticker.Size + 'px',
                        color: sticker.Colour,
                        opacity: 1 - sticker.Age / 5,
                        marginTop: sticker.Y + 'vh',
                        marginLeft: sticker.X + 'vw'
                    }}
                >
                    {sticker.Text}
                </p>)
            }  
            <div
                draggable={true}
                className="draggable"
                id="dragging"
            >
                {/*
                    I was looking at this because the stickers render
                    multiline as they go near the edge. and that would be
                    nice?
                    <p
                    style={{textAlign: 'left'}}
                    >{newText}</p>
                */}
                <input
                    value={newText}
                    type="text" 
                    onChange={e=>setNewText(e.target.value)}
                    className="wall-input"
                    id="sticker-input"
                    onClick={enterText}
                    size={newText.length}
                    placeholder="Aa"
                    style={{
                        color: colour,
                        fontSize: '30px'
                    }}
                ></input>
            </div>
        </div>
    </>)
}

export default Wall;