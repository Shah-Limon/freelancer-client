import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import './Signup.css';
import auth from '../../../firebase.init';
import GoogleJoin from './SocialLogin/GoogleJoin';
import Loading from '../../Shared/Loading';

const SignUp = () => {
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);
  const navigate = useNavigate();



  const navigateToLogin = () => {
    navigate('/login')
  }

  if (user) {
    navigate('/')
  }

  if (loading || updating) {
    return <Loading></Loading>
  }

  const handleSignup = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    await createUserWithEmailAndPassword(email, password);
    await updateProfile({ displayName: name });
    navigate('/setup');
  }

  return (
    <>


      {/* <div className='register-form  mx-auto'>
            <h2>Join Now</h2>
            <form onSubmit={handleSignup} className='w-50 mx-auto'>
                <input type="email" name="email" id="" placeholder='Enter Your Email' required />
                <input  type="password" name="password" id="" placeholder='Enter Your Password' required />
                <input type="submit" value="Join Now" />
            </form>
            <p>Already Have an Account? <Link to='/login' className='text-danger' onClick={navigateToLogin}>Please Login Now</Link></p>
            <GoogleJoin></GoogleJoin>
        </div> */}

      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
              <div className="card-body p-5 text-center">
                <h3 className="mb-5">Join Now</h3>
                <form onSubmit={handleSignup}>
                  <div className="form-outline mb-4">
                    <input
                     type="email" name="email" id="" placeholder='Enter Your Email' required
                      className="form-control form-control-lg"
                    />

                  </div>
                  <div className="form-outline mb-4">
                    <input
                       type="password" name="password" id="" placeholder='Enter Your Password' required
                      className="form-control form-control-lg"
                    />

                  </div>

                  <button className="btn btn-primary btn-lg btn-block" type="submit">
                  Register
                  </button>

                </form>
                <hr className="my-4" />
                <p>Already Have an Account? <Link to='/login' className='text-danger' onClick={navigateToLogin}>Please Login Now</Link></p>
                <hr className="my-4" />
                <GoogleJoin></GoogleJoin>

              </div>
            </div>
          </div>
        </div>
      </div>



    </>
  );
};

export default SignUp;