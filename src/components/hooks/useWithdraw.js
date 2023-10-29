import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';



const useWithdraw = () => {
    const {id} = useParams();
    const [withdraw, setWithdraw] = useState({});

    useEffect( () =>{
        fetch(`http://localhost:5000/freelancer/${id}`)
        .then(res=>res.json())
        .then(data=>setWithdraw(data))
    }, []);
    

    return [withdraw];
}

export default useWithdraw;