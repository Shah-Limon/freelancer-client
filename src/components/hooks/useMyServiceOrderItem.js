import  { useEffect, useState } from 'react';




const useMyServiceOrderItem = () => {
    const [serviceOrder, setServiceOrder] = useState({});


    useEffect( () =>{
        const url = `http://localhost:5000/myserviceorder?provideremail=${serviceOrder.provideremail}`
        fetch(url)
        .then(res=>res.json())
        .then(info=> setServiceOrder(info));

    }, []);
    

    return [serviceOrder];
}

export default useMyServiceOrderItem;