import React, { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import { markers } from "../data/markers";

const Unlock = ({}) => {
  const { code } = useParams();
  const [location, setLocation] = useState();
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

    let markerId;

    markers.forEach((marker) => {
      if (marker.code === code) {
        markerId = marker.id;
        setLocation(marker);
      }
    });

    if (markerId && !mapState.markersUnlocked.includes(markerId))
      mapState.markersUnlocked.push(markerId);

    localStorage.setItem("awb-mapgame", JSON.stringify(mapState));

    setUnlocked(true);
  }, []);

  return (
    <div className="map-container">
      <p>Unlocking marker</p>
      {unlocked && <Redirect to={`/map/location/${location.url}`} />}
    </div>
  );
};

export default Unlock;
