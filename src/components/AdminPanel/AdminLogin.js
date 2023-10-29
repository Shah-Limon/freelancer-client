import React, { useRef } from 'react';
import {  useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import {  useLocation, useNavigate } from 'react-router-dom';
import './AdminLogin.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import BreadcumArea from '../Shared/BreadcumArea';

const AdminLogin = () => {
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const navigate = useNavigate();
    const location = useLocation();

    let from = location.state?.from?.pathname || '/admin';

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);


      if(loading){
        return <Loading></Loading>
    }


      if(user){
          navigate('/admin');
      }

     

    const handleLogin = event => {
        event.preventDefault();
        const email = emailRef.current.value;  
        const password = passwordRef.current.value;  
        signInWithEmailAndPassword(email, password)     
    }
   
    
    return (
       <>
        
        <div className='container login-form'>
            <h2 className='text-primary text-center'>Admin Login</h2>
            <form onSubmit={handleLogin} className='w-50 mx-auto'>
                <input  ref={emailRef} type="email" name="email" id="" placeholder='Enter Your Email' required />
                <input  ref={passwordRef} type="password" name="password" id="" placeholder='Enter Your Password' required />
                <input  type="submit" value="Login Now"  />
            </form>
            <ToastContainer></ToastContainer>
        </div></>
        
    );
};

export default AdminLogin;