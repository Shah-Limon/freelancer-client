import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AcceptOrReject = () => {
    const { id } = useParams()
    const [myServiceorder, setmyServiceOrder] = useState([]);
    const navigate = useNavigate();



    useEffect(() =>{
        fetch(`http://localhost:5000/myserviceorder/${id}`)
        .then(res=> res.json())
        .then(result=>setmyServiceOrder(result))

    }, []);

    const handleAccept = event =>{
        event.preventDefault();
        const status = event.target.status.value;
        const runningOrFinished = event.target.runningorfinished.value;
        const release = event.target.release.value;
        const updateStatus = {status, release, runningOrFinished};
        const url = `http://localhost:5000/myserviceorder/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateStatus)
        })
        .then(res=>res.json())
        .then(result=>{
            alert('Are You Sure?');
            navigate('/dashboard');
        } )
    };
    const handleReject = event =>{
        event.preventDefault();
        const status = event.target.status.value;
        const refundStatus = event.target.refundStatus.value;
        const updateStatus = {status, refundStatus};
        const url = `http://localhost:5000/myserviceorderrejected/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateStatus)
        })
        .then(res=>res.json())
        .then(result=>{
            alert('Are You Sure You Want to Cancel This Project??');
            navigate('/dashboard');
        } )
    };

    return (
        <div className='container'>
            <h2>{myServiceorder.servicename}</h2>
            <form onSubmit={handleAccept}>
                <input hidden value='accepted' type="text" name="status" id="" />
                <input hidden value='running' type="text" name="runningorfinished" id="" />
                <input hidden value='none' type="text" name="release" id="" />
                <input type="submit" value="Accept Now" />
            </form>
            or
            <form onSubmit={handleReject}>
                <input hidden value='rejected' type="text" name="status" id="" />
                <input hidden value='pending' type="text" name="refundStatus" id="" />
                <input type="submit" value="Reject This Order" />
            </form>
        </div>
    );
};

export default AcceptOrReject;