import React, { useState } from 'react'
import { Header } from './Header'

const Login = () => {

  const [isToggeledSignIn, setToggeled] = useState(true);

  const toggleSign = () => {
    setToggeled(!isToggeledSignIn);
  }
  return (
    <div className="relative w-screen h-screen">
      {/* Background image */}
      <img
        alt="background"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        className="absolute w-full h-full object-cover"
      />

      {/* Overlay gradient */}
      <div className="absolute w-full h-full bg-black bg-opacity-60"></div>

      {/* Header logo positioned on top */}
      <Header />

      {/* Centered login form */}
      <form className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-60 p-8 rounded">
        <h1 className='pt-4 pb-4 text-white block text-2xl'>{ isToggeledSignIn ? 'Sign In' : 'Sign Up'}</h1>
        { !isToggeledSignIn &&
        <input type="text"  className="block w-72 p-3 mb-4 rounded bg-gray-800 text-white placeholder-gray-400"
        placeholder='Full Name'/>}
        <input
          className="block w-72 p-3 mb-4 rounded bg-gray-800 text-white placeholder-gray-400"
          type="text"
          placeholder="Email"
        />
        <input
          className="block w-72 p-3 mb-4 rounded bg-gray-800 text-white placeholder-gray-400"
          type="password"
          placeholder="Password"
        />
        <button
          className="w-72 p-3 bg-red-600 text-white rounded hover:bg-red-700"
          type="submit"
        >
          { isToggeledSignIn ? 'Sign In' : 'Sign Up'}
        </button>
        <p className='text-white p-4 text-xs hover:cursor-pointer' onClick={ () => toggleSign()}>{ isToggeledSignIn ? 'Already Existing user? Sign In' : ' New to netflix? Sign Up'}</p>
      </form>
    </div>
  )
}

export default Login