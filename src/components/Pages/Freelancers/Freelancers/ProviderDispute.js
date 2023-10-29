import React, { useEffect } from 'react';
import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../../../firebase.init';

const ProviderDispute = () => {
    const [user] = useAuthState(auth);
    const [runningOrders, setRunningOrders] = useState([]);
    useEffect(() => {
        const url = `http://localhost:5000/myserviceorder?email=${user.email}`
        fetch(url)
            .then(res => res.json())
            .then(data => setRunningOrders(data));

    }, [user])
    return (
        <div className='container'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Service Name</th>
                        <th>Client Name</th>
                        <th>Amount</th>
                        <th>Dispute</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        runningOrders.map(running => running.provideremail === user?.email & running.runningOrCompleted === 'running' & running.releaseStatus === 'none' &&
                            <tr>
                                <td>{running.servicename}</td>
                                <td>{running.clientName}</td>
                                <td>${running.serviceprice} USD</td>
                                <td>{running.disputeStatus === 'Started' && <Link className='btn btn-success' to={`/providerdispute/${running._id}`}>View Dispute
                                    </Link>}
                                    {running.disputeStatus === 'none' && <Link className='btn btn-danger' to={`/providerdispute/${running._id}`}>Create Dispute
                                    </Link>}
                                    {running.disputeStatus === 'Solved' && <Link className='btn btn-primary' to={'#'}>Dispute Solved
                                    </Link>}
                                    
                                    </td>
                            </tr>
                        ).reverse()
                    }

                </tbody>
            </Table>
        </div>
    );
};

export default ProviderDispute;