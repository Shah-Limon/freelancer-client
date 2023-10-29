import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BreadcumArea from '../../Shared/BreadcumArea';

const CompleteOrder = () => {
    const { id } = useParams();
    const [cancel, setCancel] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`http://localhost:5000/myorder/${id}`)
            .then(res => res.json())
            .then(result => setCancel(result))
    }, [])

    const handleComplete = event => {
        event.preventDefault();
        const runningOrFinished = event.target.runningorfinished.value;
        const updateStatus = { runningOrFinished };
        const url = `http://localhost:5000/myorder/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateStatus)
        })
            .then(res => res.json())
            .then(result => {
                alert('Are You Sure You Want to Complete?');
                navigate('/dashboard');
            })
    };

    return (
        <>
       
        <div>
            {cancel.status === 'accepted' && <div>
                <h2>You are Completing This Service: {cancel.servicename}</h2>

                <form onSubmit={handleComplete}>
                    <input hidden value='completed' type="text" name="runningorfinished" id="" />
                    <input type="submit" value="Complete This project Now" />
                </form>
            </div>}
        </div>
        </>
    );
};

export default CompleteOrder;