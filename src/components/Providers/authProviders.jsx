import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth"
import app from '../Firebase/firebase.config';

  export const authContext = createContext(null);
  const auth = getAuth(app)

const authProviders = ({children}) => {
 const [user,setUser] = useState(null);
 const createUser = (email,password) => {
    return createUserWithEmailAndPassword(auth,email,password);
 }

    const signIn = (email,password) => {
        return signInWithEmailAndPassword(auth,email,password);
    }

    const logOut = () => {
        return signOut(auth)
    }

    // observe user auth state
    useEffect( () => {
      const unsubscribe =  onAuthStateChanged(auth,currentUser => {
            setUser(currentUser)
        });
        // Stop observing while unmounting 
        return () => {
            return unsubscribe();
        }
    },[])

    const authInfo = {
            user,
            createUser,
            signIn,
            logOut
    }
    return (

        <authContext.Provider value={authInfo}>
            {children}
        </authContext.Provider>
        // <AuthContext.Provider value ={authInfo}>
        //         {children}
        // </AuthContext.Provider>
    );
};

export default authProviders;