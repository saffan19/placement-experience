import React from 'react'
import "./ashare.css";
import {PermMedia} from "@material-ui/icons"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import {useState,useEffect} from 'react';
import AShareForm from './ashareForm/ashareForm';
export default function AShare({question_id}) {
    const [expanded,setExpanded] = useState(false);
    
    const toggleExpanded = ()=>
    {
      setExpanded(!expanded)
    }


    return (
        <div className="ashare">
            <div className="ashareWrapper">
            <div className="ashareTop">
                 <img className = "ashareProfileImg" src="/assets/image1.jpg" alt=""/> 
                {/* <input 
                placeholder="Add Answer"
                type="text" className = "ashareInput" /> */}
                <h6 className="ashareInput">Add Answer</h6>
            </div>
            <hr className="ashareHr"/>
            <div className="ashareBottom">
            <div className="ashareOptions">
                <PermMedia />
                <span></span>
            </div>
            
            {
            
                expanded?
                <AShareForm question_id={question_id}/>

            :<></>

            }

            {
                !expanded?<ExpandMoreIcon onClick={()=>{toggleExpanded()}}className="ashareExpand"/>
                : <ExpandLessIcon onClick={()=>{toggleExpanded()}} className="ashareExpand"/>
}
            </div>
            </div>
        </div>
    )
}


