import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const useMyService = () => {
    const [user] = useAuthState(auth);
    
    return (
        <div>
            
        </div>
    );
};

export default useMyService;