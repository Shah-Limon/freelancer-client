import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate, useParams } from 'react-router-dom';
import auth from '../../../firebase.init';

import './MessageDetails.css';
import BreadcumArea from '../../Shared/BreadcumArea';

const MessageDetails = () => {
    const [providers, setProviders] = useState([]);
    const [client, setClient] = useState([]);
    const [user] = useAuthState(auth);
    const { messageId } = useParams();
    const [message, setMessage] = useState([]);
    const [replies, setReplies] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        fetch(`http://localhost:5000/freelancerprofile?email=${user.email}`)
            .then(res => res.json())
            .then(data => setProviders(data))
    }, [user]);

    useEffect(() => {
        fetch(`http://localhost:5000/clientprofile?clientEmail=${user.email}`)
            .then(res => res.json())
            .then(data => setClient(data))
    }, [user])

    useEffect(() => {
        fetch(`http://localhost:5000/message/${messageId}`)
            .then(res => res.json())
            .then(data => setMessage(data))
    }, []);

    useEffect(() => {
        fetch(`http://localhost:5000/replies`)
            .then(res => res.json())
            .then(result => setReplies(result))
    }, []);

    const handleRead = event => {
        event.preventDefault();
        const messageStatus = event.target.messageStatus.value;
        const status = { messageStatus };
        const url = `http://localhost:5000/message/${messageId}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(status)
        })
            .then(res => res.json())
            .then(result => {
                navigate(`/inbox/${messageId}`);
            })
    };
    const handleUnRead = event => {
        event.preventDefault();
        const messageStatus = event.target.messageStatus.value;
        const status = { messageStatus };
        const url = `http://localhost:5000/message/${messageId}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(status)
        })
            .then(res => res.json())
            .then(result => {

                navigate(`/inbox/${messageId}`);
            })
    };


    const handleReply = event => {
        event.preventDefault();
        const messageId = event.target.messageId.value;
        const providerName = event.target.providerName.value;
        const providerId = event.target.providerId.value;
        const providerEmail = event.target.providerEmail.value;
        const clientName = event.target.clientName.value;
        const clientEmail = event.target.clientEmail.value;
        const clientId = event.target.clientId.value;
        const providerMessage = event.target.providerMessage.value;
        const replied = event.target.replied.value;
        const messageStatus = event.target.messageStatus.value;
        const reply = { messageId, providerName, providerId, providerEmail, clientName, clientId, providerMessage, replied, messageStatus, clientEmail };
        const url = `http://localhost:5000/reply`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(reply)
        })
            .then(res => res.json())
            .then(result => {
                navigate(`/inbox/${messageId}`);
            })
    };
    const handleClientReply = event => {
        event.preventDefault();
        const messageId = event.target.messageId.value;
        const provider = event.target.provider.value;
        const providerId = event.target.providerId.value;
        const providerEmail = event.target.providerEmail.value;
        const client = event.target.client.value;
        const clientEmail = event.target.clientEmail.value;
        const clientId = event.target.clientId.value;
        const clientMessage = event.target.clientMessage.value;
        const replied = event.target.replied.value;
        const messageStatus = event.target.messageStatus.value;
        const reply = { messageId, provider, providerId, providerEmail, client, clientId, clientMessage, replied, messageStatus, clientEmail };
        const url = `http://localhost:5000/reply`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(reply)
        })
            .then(res => res.json())
            .then(result => {

                navigate(`/inbox/${messageId}`);
            })
    };



    return (
       <>
      
       <div className='container mt-5'>
            <h5 className='float-left'><Link as to={'/messages'}><i class="fa-solid fa-circle-arrow-left"></i> Back to inbox</Link></h5>
            <Link to={`/service/${message.serviceId}`}><h5>{message.serviceName}</h5></Link>

            {
                message.whoSent === 'clientSent' &&
                <div>
                    <div className='d-flex'>
                        <h5 className='col-lg-2'>

                            {message.clientName} Says
                        </h5>
                        <p className='mx-3'>
                            {message.clientMessage}
                        </p>

                    </div>
                    <div>
                        <div>
                            <div className='d-flex justify-content-center'>
                                <form onSubmit={handleRead}>
                                    <input hidden value="read" type="text" name="messageStatus" id="" />
                                    <input type="submit" value="Mark Read" />
                                    
                                </form>
                                <form onSubmit={handleUnRead}>
                                    <input hidden value="unRead" type="text" name="messageStatus" id="" />
                                    <input type="submit" value="Mark Unread" />
                                </form>
                            </div>
                        </div>

                        <div>
                            {
                                replies.map(reply => <p>
                                    {
                                        message._id === reply.messageId &&

                                        <div className='d-flex justify-content-between col-lg-8'>
                                            <div className='d-flex'>
                                                <p className='client-name'>{reply.client}</p>
                                                <p>{reply.clientMessage}</p>
                                            </div>
                                            <div className='d-flex'>
                                                <p>{reply.providerMessage}</p>
                                                <p className='provider-name'>{reply.providerName}</p>
                                            </div>

                                        </div>

                                    }


                                </p>)
                            }
                        </div>
                    </div>

                    {
                        providers.length === 1 &&
                        <form onSubmit={handleReply}>
                            <input hidden value={message._id} type="text" name="messageId" id="" />
                            <input hidden value={message.providerName} type="text" name="providerName" id="" />
                            <input hidden value={message.providerId} type="text" name="providerId" id="" />
                            <input hidden value={message.providerEmail} type="text" name="providerEmail" id="" />
                            <input hidden value={message.clientName} type="text" name="clientName" id="" />
                            <input hidden value={message.clientEmail} type="text" name="clientEmail" id="" />
                            <input hidden value={message.clientId} type="text" name="clientId" id="" />
                            <input hidden value="unRead" type="text" name="messageStatus" id="" />
                            <input hidden value='providerReplied' type="text" name="replied" id="" />
                            <textarea name="providerMessage" id="" cols="30" rows="10"></textarea>
                            <input className='btn btn-primary' type="submit" value="Send Message" />
                        </form>
                    }

                    {
                        client.length === 1 &&
                        <form onSubmit={handleClientReply}>
                            <input hidden value={message._id} type="text" name="messageId" id="" />
                            <input hidden value={message.providerName} type="text" name="provider" id="" />
                            <input hidden value={message.providerId} type="text" name="providerId" id="" />
                            <input hidden value={message.providerEmail} type="text" name="providerEmail" id="" />
                            <input hidden value={message.clientName} type="text" name="client" id="" />
                            <input hidden value={message.clientEmail} type="text" name="clientEmail" id="" />
                            <input hidden value={message.clientId} type="text" name="clientId" id="" />
                            <input hidden value="unRead" type="text" name="messageStatus" id="" />
                            <input hidden value='clientReplied' type="text" name="replied" id="" />
                            <textarea name="clientMessage" id="" cols="30" rows="10"></textarea>
                            <input className='btn btn-primary' type="submit" value="Send Message" />
                        </form>
                    }

                </div>

            }


            {
                message.whoSent === 'providerSent' &&
                <div>
                    <div className='d-flex'>
                        <h5 className='col-lg-2'>
                            {message.providerName} Says
                        </h5>
                        <p className='mx-3'>
                            {message.providerMessage}
                        </p>

                    </div>
                    <div>
                        <div>
                            <div className='d-flex justify-content-center'>
                                <form onSubmit={handleRead}>
                                    <input hidden value="read" type="text" name="messageStatus" id="" />
                                    <input type="submit" value="Mark Read" />
                                </form>
                                <form onSubmit={handleUnRead}>
                                    <input hidden value="unRead" type="text" name="messageStatus" id="" />
                                    <input type="submit" value="Mark Unread" />
                                </form>
                            </div>
                        </div>

                        <div>
                            {
                                replies.map(reply => <p>
                                    {
                                        message._id === reply.messageId &&

                                        <div className='d-flex justify-content-between col-lg-8'>
                                            <div className='d-flex'>
                                                <p className='client-name'>{reply.client}</p>
                                                <p>{reply.clientMessage}</p>
                                            </div>
                                            <div className='d-flex'>
                                                <p>{reply.providerMessage}</p>
                                                <p className='provider-name'>{reply.providerName}</p>
                                            </div>

                                        </div>

                                    }


                                </p>)
                            }
                        </div>
                    </div>

                    {
                        providers.length === 1 &&
                        <form onSubmit={handleReply}>
                            <input hidden value={message._id} type="text" name="messageId" id="" />
                            <input hidden value={message.providerName} type="text" name="providerName" id="" />
                            <input hidden value={message.providerId} type="text" name="providerId" id="" />
                            <input hidden value={message.providerEmail} type="text" name="providerEmail" id="" />
                            <input hidden value={message.clientName} type="text" name="clientName" id="" />
                            <input hidden value={message.clientEmail} type="text" name="clientEmail" id="" />
                            <input hidden value={message.clientId} type="text" name="clientId" id="" />
                            <input hidden value="unRead" type="text" name="messageStatus" id="" />
                            <input hidden value='providerReplied' type="text" name="replied" id="" />
                            <textarea name="providerMessage" id="" cols="30" rows="10"></textarea>
                            <input className='btn btn-primary' type="submit" value="Send Message" />
                        </form>
                    }

                    {
                        client.length === 1 &&
                        <form onSubmit={handleClientReply}>
                            <input hidden value={message._id} type="text" name="messageId" id="" />
                            <input hidden value={message.providerName} type="text" name="provider" id="" />
                            <input hidden value={message.providerId} type="text" name="providerId" id="" />
                            <input hidden value={message.providerEmail} type="text" name="providerEmail" id="" />
                            <input hidden value={message.clientName} type="text" name="client" id="" />
                            <input hidden value={message.clientEmail} type="text" name="clientEmail" id="" />
                            <input hidden value={message.clientId} type="text" name="clientId" id="" />
                            <input hidden value="unRead" type="text" name="messageStatus" id="" />
                            <input hidden value='clientReplied' type="text" name="replied" id="" />
                            <textarea name="clientMessage" id="" cols="30" rows="10"></textarea>
                            <input className='btn btn-primary' type="submit" value="Send Message" />
                        </form>
                    }

                </div>

            }

        </div>
       
       </>
    );
};

export default MessageDetails;