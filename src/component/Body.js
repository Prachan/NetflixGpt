import React, { useEffect } from 'react';
import Login from './Login';
import Browse from './Browse';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';

const Body = () => {
    const appRoute = createBrowserRouter([
        {
            path: "/",
            element: <Login/>
        },
        {
            path: "/browse",
            element: <Browse/>
        }
    ]);
    const dispacth = useDispatch();
    useEffect(()=> {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const { email, uid, displayName, photoURL} = user;
            dispacth(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
        } else {
        // User is signed out
            dispacth(removeUser());
        }
        });
    },[]);
  return (
    <div>
        <RouterProvider router= {appRoute}/>
    </div>
  )
}

export default Body