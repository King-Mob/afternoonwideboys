import React from 'react';
import {Link} from 'react-router-dom';

const Comment = ({comment}) => 
    <div className="comment-container">
        <p className="comment">
            {comment.Value} 🤡 <Link to={`../../user/${comment.UserCommenter}`}>{comment.Name}</Link>
        </p>
    </div>;

const InteractionsList = ({interactions, time}) => {
    const comments = interactions.filter(comment => comment.TimelinePosition < time);

    return (
        <div className="interactions-container">
                    {comments.map((comment,i) => 
                        <Comment key={i} comment={comment}/>
                    ).reverse()}
        </div>
    )
};

export default InteractionsList;