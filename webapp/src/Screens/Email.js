import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { tryGetEmailRole, trySendEmail } from "../api";

const Email = ({ user }) => {
  const [emailText, setEmailText] = useState("");
  const [subjectOption, setSubjectOption] = useState(0);
  const [otherSubject, setOtherSubject] = useState("");
  const [canSendEmail, setCanSendEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const subjects = [
    "You must watch the new video",
    "A missive from Tommington Smythe",
    "from the desk of J Evans esq",
    "Other",
  ];

  const checkRole = async () => {
    const response = await tryGetEmailRole(user);

    if (response.success) setCanSendEmail(true);
  };

  const sendEmail = async () => {
    const emailSubject =
      subjectOption != subjects.length - 1
        ? subjects[subjectOption]
        : otherSubject;

    const email = {
      text: emailText,
      subject: emailSubject,
      from: {
        name: "The afternoonwideboys",
        email: "important.update",
      },
    };

    const response = await trySendEmail(user, email);

    if (response.success) {
      setEmailText("");
      setOtherSubject("");
      setEmailSent(true);
    }
  };

  useEffect(() => {
    if (user) checkRole();
  }, [user]);

  return (
    <div className="email-container">
      {canSendEmail ? (
        emailSent ? (
          <div>
            <p>Your email has been sent</p>
            <button onClick={() => setEmailSent(false)}>Send another</button>
          </div>
        ) : (
          <div>
            <p>Get ready to blast an email out there</p>
            {subjects.map((subject, i) => (
              <div>
                <input
                  className="email-subject-radio"
                  type="radio"
                  value={i}
                  onChange={(e) => setSubjectOption(i)}
                  checked={subjectOption == i}
                />
                <span>{subject}</span>
              </div>
            ))}
            <input
              type="text"
              value={otherSubject}
              onChange={(e) => {
                setOtherSubject(e.target.value);
                setSubjectOption(subjects.length - 1);
              }}
              placeholder="other subject"
              className="email-input"
            ></input>
            <input
              type="text"
              value={emailText}
              onChange={(e) => setEmailText(e.target.value)}
              placeholder="god they don't know what's coming"
              className="email-input"
            ></input>
            <button onClick={sendEmail}>Send</button>
          </div>
        )
      ) : (
        <div>
          <p>You are subscribed to the email list</p>
          <Link to={"/unsubscribe/"}>
            <p>Click here to unsubscribe</p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Email;
