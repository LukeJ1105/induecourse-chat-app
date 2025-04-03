import React, { useState } from 'react'
import CorseIcon from '../assets/corseicon.gif'
import { Loader2, Lock, Mail } from 'lucide-react'
import ShowHideInput from '../components/ShowHideInput'
import InputLabel from '../components/InputLabel'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom'

const LoginPage = () => {

  

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const validateForm = () => {
    if(!formData.email.trim()) return toast.error('Email required!')
    if(!formData.password) return toast.error('Password required!')
    return true;
  }
  const {isLoggingIn, login} = useAuthStore();
  const handleSubmit = (e) =>{
    console.log(formData)
    e.preventDefault();
    const success = validateForm()
    if(success === true) login(formData);
  }

 


  return (
    <div className='min-h-screen min-w-full grid lg:grid-cols-2'>

      <div className="flex flex-col justify-center items-center p-6 ">
        <div className='w-full max-w-md space-y-8 bg-tier2'>
          <div className='flex flex-col items-center gap-2 group'>

            <h1 className='text-[48px] font-bold mt-2 font-mono font-stretch-expanded tracking-wide motion-safe:animate-pulse' >In Due Course...</h1>
            <div className="text-xs rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <img src={CorseIcon} alt="" />

            </div>
            <p className='text-base-content/60 motion-safe:animate-bounce'>Live Chat and RPG Experience</p>

          </div>

        </div>
      </div>


      <div className="flex flex-col justify-center items-center p-6 ">
        <div className='w-full max-w-md space-y-8 bg-tier2'>
          <div className='flex flex-col items-center gap-2 group'>
            <div className="text-xs rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <img src={CorseIcon} alt="" />

            </div>
            <h1 className='text-2x1 font-bold mt-2'>Welcome Back...</h1>
            <p className='text-base-content/60'>Login</p>
          </div>
          <form onSubmit={handleSubmit} className='space-y-8 flex flex-col justify-center items-center'>
            <InputLabel
              name="Email"
              placeholder="Email"
              icon={Mail}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              type="email"
              value={formData.email} />
            <ShowHideInput
              name="Password"
              placeholder="Password"
              icon={Lock}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              value={formData.password} />
            <button

              className='bg-transparent hover:bg-tier1 text-tier1 font-semibold hover:text-white py-2 px-4 border border-white-500 hover:border-transparent rounded'
              disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                  <Loader2 className='size-5 anime-spin' />
                  ...Loading
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <div className='text-center'>
            <p className='text-base-content/60'>
              New Coursen?
              <Link to="/signup" className='text-tier4'>
                Get registered first
              </Link>
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default LoginPage
