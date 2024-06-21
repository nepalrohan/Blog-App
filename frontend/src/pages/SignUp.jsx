import { Button, Label, TextInput } from 'flowbite-react'
import {Link} from 'react-router-dom'
const SignUp = () => {
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
<form className='felx felx-col gap-4 '>
  <div>
    <Label value='Username' />
    <TextInput
    type='text'
    placeholder=' Enter username'
    id='username' />
  </div>
  <div>
    <Label value='Email' />
    <TextInput
    type='email'
    placeholder='Enter email'
    id='email' />
  </div>
  <div>
    <Label value='Password' />
    <TextInput
    type='password'
    placeholder='Enter password'
    id='password' />
  </div>
  <Button className='w-full mt-4' gradientDuoTone='purpleToPink' type='submit' >Sign Up</Button>

</form>
<div className='flex gap-2 text-sm mt-5'>
  <span>Have an account?</span>
  <Link to='/sign-in' className='text-blue-500'>Sign In</Link>
</div>

        </div>
      </div>
    </div>
  )
}

export default SignUp