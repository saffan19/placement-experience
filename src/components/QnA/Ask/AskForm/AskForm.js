import React from 'react'
import './AskForm.css'
import Axios from 'axios';
import {useState,useEffect} from 'react';
export default function AskForm() {
//
    const id=localStorage.getItem('userId');
    const url="http://localhost:3001/ask-submit";
    const [data,setData]=useState({
      user_id:id,
      question:""
    })
    function handle(e){
        const newData={...data};
        newData[e.target.id]=[e.target.value];
        setData(newData);
        //console.log(newData.question);
    }
    function submit(e)
    {
        e.preventDefault();
        //console.log(data.question[0].length);
        if(data.question[0]!=undefined)
        if(data.question[0].length>30)
        {
            try{
                Axios.post(url,{
                user_id:data.user_id,
                question:data.question
            }).then(res=>{
                    console.log(res.data);
                alert("Posted Question Sucessfully!")
                window.location.reload();
                })
                }
              catch(e)
                {
                    console.log(e)
                }
        }

      else{
          alert("Add more details to the question")
      }
      else{
        alert("No question entered")
      }

    }
    
    return (
        <div className='question-container'>
             <form  className='questionForm' >
             <div className='questionForm-control'>
                
                <textarea onChange={(e)=>handle(e)} placeholder='Write your question' id="question" value={data.question} required />
            </div>
            <input type="submit" onClick={(e)=>submit(e)} value='Add Question' className='qbtn qbtn-block' id='qform-submit'/>

        </form>
        </div>
    )
}
