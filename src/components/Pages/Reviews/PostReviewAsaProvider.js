import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';



const PostReviewAsaProvider = () => {
    const [myServiceOrders, setMyServiceOrders] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const url = `http://localhost:5000/myserviceorder/${id}`
        fetch(url)
            .then(res => res.json())
            .then(data => setMyServiceOrders(data));

    }, [id]);


    const handleReviews = event => {
        event.preventDefault();
        const providerReviewStatus = event.target.providerReviewStatus.value;
        const providerrate = event.target.providerrate.value;
        const providerreview = event.target.providerreview.value;
        const review = { providerrate, providerreview, providerReviewStatus };
        const url = `http://localhost:5000/myreviewformyservice/${id}`
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(review)
        })
            .then(res => res.json())
            .then(result => {
                console.log('Connected', result);
                navigate('/');
            })
    };

    return (
        <div className='container'>
            <h2>You are Posting Review for: {myServiceOrders.serviceId}</h2>
            <h2>Customer Email: {myServiceOrders.customeremail}</h2>
            <form onSubmit={handleReviews}>
                <input hidden value='done' type="text" name="providerReviewStatus" id="" />
                <select name="providerrate" id="">
                    <option>1 Star</option>
                    <option>2 Star </option>
                    <option>3 Star</option>
                    <option>4 Star</option>
                    <option>5 Star</option>
                </select>
                <textarea name="providerreview" id="" cols="30" rows="10" placeholder='write short review'></textarea>
                <input type="submit" value="Post Now" />
            </form>
        </div>
    );
};

export default PostReviewAsaProvider;