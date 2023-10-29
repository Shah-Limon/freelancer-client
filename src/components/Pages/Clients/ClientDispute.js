import React, { useEffect } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';

const ClientDispute = () => {
    const [user] = useAuthState(auth);
    const [runningOrders, setRunningOrders] = useState([]);
    useEffect(() => {
        const url = `http://localhost:5000/myorder?email=${user.email}`
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
                        <th>Provider Name</th>
                        <th>Amount</th>
                        <th>Dispute</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        runningOrders.map(running => running.customeremail === user?.email & running.runningOrCompleted === 'running' & running.releaseStatus === 'none' &&
                            <tr>
                                <td>{running.servicename}</td>
                                <td>{running.providerName}</td>
                                <td>${running.serviceprice} USD</td>
                                <td>
                                    {running.disputeStatus === 'Started' && <Link className='btn btn-success' to={`/clientdispute/${running._id}`}>View Dispute
                                    </Link>}
                                    {running.disputeStatus === 'none' && <Link className='btn btn-danger' to={`/clientdispute/${running._id}`}>Create Dispute
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

export default ClientDispute;