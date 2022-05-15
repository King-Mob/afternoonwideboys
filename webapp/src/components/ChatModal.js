import React, { useState, useEffect } from "react";
import { getCookie, setCookie } from "../utils/cookies";
import { awardAfternoonWideBucks } from "../utils";
import { tryGetItems, tryCreateItem } from "../api";

export const ChatButton = ({ openFunction }) => {
  let openedBefore = false;

  if (getCookie("opened-chat")) openedBefore = true;

  return (
    <div
      className="chat-button"
      onClick={() => {
        openFunction();
        setCookie("opened-chat", "true", 10000);
      }}
    >
      {!openedBefore && <p className="chat-notification-dot">.</p>}
      <p className="chat-emoji">💬</p>
    </div>
  );
};

const ChatModal = ({ visible, closeFunction, user, refresh }) => {
  const [chatStage, setChatStage] = useState("start");
  const [userHasEnoughBucks, setUserHasEnoughBucks] = useState(false);
  const [pleading, setPleading] = useState("");
  const pleadingTemplate =
    "Rodney, I really need your toilet and so help me god I really need you too";

  const checkUserBucks = async () => {
    const items = await tryGetItems(user.id);
    items.forEach((item) => {
      if (item.Name === "afternoonwidebucks")
        if (parseInt(item.Quantity) >= 100) setUserHasEnoughBucks(true);
    });
  };

  useEffect(() => {
    checkUserBucks();
  }, []);

  const buyToilet = () => {
    setCookie("dealtWithRodney", "true", 10000);
    awardAfternoonWideBucks(user.id, -100, user.token);
    tryCreateItem(user.token, { userOwner: user.id, type: 2, quantity: 1 });
    refresh();
  };

  const getBelt = () => {
    setCookie("dealtWithRodney", "true", 10000);
    tryCreateItem(user.token, { userOwner: user.id, type: 3, quantity: 1 });
    refresh();
  };

  const getToilet = () => {
    setCookie("dealtWithRodney", "true", 10000);
    setCookie("beggedForToilet", "true", 10000);
    tryCreateItem(user.token, { userOwner: user.id, type: 2, quantity: 1 });
    refresh();
  };

  let chat = (
    <div>
      <p>Hey there, are you looking to buy a toilet today?</p>
      <p className="chat-option" onClick={() => setChatStage("yesSelected")}>
        Yes
      </p>
      <p className="chat-option" onClick={() => setChatStage("noSelected")}>
        No
      </p>
    </div>
  );

  if (getCookie("dealtWithRodney"))
    chat = (
      <div>
        <p>
          <i>Your dealings with Rodney are over.</i>
        </p>
        <p className="chat-option" onClick={closeFunction}>
          Leave
        </p>
      </div>
    );

  if (chatStage === "yesSelected")
    chat = (
      <div>
        <p>
          That's good, mate, I've got one for just £100, can be yours right now
        </p>
        {userHasEnoughBucks ? (
          <p
            onClick={() => {
              buyToilet();
              setChatStage("buySelected");
            }}
            className="chat-option"
          >
            Buy toilet [£100]
          </p>
        ) : (
          <p className="chat-option-disabled">Buy toilet [£100]</p>
        )}
        <p onClick={() => setChatStage("cantAfford")} className="chat-option">
          I can't afford that
        </p>
        <p onClick={() => setChatStage("noSelected")} className="chat-option">
          Actually, I dont want to buy a toilet any more
        </p>
      </div>
    );

  if (chatStage === "buySelected")
    chat = (
      <div>
        <p>Pleasure doing business with you.</p>
        <p className="chat-option" onClick={() => setChatStage("start")}>
          Nice one
        </p>
        <p className="chat-option" onClick={() => setChatStage("start")}>
          Cheers
        </p>
        <p className="chat-option" onClick={() => setChatStage("start")}>
          Goodbye
        </p>
      </div>
    );

  if (chatStage === "cantAfford")
    chat = (
      <div>
        <p>Well, maybe there's something else you can do for Rodney...</p>
        <p
          className="chat-option"
          onClick={() => setChatStage("pleadForToilet")}
        >
          Like what?
        </p>
        <p onClick={() => setChatStage("noSelected")} className="chat-option">
          I don't want the toilet any more
        </p>
      </div>
    );

  if (chatStage === "pleadForToilet")
    chat = (
      <div>
        <div className="long-chat-container">
          <p>
            If you want the toilet, you need to tell Rodney how much you need
            it...and how much you need Rodney
          </p>
          <p>
            <i>say "{pleadingTemplate}"</i>
          </p>
        </div>
        <div className="new-text-container">
          <textarea
            value={pleading}
            onChange={(e) => setPleading(e.target.value)}
            placeholder="enter what Rodney wants you to say"
          ></textarea>
          <p
            className="new-text-button"
            style={{ opacity: pleading === pleadingTemplate ? 1 : 0.5 }}
            onClick={() => {
              if (pleading === pleadingTemplate) {
                getToilet();
                setChatStage("pleadingDone");
              }
            }}
          >
            Say
          </p>
        </div>
        <p onClick={() => setChatStage("noSelected")} className="chat-option">
          I'm not doing that
        </p>
      </div>
    );

  if (chatStage === "pleadingDone")
    chat = (
      <div>
        <p>Well done. Rodney liked that a lot. Enjoy your toilet.</p>
        <p className="chat-option" onClick={() => setChatStage("start")}>
          You're welcome Rodney
        </p>
        <p className="chat-option" onClick={() => setChatStage("start")}>
          yeah ok...
        </p>
      </div>
    );

  if (chatStage === "noSelected")
    chat = (
      <div>
        <p>Then why are you on this site?</p>
        <p
          className="chat-option"
          onClick={() => {
            getBelt();
            setChatStage("answeredWhy");
          }}
        >
          Nothing better to do
        </p>
        <p
          className="chat-option"
          onClick={() => {
            getBelt();
            setChatStage("answeredWhy");
          }}
        >
          I'm forced to be on it
        </p>
        <p
          className="chat-option"
          onClick={() => {
            getBelt();
            setChatStage("answeredWhy");
          }}
        >
          To experience a new form of creativity
        </p>
      </div>
    );

  if (chatStage === "answeredWhy") {
    chat = (
      <div>
        <p>
          Yeah that's why I'm here too. Here, maybe you can do someting with
          this.
        </p>
        <p className="chat-option" onClick={() => setChatStage("start")}>
          Thanks. Bye
        </p>
      </div>
    );
  }

  /*
    eventually move the chat data into this

    const chatData = {
        characterName: "Prof Character",
        stages: {
            firstStage: {
                characterSays: "welcome to the first stage!",
                userOptions: [
                    {
                        speech: "great to be here!",
                        action: ()=>{setChatStage("secondStage")},
                    },
                ],
            },
        },
    };

    let chat = <div>
        <p>{chatData.stages[chatStage].characterSays}</p>
        {chatData.stages[chatStage].userOptions.map(option => {
          if(option.disabled){
            return <p className="chat-option disabled">
                {option.speech}
              </p>
          }
          return <p className="chat-option" onClick={option.action}>
                {option.speech}
            </p>
          })
        }
    </div>
    
    */

  return (
    <div
      className="chat-container"
      style={{ display: visible ? "block" : "none" }}
    >
      <div className="chat-header">
        <p className="chat-name">Rodney Berkshire</p>
        <p onClick={closeFunction} className="close-button">
          ❌
        </p>
      </div>
      {chat}
    </div>
  );
};

export default ChatModal;
