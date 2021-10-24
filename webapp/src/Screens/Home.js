import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import ContentsList from '../components/ContentsList';
import NewContentBox from '../components/NewContentBox';
import ItemsBox from '../components/ItemsBox';
import Loading from '../components/Loading';
import ChatModal, {ChatButton} from '../components/ChatModal';
import {tryGetContents, tryGetItems} from '../api';
import {setCookie} from '../utils/cookies';

const Home = ({user,setUser}) => {
    const [contents, setContents] = useState();
    const [items, setItems] = useState();
    const [chatModalVisible, setChatModalVisible] = useState(false);
    const [replyToType, setReplyToType] = useState(0);
    const [replyToId, setReplyToId] = useState(0);
    const [replyToItem, setReplyToItem] = useState();

    const getContents = async () => {
        const result = await tryGetContents();

        if(result.success)
            setContents(result.data);
    }

    const getItems = async () => {
        const result = await tryGetItems(user.id);

        if(result)
            setItems(result);
    }

    useEffect(()=>{
        getContents();
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
                    refresh={()=>{getContents();getItems()}}
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
                            <p>set <Link to="/wall">the wall</Link></p>    
                        </div>
                   </div>
                    <NewContentBox 
                        user={user} 
                        refresh={()=>{getContents();getItems()}}
                        replyToType={replyToType}
                        replyToId={replyToId}
                        replyToItem={replyToItem}
                        resetReply={()=>{setReplyToId(0);setReplyToType(0)}}
                    />
                </div>
                :
                <div>
                    <p><Link to="/login">login</Link> or <Link to="/signup">sign up</Link> to add posts</p>
                </div>    
            }
            </div>
            {contents? 
                <ContentsList 
                    contents={contents}
                    setReplyToId={setReplyToId}
                    setReplyToType={setReplyToType}
                    setReplyToItem={setReplyToItem}
                />
            : 
                <Loading/>
            }
        </div>
    )
}

export default Home;