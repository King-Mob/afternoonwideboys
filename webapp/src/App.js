import './App.css';
import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Screens/Home';
import User from './Screens/User';
import SignUp from './Screens/SignUp';
import Login from './Screens/Login';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Link to="/"><h1 className="title">afternoonwideboys</h1></Link>
          <Switch>
            <Route path="/user/:userId">
              <User user={user} setUser={setUser} />
            </Route>
            <Route path="/signup">
              <SignUp user={user} setUser={setUser}/>
              <p>get ready</p>
            </Route>
            <Route path="/login">
              <Login user={user} setUser={setUser}/>
              <Link to="/signup"><p>Sign up</p></Link>
            </Route>
            <Route path="/">
              <Home user={user} setUser={setUser}/>
            </Route>
          </Switch>
        </header>
    </div>
    </Router>
  );
}

export default App;
