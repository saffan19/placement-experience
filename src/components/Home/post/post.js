import React from 'react'
import './post.css';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {MoreVert} from '@material-ui/icons';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import {useState,useEffect} from 'react';
import Axios from 'axios';
export default function Post({id,name,date,image,text,company,user_id}) {
   
    const [liked,setLiked] = useState(false)
    const [reactions,setReactions] = useState([])
    const [likeCounter,setLikeCounter]=useState(0)
   
    useEffect(async()=>{//Will be called as soon as the page renders.
       
       async function getReactions()
        {
        
        fetchReactions()
    }
    getReactions()
      },[]) 
   const fetchReactions = async ()=>
   {
       
    await Axios.get("https://pe-exp-api.herokuapp.com/getReactions/"+id).then((response)=>{
    var i=0    
        console.log(response.data.reactions)
        if(response.data.msg==="successful")
        {
            setReactions(response.data.reactions)
            console.log(reactions)
            
            for (i of response.data.reactions)
            {
                
                
                console.log(i)
                if(i["upvote"]==1)
                {
                    setLikeCounter((likeCounter)=>{
                        return likeCounter+1
                    })
                    if(i["user_id"]==localStorage.getItem('userId'))
                    {
                        setLiked(true)
                    }
                }
            }
        }
        else
        {
            alert("Error")
        }
    })
   }
   const onToggleLike = ()=>
   {
       
       const formdata = new FormData()
       /*formdata.append("user_id",localStorage.getItem('userId'))
       formdata.append("post_id",id)
       console.log(formdata)*/
       if(!liked)
       {
        Axios.post("https://pe-exp-api.herokuapp.com/addLike",{
            user_id:localStorage.getItem('userId'),
            post_id:id
        }).then((response)=>
        {
            console.log(response)
            if(response.data.msg==="successful")
            {
                setLiked(!liked)
                setLikeCounter(likeCounter+1)
            }
            else
            {
                alert("failed")
            }

        });
    }
    else
    {   
    Axios.post("https://pe-exp-api.herokuapp.com/removeLike",{
        user_id:localStorage.getItem('userId'),
        post_id:id
    }).then((response)=>
        {
            console.log(response)
            if(response.data.msg==="successful")
            {
                setLiked(!liked)
                setLikeCounter(likeCounter-1)
            }
            else
            {
                alert("failed")
            }
        });
        
    }
   }
    return (
        <div className="post">
            <div className="postWrapper">
            <a href='/profile' onClick={()=>{
                localStorage.setItem('profile_id',user_id)
            }}>
            <div className="postTop">
                <div className="postTopLeft">
                <AccountCircleIcon style={{fontSize:50}}className="postProfileImage"/>
                <span className="postUsername">{name}</span>
                <span className="postDate">{date}</span>
                </div>
                {/* <div className="postTopRight">

                    <MoreVert/>

                </div> */}
            </div>
            </a>

            <div className="postCenter">
                <img src={image} 
                alt="" className="postImage"/>
                
                <div className="postContent">
                   {text}
                </div>
            
            
            
            
            </div>
            <div className="postBottom">
            <div className="postBottomLeft">
            <FavoriteIcon onClick={()=>{onToggleLike()}} style={{ color: liked ? 'indianred' : 'black' }} className="postLike"/>
            {/* <ChatBubbleIcon className="postComment"/> */}
            <span className="postLikeCounter">{likeCounter}</span>
            </div>
            {/* <div className="postBottomRight">
                <span className="postCommentText">9 comments</span>
            </div> */}


            </div>

            </div>
        </div>
    )
}
