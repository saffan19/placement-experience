import React from 'react'
import './ashareForm.css'
import Axios from 'axios';

import {useState,useEffect} from 'react';
export default function ShareForm({question_id}) {
//
    // const { question_id } = useParams();
    const id=localStorage.getItem('userId');
    const url="http://localhost:3001/answerSubmit";
    const [data,setData]=useState({
      user_id:id,
      answer:"",
      question_id:question_id
    })
    function handle(e){
        const newData={...data};
        newData[e.target.id]=[e.target.value];
        setData(newData);
        console.log(newData.question);
    }
    function submit(e)
    {
        e.preventDefault();
        console.log('EEEEEEEEEEEEEEEEEEEEEEEEE')

        
        
      if(data.answer[0]!=undefined)
      if(data.answer[0].length>30)
      {
        try{
            Axios.post(url,{
            user_id:data.user_id,
            answer:data.answer,
            question_id:data.question_id,
        }).then(res=>{
                console.log(res.data);
            alert("Answered Sucessfully!")
            window.location.reload();
            })
            }
          catch(e)
            {
                console.log(e)
            }
      }
      else{
        alert("Insufficient answer")
      }
      else{
        alert("Enter answer")
      }

    }
    
    return (
        <div className='aform-container'>
             <form  className='ashareForm' >
             <div className='ashareForm-control'>
                
                <textarea onChange={(e)=>handle(e)} placeholder='Write your answer' id="answer" value={data.answer} required />
            </div>
            {/* <div className='shareForm-control'>
              
                <input onChange={(e)=>handle(e)} type="url" placeholder='Thumbnail/Image url' id='image_content' value={data.image_content}
                
                />
            </div> */}
            {/* <div className='shareForm-control'>
              
                <input onChange={(e)=>handle(e)} type="text" placeholder='Company Name' id='company' value={data.company} required />
            </div> */}

            {/*
            <div className='shareForm-control shareForm-control-check'>
                <label>Full Time</label>

                <input type="checkbox"
               
                />
            </div>
            */}
            <input type="submit" onClick={(e)=>submit(e)} value='Add Answer' className='abtn abtn-block' id='aform-submit'/>

        </form>
        </div>
    )
}
