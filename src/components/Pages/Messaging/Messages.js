import React, { useEffect } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../../firebase.init';
import './Messages.css';
import BreadcumArea from '../../Shared/BreadcumArea';

const Messages = () => {
    const [user] = useAuthState(auth);
    const [providers, setProviders] = useState([]);
    const [providerMessages, setProviderMessages] = useState([]);
    const [replies, setReplies] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/replies`)
            .then(res => res.json())
            .then(result => setReplies(result))
    }, []);


    useEffect(() => {
        fetch(`http://localhost:5000/freelancerprofile?email=${user.email}`)
            .then(res => res.json())
            .then(data => setProviders(data))
    }, [user])


    useEffect(() => {
        fetch(`http://localhost:5000/messages`)
            .then(res => res.json())
            .then(result => setProviderMessages(result))
    }, [providerMessages])

    return (
       <>
      
        <div className='container'>
            <div className='col-lg-6'>
                <div className='d-flex'>
                    <h5 className='mx-3'><i class="fa-solid fa-envelope"></i> Inbox {providerMessages.length}</h5>
                    <h5><Link as to={'/sentmessages'}>Sent Messages</Link></h5>
                </div>
                {providerMessages.map(providerMessage => providerMessage.providerEmail === user.email && <>
                
                    <div className='single-message-card d-flex'>
                                    <p>With: <Link className='text-black client-profile-name' to={`/client/${providerMessage.clientId}`}>{providerMessage.clientName}</Link></p>
                                    <div className='mx-3'>
                                        <div className='d-flex'>
                                            <h5><Link to={`/inbox/${providerMessage._id}`}>{providerMessage.serviceName}</Link></h5>
                                            <p>{providerMessage.whoSent === 'clientSent' & providerMessage.messageStatus === 'unRead' && <div className='unread'>New</div>}
                                                <p className='unread'>
                                                    {replies.filter(reply => reply.messageId === providerMessage._id & reply.replied === 'clientReplied' & reply.messageStatus === "unRead").length > 0 && <div className='unread'>New</div>}
                                                </p>
                                            </p>

                                        </div>
                                    </div>
                                </div>
                </>).reverse()}
               
                {providerMessages.map(providerMessage => providerMessage.clientEmail === user.email && <>
                    <div className='single-message-card d-flex'>
                                    <p>With: <Link className='text-black client-profile-name' to={`/freelancer/${providerMessage.providerId}`}>{providerMessage.providerName}</Link></p>
                                    <div className='mx-3'>
                                        <div className='d-flex'>
                                            <h5><Link to={`/inbox/${providerMessage._id}`}>{providerMessage.serviceName}</Link></h5>
                                            <p>{providerMessage.whoSent === 'providerSent' & providerMessage.messageStatus === 'unRead' && <div className='unread'>New</div>} 
                                            <p className='unread'>
                                                    {replies.filter(reply => reply.messageId === providerMessage._id & reply.replied === 'providerReplied' & reply.messageStatus === "unRead").length > 0 && <div className='unread'>New</div>}
                                                </p>
                                            </p>

                                        </div>

                                    </div>
                                </div>
                
                </>).reverse()}
            </div>
        </div></>
    );
};

export default Messages;