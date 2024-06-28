import { Button } from "flowbite-react"
import { AiFillGoogleCircle } from "react-icons/ai"
import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth'
import {useDispatch} from 'react-redux'
import {signInsucess} from '../redux/user/userSlice'
import {app} from '../firebase'
import {useNavigate} from 'react-router-dom'
const OAuth = () => {

const auth = getAuth(app)
const dispatch = useDispatch();
const navigate = useNavigate();
    const handlegoogleCLick = async()=>{
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({prompts: 'select_account'})
        try{
const resultfromgoogle = await signInWithPopup(auth, provider)
const res= await fetch ('/api/auth/google', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
        name:resultfromgoogle.user.displayName,
        email:resultfromgoogle.user.email,
        googlePhotoUrl: resultfromgoogle.user.photoURL,
    })
})
const data = await res.json();
if(res.ok){
    dispatch(signInsucess(data));
    navigate('/');
}

}

        catch (error){
console.log(error)
        }
    }
  return (
   <Button className="w-full mt-4" type='button' gradientDuoTone='pinkToOrange' outline 
   onClick={handlegoogleCLick}>
    <AiFillGoogleCircle  />
    Continue with Google
   </Button>
  )
}

export default OAuth