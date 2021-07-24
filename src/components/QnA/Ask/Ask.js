import React from 'react'
import "./Ask.css";
import {PermMedia} from "@material-ui/icons"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import {useState,useEffect} from 'react';
import AskForm from './AskForm/AskForm';
export default function Ask() {
    const [expanded,setExpanded] = useState(false);
    
    const toggleExpanded = ()=>
    {
      setExpanded(!expanded)
    }


    return (
        <div className="ask">
            <div className="askWrapper">
            <div className="askTop">
                 {/* <img className = "askProfileImg" src="/assets/image1.jpg" alt=""/>  */}
                {/* <input 
                placeholder="Ask Question"
                type="text" className = "askInput" /> */}
                <h6>Ask Question</h6>
                
            </div>
            <hr className="askHr"/>
            <div className="askBottom">
            <div className="askOptions">
                <PermMedia />
                <span></span>
            </div>
            
            {
            
                expanded?
                <AskForm />

            :<></>

            }

            {
                !expanded?<ExpandMoreIcon onClick={()=>{toggleExpanded()}}className="askExpand"/>
                : <ExpandLessIcon onClick={()=>{toggleExpanded()}} className="askExpand"/>
}
            </div>
            </div>
            
        </div>
    )
}
