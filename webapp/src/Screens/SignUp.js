import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import {trySignUp, tryLogin} from '../api';
import {setCookie} from '../utils/cookies';

const isValidSignUp = (signUpInfo) => {
    return (    
        signUpInfo.password === signUpInfo.passwordConfirm 
        && signUpInfo.name 
        && signUpInfo.email 
        && signUpInfo.token
    );
}

const SignUp = ({user, setUser}) => {
    const [signUpSuccess, setSignUpSuccess] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [inviteToken, setInviteToken] = useState("");
    const [error, setError] = useState("");

    const signUpInfo = {
        name,
        email,
        password: sha256(password),
        passwordConfirm: sha256(passwordConfirm),
        token: inviteToken
    };

    const handleSignUp = async () => {
        try{
            if(isValidSignUp(signUpInfo)){
                const resultSignUp = await trySignUp(signUpInfo);
                if(resultSignUp.success){
                    const resultLogin = await tryLogin(signUpInfo);
                    setCookie("user",JSON.stringify(resultLogin.data),10000);
                    setUser(resultLogin.data);
                    setSignUpSuccess(true);
                }
                else
                    setError(resultSignUp.errorMessage);
            }
            else
                setError("passwords not matched")
        }
        catch(e){
            setError(e.toString());
        }
    }

    return (
        <div className="login-container">
            {signUpSuccess && <Redirect to="/"/>}
            {user && 
                <p>You are already logged in as {user.name}, signing up will log you out.</p>
            }
            <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="name"></input>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="email address"></input>
            <input value={password} type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="password"></input>
            <input value={passwordConfirm} type="password" onChange={(e)=>setPasswordConfirm(e.target.value)} placeholder="confirm password"></input>
            <input value={inviteToken} onChange={(e)=>setInviteToken(e.target.value)} placeholder="invite code"></input>
            <p className="login-button" style={{opacity: isValidSignUp(signUpInfo)?1:0.5}}onClick={handleSignUp}>Sign up</p>
            {error &&
                <p>{error}</p>
            }
        </div>
    )
}

export default SignUp;