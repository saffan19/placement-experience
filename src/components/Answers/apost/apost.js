import React from 'react'
import './apost.css';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {MoreVert} from '@material-ui/icons';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import {useState,useEffect} from 'react';
export default function APost({user_id,answer,question_id}) {
    const [Name,setName] = useState('');
    useEffect(()=>{//Will be called as soon as the page renders.
        /*********/   
                const getName=async()=>{
                    
                    const res=await fetch('https://pe-exp-api.herokuapp.com/getUser/'+user_id)
                    const data=await res.json()
                
                    setName(data.name)  
                }
                getName();
        /********/
        
              },[])
    return (
        <div className="apost">
            <div className="apostWrapper">
            
            <div className="apostTop">
            <a href='/profile' onClick={()=>{
                localStorage.setItem('profile_id',user_id)
            }}>
                <div className="apostTopLeft">
                <AccountCircleIcon style={{fontSize:50}}className="apostProfileImage"/>
                <span className="apostUsername">{Name}</span>
                </div>
            </a>
            </div>

            <div className="apostCenter">

                
                <div className="apostContent">
               
                   {answer}
               
                </div>
            </div>
            </div>
        </div>
    )
}
