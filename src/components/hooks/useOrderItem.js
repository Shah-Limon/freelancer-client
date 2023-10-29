import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';



const useOrderItem = () => {
    const {serviceId} = useParams();
    const [service, setService] = useState({});

    useEffect( () =>{
        fetch(`http://localhost:5000/service/${serviceId}`)
        .then(res=>res.json())
        .then(data=>setService(data))
    }, []);
    

    return [service];
}

export default useOrderItem;