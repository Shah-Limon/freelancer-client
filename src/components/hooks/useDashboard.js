import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const useDashboard = () =>{
    const [user] = useAuthState(auth);
    const [dashboards, setDashboards] = useState([]);

    useEffect( ()=>{
        const url = `http://localhost:5000/freelancerprofile?email=${user.email}`
        fetch(url)
        .then(res=>res.json())
        .then(data=>setDashboards(data))
    }, []);
    return [dashboards]
}

export default useDashboard;