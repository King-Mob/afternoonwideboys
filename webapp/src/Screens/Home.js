import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import TextsList from '../components/TextsList';
import NewTextBox from '../components/NewTextBox';
import ItemsBox from '../components/ItemsBox';
import Loading from '../components/Loading';
import {tryGetTexts} from '../api';
import {getCookie, setCookie} from '../utils/cookies';

const Home = ({user,setUser}) => {
    const [texts, setTexts] = useState();
    const [change, setChange] = useState(0);

    const getTexts = async () => {
        const result = await tryGetTexts();

        if(result.success)
            setTexts(result.data);
    }

    const logOut = () => {
        setUser(null);
        setCookie("user","null value", -1);
    }

    useEffect(()=>{
        getTexts();
    },[change]);

    useEffect(()=>{
        const userCookie = getCookie("user");

        if(userCookie)
            setUser(JSON.parse(userCookie));
    },[]);

    return (
        <div className="home-container">
            <div className="home-header">
            {
                user?
                <div>
                    <div className="header-container">
                        <div className="header-items">
                            <ItemsBox userId={user.id} change={change}/>
                        </div>
                        <div className="header-user">
                            <p>Logged in as {user.name}.</p>
                            <p onClick={logOut} className="link-text">Log out</p>    
                        </div>
                   </div>
                    <NewTextBox user={user} change={change} setChange={setChange}/>
                </div>
                :
                <div>
                    <p><Link to="/login">login</Link> or <Link to="/signup">sign up</Link> to create texts</p>
                </div>    
            }
            </div>
            {texts? <TextsList texts={texts}/>: <Loading/>}
        </div>
    )
}

export default Home;