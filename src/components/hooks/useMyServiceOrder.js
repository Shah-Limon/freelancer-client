import  { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';



const useMyServiceOrder = () => {
    const [user] = useAuthState(auth);
    const [myServiceOrder, setMyServiceOrder] = useState({});

    useEffect( () =>{
        const url = `http://localhost:5000/myorder?email=${user.email}`
        fetch(url)
        .then(res=>res.json())
        .then(data=> setMyServiceOrder(data));

    }, [])
    

    return [myServiceOrder];
}

export default useMyServiceOrder;