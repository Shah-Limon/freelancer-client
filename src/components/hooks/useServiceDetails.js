import  { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const useServiceDetails = () => {
    const [user] = useAuthState(auth);
    const [userServices, setUserServices] = useState([]);

    useEffect(() =>{
        if(user){
            const url = `http://localhost:5000/userservice?email=${user?.email}`
        fetch(url)
        .then(res=>res.json())
        .then(data=> setUserServices(data))
        }
    },[user])
    return [userServices];
}

export default useServiceDetails;