import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading';

const AdminRequireAuth = ({children}) => {
    const location = useLocation();
    const [user, loading] = useAuthState(auth);
    if(loading){
        return <Loading></Loading>
    }
    if(!user){
        return <Navigate to='/admin/login' state={{from: location}} replace />;
    }

    return children;
    
};

export default AdminRequireAuth;