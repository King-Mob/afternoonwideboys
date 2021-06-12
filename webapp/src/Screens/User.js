import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import ContentsList from '../components/ContentsList';
import ItemsBox from '../components/ItemsBox';
import {tryGetUser, tryGetUserContents, tryGetItems} from '../api';
import {mergeContents} from '../utils/contents';

const User = () => {
    const {userId} = useParams();
    const [userTitle, setUserTitle] = useState();
    const [contents, setContents] = useState();
    const [items, setItems] = useState();

    const getUser = async () => {
        const resultUser = await tryGetUser(userId);

        if(resultUser.success){
            setUserTitle(resultUser.data.Name);

            const resultContents = await tryGetUserContents(userId);
            setContents(mergeContents(resultContents.data));
        }
    }

    const getItems = async () => {
        const result = await tryGetItems(userId);

        if(result)
            setItems(result);
    }

    useEffect(()=>{
        getUser();
        getItems();
    },[])

    return (
        <div>
            {userTitle?
                <div>
                    <h2>{userTitle}</h2>
                    <p>{userTitle}'s items:</p>
                    <ItemsBox items={items}/>
                </div>
            :
                <h2>no user found</h2>
            }
            
            {contents && <ContentsList contents={contents}/>}
        </div>
    )
}

export default User;