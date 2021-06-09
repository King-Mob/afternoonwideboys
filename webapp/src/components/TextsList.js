import React from 'react';
import {Link} from 'react-router-dom';

const TextsList = ({texts}) => {
    return (
        <div className="texts-container">
             {texts.map(
                 (text,i) => 
                 <div key={i}>
                    <p>{text.Value}
                    {text.Name &&
                        <span> 🤡 <Link to={"/user/"+text.UserCreator}>{text.Name}</Link></span>}</p>
                </div>
                )}
        </div>
    )
}

export default TextsList;