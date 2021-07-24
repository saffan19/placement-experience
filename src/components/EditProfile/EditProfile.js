import './EditProfile.css';
import Axios from 'axios';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useState, useEffect,useRef } from 'react';
import { SettingsInputAntenna } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
const branch=['CSE','ISE','ECE','ME','BT','AE','CVL','CE','EEE','AE','ETE','IE','MDE'];
const branchList=branch.map((branch)=>
<option value={branch}>{branch}</option>
)


function EditProfile()
{
    const history = useHistory()

    const id=localStorage.getItem('userId');
    const [profileData,setProfile]=useState([]);
    useEffect(() => {
        const getProfile=async()=>{
            const res=await fetch('https://pe-exp-api.herokuapp.com/profile/'+id)
            const data = await res.json()
            setProfile(data[0])
        }
        getProfile();
    },[])
    const url="https://pe-exp-api.herokuapp.com/profile-edit/"+id;


    function handle(e){
        const newData={...profileData};
        newData[e.target.id]=[e.target.value];
        setProfile(newData)
    }

    function submit(e)
    {
        e.preventDefault();
        try{
            Axios.post(url,{
            name:profileData.name,
            grad_year:profileData.grad_year,
            branch:profileData.branch,
            description:profileData.description,
            company:profileData.company,
        }).then(res=>{
                console.log(res.data);
            alert("Updated Sucessfully!")
            history.push("/profile");
            })
            }
          catch(e)
            {
                console.log(e)
            }
      }


    return(
        <div className="eprofile">
            <div className="econt">
                <h3>Edit Profile</h3>
                <form>
                <div className="row">
                    <AccountCircleIcon id="profile-img" />
                </div>
                <div className="row">
                    <input type="text" value={profileData.name} name="name" id="name" onChange={(e)=>handle(e)} placeholder="Full Name">
                    </input>
                </div>
                <div className="row">
                    <input type="text" value={profileData.grad_year} name="grad_year" id="grad_year" onChange={(e)=>handle(e)} placeholder="Graduation Year">
                    </input>
                </div>
                <div className="row">
                    {/* <input type="text" value={profileData.branch} name="branch" id="branch" onChange={(e)=>handle(e)} placeholder="Branch"></input> */}
                    <select id='branch' onChange={(e)=>handle(e)}>
                        <option value={profileData.branch}>{profileData.branch}</option>
                        {branchList}
                    </select>
                </div>
                <div className="row">
                    <textarea type="text" value={profileData.description} name="description" id="description"onChange={(e)=>handle(e)} placeholder="Description">
                    </textarea>
                </div>
                <div className="row">
                    <input type="text" value={profileData.company} name="company" id="company" onChange={(e)=>handle(e)} placeholder="Company">
                    </input>
                </div>
                <input type='submit' onClick={(e)=>submit(e)} value="Save" id="save-button"></input>
                
                </form>
            </div>
            
        </div>
    )
}


export default EditProfile