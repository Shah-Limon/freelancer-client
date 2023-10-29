import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';



const RequestReleasePayment = () => {
    const [myRelease, setMyRelease] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();


        useEffect(() => {
            const url = `http://localhost:5000/myorder/${id}`
            fetch(url)
                .then(res => res.json())
                .then(data => setMyRelease(data));
    
        }, [id]);
    

        const handleReviews = event => {
            event.preventDefault();
            const releaseAmount = event.target.releaseamount.value;
            const release = event.target.release.value;
            const releaseStatus = {release, releaseAmount};
        const url = `http://localhost:5000/releasepayment/${id}`
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(releaseStatus)
        })
            .then(res => res.json())
            .then(result => {
                console.log('Connected', result);
                navigate('/dashboard');
            })
    };

    return (
        <div>
            <h2>You are Requesting : ${myRelease.serviceprice} USD</h2>
            <h2>Provider Email: {myRelease.customeremail}</h2>
            <form onSubmit={handleReviews}>
                <input hidden value='requested' type="text" name="release" id="" />
                <input hidden value={myRelease.serviceprice} type="number" name="releaseamount" id="" />
                <input type="submit" value="Request Payment Now" />
            </form>
        </div>
    );
};

export default RequestReleasePayment;