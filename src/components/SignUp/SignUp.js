import './SignUp.css';
import logo from './logo-sm.png';
import Axios from 'axios';
import React,{useState,useEffect,useContext} from 'react';
import { useHistory } from 'react-router-dom';
import emailjs from "emailjs-com";
const branchl=['CSE','ISE','ECE','ME','BT','AE','CVL','CE','EEE','AE','ETE','IE','MDE'];
const branchList=branchl.map((branch)=>
<option value={branch}>{branch}</option>
)
let year=[];
var i;
var y=2000;
for(i=0;i<25;i++)
{
    
    year.push(y+i);
}
const yearList=year.map((year)=>
<option value={year}>{year}</option>
)



function SignUp(){

    const history = useHistory();
    const [email,setEmail] =useState('');
    const [password,setPassword]=useState('')
    const [branch,setBranch]=useState('')
    const [grad_year,setGrad]=useState('')
    const [name,setName] = useState('')
    const [auth,setAuth] = useState(false)
    const [errors,setErrors]=useState([])
    const [vinput,setVinput]=useState('')
    const [vcode,setVcode]=useState('')
    useEffect(async ()=>{//Will be called as soon as the page renders.

        let user_id = localStorage.getItem('userId')
        if(user_id!=null)
        {
          history.push("/");
        }

        
      },[])

    async function authorize()
    {
        await Axios.get('http://localhost:3001/checkEmail/'+email).then(async res =>{
            
            if(res.data.msg==="exists")
            {
                
               setErrors((errors)=>{return [...errors,"Email already exists"]})
               
            }
            if(password.length<5)
            {
              setErrors((errors)=>{return[...errors,"Password must have atleast 5 characters"]})
            }
            else{
            setErrors((errors)=>{
                if(errors.length===0)
                {
                    setAuth(true)
                    generateVcode()
                    
                }
                console.log(errors)
                return errors})
            }
        })
    }
    function generateVcode()
    {

        const chars='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY-+@#$%!'
        var code =''
        for(var i=9;i>=0;i--)
        code+=chars[Math.floor(Math.random()*chars.length)]
        setVcode(code)
        try{
            emailjs.send('service_3euojv4','template_8pz6ix4',{vcode: code,
            email: email
            },'user_xVLWUBQ3KmdpK7j3iL4aL').then(res=>{
                console.log(res)
            })
        }
        catch(e)
        {
            console.log(e)
        }
    }
    async function sendEmail()
    {
        
    }
    const onSubmit = async (e) =>
    {
        e.preventDefault();
        console.log(e.currentTarget)
        setErrors([])
        await authorize()
        
        
        
    }

    async function verifyCode(e)
    {
        e.preventDefault()
        setErrors([])
        console.log("input : "+vinput+" vcode : "+vcode)
        if(vinput==vcode)
        {
            try{
              await Axios.post('http://localhost:3001/signup',{
                email:email,
                name:name,
                password:password,
                branch:branch,
                grad_year:grad_year
            }).then(async res=> {
                    console.log(res.data);
                    if(res.data.msg==="success")
                    {
                    localStorage.setItem('userId',res.data.user_id);
                    history.push("/");
                    }
                    else
                    {
                        alert(res.data.msg)
                    }
                })
            }
    
            catch(e)
            {
                console.log(e)
            }
    
        }
        else
        {
            setErrors(()=>{return["Invalid verification code"]})
        }
    }


return(
    
    <div className="Main-Container-sp">
        <div className="row-form">
            <div className="form-container">
                <div className='cntr'>
            <img src={logo} id="logo"></img>
            </div>
            
            <h4>Sign Up</h4>
            <hr></hr>
            {!auth?
            <form onSubmit={onSubmit}>
                
            <div className='cntr'>
                <input type='text' value = {name} onChange={(e) =>
                    setName(e.currentTarget.value)} placeholder='  Full Name' required></input>
            </div>
            <div className='cntr'>
                <input type='email' name = 'email' value = {email} onChange={(e) =>
                    setEmail(e.currentTarget.value)} placeholder='  Email' required></input>
            </div>
            <div className="cntr">
                <input type='password' value = {password} onChange={(e) =>
                    setPassword(e.currentTarget.value)} placeholder='  Password' required></input>
            </div>
            <div className="cntr">
                <label htmlFor='branch'></label>
                <select name='branch' id='branch' value = {branch} onChange={(e) =>
                    setBranch(e.currentTarget.value)} required>
                    <option value='NONE'>Select Branch</option>
                    {branchList}
                    
                </select>
            </div>
            <div className="cntr">
                <select name='grad_year' id='year' value = {grad_year} onChange={(e) =>
                    setGrad(e.currentTarget.value)} required>
                    <option value='NONE'>Graduation Year</option>
                    {yearList}
                </select>
            </div>
            <div className="cntr">
                <button id="login" >SignUp</button>
            </div>
            </form>:<>
            <div className='cntr'>
                <input type='text' value={vinput} onChange={(e)=>{setVinput(e.currentTarget.value)}} placeholder='  Verification code' required></input>
            </div>
            <div className="cntr">
                <button id="login" onClick = {verifyCode}>Verify</button>
            </div>
            </>}
            <div className="cntr">
                <a href="/login"><button  id="signup" >Have an account? Login</button></a>
            </div>
            {errors.length===0?
    <></>
    :<div>
    {
        errors.map((error)=>
            <div className="error">{error}</div>
        )
    }
    </div>}
        </div>         
    </div>
    
    
    <div className="row-img">

    </div>
</div>
   
)
}
export default SignUp;