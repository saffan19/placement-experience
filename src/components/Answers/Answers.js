import React from 'react';
import './Answers.css';
import axios from 'axios';
import AShare from './ashare/ashare'//Share
import APost from './apost/apost';//Post
import { useParams } from 'react-router-dom';
import {useState,useEffect} from 'react';

function Answers(){
    const [Postsa,setPostsa] = useState([]);


/**********************/
    const { question_id } = useParams();
    const [Qdata,setQuestion] = useState([]);
/**********************/
    useEffect(()=>{//Will be called as soon as the page renders.
/*********/   
        const getQuestion=async()=>{
            const res=await fetch('https://pe-exp-api.herokuapp.com/getSingleQuestion/'+question_id)
            const data = await res.json()
            //const [user]=data.result
            setQuestion(data[0])
            console.log(data[0])
        }
        getQuestion();
/********/

        const getPostsa = async () => {
            const PostsfromServer = await fetchPostsa()
            console.log(PostsfromServer)
            setPostsa(PostsfromServer["posts"])
            
          }
           getPostsa();

      },[])
        
      const fetchPostsa = async() =>{
        const res = await fetch('https://pe-exp-api.herokuapp.com/getAnswers/'+question_id)
        const data = await res.json()
        return data
        }


console.log("Number of ANSWERS:")
// console.log(Postsa.posts)
console.log(Postsa.length)

    return(
        <div className="ans-container">
            <div className="quest">
                <p>
                {Qdata.question}
                </p>
            </div>
            <AShare question_id={question_id}/>
            <div className='ans-title'>{Postsa.length} Answers:</div>
            {  
          Postsa.map(
                (ans) =><APost user_id={ans.user_id} answer={ans.answer} question_id={ans.question_id} />
            )
            
            }


        </div>
    )
}
export default Answers