import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';



const PostReviewAsaClient = () => {
    const [myOrders, setmyOrders] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();


        useEffect(() => {
            const url = `http://localhost:5000/myorder/${id}`
            fetch(url)
                .then(res => res.json())
                .then(data => setmyOrders(data));
    
        }, [id]);
    

        const handleReviews = event => {
            event.preventDefault();
            
            const rate = event.target.rate.value;
            const review = event.target.review.value;
            const reviewStatus = event.target.reviewdone.value;
            const reviewData = {rate, review, reviewStatus};
        const url = `http://localhost:5000/myreviewfororder/${id}`
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(reviewData)
        })
            .then(res => res.json())
            .then(result => {
                console.log('Connected', result);
                navigate('/dashboard');
            })
    };

   


    return (
        <div className='container'>
            <h5>You are Posting Review for: {myOrders.servicename}</h5>
            <h5>Provider Email: {myOrders.providerName}</h5>
            <form onSubmit={handleReviews}>
                <select name="rate" id="">
                    <option>1 Star</option>
                    <option>2 Star </option>
                    <option>3 Star</option>
                    <option>4 Star</option>
                    <option>5 Star</option>
                </select>
                <input hidden value='done' type="text" name="reviewdone" id="" />
                <textarea name="review" id="" cols="30" rows="10" placeholder='write short review'></textarea>
                <input type="submit" value="Post Now" />
            </form>
        </div>
    );
};

export default PostReviewAsaClient;