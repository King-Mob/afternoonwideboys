import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import {trySignUp, tryLogin} from '../api';

const isValidSignUp = (signUpInfo) => {
    return signUpInfo.password === signUpInfo.passwordConfirm;
}

const SignUp = ({user, setUser}) => {
    const [signUpSuccess, setSignUpSuccess] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [inviteToken, setInviteToken] = useState("");
    const [error, setError] = useState("");


    const handleSubmit = async () => {
        const signUpInfo = {name,email,password,passwordConfirm,token: inviteToken};

        try{
            if(isValidSignUp(signUpInfo)){
                const resultSignUp = await trySignUp(signUpInfo);
                if(resultSignUp.success){
                    const resultLogin = await tryLogin(signUpInfo);
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
        <div>
            {signUpSuccess && <Redirect to="/"/>}
            <p>SignUp</p>
            {user && 
                <p>You are already logged in as {user.name}, signing up will log you out.</p>
            }
            <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="name"></input>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="email address"></input>
            <input value={password} type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="password"></input>
            <input value={passwordConfirm} type="password" onChange={(e)=>setPasswordConfirm(e.target.value)} placeholder="confirm password"></input>
            <input value={inviteToken} onChange={(e)=>setInviteToken(e.target.value)} placeholder="invite code"></input>
            <p onClick={handleSubmit}>Submit</p>
            {error &&
                <p>{error}</p>
            }
        </div>
    )
}

export default SignUp;