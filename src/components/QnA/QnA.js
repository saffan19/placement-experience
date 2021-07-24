import React from 'react';
import axios from 'axios';
import ShareQ from './Ask/Ask';//share
import Questionp from './Questions/Questions'//post
import {useState,useEffect} from 'react';
import './QnA.css';
import { useHistory } from 'react-router-dom';

function QnA(){
    const [Questions,setQuestions] = useState([]);
    const history = useHistory();
    useEffect(()=>{//Will be called as soon as the page renders.
      let user_id = localStorage.getItem('userId')
      if(user_id==null)
      {
        history.push("/login");
      }
        const getQuestions = async () => {
          const QuestionsfromServer = await fetchQuestions()
          console.log(QuestionsfromServer)
          setQuestions(QuestionsfromServer["questions"])
        }
         getQuestions();
         console.log("AAAAAAA")
         console.log(Questions)
      },[])
      const fetchQuestions = async() =>{
        const res = await fetch('https://pe-exp-api.herokuapp.com/get-questions')
        const data = await res.json()
        return data
      }
    return(
        <div className="questions-page">
            <ShareQ/>
            <div className="question-title">{Questions.length} Questions</div>
            {
            Questions.map(
              
                (qn) =><Questionp question={qn.question} question_id={qn.question_id} />
            )
}
            

        </div>
    )
}
export default QnA;