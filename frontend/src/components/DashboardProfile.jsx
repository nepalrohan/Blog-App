import { Alert, Button, TextInput } from "flowbite-react"
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux"
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from "../firebase";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const DashboardProfile = () => {

    const {currentUser} = useSelector((state)=>state.user);
    const [imagefiles, setImagefiles]= useState(null);
    const [imagefileurl, setimageurl]= useState(null);
    const filePickerRef = useRef();
    const [imageuploadprogress, setprogress] = useState(null);
    const[imageuploaderror, seterrorupload] = useState(null)
    const handleimagechange =(e)=>{
        const file = e.target.files[0];
            if(file){
                setImagefiles(file);
                setimageurl(URL.createObjectURL(file))
            }


    }

useEffect(() => {
  if(imagefiles){
    uploadImage();

  }

 
}, [imagefiles]);

const uploadImage =async()=>{
seterrorupload(null);
    
const storage = getStorage(app);
const fileName = new Date().getTime() + imagefiles.name;
const storageRef =ref(storage, fileName);
const uploadTask = uploadBytesResumable(storageRef, imagefiles);
uploadTask.on(
    'state_changed',
    (snapshot)=>{
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setprogress(progress.toFixed(0))
    },
    (error)=>{
seterrorupload('Could not upload image, file size is larger than 2MB');
setprogress(null)

setImagefiles(null)
setimageurl(null)

    },

    ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
            setimageurl(downloadURL)

        })
    }

)
}


  return (
    <div className="max-w-lg  mx-auto p-3 w-full">
        <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
        <form className="flex flex-col gap-4">
        <input type="file" accept='image/*' onChange={handleimagechange} hidden ref={filePickerRef} />
        <div className='w-32 h-32 self-center relative cursor-pointer shadow-md overflow-hidden rounded-full'
        onClick={()=>{
            filePickerRef.current.click()
        }}
        >
        {imageuploadprogress && <CircularProgressbar value={imageuploadprogress || 0} text={`${imageuploadprogress}%`} 
strokeWidth={5}
styles ={{
    root:{
        width:'100%',
        height:'100%',
        position:'absolute',
        top:0,
        left:0
    },
    path:{
stroke:`rgba(62, 152, 199, ${imageuploadprogress / 100}`
    },
}}

        /> 
        }
        <img src={imagefileurl || currentUser.profilePicture} alt='user' className={`rounded-full w-full h-full border-8 
        border-[lightgray] object-cover ${imageuploadprogress && imageuploadprogress < 100 && 'opacity-60'} `} />

        </div>
        {imageuploaderror &&  <Alert color='failure'>
            {imageuploaderror}
        </Alert>}
        
        

<TextInput  type='text'  id='username' placeholder='username' defaultValue={currentUser.username} />
<TextInput  type='email'  id='email' placeholder='email' defaultValue={currentUser.email} />
<TextInput  type='password'  id='password' placeholder='password'  />

       <Button type='submit' gradientDuoTone='purpleToBlue' outline>
        Update
       </Button> 
        </form>
        <div className="text-red-500 flex justify-between mt-5">
            <span className="cursor-pointer font-semibold hover:text-red-700">Delete Account</span>
            <span className="cursor-pointer font-semibold hover:text-red-700">Sign Out</span>

        </div>
    </div>
  )
}

export default DashboardProfile