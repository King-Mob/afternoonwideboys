import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import TextsList from '../components/TextsList';
import ItemsBox from '../components/ItemsBox';
import {tryGetUser, tryGetUserTexts} from '../api';

const User = () => {
    const {userId} = useParams();
    const [userTitle, setUserTitle] = useState();
    const [texts, setTexts] = useState();

    const getUser = async () => {
        const resultUser = await tryGetUser(userId);

        if(resultUser.success){
            setUserTitle(resultUser.data.Name);

            const resultTexts = await tryGetUserTexts(userId);
            setTexts(resultTexts);
        }
    }

    useEffect(()=>{
        getUser();
    },[])

    return (
        <div>
            {userTitle?
                <div>
                    <h2>{userTitle}</h2>
                    <p>{userTitle}'s items:</p>
                    <ItemsBox userId={userId}/>
                </div>
            :
                <h2>no user found</h2>
            }
            
            {texts && <TextsList texts={texts}/>}
        </div>
    )
}

export default User;