import React, { useEffect } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../../firebase.init';
import './Messages.css';
import BreadcumArea from '../../Shared/BreadcumArea';

const SentMessages = () => {
    const [user] = useAuthState(auth);
    const [sentMessages, setSentMessages] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/messages`)
            .then(res => res.json())
            .then(result => setSentMessages(result))
    }, [sentMessages])

    return (
       <>
  
        <div className='container'>
            <div className='col-lg-6'>
                <div className='d-flex'>
                    <h5 className='mx-3'><Link as to={'/messages'}><i class="fa-solid fa-envelope"></i> Inbox</Link></h5>
                    <h5>Sent Messages</h5>
                </div>
                {sentMessages.filter(sentMessage => sentMessage.clientEmail === user.email & sentMessage.whoSent === 'clientSent').length}

                {sentMessages.filter(sentMessage => sentMessage.clientEmail === user.email & sentMessage.whoSent === 'clientSent').length > 0 &&
                    <>
                        {
                            sentMessages.map(sentMessage => <>
                                <div className='single-message-card'>
                                    <h5>Sender: {sentMessage.clientName}</h5>
                                    <h5>Service: <Link to={`/inbox/${sentMessage._id}`}>{sentMessage.serviceName}</Link></h5>
                                    <p>{(sentMessage.clientMessage).slice(0, 50)}</p>
                                </div>
                            </>).reverse()
                        }
                    </>

                }
            </div>
        </div>
        </>
    );
};

export default SentMessages;