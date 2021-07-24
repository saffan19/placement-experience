import './Login.css';
import logo from './logo-sm.png'
import React,{useState,useEffect,useContext} from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import {GlobalContext} from '../../Store';
function Login(){
    const history = useHistory();
    const [userId,setUserId] = useContext(GlobalContext);
    const [email,setEmail] =useState('');
    const [password,setPassword]=useState('')

    useEffect(async ()=>{//Will be called as soon as the page renders.

        let user_id = localStorage.getItem('userId')
        if(user_id!=null)
        {
          history.push("/");
        }
        
        
      },[])

    const onSubmit = async (e) =>
    {
        e.preventDefault();
        console.log("request")
        
        try{
            Axios.post('http://localhost:3001/login',{
            email:email,
            password:password
        }).then(async res=> {
                console.log(res.data.msg);
                if(res.data.msg==="success")
                {
                
                setUserId(res.data.user_id)
                localStorage.setItem('userId',res.data.user_id);
                history.push("/");
                }
                else
                {
                    alert("Wrong email or password")
                }
            })
        }
        catch(e)
        {
            
            console.log(e)
            
        }
        
        
        

        
    }

return(
    
 <div className="Main-Container">
        <div className="row-form">
            <div className="form-container">
                <div className='cntr'>
            <img src={logo} id="logo"></img>
            </div>
                <h4>Sign In</h4>
                <hr></hr>
                <div className='cntr'>
                <input type='text'  placeholder='  Email'
                value = {email} onChange={(e) =>
                    setEmail(e.currentTarget.value)
                    }></input>
                </div>
                <div className="cntr">
                <input type='password' placeholder='  Password'
                value = {password} onChange={(e) =>
                    setPassword(e.currentTarget.value)//set the value of text to whatever is typed 
                    }></input>
                </div>
                <div className="cntr">
                <span>Forgot Password?</span>
                </div>
                <div className="cntr">
                <button  id="login" onClick = {onSubmit}>Login</button>
                </div>
                <div className="cntr">
                <a href="/signup"><button  id="signup" href="/signup">SignUp</button></a>
                </div>
            </div>         
        </div>
        <div className="row-img">

        </div>
    </div>
   
)
}
export default Login;