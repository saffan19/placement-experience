import React from 'react'
import './Questions.css';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {MoreVert} from '@material-ui/icons';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
// import { Link } from 'react-router-dom';
// import Answers from '../Answers/Answers.js';
import {Route,Link} from 'react-router-dom';

export default function Questions({question,question_id}) {
    // <Route exact path="/Answers" render={(props)=><Answers q_id={question_id}/>}/>
    return (
        <div className="question">
            <Link to={`/Answers/${question_id}`}>
            <div className="questionWrapper">
            
            {/* <div className="questionTop">
                <div className="questionTopLeft">
                <AccountCircleIcon style={{fontSize:50}}className="questionProfileImage"/>
                {/* <span className="questionUsername">{name}</span>
                <span className="questionDate">{date}</span> 
                </div> 
                {/* <div className="postTopRight">

                    <MoreVert/>

                </div>
                
            </div> 
            */}

            <div className="questionCenter">
                {/* <img src={image} 
                alt="" className="postImage"/> */}
                
                <div className="questionContent">
                   {question}
                </div>
            
            
            
            
            </div>
            {/* <div className="postBottom">
            <div className="postBottomLeft">
            <FavoriteIcon  className="postLike"/>
            {/* <ChatBubbleIcon className="postComment"/> */}
            {/* <span className="postLikeCounter">10</span>
            </div>
            <div className="postBottomRight">
                <span className="postCommentText">9 comments</span>
            </div>


            </div>
                */}
            </div> 
            </Link>
        </div>
    )
}
