import React, { useState, useEffect } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl";

const token = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const MarkerContent = ({ unlocked }) => {
  const [active, setActive] = useState(false);

  return (
    <div onClick={() => setActive(!active)}>
      {active &&
        (unlocked ? (
          <p>Marker One, including video and characters</p>
        ) : (
          <p>you'll need to unlock this location to see what's here</p>
        ))}
      <p>{unlocked ? "🤡" : "🔒"}</p>
    </div>
  );
};

const MapView = ({ user }) => {
  //const {markers, setMarkers} = useState([]);
  const [mapState, setMapState] = useState();

  const marker = {
    id: 0,
    longitude: -1.25696,
    latitude: 51.754144,
    code: "nsfd78thjsdfksdjknvfwr9",
  };

  const markers = [marker];

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
          >
            {mapState && (
              <MarkerContent
                unlocked={mapState.markersUnlocked.includes(marker.id)}
              />
            )}
          </Marker>
        ))}
      </Map>
    </div>
  );
};

export default MapView;
