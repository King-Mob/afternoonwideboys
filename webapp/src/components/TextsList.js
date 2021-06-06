import React from 'react';
import {Link} from 'react-router-dom';

const TextsList = ({texts}) => {
    return (
        <div>
             {texts.map(
                 (text,i) => 
                 <div key={i}>
                    <p>{text.Value}</p>
                    {text.Name &&
                         <p>- <Link to={"/user/"+text.UserCreator}>{text.Name}</Link></p>
                    }
                </div>
                )}
        </div>
    )
}

export default TextsList;