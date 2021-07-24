import './App.css';
import {useState,useEffect} from 'react';
import NavBar from './components/NavBar/NavBar';
import Login from './components/Login/Login'
import Profile from './components/Profile/Profile';
import EditProfile from './components/EditProfile/EditProfile';
import SignUp from './components/SignUp/SignUp';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import QnA from './components/QnA/QnA';
import {Route,Link} from 'react-router-dom';
import Home from './components/Home/Home';
import Answers from './components/Answers/Answers'
import Store from './Store';


function App() {
  

  return (
    <Store>
    <div className="app">
    <NavBar/> 
    <Route exact path="/" component={Home}/>
    <Route exact path="/QnA" component={QnA}/>
    <Route exact path="/login" component={Login}/>
    <Route exact path="/signup" component={SignUp}/>
    <Route exact path="/profile" component={Profile}/>
    <Route exact path="/EditProfile" component={EditProfile}/>
    <Route exact path="/Answers/:question_id" component={Answers}/>
    
    </div>
    </Store>
  );
}

export default App;

