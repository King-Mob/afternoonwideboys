import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Map, { Marker } from "react-map-gl";
import { markers } from "../data/markers";

const token = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const MarkerContent = ({ unlocked, data }) => {
  const [active, setActive] = useState(false);

  return (
    <div onClick={() => setActive(!active)}>
      {active &&
        (unlocked ? (
          <div className="grey-background">
            <p>{data.name}, including video and characters</p>
            <Link to={`/map/location/${data.url}`}>
              <p>Open location</p>
            </Link>
          </div>
        ) : (
          <p className="grey-background">
            you'll need to unlock this location to see what's here
          </p>
        ))}
      <p style={{ margin: 0 }}>{unlocked ? "🤡" : "🔒"}</p>
    </div>
  );
};

const MapView = ({ user }) => {
  const [mapState, setMapState] = useState();

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

    setMapState(mapState);
  }, []);

  return (
    <div className="map-container">
      <p>Welcome to the afternoonwideboys world</p>
      <Map
        mapboxAccessToken={token}
        initialViewState={{
          longitude: -1.25696,
          latitude: 51.754144,
          zoom: 12.75,
        }}
        style={{ width: "100%", height: "400px" }}
        mapStyle="mapbox://styles/kingmob/cl66lb48y000515ny2h0sled5"
      >
        {markers.map((marker) => (
          <Marker
            longitude={marker.longitude}
            latitude={marker.latitude}
            anchor="bottom"
            key={marker.id}
          >
            {mapState && (
              <MarkerContent
                unlocked={mapState.markersUnlocked.includes(marker.id)}
                data={marker}
              />
            )}
          </Marker>
        ))}
      </Map>
    </div>
  );
};

export default MapView;
