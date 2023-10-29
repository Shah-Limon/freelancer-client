import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';

const Test = () => {

    const [user] = useAuthState(auth);
    const [lancer, setLancer] = useState([]);
    useEffect( () =>{
        const url = `http://localhost:5000/freelancerprofile?email=${user.email}`
        fetch(url)
        .then(res=>res.json())
        .then(data=> setLancer(data))
  

    }, [user]);
    return (
        <div>
            <h2>{lancer.length}</h2>
            {
                lancer.map(lance => <div>
                    {lance.name}
                </div>)
            }
        </div>
    );
};

export default Test;