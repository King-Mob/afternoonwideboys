import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import { sha256 } from 'js-sha256';
import {tryLogin} from '../api';
import {setCookie} from '../utils/cookies';

const Login = ({user,setUser}) => {
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [result, setResult] = useState("");

    const handleSubmit = async () => {
        const userInfo = {email, password: sha256(password)};

        const result = await tryLogin(userInfo);
        if(result.success){
            setCookie("user",JSON.stringify(result.data),10000);
            setUser(result.data);
            setLoginSuccess(true);
        }
        else
            setResult("failed to log in");
    }

    return (
        <div className="login-container">
            {loginSuccess &&
                <Redirect to="/"/>
            }
            {user && <p>you are already logged in as {user.name}. <Link to="/">Click here</Link> to go back home</p>}
            <input placeHolder="email" value={email} onChange={e=>setEmail(e.target.value)}></input>
            <input value={password} type="password" onChange={e=>setPassword(e.target.value)}></input>
            <p className="login-button" onClick={handleSubmit}>Login</p>
            <p>{result}</p>
        </div>
    )
}

export default Login;