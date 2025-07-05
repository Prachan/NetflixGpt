import React, { useRef, useState } from 'react'
import { Header } from './Header'
import { validateLogon } from '../utils/validateLogin';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/fireBase';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {

  const [isToggeledSignIn, setToggeled] = useState(true);
  const email = useRef(null);
  const password = useRef(null);
  const name= useRef(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSign = () => {
    setToggeled(!isToggeledSignIn);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateLogon(email.current.value, password.current.value);
    if(validation.isValid) {
      if(isToggeledSignIn) {
        //SignIn
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
          navigate('/browse');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setMessage(errorCode + "-" + errorMessage);
        });
      } else {
        //SignUp
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value, photoURL: "https://images.pexels.com/photos/12462434/pexels-photo-12462434.jpeg"
          }).then(() => {
            // Profile updated!
            const { email, uid, displayName, photoURL} = auth.currentUser;
            dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
            navigate('/browse');

          }).catch((error) => {
            // An error occurred
            setMessage(error.message);
          });
          setToggeled(true);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setMessage(errorCode + "-" + errorMessage);
        });
      }
      setMessage(null);
    } else {
      if(validation.errors.userName) {
        setMessage(validation.errors.userName);
      } else {
        setMessage(validation.errors.password);
      }
    }
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
        <input ref={name} type="text"  className="block w-72 p-3 mb-4 rounded bg-gray-800 text-white placeholder-gray-400"
        placeholder='Full Name'/>}
        <input
          className="block w-72 p-3 mb-4 rounded bg-gray-800 text-white placeholder-gray-400"
          type="text"
          ref={email}
          placeholder="Email"
        />
        <input
          className="block w-72 p-3 mb-4 rounded bg-gray-800 text-white placeholder-gray-400"
          type="password"
          ref={password}
          placeholder="Password"
        />
        { message && <p className="w-72 p-3 text-red-500 text-xs"> {message}</p>}
        <button
          className="w-72 p-3 bg-red-600 text-white rounded hover:bg-red-700"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          { isToggeledSignIn ? 'Sign In' : 'Sign Up'}
        </button>
        <p className='text-white p-4 text-xs hover:cursor-pointer' onClick={ () => toggleSign()}>{ !isToggeledSignIn ? 'Already Existing user? Sign In' : ' New to netflix? Sign Up'}</p>
      </form>
    </div>
  )
}

export default Login