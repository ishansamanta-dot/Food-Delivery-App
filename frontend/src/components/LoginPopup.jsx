
import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/frontend_assets/assets'
import {StoreContex} from '../contex/StoreContex'
import axios from 'axios'

const LoginPopup = ({ setShowLogin }) => {

  const {url,setToken} =useContext(StoreContex) 

  const [currState, setCurrState] = useState('Login')
  const [data,setData]=useState({
    name:"",
    email:"",
    password:""    
  })

  const onChangeHandler = (event)=>{
    const name=event.target.name
    const value=event.target.value
    setData(data=>({...data,[name]:value}))
  }

  const onLogin =async (e) =>{
    e.preventDefault()
    let newUrl=url
    if(currState==="Login"){
      newUrl+="/api/user/login"
    }
    else{
      newUrl+="/api/user/register"
    }

    const response= await axios.post(newUrl,data)
        if(response.data.success){
      setToken(response.data.token)
      localStorage.setItem("token",response.data.token)
      setShowLogin(false)
    }
    else{
      alert(response.data.message)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
      <form
        onSubmit={onLogin}
        className="animate-fade-up w-full max-w-md rounded-2xl border border-white/10 bg-[#1c1c1c] p-6 text-sm text-gray-300 shadow-2xl sm:p-8"
      >
        <div className="mb-7 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">{currState}</h2>

          <button
            type="button"
            onClick={() => setShowLogin(false)}
            className="rounded-full p-2 transition hover:bg-white/10"
          >
            <img className="w-4" src={assets.cross_icon} alt="Close" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {currState === 'Login' ? null : (
            <input
              className="w-full rounded-lg border border-white/10 bg-[#111111] p-3 text-white outline-none transition placeholder:text-gray-500 focus:border-orange-500"
              type="text"
              name='name'
              onChange={onChangeHandler}
              value={data.name}
              placeholder="Your name"
              required
            />
          )}

          <input 
            className="w-full rounded-lg border border-white/10 bg-[#111111] p-3 text-white outline-none transition placeholder:text-gray-500 focus:border-orange-500"
            type="email"
            name='email'
            onChange={onChangeHandler}
            value={data.email}
            placeholder="Your email"
            required
          />

          <input 
            className="w-full rounded-lg border border-white/10 bg-[#111111] p-3 text-white outline-none transition placeholder:text-gray-500 focus:border-orange-500"
            type="password"
            name='password'
            onChange={onChangeHandler}
            value={data.password}
            placeholder="Password"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-orange-600 p-3 font-semibold text-white transition hover:bg-orange-500"
        >
          {currState === 'Sign Up' ? 'Create account' : 'Login'}
        </button>

        <div className="mt-4 flex items-start gap-2 text-xs leading-5 text-gray-400">
          <input className="mt-1 accent-orange-500" type="checkbox" required />
          <p>
            By continuing, you agree to our terms of use and privacy policy.
          </p>
        </div>

        <p className="mt-6 text-sm text-gray-400">
          {currState === 'Login'
            ? 'Create a new account? '
            : 'Already have an account? '}

          <span
            className="cursor-pointer font-semibold text-orange-500 hover:text-orange-400"
            onClick={() =>
              setCurrState(currState === 'Login' ? 'Sign Up' : 'Login')
            }
          >
            {currState === 'Login' ? 'Click here' : 'Login here'}
          </span>
        </p>
      </form>
    </div>
  )
}

export default LoginPopup
