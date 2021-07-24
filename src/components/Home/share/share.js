import React from 'react'
import "./share.css";
import {PermMedia} from "@material-ui/icons"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import {useState,useEffect} from 'react';
import ShareForm from './shareForm/shareForm';

export default function Share() {
    const [expanded,setExpanded] = useState(false);
    
    const toggleExpanded = ()=>
    {
      setExpanded(!expanded)
    }


    return (
        <div className="share">
            <div className="shareWrapper">
            <div className="shareTop">
                 <img className = "shareProfileImg" src="/assets/image1.jpg" alt=""/> 
                {/* <input 
                placeholder="Add Post"
                type="text" className = "shareInput" /> */}
                <h6 className="shareInput">Add Post</h6>
                
            </div>
            <hr className="shareHr"/>
            <div className="shareBottom">
            <div className="shareOptions">
                <PermMedia />
                <span></span>
            </div>
            
            {
            
                expanded?
                <ShareForm />

            :<></>

            }

            {
                !expanded?<ExpandMoreIcon onClick={()=>{toggleExpanded()}}className="shareExpand"/>
                : <ExpandLessIcon onClick={()=>{toggleExpanded()}} className="shareExpand"/>
}
            </div>
            </div>
        </div>
    )
}


