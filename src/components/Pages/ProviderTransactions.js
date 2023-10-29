import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const ProviderTransactions = () => {
    const [user] = useAuthState(auth);
    const [releases, setreleases] = useState([]);
    const [withdraws, setWithdraws] = useState([]);
    const [providerName, setProviderName] = useState([]);

    let currentBalance = 0;
    let totalWithdraw = 0;

    for (const provider of providerName){
        currentBalance = provider.currentBalance;
    }

    for (const w of withdraws) {
        totalWithdraw = totalWithdraw + parseFloat(w.withdrawnAmount);
    }
    
    currentBalance = currentBalance - totalWithdraw;

  

    useEffect(() => {
        fetch(`http://localhost:5000/freelancerprofile?email=${user.email}`)
            .then(res => res.json())
            .then(review => setProviderName(review))
    }, [user]);

    useEffect(() => {
        const url = `http://localhost:5000/myserviceorder?email=${user.email}`
        fetch(url)
            .then(res => res.json())
            .then(data => setreleases(data))
    }, [user]);

    useEffect(() => {
        fetch(`http://localhost:5000/withdraw?email=${user.email}`)
            .then(res => res.json())
            .then(result => setWithdraws(result))
    }, [user]);
    return (
        <div className='container'>
            <h5>Current Balance ${parseInt(currentBalance)} USD</h5>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Debit</th>
                        <th>Credit</th>
                    </tr>
                </thead>
                {
                    releases.map(release => release.paymentAccepted === 'done' &&
                        <>
                        
                        <tbody>
                            <tr>
                                <td>{release.releaseDate}</td>
                                <td>{(release.releaseAmount)-(release.releaseAmount * 10 / 100)} <p>From {release.servicename}</p></td>
                                <td> - {(release.releaseAmount * 10 / 100)}USD 10% TakeALancer Fee</td>
                            </tr>
                        </tbody>                     
                        </>
                    ).reverse()
                }

            </Table>
        </div>
    );
};

export default ProviderTransactions;