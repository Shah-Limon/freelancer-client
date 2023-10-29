import React, { useRef } from 'react';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading';
import './Login.css';
import GoogleJoin from './SocialLogin/GoogleJoin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BreadcumArea from '../../Shared/BreadcumArea';

const Login = () => {
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const navigate = useNavigate();
    const location = useLocation();

    let from = location.state?.from?.pathname || '/';

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);

    if (loading || sending) {
        return <Loading></Loading>
    }


    if (user) {
        navigate(from, { replace: true });
    }



    const handleLogin = event => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        signInWithEmailAndPassword(email, password)
    }
    const navigateToSignUp = event => {
        navigate('/signup')
    }

    const resetPassword = async () => {
        const email = emailRef.current.value;
        if (email) {
            await sendPasswordResetEmail(email);
            toast('Sent email');
        }
        else {
            toast('Please Enter Your Correct Email')
        }
    }

    return (
        <>


            {/* <div className='container login-form'>
                <h2 className='text-primary text-center'>Login Now</h2>
                <form onSubmit={handleLogin} className='w-50 mx-auto'>
                    <input ref={emailRef} type="email" name="email" id="" placeholder='Enter Your Email' />
                    <input ref={passwordRef} type="password" name="password" id="" placeholder='Enter Your Password' required />
                    <input type="submit" value="Login Now" />
                </form>
                <p>New to Freelancer? <Link to='/signup' className='text-danger' onClick={navigateToSignUp}>Please Signup Now</Link></p>
                <p>Forgot Password? <button className='btn btn-link text-danger' onClick={resetPassword}>Reset Password</button></p>


            </div> */}
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
                            <div className="card-body p-5 text-center">
                                <form onSubmit={handleLogin}>


                                    <h3 className="mb-5">Sign in</h3>
                                    <div className="form-outline mb-4">
                                        <input
                                            ref={emailRef} type="email" name="email" id="" placeholder='Enter Your Email'
                                            className="form-control form-control-lg"

                                        />

                                    </div>
                                    <div className="form-outline mb-4">
                                        <input
                                            ref={passwordRef} type="password" name="password" id="" placeholder='Enter Your Password' required
                                            className="form-control form-control-lg"

                                        />

                                    </div>
                                    <button className="btn btn-primary btn-lg btn-block" type="submit">
                                        Login
                                    </button>
                                </form>



                                <hr className="my-4" />
                                <p>New to Freelancer? <Link to='/signup' className='text-danger' onClick={navigateToSignUp}>Please Signup Now</Link></p>

                                <hr className="my-4" />

                                <GoogleJoin></GoogleJoin>
                                <hr className="my-4" />
                                <p>Forgot Password? <button className='btn btn-link text-danger' onClick={resetPassword}>Reset Password</button></p>
                                <ToastContainer></ToastContainer>

                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>


    );
};

export default Login;