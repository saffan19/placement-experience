import './Profile.css';
import axios from 'axios';
import Post from '../Home/post/post';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
function Profile() {
    const id=localStorage.getItem('profile_id');
    //const profileId=localStorage.getItem('profile_id');
    const [Posts, setPosts] = useState([]);
    const [profileData,setProfile]=useState([]);
    const history = useHistory();
    useEffect(() => {//Will be called as soon as the page renders.
        let user_id = localStorage.getItem('userId')
        if(user_id==null)
        {
          history.push("/login");
        }
        const getPosts = async () => {
            const PostsfromServer = await fetchPosts()
            setPosts(PostsfromServer["posts"])

        }
        getPosts();
        ///
        const getProfile=async()=>{
            const res=await fetch('http://localhost:3001/profile/'+id)
            const data = await res.json()
            //const [user]=data.result
            setProfile(data[0])
        }
        getProfile();

    }, [])
    
   
    const fetchPosts = async () => {
        const res = await fetch('http://localhost:3001/getUserPosts/'+id)
        const data = await res.json()
        return data
    }
    console.log(profileData.name)

    function deletePost(e,post)
    {
        e.preventDefault();
        console.log(post.post_id)
        const check=window.confirm("Are you sure you want to delete the post?");

        const url='http://localhost:3001/delete-post/'+post.post_id;
        console.log(url);
        if(check)
        {
            axios.delete(url)
            .then(() => console.log("Deleted!"));
            window.location.reload(true)
        }
        
    }
    return (
        <div className="profile">
            <div className="container">
                {(localStorage.getItem('profile_id')==localStorage.getItem('userId'))?<a href="/EditProfile"><EditIcon id="edit-button"/></a>:<></>}
                <h3>Profile</h3>

                <div className="profile-data">
                    {/*<div id="profile-img"></div>*/}
                    <AccountCircleIcon id="profile-img" />
                    <div id="name">{profileData.name}</div>

                    <div id="branch">BMSCE,{profileData.branch}</div>
                    <div id="year">{Number(profileData.grad_year)-Number(4)}-{profileData.grad_year}</div>
                    <hr className="left"></hr>
                    <div id="desc">
                      {profileData.description}
                    </div>
                    <hr className="left"></hr>
                    <div id="work">
                        Currently working in<br></br>
                        {profileData.company}
                    </div>
                </div>
                <hr className="left"></hr>
                <h4>Posts</h4>
                {/* <div className="post"></div>
            <div className="post"></div>
            <div className="post"></div> */}
                {
                    Posts.map(
                        
                        (post) => 
                        <>
                         {(localStorage.getItem('profile_id')==localStorage.getItem('userId'))?<DeleteIcon className = "deletebutton" onClick={(e)=>deletePost(e,post)}/>:<></>}
                        
                        <Post id ={post.post_id} name={post.name} date={post.date_time} image={post.image_content} text={post.text_content} company={post.company} />
                        </>
                    )
                }

            </div>
        </div>
    )
}

export default Profile