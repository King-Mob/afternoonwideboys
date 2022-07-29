import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

const Unlock = ({ markerId }) => {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    let mapState;

    if (localStorage.getItem("awb-mapgame")) {
      mapState = JSON.parse(localStorage.getItem("awb-mapgame"));
    } else {
      mapState = {
        markersUnlocked: [],
      };
      localStorage.setItem("awb-mapgame", JSON.stringify(mapState));
    }

    if (!mapState.markersUnlocked.includes(markerId))
      mapState.markersUnlocked.push(markerId);

    localStorage.setItem("awb-mapgame", JSON.stringify(mapState));

    setUnlocked(true);
  }, []);

  return (
    <div className="map-container">
      <p>Unlocking marker {markerId}</p>
      {unlocked && <Redirect to="/map" />}
    </div>
  );
};

export default Unlock;
