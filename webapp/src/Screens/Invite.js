import React, { useState, useEffect } from "react";
import { tryGetInviteRole, tryCreateInvite } from "../api";

const Invite = ({ user }) => {
  const [canCreateInvite, setCanCreateInvite] = useState(false);
  const [newInviteCode, setNewInviteCode] = useState("");
  const [inviteCreated, setInviteCreated] = useState(false);

  const checkRole = async () => {
    const response = await tryGetInviteRole(user);

    if (response.success) setCanCreateInvite(true);
  };

  const createInvite = async () => {
    const response = await tryCreateInvite(user, newInviteCode);

    if (response.success) {
      setInviteCreated(true);
    }
  };

  useEffect(() => {
    if (user) checkRole();
  }, [user]);

  return (
    <div className="invite-container">
      {canCreateInvite ? (
        inviteCreated ? (
          <div>
            <p>
              Your invite has been created with the code{" "}
              <span>{newInviteCode}</span>
            </p>
            <button
              onClick={() => {
                setInviteCreated(false);
                setNewInviteCode("");
              }}
            >
              Create another
            </button>
          </div>
        ) : (
          <div>
            <p>What would you like your invite code to be?</p>
            <input
              type="text"
              value={newInviteCode}
              onChange={(e) => setNewInviteCode(e.target.value)}
              placeholder="new invite code"
              className="invite-input"
            ></input>
            <button onClick={createInvite}>Create</button>
          </div>
        )
      ) : (
        <div>
          <p>Your current login can't create invites</p>
        </div>
      )}
    </div>
  );
};

export default Invite;
