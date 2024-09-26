import React, { useEffect , useState} from 'react'
import "./UpdateProfile.css";
import FormImg from "../../assets/FormImg.png"
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../../features/users/loadUserApi';
import { ClearUpdateProfileError, updateProfile } from '../../features/users/updateProfileApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
function UpdateProfile() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {error, isUpdated, loading}=useSelector((state)=>state.Profile);
  const {isAuthenticated, user}=useSelector((state)=>state.User);
  const [avatarPreview, setAvatarPreview]=useState(user.user.avatar.url);
  const [avatar, setAvatar]=useState("");
  const [name, setName]=useState(user.user.name);
  const [email, setEmail]=useState(user.user.email);
   
  useEffect(()=>{
 if(error){
toast.error(error);
dispatch(ClearUpdateProfileError());
 }

  },[error, dispatch]);
  const AvatarChange = (event) => {
    const reader = new FileReader();

    reader.onload = () => {
        // Handle the result (e.g., setAvatar or any other logic)
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
    };

    reader.readAsDataURL(event.target.files[0]);
};
if(isUpdated){
  navigate("/account");
  location.replace(location.href);
   toast.success("Profile Updated");
}

 const handleEmail=(event)=>{
  setEmail(event.target.value);
 }

 const handleName=(event)=>{
  setName(event.target.value);
 }

 const handleFormSubmit=(event)=>{
  event.preventDefault();

  dispatch(updateProfile({email, name, avatar}));
  
 }


  return (
   <> 
   <title>Trendy Update Profile</title>
   { loading?<Loader/>:
    <> <div className=' max-w-screen-2xl container  md:px-20 px-4 flex flex-col md:flex-row  ' id='TopDiv'>
    <div className="UpdateForm w-1/2 mt-12  order-2 mb-16" >
      
      <h1 className='text-4xl' id='UpdateHeading'>Update Profile</h1>
      <form onSubmit={handleFormSubmit} encType='mutipart/form-data' >
      <label className="input input-bordered flex items-center gap-2 UpdateInput mt-6">
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 16 16"
  fill="currentColor"
  className="h-4 w-4 opacity-70">
  <path
    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
  <path
    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
</svg>
<input type="text" className="grow" placeholder="Email*" name='email' value={email} onChange={handleEmail}/>
</label>
<label className="input input-bordered flex items-center gap-2 mt-4 UpdateInput">
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 16 16"
  fill="currentColor"
  className="h-4 w-4 opacity-70">
  <path
    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
</svg>
<input type="text" className="grow" placeholder="Username*" name='name' value={name} onChange={handleName}/>
</label>

<label>Change Profile Image</label>
<label className=" flex mt-1 UpdateInput  mb-4" id="UpdateFileInput">
<img src={avatarPreview} alt="" className='h-12 w-12' />
<input type="file" className="file-input w-full" name='avatar' accept='image/*' onChange={AvatarChange} />
</label>
  
  {loading?<span className="loading loading-spinner loading-md"></span>:
    <button className='btn w-40 text-white bg-blue-600 hover:bg-blue-500 mt-8' id="Updatebutton" >Save Changes</button>
  }
    </form>
    </div>
    <div className='w-full md:w-1/2 ' id='UpdateImageDiv' >
       <img src={FormImg} alt="" id='UpdateImage'/>
    </div>
    </div>
  </>
}
  </>
  )
}

export default UpdateProfile