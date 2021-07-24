import React,{ useContext } from 'react';
import axios from 'axios';
import './Home.css';
import Share from './share/share'
import Post from './post/post';
import {useState,useEffect} from 'react';
import NavigavtionBar from '../NavBar/NavBar';
import Store from '../../Store';
import { GlobalContext } from '../../Store'
import { useHistory } from 'react-router-dom';
import FilterListIcon from '@material-ui/icons/FilterList';

const branchl=['ALL','CSE','ISE','ECE','ME','BT','AE','CVL','CE','EEE','AE','ETE','IE','MDE'];
const branchList=branchl.map((branch)=>
<option value={branch}>{branch}</option>
)

function Home() {
    const [branch,setBranch]=useState('')
    const history = useHistory();
    const [Posts,setPosts] = useState([]);
    const[selectedBranch,setSelect]=useState('');
    const [userId,setUserId] = useContext(GlobalContext);
    useEffect(async()=>{//Will be called as soon as the page renders.
        let user_id = localStorage.getItem('userId');

        if(user_id==null)
        {
          history.push("/login");
        }
        const getPosts = async () => {
          const PostsfromServer = await fetchPosts()
          console.log(PostsfromServer)
          setPosts(PostsfromServer["posts"])
          
        }
        setSelect(localStorage.getItem('branch'))
         getPosts();
        
      },[])

      const fetchPosts = async() =>{
        var branchName=localStorage.getItem('branch')
        if(branchName==='')branchName='ALL'
        console.log(branchName)
        const res = await fetch('https://pe-exp-api.herokuapp.com/getPosts/'+branchName)
    const data = await res.json()
    return data
        
    }
    function applyFilter()
    {
      localStorage.setItem('branch',(branch!=='')?branch:'ALL')
      window.location.reload();
      
      
    }
console.log(Posts)
    return (
        <>
        
        <div className="home">
            

            <Share />
            <div className="filter-row">
   
            
            <div className="filter">
                <label htmlFor='branch'></label>
                <select name='branch' id='branch' value = {branch} onChange={(e) =>
                    setBranch(e.currentTarget.value)} required>
                    <option value={(selectedBranch!=='')?selectedBranch:'ALL'}>{(selectedBranch!=='')?selectedBranch:'ALL'}</option>
                    {branchList}
                    
                </select>
            </div>
            <div className="filter">
            <FilterListIcon onClick={applyFilter}/>
            </div>
            </div>

          {  
          Posts.map(
                (post) =><Post id ={post.post_id} name={post.name} date={post.date_time} image = {post.image_content} text ={post.text_content} company={post.company} user_id={post.user_id} />
            )
            
            }
            {/* <Post />
            <Post />
            <Post />
            <Post />
            <Post />
     */}
   
            
        </div>
    </>  
    )
}

export default Home;
