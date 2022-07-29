import "./App.css";
import React, { useState, useEffect } from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Screens/Home";
import User from "./Screens/User";
import SignUp from "./Screens/SignUp";
import Login from "./Screens/Login";
import Video from "./Screens/Video";
import Wall from "./Screens/Wall";
import Email from "./Screens/Email";
import Invite from "./Screens/Invite";
import Map from "./Screens/Map";
import Unlock from "./Screens/Unlock";
import { getCookie } from "./utils/cookies";
import "mapbox-gl/dist/mapbox-gl.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userCookie = getCookie("user");

    if (userCookie) setUser(JSON.parse(userCookie));
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Link to="/">
            <h1 className="title">afternoonwideboys</h1>
          </Link>
        </header>
        <Switch>
          <Route path="/user/:userId">
            <User user={user} setUser={setUser} />
          </Route>
          <Route path="/signup">
            <SignUp user={user} setUser={setUser} />
            <p>get ready</p>
          </Route>
          <Route path="/login">
            <Login user={user} setUser={setUser} />
            <Link to="/signup">
              <p>Sign up</p>
            </Link>
          </Route>
          <Route path="/video/:videoId">
            <Video user={user} />
          </Route>
          <Route path="/wall">
            <Wall user={user} />
          </Route>
          <Route path="/email">
            <Email user={user} />
          </Route>
          <Route path="/invite">
            <Invite user={user} />
          </Route>
          <Route path="/map/nsfd78thjsdfksdjknvfwr9">
            <Unlock markerId={0} />
          </Route>
          <Route path="/map">
            <Map user={user} />
          </Route>
          <Route path="/">
            <Home user={user} setUser={setUser} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
