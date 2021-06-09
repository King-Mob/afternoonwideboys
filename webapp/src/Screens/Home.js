import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import TextsList from '../components/TextsList';
import NewTextBox from '../components/NewTextBox';
import ItemsBox from '../components/ItemsBox';
import Loading from '../components/Loading';
import ChatModal, {ChatButton} from '../components/ChatModal';
import {tryGetTexts, tryGetItems} from '../api';
import {getCookie, setCookie} from '../utils/cookies';

const Home = ({user,setUser}) => {
    const [texts, setTexts] = useState();
    const [items, setItems] = useState();
    const [chatModalVisible, setChatModalVisible] = useState(false);

    const getTexts = async () => {
        const result = await tryGetTexts();

        if(result.success)
            setTexts(result.data);
    }

    const getItems = async () => {
        const result = await tryGetItems(user.id);

        if(result)
            setItems(result);
    }

    useEffect(()=>{
        getTexts()
        const userCookie = getCookie("user");

        if(userCookie)
            setUser(JSON.parse(userCookie));
    },[]);

    useEffect(()=>{
        if(user)
            getItems();
    },[user]);

    const logOut = () => {
        setUser(null);
        setCookie("user","null value", -1);
    }

    return (
        <div className="home-container">
            <div className="home-header">
            {
                user?
                <div>
                    {user && 
                    <ChatModal 
                    visible={chatModalVisible} 
                    closeFunction={()=>setChatModalVisible(false)}
                    user={user}
                    refresh={()=>{getTexts();getItems()}}
                    />
                    }
                    {user &&  
                    <ChatButton openFunction={()=>setChatModalVisible(true)}/>
                    }
                    <div className="header-container">
                        <div className="header-items">
                            <ItemsBox items={items}/>
                        </div>
                        <div className="header-user">
                            <p>Logged in as {user.name}.</p>
                            <p onClick={logOut} className="link-text">Log out</p>    
                        </div>
                   </div>
                    <NewTextBox user={user} refresh={()=>{getTexts();getItems()}}/>
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