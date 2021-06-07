import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import TextsList from '../components/TextsList';
import NewTextBox from '../components/NewTextBox';
import ItemsBox from '../components/ItemsBox';
import Loading from '../components/Loading';
import {tryGetTexts} from '../api';

const Home = ({user,setUser}) => {
    const [texts, setTexts] = useState();
    const [change, setChange] = useState(0);

    const getTexts = async () => {
        const result = await tryGetTexts();

        if(result.success)
            setTexts(result.data);
    }

    useEffect(()=>{
        getTexts();
    },[change]);

    return (
        <div>
            <div>
            {
                user?
                <div>
                    <p>Your items:</p>
                    <ItemsBox userId={user.id} change={change}/>
                    <p>Logged in as {user.name}</p>
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