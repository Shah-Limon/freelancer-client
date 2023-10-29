import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, useParams } from 'react-router-dom';
import auth from '../../../firebase.init';
import BreadcumArea from '../../Shared/BreadcumArea';

const Requirement = () => {
    const [user] = useAuthState(auth);
    const { id } = useParams()
    const [providers, setproviders] = useState([]);
    const [myServiceorder, setmyServiceOrder] = useState([]);
    const navigate = useNavigate();




    useEffect(() => {
        fetch(`http://localhost:5000/freelancerprofile?email=${myServiceorder.provideremail}`)
            .then(res => res.json())
            .then(review => setproviders(review))
    }, [providers]);

    useEffect(() => {
        fetch(`http://localhost:5000/myserviceorder/${id}`)
            .then(res => res.json())
            .then(result => setmyServiceOrder(result))

    }, []);

    const confirmRequirementOne = event => {
        event.preventDefault();
        const requirement = event.target.updateRequirement.value;
        const providerReq = event.target.reqUpdated.value;
        const requirementStatus = { requirement, providerReq };
        const url = `http://localhost:5000/myserviceorderrequirement/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(requirementStatus)
        })
            .then(res => res.json())
            .then(result => {
                alert('Are You Sure You Understood?');
                navigate(`/dashboard`);
            })
    };
    const confirmRequirementTwo = event => {
        event.preventDefault();
        const requirement = event.target.updateRequirement.value;
        const providerReq = event.target.reqUpdated.value;
        const requirementStatus = { requirement, providerReq };
        const url = `http://localhost:5000/myserviceorderrequirement/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(requirementStatus)
        })
            .then(res => res.json())
            .then(result => {
                alert('Are You Sure You Understood?');
                navigate(`/dashboard`);
            })
    };
    const clientUpdated = event => {
        event.preventDefault();
        const requirement = event.target.requirement.value;
        const reqUpdated = event.target.reqUpdated.value;
        const clientRequirementStatus = { requirement, reqUpdated };
        const url = `http://localhost:5000/clientorderrequirement/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(clientRequirementStatus)
        })
            .then(res => res.json())
            .then(result => {
                alert('Are You Sure You Understood?');
                navigate(`/dashboard`);
            })
    };

    return (
       <>
     
        <div className='container'>
            <h5>{myServiceorder.servicename}</h5>
            <div className=''>
                <div>
                    <h5> Client: {myServiceorder.clientName}</h5>
                    <p>{myServiceorder.requirement}</p>
                    <p>{myServiceorder.clientUpdated}</p>
                </div>
                <div>
                    <h5>{myServiceorder.providerName}</h5>
                    <p>{myServiceorder.providerSaid}</p>
                </div>

            </div>


            {
                providers.map(provider => provider.email === user.email && <>

                    <div className='d-flex justify-content-center'>
                        <form onSubmit={confirmRequirementOne}>
                            <input hidden value='providerrequpdated' type="text" name="reqUpdated" id="" />
                            <textarea hidden value="Thank you. I am starting" name="updateRequirement" id="" cols="30" rows="10"></textarea>
                            <input type="submit" value="Thank you. I am starting" />
                        </form>
                        <form onSubmit={confirmRequirementTwo}>
                            <input hidden value='providerrequpdated' type="text" name="reqUpdated" id="" />
                            <textarea hidden value="Need More Information" name="updateRequirement" id="" cols="30" rows="10"></textarea>
                            <input type="submit" value="Need More Information" />
                        </form>
                    </div>

                </>)

            }

            {
                providers.map(provider => provider.email !== user.email && <>

                    <form onSubmit={clientUpdated}>
                    <input hidden value="requpdated" type="text" name="reqUpdated" id="" />
                    <textarea name="requirement" id="" cols="30" rows="10" placeholder='Your Requirement' required></textarea>
                        <input type="submit" value="Update" />
                    </form>

                </>)

            }


        </div></>
    );
};

export default Requirement;