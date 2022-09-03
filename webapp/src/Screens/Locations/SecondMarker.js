import React from "react";
import { Link } from "react-router-dom";

const SecondMarker = ({}) => {
  return (
    <div className="map-container">
      <Link to="/map">
        <p>Back to Map</p>
      </Link>
      <p>The Second Marker</p>
      <p>youtube video</p>
      <p>character interaction</p>
    </div>
  );
};

export default SecondMarker;
