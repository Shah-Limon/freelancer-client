import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const useFreelancer = () =>{
    const [user] = useAuthState(auth);
    const [myDatas, setmyDatas] = useState([]);
    useEffect( () =>{
        const url = `http://localhost:5000/freelancerprofile?email=${user.email}`
        fetch(url)
        .then(res=>res.json())
        .then(data=> setmyDatas(data));
  

    }, [user]);
    return [myDatas];
}

export default useFreelancer;
