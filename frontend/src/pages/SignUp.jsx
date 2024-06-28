import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react';
import OAuth from '../components/OAuth';
const SignUp = () => {

  const [formData, setFormData] =useState({
    email:'',
    password:'',
  username:''
  });


  const navigate = useNavigate();
  const [errormessage, seterrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleChange = (e)=>{
setFormData({...formData, [e.target.id]: e.target.value.trim()});
  }


  const handleSubmit = async (e)=>{
e.preventDefault();
if(!formData.email || !formData.username || !formData.password){
  return seterrorMessage('Please fill all fields');
}
try {
  setLoading(true);
  seterrorMessage(null);
  const res = await fetch('/api/auth/signup',{
    method:'POST',
    headers:{'Content-Type': 'application/json'},
    body:JSON.stringify(formData)
  })
  const data = await res.json();
if(data.sucess === false){
  return seterrorMessage(data.message)

}

// loading
setLoading(false)
if(res.ok){
  navigate('/sign-in');
}
} 
catch (error) {
  seterrorMessage(error.message)
  setLoading(false)
}
  }

  return (
    <div className="min-h-screen mt-20">
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className='flex-1'>
{/* for left side */}
<Link to='/' className=' sm:text-xl font-bold dark:text-white text-4xl'>
    <span className="px-2 text-white py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg">Blog</span>
    .com
</Link>
<p className='text-sm mt-5'>
  Blog.com, a modern web service to publish your blogs and articles worldwide. Sign up now!
</p>
        </div>

        <div className='flex-1'>
{/* for right side */}
<form className='felx felx-col gap-4 '  onSubmit={handleSubmit}>
  <div>
    <Label value='Username' />
    <TextInput
    type='text'
    placeholder=' Enter username'
    id='username'
    onChange={handleChange}
     />
  </div>
  <div>
    <Label value='Email' />
    <TextInput
    type='email'
    placeholder='Enter email'
    id='email'
    onChange={handleChange}
     />
  </div>
  <div>
    <Label value='Password' />
    <TextInput
    type='password'
    placeholder='Enter password'
    id='password'
    onChange={handleChange}
     />
  </div>
  <Button className='w-full mt-4' gradientDuoTone='purpleToPink'
   type='submit'
   disabled={loading}
   >
   {
loading ? (
<>
<Spinner size='sm' />
<span className='pl-3'>Loading....</span>
</>
): 'Sign Up'
   }
   </Button>
   <OAuth/>

</form>
<div className='flex gap-2 text-sm mt-5'>
  <span>Have an account?</span>
  <Link to='/sign-in' className='text-blue-500'>Sign In</Link>
</div>
{errormessage && (
<Alert className='mt-5' color='failure'>
{errormessage}
</Alert>
)}

        </div>
      </div>
    </div>
  )
}

export default SignUp