import React, { useEffect, useState } from 'react';
import { Accordion, Button } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import './Dashboard.css';
import Table from 'react-bootstrap/Table';
import useFreelancer from '../../hooks/useFreelancer';
import BreadcumArea from '../../Shared/BreadcumArea';
import { signOut } from 'firebase/auth';




const Dashboard = () => {

    const navigate = useNavigate();
    const [user] = useAuthState(auth);

    const [myServices, setMyServices] = useState([]);
    const [myOrders, setmyOrders] = useState([]);
    const [myServiceOrders, setMyServiceOrders] = useState([]);
    const [myDatas] = useFreelancer();
    const [withdraws, setWithdraws] = useState([]);
    const [providerName, setProviderName] = useState([]);
    const [clientName, setClientName] = useState([]);
    const [messages, setMessages] = useState([])
    const [providerMessages, setProviderMessages] = useState([]);
    const [replies, setReplies] = useState([]);
    const [paymentSettings, setPaymentSettings] = useState([]);


 const [displayCount, setDisplayCount] = useState(5); // Number of rows to display initially
  const itemsPerPage = 5; // Number of rows to load when clicking "Load More"

  // Load More function
  const handleLoadMore = () => {
    setDisplayCount(displayCount + itemsPerPage);
  };


    const logout = () => {
        signOut(auth);
    };

    let totalOrder = 0;

    for (const orderAmount of myOrders) {
        totalOrder = totalOrder + parseFloat(orderAmount.releaseAmount);
    }

    let currentBalance = 0;

    for (const provider of providerName) {
        currentBalance = provider.currentBalance;
    }

    currentBalance = currentBalance;

    useEffect(() => {
        const url = `http://localhost:5000/payment-setting`
        fetch(url)
            .then(res => res.json())
            .then(data => setPaymentSettings(data));
    }, []);

    useEffect(() => {
        fetch(`http://localhost:5000/clientprofile?clientEmail=${user.email}`)
            .then(res => res.json())
            .then(result => setClientName(result))
    }, [user])

    useEffect(() => {
        fetch(`http://localhost:5000/freelancerprofile?email=${user.email}`)
            .then(res => res.json())
            .then(review => setProviderName(review))
    }, [user]);

    useEffect(() => {
        fetch(`http://localhost:5000/withdraw?email=${user.email}`)
            .then(res => res.json())
            .then(withdraw => setWithdraws(withdraw))
    }, [user])


    useEffect(() => {
        const url = `http://localhost:5000/myservice?email=${user.email}`
        fetch(url)
            .then(res => res.json())
            .then(data => setMyServices(data));
    }, [user])

    useEffect(() => {
        const url = `http://localhost:5000/myorder?email=${user.email}`
        fetch(url)
            .then(res => res.json())
            .then(data => setmyOrders(data));
    }, [user])

    useEffect(() => {
        const url = `http://localhost:5000/myserviceorder?email=${user.email}`
        fetch(url)
            .then(res => res.json())
            .then(info => setMyServiceOrders(info));
    }, [user]);

    useEffect(() => {
        fetch(`http://localhost:5000/messages`)
            .then(res => res.json())
            .then(result => setMessages(result))
    }, [messages])

    useEffect(() => {
        fetch(`http://localhost:5000/replies`)
            .then(res => res.json())
            .then(result => setReplies(result))
    }, []);

    const navigateToDetails = id => {
        navigate(`/service/${id}`)
    };
    const navigateToStatus = id => {
        navigate(`/acceptorreject/${id}`)
    };
    const navigateToCancel = id => {
        navigate(`/cancelorder/${id}`)
    };
    const navigateRequirement = id => {
        navigate(`/requirement/${id}`)
    };

    
    return (
        <>

            <div className='dashboard'>

                <div className='container'>
                    <div className='dashboard-responsive'>
                        <div className="col-lg-4">
                            <aside className="vendor-profile-sidebar">
                                <h5 className="vendor-wrap-title vendor-wrap-title-bg">My Details</h5>
                                <div className="vendor-info-wrap text-center">
                                    {/* name */}
                                    {
                                        providerName.map(pname => <>
                                            <div className="vendor-thumb mb-10">

                                                <img src={pname.profile} alt="img"
                                                    style={{ width: '130px', height: '130px' }}
                                                />

                                            </div>
                                            <div className="vendor-info mb-25">
                                                <h4>{pname.name}</h4>
                                                <Link className="dashboard-view-profile my-2" to={`/freelancer/${pname._id}`}>View Full Profile</Link>
                                            </div>
                                            <div>
                                                {/* Links */}
                                                {
                                                    providerName.map(p => <Link className='update-info' to={`/updateprovider/${p._id}`}><i class="fa-solid fa-id-card-clip"></i> Update Profile</Link>)
                                                }


                                            </div>
                                            <div>
                                                {
                                                    providerName.map(p => <Link className='update-info' to={`/updateprovider/${p._id}`}><i class="fa-solid fa-screwdriver-wrench"></i> Account Setting</Link>)
                                                }
                                            </div>
                                            <div >
                                                <div>
                                                    <Link className='update-info' as={Link} to="/messages"><i class="fa-solid fa-envelope"></i> Inbox</Link>
                                                    <div >
                                                        {providerMessages.filter(providerMessage => providerMessage.providerEmail === user.email).length > 0 &&
                                                            <>
                                                                {replies.filter(reply => reply.providerEmail === user.email & reply.replied === 'clientReplied' & reply.messageStatus === "unRead").length === 0 && <></>}
                                                                {replies.filter(reply => reply.providerEmail === user.email & reply.replied === 'clientReplied' & reply.messageStatus === "unRead").length > 0 && <p className='reply-unread'>{replies.filter(reply => reply.providerEmail === user.email & reply.replied === 'clientReplied' & reply.messageStatus === "unRead").length}</p>}

                                                                {providerMessages.filter(providerMessage => providerMessage.whoSent === 'clientSent' & providerMessage.providerEmail === user.email & providerMessage.messageStatus === 'unRead').length === 0 && <></>}
                                                                {providerMessages.filter(providerMessage => providerMessage.whoSent === 'clientSent' & providerMessage.providerEmail === user.email & providerMessage.messageStatus === 'unRead').length > 0 && <p className='message-unread'>+{providerMessages.filter(providerMessage => providerMessage.whoSent === 'clientSent' & providerMessage.providerEmail === user.email & providerMessage.messageStatus === 'unRead').length}</p>}
                                                            </>
                                                        }

                                                    </div>

                                                </div>

                                            </div>
                                            <div><Link className='update-info' to={'/provider-transactions'}><i class="fa-solid fa-clock-rotate-left"></i> Transaction History</Link></div>

                                            <div>{
                                                clientName.length === 1 && <>
                                                    {
                                                        clientName.map(cname => <>
                                                            <img className='profile-image-dashboard' src={cname.clientProfile} alt="" />
                                                            <h5>{cname.clientName}</h5>
                                                            <Link className="dashboard-view-profile my-2" to={`/client/${cname._id}`}>View Full Profile</Link>
                                                        </>)
                                                    }
                                                    <br />
                                                    <div className='d-flex justify-content-start my-3'>
                                                        {
                                                            clientName.map(cname => <Link className='update-info' to={`/updateclientprofile/${cname._id}`}><i class="fa-solid fa-id-card-clip"></i> Update Profile</Link>)
                                                        }
                                                    </div>
                                                    <div className='d-flex justify-content-start my-3'>
                                                        {
                                                            clientName.map(cname => <Link className='update-info' to={`/updateclientprofile/${cname._id}`}><i class="fa-solid fa-screwdriver-wrench"></i> Account Setting</Link>)
                                                        }
                                                    </div>
                                                    {
                                                        clientName.filter(client => client.clientEmail === user?.email).length === 1 &&
                                                        <div className='d-flex justify-content-start my-3'>
                                                            <div className='d-flex'>
                                                                <Link className='update-info' as={Link} to="/messages"><i class="fa-solid fa-envelope"></i> Inbox</Link>
                                                                <div className='box-message d-flex'>
                                                                    {providerMessages.filter(clientMessage => clientMessage.clientEmail === user.email).length > 0 &&
                                                                        <>
                                                                            {replies.filter(reply => reply.clientEmail === user.email & reply.replied === 'providerReplied' & reply.messageStatus === "unRead").length === 0 && <span></span>}
                                                                            {replies.filter(reply => reply.clientEmail === user.email & reply.replied === 'providerReplied' & reply.messageStatus === "unRead").length > 0 && <p className='reply-unread'>{replies.filter(reply => reply.clientEmail === user.email & reply.replied === 'providerReplied' & reply.messageStatus === "unRead").length}</p>}

                                                                            {providerMessages.filter(providerMessage => providerMessage.whoSent === 'providerSent' & providerMessage.clientEmail === user.email & providerMessage.messageStatus === 'unRead').length === 0 && <></>}
                                                                            {providerMessages.filter(providerMessage => providerMessage.whoSent === 'providerSent' & providerMessage.clientEmail === user.email & providerMessage.messageStatus === 'unRead').length > 0 && <p className='message-unread'>+{providerMessages.filter(providerMessage => providerMessage.clientEmail === user.email & providerMessage.messageStatus === 'unRead').length}</p>}
                                                                        </>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }
                                                </>
                                            }


                                            </div>

                                        </>)
                                    }
                                    {
                                        clientName.length === 1 && <>
                                            {
                                                clientName.map(cname => <>
                                                    <img className='profile-image-dashboard' src={cname.clientProfile} alt=""
                                                        style={{ width: '7.5rem', height: '7.5rem' }} />
                                                    <h5>{cname.clientName}</h5>
                                                    <Link className="dashboard-view-profile my-2" to={`/client/${cname._id}`}>View Full Profile</Link>
                                                </>)
                                            }
                                            <br />
                                            <div className='d-flex justify-content-start my-3'>
                                                {
                                                    clientName.map(cname => <Link className='update-info' to={`/updateclientprofile/${cname._id}`}><i class="fa-solid fa-id-card-clip"></i> Update Profile</Link>)
                                                }
                                            </div>
                                            <div className='d-flex justify-content-start my-3'>
                                                {
                                                    clientName.map(cname => <Link className='update-info' to={`/updateclientprofile/${cname._id}`}><i class="fa-solid fa-screwdriver-wrench"></i> Account Setting</Link>)
                                                }
                                            </div>
                                            {
                                                clientName.filter(client => client.clientEmail === user?.email).length === 1 &&
                                                <div className='d-flex justify-content-start my-3'>
                                                    <div className='d-flex'>
                                                        <Link className='update-info' as={Link} to="/messages"><i class="fa-solid fa-envelope"></i> Inbox</Link>
                                                        <div className='box-message d-flex'>
                                                            {providerMessages.filter(clientMessage => clientMessage.clientEmail === user.email).length > 0 &&
                                                                <>
                                                                    {replies.filter(reply => reply.clientEmail === user.email & reply.replied === 'providerReplied' & reply.messageStatus === "unRead").length === 0 && <span></span>}
                                                                    {replies.filter(reply => reply.clientEmail === user.email & reply.replied === 'providerReplied' & reply.messageStatus === "unRead").length > 0 && <p className='reply-unread'>{replies.filter(reply => reply.clientEmail === user.email & reply.replied === 'providerReplied' & reply.messageStatus === "unRead").length}</p>}

                                                                    {providerMessages.filter(providerMessage => providerMessage.whoSent === 'providerSent' & providerMessage.clientEmail === user.email & providerMessage.messageStatus === 'unRead').length === 0 && <></>}
                                                                    {providerMessages.filter(providerMessage => providerMessage.whoSent === 'providerSent' & providerMessage.clientEmail === user.email & providerMessage.messageStatus === 'unRead').length > 0 && <p className='message-unread'>+{providerMessages.filter(providerMessage => providerMessage.clientEmail === user.email & providerMessage.messageStatus === 'unRead').length}</p>}
                                                                </>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </>
                                    }
                                    <h5 className="my-2">My Email : {user.email}</h5>

                                    {/* logout */}


                                    <input
                                        className="btn btn--block btn--radius btn--size-xlarge btn--color-white btn--bg-maya-blue text-center contact-btn"
                                        type="submit"
                                        value="Logout" onClick={logout}
                                    ></input>

                                </div>


                            </aside>
                        </div>


                        {/* <div className='col-lg-3 profile-card my-5 shadow p-3 mb-5 bg-body rounded-5'>
                            {
                                providerName.length === 1 &&
                                <>
                                    {
                                        providerName.map(pname => <>
                                            <img className='profile-image-dashboard' src={pname.profile} alt="" />
                                            <h5>{pname.name}</h5>
                                            <Link className="dashboard-view-profile my-2" to={`/freelancer/${pname._id}`}>View Full Profile</Link>

                                        </>)
                                    }
                                    <br />
                                    <div className='d-flex justify-content-start my-3'>
                                        {
                                            providerName.map(p => <Link className='update-info' to={`/updateprovider/${p._id}`}><i class="fa-solid fa-id-card-clip"></i> Update Profile</Link>)
                                        }
                                    </div>
                                    <div className='d-flex justify-content-start my-3'>
                                        {
                                            providerName.map(p => <Link className='update-info' to={`/updateprovider/${p._id}`}><i class="fa-solid fa-screwdriver-wrench"></i> Account Setting</Link>)
                                        }
                                    </div>

                                    <div className='d-flex justify-content-start my-3'>
                                        <div className='d-flex'>
                                            <Link className='update-info' as={Link} to="/messages"><i class="fa-solid fa-envelope"></i> Inbox</Link>
                                            <div >
                                                {providerMessages.filter(providerMessage => providerMessage.providerEmail === user.email).length > 0 &&
                                                    <>
                                                        {replies.filter(reply => reply.providerEmail === user.email & reply.replied === 'clientReplied' & reply.messageStatus === "unRead").length === 0 && <></>}
                                                        {replies.filter(reply => reply.providerEmail === user.email & reply.replied === 'clientReplied' & reply.messageStatus === "unRead").length > 0 && <p className='reply-unread'>{replies.filter(reply => reply.providerEmail === user.email & reply.replied === 'clientReplied' & reply.messageStatus === "unRead").length}</p>}

                                                        {providerMessages.filter(providerMessage => providerMessage.whoSent === 'clientSent' & providerMessage.providerEmail === user.email & providerMessage.messageStatus === 'unRead').length === 0 && <></>}
                                                        {providerMessages.filter(providerMessage => providerMessage.whoSent === 'clientSent' & providerMessage.providerEmail === user.email & providerMessage.messageStatus === 'unRead').length > 0 && <p className='message-unread'>+{providerMessages.filter(providerMessage => providerMessage.whoSent === 'clientSent' & providerMessage.providerEmail === user.email & providerMessage.messageStatus === 'unRead').length}</p>}
                                                    </>
                                                }

                                            </div>

                                        </div>

                                    </div>
                                    <div className='d-flex justify-content-start my-3'><Link className='update-info' to={'/provider-transactions'}><i class="fa-solid fa-clock-rotate-left"></i> Transaction History</Link></div>
                                    <div>

                                    </div>
                                </>
                            }
                            {
                                clientName.length === 1 && <>
                                    {
                                        clientName.map(cname => <>
                                            <img className='profile-image-dashboard' src={cname.clientProfile} alt="" />
                                            <h5>{cname.clientName}</h5>
                                            <Link className="dashboard-view-profile my-2" to={`/client/${cname._id}`}>View Full Profile</Link>
                                        </>)
                                    }
                                    <br />
                                    <div className='d-flex justify-content-start my-3'>
                                        {
                                            clientName.map(cname => <Link className='update-info' to={`/updateclientprofile/${cname._id}`}><i class="fa-solid fa-id-card-clip"></i> Update Profile</Link>)
                                        }
                                    </div>
                                    <div className='d-flex justify-content-start my-3'>
                                        {
                                            clientName.map(cname => <Link className='update-info' to={`/updateclientprofile/${cname._id}`}><i class="fa-solid fa-screwdriver-wrench"></i> Account Setting</Link>)
                                        }
                                    </div>
                                    {
                                        clientName.filter(client => client.clientEmail === user?.email).length === 1 &&
                                        <div className='d-flex justify-content-start my-3'>
                                            <div className='d-flex'>
                                                <Link className='update-info' as={Link} to="/messages"><i class="fa-solid fa-envelope"></i> Inbox</Link>
                                                <div className='box-message d-flex'>
                                                    {providerMessages.filter(clientMessage => clientMessage.clientEmail === user.email).length > 0 &&
                                                        <>
                                                            {replies.filter(reply => reply.clientEmail === user.email & reply.replied === 'providerReplied' & reply.messageStatus === "unRead").length === 0 && <span></span>}
                                                            {replies.filter(reply => reply.clientEmail === user.email & reply.replied === 'providerReplied' & reply.messageStatus === "unRead").length > 0 && <p className='reply-unread'>{replies.filter(reply => reply.clientEmail === user.email & reply.replied === 'providerReplied' & reply.messageStatus === "unRead").length}</p>}

                                                            {providerMessages.filter(providerMessage => providerMessage.whoSent === 'providerSent' & providerMessage.clientEmail === user.email & providerMessage.messageStatus === 'unRead').length === 0 && <></>}
                                                            {providerMessages.filter(providerMessage => providerMessage.whoSent === 'providerSent' & providerMessage.clientEmail === user.email & providerMessage.messageStatus === 'unRead').length > 0 && <p className='message-unread'>+{providerMessages.filter(providerMessage => providerMessage.clientEmail === user.email & providerMessage.messageStatus === 'unRead').length}</p>}
                                                        </>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </>
                            }
                            <h5 className="my-2">My Email : {user.email}</h5>
                        </div> */}

                        {
                            clientName.filter(client => client.clientEmail === user?.email).length > 0 &&
                            <div className='col-lg-9'>
                                <div className='my-5 shadow p-3 mb-5 bg-body rounded-5 client-dashboard'>
                                    <h5 className='text-white'>Total Spent</h5>
                                    <h2 className='text-white text-center'>{totalOrder} USD</h2>
                                    {
                                        myOrders.filter(order => order.releaseStatus === 'requested').length > 0 &&
                                        <>
                                            <h5 className='text-white'>Payment Request</h5>
                                            <Table>
                                                <thead>
                                                    <tr>
                                                        <th className='text-white'>Provider Name</th>
                                                        <th className='text-white'>Service Name</th>
                                                        <th></th>

                                                    </tr>
                                                </thead>
                                                {
                                                    myOrders.map(order => order.releaseStatus === 'requested' &&
                                                        <tbody>
                                                            <tr>
                                                                <td className='text-white'>{order.providerName}</td>
                                                                <td className='text-white'>{order.servicename}</td>
                                                                <td><Link className='text-white' to={`/releasepayment/${order._id}`}>Release Payment</Link></td>
                                                            </tr>
                                                        </tbody>
                                                    )
                                                }
                                                {
                                                    myOrders.filter(order => order.releaseStatus === 'requested').length === 0 &&
                                                    <>
                                                        <h5 className='text-white'>You have not received any payment request</h5>
                                                    </>
                                                }
                                            </Table>
                                        </>

                                    }
                                </div>

                            </div>
                        }



                        {
                            providerName.filter(provider => provider.email === user?.email).length === 1 &&
                            <div className='col-lg-9 mt-5'>
                                {
                                    providerName.filter(provider => provider.status === "Approved").length === 1 &&
                                    <div className='balance py-5 shadow p-3 mb-5 rounded-5 text-center'>
                                        <div className='container'>
                                            <div className='row'>
                                                <div className='col-lg-9'>
                                                    <h3>My Balance ${parseInt(currentBalance)} USD</h3>
                                                    {currentBalance > 50 && myDatas.map(w => (
                                                        <Link to={`/withdraw/${w._id}`}><Button>Withdraw</Button></Link>
                                                    ))}
                                                </div>
                                                <div className='col-lg-3'>
                                                    <h5 className='add-service-titles'><Link to="/add-service">Add service</Link></h5>
                                                </div>
                                            </div>

                                            {myServiceOrders.map(myOrder =>
                                                myOrder.paymentAccepted === 'none' && (
                                                    <div key={myOrder._id}>
                                                        <p className="badge rounded-pill d-inline text-white">{myOrder.clientName} has released {myOrder.releaseAmount} USD</p>
                                                        <Link to={`/acceptpayment/${myOrder._id}`}><p className="add-service-titles d-inline">Accept This Fund</p></Link>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>

                                }
                                {
                                    providerName.filter(provider => provider.status === "Unapproved").length === 1 &&
                                    <div className='balance py-5 shadow p-3 mb-5 rounded-5'><h3>Sorry! Your Account is Not Approved. You can touch us at: </h3>
                                    </div>
                                }
                                {
                                    providerName.filter(provider => provider.status === "Suspended").length === 1 &&
                                    <div className='balance py-5 shadow p-3 mb-5 rounded-5'><h3>Your account is Suspended</h3>
                                    </div>
                                }
                                <div className='my-service-list shadow p-3 mb-5 bg-body rounded-5'>
                                    {myServices.length === 0 && <></>}
                                    {myServices.length > 0 &&
                                        <Table striped bordered hover variant="">
                                            <thead>
                                                <tr>
                                                    <th>Image</th>
                                                    <th>Service Name</th>
                                                    <th>Edit</th>
                                                </tr>

                                            </thead>
                                            <tbody>
                                                {
                                                    myServices.map(myService =>
                                                        <tr>
                                                            <td><img className='service-img' src={myService.img} alt="" /></td>
                                                            <td><Link to={`/service/${myService._id}`}><p className='badge rounded-pill d-inline'>{myService.title}</p></Link>
                                                                {myService.publishStatus === 'Pending' && <p>Your Service is Pending</p>}
                                                            </td>
                                                            <td><Link to={`/editservice/${myService._id}`}>Edit</Link></td>
                                                        </tr>)}
                                            </tbody>
                                        </Table>
                                    }
                                </div>
                            </div>
                        }



                    </div>

                    {
                        clientName.map(client => client.clientEmail === user?.email &&
                            <div>
                                {
                                    myOrders.map(myOrder => myOrder.refundStatus === 'pending' || myOrder.refundStatus === 'refunded' &&

                                        <div className='my-service-list shadow p-3 mb-5 bg-body rounded-5'>
                                            <Table striped bordered hover>
                                                <thead>
                                                    <tr>
                                                        <th>Service Name</th>
                                                        <th>Status</th>
                                                        <th>Refund Status</th>
                                                        <th>Refunded to</th>
                                                        <th>Note</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        myOrders.map(myOrder => myOrder.refundStatus === 'pending' || myOrder.refundStatus === 'refunded' &&
                                                            <tr>
                                                                <td>{myOrder.servicename}</td>
                                                                <td>{myOrder.status}</td>
                                                                <td>{myOrder.refundStatus}</td>
                                                                <td>{myOrder.refundedTo}</td>
                                                                <td>{myOrder.refundNote}</td>
                                                            </tr>

                                                        )
                                                    }

                                                </tbody>
                                            </Table>
                                        </div>
                                    ).reverse()
                                }
                            </div>)
                    }


                    {myOrders.length === 0 && <></>}

                    {/* pending orders */}
                    {myOrders.length > 0 &&
                        <div>
                            {myOrders.filter(myorder => myorder.status === 'pending').length > 0 &&
                                <Table striped bordered hover className="table align-middle mb-0 bg-white">
                                    <thead className="bg-light">
                                        <tr>

                                            <th>Date</th>
                                            <th>Provider Name</th>
                                            <th>Project Name</th>
                                            <th>Message</th>
                                            <th>Requirement</th>


                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            myOrders.map(myOrder => myOrder.status === 'pending' &&
                                                <tr>

                                                    <td><p className="badge rounded-pill d-inline">{myOrder.orderDate}</p></td>
                                                    <td><Link to={`/freelancer/${myOrder.providerId}`}><p className="badge badge-success rounded-pill d-inline">{myOrder.providerName}</p></Link><br></br>
                                                        {myOrder.status === 'pending' && <p className="badge badge-danger rounded-pill d-inline">Pending...</p>}
                                                        {myOrder.status === 'pending' &&
                                                            <div>
                                                                <Link to={`/cancelorder/${myOrder._id}`}><p className="badge badge-warning rounded-pill d-inline">Cancel Now</p></Link>
                                                            </div>
                                                        }

                                                    </td>
                                                    <td><Link to={`/service/${myOrder.serviceId}`}><p className="badge rounded-pill">{myOrder.servicename}</p></Link></td>
                                                    <td>
                                                        {
                                                            messages.filter(message => message.orderId === myOrder._id & message.serviceId === myOrder.serviceId).length === 0 && <>
                                                                <Link to={`/clientmessage/${myOrder._id}`} className="mt-2">

                                                                    <img src="https://i.ibb.co/VDR0rvM/send-icon.png" alt="Message" />

                                                                </Link>
                                                            </>
                                                        }
                                                        {
                                                            messages.filter(message => message.orderId === myOrder._id & message.serviceId === myOrder.serviceId).length > 0 && <>
                                                                {
                                                                    messages.map(message => message.orderId === myOrder._id && <Link to={`/inbox/${message._id}`} className="mt-2 inbox">   <img src="https://i.ibb.co/VDR0rvM/send-icon.png" alt="Message" /></Link>)
                                                                }

                                                            </>
                                                        }
                                                    </td>
                                                    <td>
                                                        <div className='d-flex justify-content-center'>
                                                            <div><Button className='btn-sm' onClick={() => navigateRequirement(myOrder._id)}>See Requirement</Button></div>


                                                        </div>
                                                    </td>

                                                </tr>)
                                        }
                                    </tbody>
                                </Table>
                            }
                            {/* buyer */}
                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header><p className='accordion-heading'>My Running Order Items: {myOrders.filter(myorder => myorder.runningOrCompleted === 'running').length}</p></Accordion.Header>
                                    <Accordion.Body>

                                        <Table striped bordered hover className="table align-middle mb-0 bg-white">
                                            <thead className="bg-light">
                                                <tr>

                                                    <th>Service Provider</th>
                                                    <th>Payment Status</th>
                                                    <th>Service Name</th>
                                                    <th>Service Price</th>
                                                    <th></th>
                                                    <th>Message</th>
                                                    <th>Requirement</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    myOrders.slice(0, displayCount).map(myOrder => myOrder.runningOrCompleted === 'running' &&
                                                        <tr>

                                                            <td><Link className="badge rounded-pill d-inline" to={`/freelancer/${myOrder.providerId}`}>{myOrder.providerName}</Link><br></br>
                                                                {myOrder.status === 'pending' && <p className="badge badge-danger rounded-pill d-inline">Pending...</p>}
                                                                {myOrder.status === 'pending' &&
                                                                    <div>
                                                                        <Link to={`/requirement/${myOrder._id}`} className="badge badge-danger rounded-pill d-inline" >Cancel Now</Link>

                                                                    </div>
                                                                }
                                                                {myOrder.status === 'cancelled' && <p className="badge badge-danger rounded-pill d-inline">You Have Cancelled Order</p>}
                                                                {myOrder.status === 'accepted' && <p className="badge badge-success rounded-pill d-inline">Accepted</p>}
                                                                {myOrder.status === 'rejected' && <p className="badge badge-danger rounded-pill d-inline">Provider is Rejected</p>}
                                                                {myOrder.status === 'rejectedByAdmin' && <p className="badge badge-danger rounded-pill d-inline">Admin has Rejected</p>}

                                                            </td>
                                                            <td>{myOrder.releaseStatus === 'none' && <Link to={`/releasepayment/${myOrder._id}`}><p className="badge badge-success rounded-pill d-inline">Release Payment</p></Link>}
                                                                {myOrder.releaseStatus === 'requested' && <Link to={`/releasepayment/${myOrder._id}`}><Button>Release Payment</Button></Link>}
                                                                {myOrder.releaseStatus === 'released' && <div className="badge badge-success rounded-pill d-inline">Payment Released</div>}</td>
                                                            <td>
                                                                <td><Link to={`/service/${myOrder.serviceId}`}><p className="badge rounded-pill d-inline">{myOrder.servicename}</p></Link></td>
                                                                <br />
                                                                <Link to={`/complete/${myOrder._id}`}><p className="badge badge-pill badge-info">Complete Now</p></Link>
                                                            </td>
                                                            <td><p className='badge badge-success rounded-pill d-inline'>${myOrder.serviceprice}usd/ Mo</p></td>
                                                            <td>{myOrder.status === 'cancelled' && <div></div>}
                                                                {myOrder.status === 'pending' && <div></div>}
                                                                {myOrder.status === 'accepted' && myOrder.reviewStatus === 'none' && <Link to={`/reviewasaclient/${myOrder._id}`}><p className="badge badge-success rounded-pill d-inline">Post Review</p></Link>}
                                                                {myOrder.reviewStatus === 'done' && <p className="badge badge-success rounded-pill d-inline" disabled>Reviewed</p>}
                                                            </td>
                                                            <td>
                                                                {
                                                                    messages.filter(message => message.orderId === myOrder._id & message.serviceId === myOrder.serviceId).length === 0 && <>
                                                                        <Link to={`/clientmessage/${myOrder._id}`} className="mt-2">
                                                                            <i className="fa-solid fa-message">
                                                                                <img src="https://i.ibb.co/VDR0rvM/send-icon.png" alt="Message" />
                                                                            </i>
                                                                        </Link>

                                                                    </>
                                                                }
                                                                {
                                                                    messages.filter(message => message.orderId === myOrder._id & message.serviceId === myOrder.serviceId).length > 0 && <>
                                                                        {
                                                                            messages.map(message => message.orderId === myOrder._id && <Link to={`/inbox/${message._id}`} className="mt-2 inbox"><img src="https://i.ibb.co/VDR0rvM/send-icon.png" alt="Message" /></Link>)
                                                                        }

                                                                    </>
                                                                }
                                                            </td>
                                                            <td>
                                                                <div className='d-flex justify-content-center'>
                                                                    <div>
                                                                        <Link className="badge rounded-pill d-inline" to={`/requirement/${myOrder._id}`}>See Requirement</Link>
                                                                    </div>
                                                                </div>
                                                                <div>{myOrder.reqUpdated === 'requpdated' && <></>}</div>
                                                            </td>
                                                        </tr>).reverse()
                                                }



                                            </tbody>
                                        </Table>
                                        {displayCount < myOrders.length && (
                                            <div className="text-center mt-3">
                                                <button className="btn btn-primary" onClick={handleLoadMore}>
                                                    Load More
                                                </button>
                                            </div>



                                        )}
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header><p className='accordion-heading'>My Order Items Total: {myOrders.length}</p></Accordion.Header>
                                    <Accordion.Body>
                                        <Table striped bordered hover className="table align-middle mb-0 bg-white">
                                            <thead className="bg-light">
                                                <tr>

                                                    <th>Service Provider</th>
                                                    <th>Payment Status</th>
                                                    <th>Service Name</th>
                                                    <th>Service Price</th>
                                                    <th></th>
                                                    <th>Message</th>
                                                    <th>Requirement</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    myOrders.map(myOrder => <tr>

                                                        <td><Link to={`/freelancer/${myOrder.providerId}`}><p className="badge rounded-pill d-inline">{myOrder.providerName}</p></Link>
                                                            <br></br>
                                                            {myOrder.status === 'pending' && <p className="badge badge-success rounded-pill d-inline">Pending...</p>}
                                                            {myOrder.status === 'pending' &&
                                                                <div><Button className='btn-sm' onClick={() => navigateToCancel(myOrder._id)}>Cancel Now</Button></div>
                                                            }
                                                            {myOrder.status === 'cancelled' && <p className="badge badge-danger rounded-pill d-inline">You Have Cancelled Order</p>}
                                                            {myOrder.status === 'accepted' && <p className="badge badge-success rounded-pill d-inline">Accepted</p>}
                                                            {myOrder.status === 'rejected' && <p>Provider is Rejected</p>}
                                                            {myOrder.status === 'rejectedByAdmin' && <p>Admin has Rejected</p>}

                                                        </td>
                                                        <td>{myOrder.releaseStatus === 'none' && <Link to={`/releasepayment/${myOrder._id}`}><p className="badge badge-info rounded-pill d-inline">Release Payment</p></Link>}
                                                            {myOrder.releaseStatus === 'requested' && <Link to={`/releasepayment/${myOrder._id}`}><Button>Release Payment</Button></Link>}
                                                            {myOrder.releaseStatus === 'released' && <div className="badge badge-success rounded-pill d-inline">Payment Released</div>}</td>
                                                        <td><Link className='text-white' to={`/service/${myOrder.serviceId}`}><p className='badge rounded-pill d-inline'>{myOrder.servicename}</p></Link></td>
                                                        <td><p className='badge badge-success rounded-pill d-inline'>${myOrder.serviceprice}</p></td>
                                                        <td>{myOrder.status === 'cancelled' && <div></div>}
                                                            {myOrder.status === 'pending' && <div></div>}
                                                            {myOrder.status === 'accepted' && myOrder.reviewStatus === 'none' && <Link to={`/reviewasaclient/${myOrder._id}`}><p className="badge badge-success rounded-pill d-inline">Post Review</p></Link>}
                                                            {myOrder.reviewStatus === 'done' && <p className="badge badge-success rounded-pill d-inline" disabled>Reviewed</p>}
                                                        </td>
                                                        <td>
                                                            {
                                                                messages.filter(message => message.orderId === myOrder._id & message.serviceId === myOrder.serviceId).length === 0 && <>
                                                                    <Link to={`/clientmessage/${myOrder._id}`} className="mt-2">
                                                                        <i className="fa-solid fa-message">
                                                                            <img src="https://i.ibb.co/VDR0rvM/send-icon.png" alt="Message" />
                                                                        </i>
                                                                    </Link>
                                                                </>
                                                            }
                                                            {
                                                                messages.filter(message => message.orderId === myOrder._id & message.serviceId === myOrder.serviceId).length > 0 && <>
                                                                    {
                                                                        messages.map(message => message.orderId === myOrder._id && <Link to={`/inbox/${message._id}`} className="mt-2 inbox"><img src="https://i.ibb.co/VDR0rvM/send-icon.png" alt="Message" /></Link>)
                                                                    }

                                                                </>
                                                            }
                                                        </td>
                                                        <td>
                                                            <div className='d-flex justify-content-center'>
                                                                <Link className="badge rounded-pill d-inline" to={`/requirement/${myOrder._id}`}>See Requirement</Link>


                                                            </div>
                                                            <div>{myOrder.reqUpdated === 'requpdated' && <></>}</div>

                                                        </td>
                                                    </tr>).reverse()

                                                }
                                            </tbody>
                                        </Table>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    }

                    {myServiceOrders.length === 0 && <></>}
                    {myServiceOrders.length > 0 &&
                        <div>

                            {
                                myServiceOrders.filter(myServiceOrder => myServiceOrder.status === 'pending').length > 0 &&
                                <div>
                                    <h5>Pending Orders</h5>
                                    <Table striped bordered hover className="table align-middle mb-0 bg-white">
                                        <thead className="bg-light">
                                            <tr>

                                                <th>Date</th>
                                                <th>Client Name</th>
                                                <th>Project Name</th>
                                                <th>Message</th>
                                                <th>Requirement</th>

                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                myServiceOrders.map(myServiceOrder => myServiceOrder.status === 'pending' &&
                                                    <tr>
                                                        <td><p className="badge rounded-pill d-inline">{myServiceOrder.orderDate}</p></td>
                                                        <td><Link to={`/client/${myServiceOrder.clientId}`}><p className="badge badge-success rounded-pill d-inline">{myServiceOrder.clientName}</p></Link>
                                                            <div className='d-flex justify-content-center'>

                                                            </div>
                                                            {myServiceOrder.status === 'pending' &&
                                                                <div>

                                                                    <Link to={`/acceptorreject/${(myServiceOrder._id)}`}><p className="badge badge-warning rounded-pill d-inline">Accept or Reject</p></Link>
                                                                </div>


                                                            }
                                                        </td>
                                                        <td><Link className='text-white' to={`/service/${myServiceOrder.serviceId}`}><p className="badge rounded-pill d-inline">{myServiceOrder.servicename}</p></Link></td>
                                                        <td>

                                                            {
                                                                messages.filter(message => message.orderId === myServiceOrder._id & message.serviceId === myServiceOrder.serviceId).length === 0 && <>
                                                                    <Link to={`/providermessage/${myServiceOrder._id}`} className="mt-2">
                                                                        <i className="fa-solid fa-message">
                                                                            <img src="https://i.ibb.co/VDR0rvM/send-icon.png" alt="Message" />
                                                                        </i>
                                                                    </Link>
                                                                </>
                                                            }
                                                            {
                                                                messages.filter(message => message.orderId === myServiceOrder._id & message.serviceId === myServiceOrder.serviceId).length > 0 && <>
                                                                    {
                                                                        messages.map(message => message.orderId === myServiceOrder._id && <Link to={`/inbox/${message._id}`} className="mt-2 inbox"> <img src="https://i.ibb.co/VDR0rvM/send-icon.png" alt="Message" /></Link>)
                                                                    }

                                                                </>
                                                            }

                                                        </td>
                                                        <td>

                                                            <div>

                                                                <Link to={`/requirement/${(myServiceOrder._id)}`}><p className="badge rounded-pill d-inline">See Requirement</p></Link>
                                                            </div>



                                                        </td>

                                                    </tr>).reverse()
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            }



                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header><p className='accordion-heading'>My Running Projects {myServiceOrders.filter(myServiceOrder => myServiceOrder.runningOrCompleted === 'running').length}</p></Accordion.Header>
                                    <Accordion.Body>
                                        <Table className="table align-middle mb-0 bg-white">
                                            <thead className="bg-light">
                                                <tr>
                                                    <th>Date</th>
                                                    <th>Client</th>
                                                    <th>Payment Status</th>
                                                    <th>Service Name</th>
                                                    <th></th>
                                                    <th>Message</th>
                                                    <th>Requirement</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    myServiceOrders.slice(0, displayCount).map(myServiceOrder => myServiceOrder.runningOrCompleted === 'running' &&

                                                        <tr>
                                                            <td><p className="badge blue rounded-pill d-inline">{myServiceOrder.orderDate}</p></td>
                                                            <td><Link to={`/client/${myServiceOrder.clientId}`}><p className="badge white rounded-pill d-inline">{myServiceOrder.clientName}</p></Link> <br></br>
                                                                <p className="badge white rounded-pill d-inline">{myServiceOrder.customeremail}</p>
                                                                <br></br>
                                                                {myServiceOrder.reqUpdated === 'providerrequpdated' && <></>}
                                                                {myServiceOrder.status === 'pending' &&
                                                                    <div><Button className='btn-sm' onClick={() => navigateToStatus(myServiceOrder._id)}>Accept or Reject</Button></div>
                                                                }
                                                                {myServiceOrder.status === 'accepted' && <p className="badge badge-success rounded-pill d-inline">Accepted</p>}
                                                                {myServiceOrder.status === 'rejected' && <p className="badge badge-success rounded-pill d-inline">You Have Rejected</p>}
                                                                {myServiceOrder.status === 'rejectedByAdmin' && <p className="badge badge-success rounded-pill d-inline">Admin Has Rejected</p>}
                                                                {myServiceOrder.status === 'cancelled' && <p className="badge badge-success rounded-pill d-inline">Client has Cancelled</p>}

                                                            </td>
                                                            <td>{myServiceOrder.releaseStatus === 'none' && <div><span className='badge badge-danger rounded-pill d-inline'>Payment is Not Releasedd</span> <Link to={`/requestpayment/${myServiceOrder._id}`}><span className='badge badge-warning rounded-pill d-inline'>Request Now</span></Link></div>}
                                                                {myServiceOrder.releaseStatus === 'released' && <div className="badge badge-success rounded-pill d-inline">Payment is Released</div>}
                                                                {myServiceOrder.releaseStatus === 'requested' && <div className='badge badge-info rounded-pill d-inline'>You have Requested</div>}
                                                            </td>
                                                            <td><Link className="font-sm rounded-pill d-inline" to={`/service/${myServiceOrder.serviceId}`}><p className='badge rounded-pill d-inline'>{myServiceOrder.servicename}</p></Link></td>

                                                            <td>{myServiceOrder.status === 'cancelled' && <div></div>}
                                                                {myServiceOrder.status === 'pending' && <div></div>}
                                                                {myServiceOrder.status === 'accepted' && myServiceOrder.providerReviewStatus === 'none' && <Link to={`/reviewasaprovider/${myServiceOrder._id}`}><p className='badge badge-success rounded-pill d-inline'>Post Review</p></Link>}
                                                                {myServiceOrder.providerReviewStatus === 'done' && <p className='badge badge-success rounded-pill d-inline' disabled>Reviewed</p>}
                                                            </td>
                                                            <td> {
                                                                messages.filter(message => message.orderId === myServiceOrder._id & message.serviceId === myServiceOrder.serviceId).length === 0 && <>
                                                                    <Link to={`/providermessage/${myServiceOrder._id}`} className="mt-2">
                                                                        <i className="fa-solid fa-message">
                                                                            <img src="https://i.ibb.co/VDR0rvM/send-icon.png" alt="Message" />
                                                                        </i>
                                                                    </Link>
                                                                </>
                                                            }
                                                                {
                                                                    messages.filter(message => message.orderId === myServiceOrder._id & message.serviceId === myServiceOrder.serviceId).length > 0 && <>
                                                                        {
                                                                            messages.map(message => message.orderId === myServiceOrder._id && <Link to={`/inbox/${message._id}`} className="mt-2 inbox"> <img src="https://i.ibb.co/VDR0rvM/send-icon.png" alt="Message" /></Link>)
                                                                        }

                                                                    </>
                                                                }
                                                            </td>
                                                            <td> <div className='d-flex justify-content-center'>
                                                                <div><Link className="badge rounded-pill d-inline" to={`/requirement/${myServiceOrder._id}`}>Requirement</Link></div>
                                                                <div>{myServiceOrder.reqUpdated === 'requpdated' && <p className='updateRequire'>1</p>}</div>
                                                            </div>
                                                            </td>
                                                        </tr>
                                                    ).reverse()
                                                }
                                            </tbody>

                                        </Table>
                                        {displayCount < myServiceOrders.length && (
                                            <div className="text-center mt-3">
                                                <button className="btn btn-primary" onClick={handleLoadMore}>
                                                    Load More
                                                </button>
                                            </div>



                                        )}







                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header><p className='accordion-heading'>Total Completed Projects {myServiceOrders.filter(myServiceOrder => myServiceOrder.runningOrCompleted === 'completed').length}</p></Accordion.Header>
                                    <Accordion.Body>
                                        <Table striped bordered hover className="table align-middle mb-0 bg-white">
                                            <thead className="bg-light">
                                                <tr>
                                                    <th>Client</th>
                                                    <th>Payment Status</th>
                                                    <th>Service Name</th>
                                                    <th>Service Price</th>
                                                    <th></th>
                                                    <th>Message</th>
                                                    <th>Requirement</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    myServiceOrders.slice(0, displayCount).map(myServiceOrder => myServiceOrder.runningOrCompleted === 'completed' &&

                                                        <tr>
                                                            <td><Link to={`/client/${myServiceOrder.clientId}`}><p className='badge blue rounded-pill d-inline'>{myServiceOrder.clientName}</p></Link><br></br>
                                                                <p className='badge white rounded-pill d-inline'>Email {myServiceOrder.customeremail}</p>

                                                                {myServiceOrder.reqUpdated === 'providerrequpdated' && <></>}
                                                                {myServiceOrder.status === 'pending' &&
                                                                    <div><Button className='btn-sm' onClick={() => navigateToStatus(myServiceOrder._id)}>Accept or Reject</Button></div>
                                                                }
                                                                {myServiceOrder.status === 'accepted' && <p className='badge badge-success rounded-pill d-inline'>Accepted</p>}
                                                                {myServiceOrder.status === 'rejected' && <p className='badge badge-success rounded-pill d-inline'>You Have Rejected</p>}
                                                                {myServiceOrder.status === 'rejectedByAdmin' && <p className='badge badge-success rounded-pill d-inline'>Admin Has Rejected</p>}
                                                                {myServiceOrder.status === 'cancelled' && <p className='badge badge-success rounded-pill d-inline'>Client has Cancelled</p>}

                                                            </td>
                                                            <td>{myServiceOrder.releaseStatus === 'none' && <div className='badge badge-success rounded-pill d-inline'>Payment is Not Released</div>}
                                                                {myServiceOrder.releaseStatus === 'released' && <div className='badge badge-success rounded-pill d-inline'>Payment is Released</div>}
                                                                {myServiceOrder.releaseStatus === 'requested' && <div className='badge badge-success rounded-pill d-inline'>You have Requested</div>}
                                                            </td>
                                                            <td><Link className='badge rounded-pill d-inline' to={`/service/${myServiceOrder.serviceId}`}>{myServiceOrder.servicename}</Link></td>
                                                            <td><p className='badge rounded-pill d-inline'>${myServiceOrder.serviceprice}</p></td>
                                                            <td>{myServiceOrder.status === 'cancelled' && <div></div>}
                                                                {myServiceOrder.status === 'pending' && <div></div>}
                                                                {myServiceOrder.status === 'accepted' && myServiceOrder.providerReviewStatus === 'none' && <Link to={`/reviewasaprovider/${myServiceOrder._id}`}><p className='badge badge-success rounded-pill d-inline'>Post Review</p></Link>}
                                                                {myServiceOrder.providerReviewStatus === 'done' && <p className='badge badge-success rounded-pill d-inline' disabled>Reviewed</p>}
                                                            </td>
                                                            <td>

                                                                {
                                                                    messages.filter(message => message.orderId === myServiceOrder._id & message.serviceId === myServiceOrder.serviceId).length === 0 && <>
                                                                        <Link to={`/providermessage/${myServiceOrder._id}`} className="mt-2">
                                                                            <i className="fa-solid fa-message">
                                                                                <img src="https://i.ibb.co/VDR0rvM/send-icon.png" alt="Message" />
                                                                            </i>
                                                                        </Link>
                                                                    </>
                                                                }
                                                                {
                                                                    messages.filter(message => message.orderId === myServiceOrder._id & message.serviceId === myServiceOrder.serviceId).length > 0 && <>
                                                                        {
                                                                            messages.map(message => message.orderId === myServiceOrder._id && <Link to={`/inbox/${message._id}`} className="mt-2 inbox"><i class="fa-solid fa-envelope"></i></Link>)
                                                                        }

                                                                    </>
                                                                }
                                                            </td>
                                                            <td>

                                                                <div className='d-flex justify-content-center'>
                                                                    <div><Link className="badge rounded-pill d-inline" to={`/requirement/${myServiceOrder._id}`}>Requirement</Link></div>
                                                                    <div>{myServiceOrder.reqUpdated === 'requpdated' && <p className='updateRequire'>1</p>}</div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ).reverse()
                                                }
                                            </tbody>
                                        </Table>
                                        {displayCount < myServiceOrders.length && (
                                            <div className="text-center mt-3">
                                                <button className="btn btn-sm btn-primary" onClick={handleLoadMore}>
                                                    Load More
                                                </button>
                                            </div>



                                        )}
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header><p className='accordion-heading'>Rejected Projects {myServiceOrders.filter(myServiceOrder => myServiceOrder.status === 'rejected').length}</p></Accordion.Header>
                                    <Accordion.Body>
                                        <Table striped bordered hover className="table align-middle mb-0 bg-white">
                                            <thead className="bg-light">
                                                <tr>
                                                    <th>Customer</th>
                                                    <th>Project Name</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {myServiceOrders.slice(0, displayCount).map(myServiceOrder =>
                                                    <tr>
                                                        {myServiceOrder.status === 'rejected' && <td><Link to={`/client/${myServiceOrder.clientId}`}><p className='badge badge-success rounded-pill d-inline'>{myServiceOrder.clientName}</p></Link> <p badge badge-success rounded-pill d-inline>You have Rejected</p></td>}
                                                        {myServiceOrder.status === 'rejected' && <td>{myServiceOrder.servicename}</td>}

                                                    </tr>
                                                )}
                                            </tbody>
                                        </Table>
                                        {displayCount < myServiceOrders.length && (
                                            <div className="text-center mt-3">
                                                <button className="btn btn-primary" onClick={handleLoadMore}>
                                                    Load More
                                                </button>
                                            </div>



                                        )}
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="3">
                                    <Accordion.Header><p className='accordion-heading'>Total Order Received {myServiceOrders.length}</p></Accordion.Header>
                                    <Accordion.Body>
                                        <Table striped bordered hover className="table align-middle mb-0 bg-white">
                                            <thead className="bg-light">
                                                <tr>
                                                    <th>Client</th>
                                                    <th>Payment Status</th>
                                                    <th>Service</th>
                                                    <th>Amount</th>
                                                    <th>Review</th>
                                                    <th>Message</th>
                                                    <th>Requirement</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    myServiceOrders.slice(0, displayCount).map(myServiceOrder => <tr>
                                                        <td><Link to={`/client/${myServiceOrder.clientId}`}><p className='badge blue rounded-pill d-inline'>{myServiceOrder.clientName}</p></Link><br></br>
                                                            <p className='badge blue rounded-pill d-inline'>{myServiceOrder.customeremail}</p> <br></br>

                                                            {myServiceOrder.reqUpdated === 'providerrequpdated' && <></>}
                                                            {myServiceOrder.status === 'pending' &&
                                                                <div><Button className='btn-sm' onClick={() => navigateToStatus(myServiceOrder._id)}>Accept or Reject</Button></div>
                                                            }
                                                            {myServiceOrder.status === 'accepted' && <p className='badge badge-success rounded-pill d-inline'>Accepted</p>}
                                                            {myServiceOrder.status === 'rejected' && <p className='badge badge-success rounded-pill d-inline'>You Have Rejected</p>}
                                                            {myServiceOrder.status === 'cancelled' && <p className='badge badge-success rounded-pill d-inline'>Client has Cancelled</p>}

                                                        </td>
                                                        <td>{myServiceOrder.releaseStatus === 'none' && <div className='badge badge-success rounded-pill d-inline'>Payment is Not Released</div>}
                                                            {myServiceOrder.releaseStatus === 'released' && <div className='badge badge-success rounded-pill d-inline'>Payment is Released</div>}</td>
                                                        <td><Link className='badge rounded-pill d-inline' to={`/service/${myServiceOrder.serviceId}`}>{myServiceOrder.servicename}</Link></td>
                                                        <td><p className='badge rounded-pill d-inline'>${myServiceOrder.serviceprice} </p></td>
                                                        <td>{myServiceOrder.status === 'cancelled' && <div></div>}
                                                            {myServiceOrder.status === 'pending' && <div></div>}
                                                            {myServiceOrder.status === 'accepted' && myServiceOrder.providerReviewStatus === 'none' && <Link to={`/reviewasaprovider/${myServiceOrder._id}`}><p className='badge badge-success rounded-pill d-inline'>Post Review</p></Link>}
                                                            {myServiceOrder.providerReviewStatus === 'done' && <p className='badge badge-success rounded-pill d-inline' disabled>Reviewed</p>}
                                                        </td>
                                                        <td>
                                                            {
                                                                messages.filter(message => message.orderId === myServiceOrder._id & message.serviceId === myServiceOrder.serviceId).length === 0 && <>
                                                                    <Link to={`/providermessage/${myServiceOrder._id}`} className="mt-2">
                                                                        <i className="fa-solid fa-message">
                                                                            <img src="https://i.ibb.co/VDR0rvM/send-icon.png" alt="Message" />
                                                                        </i>
                                                                    </Link>
                                                                </>
                                                            }
                                                            {
                                                                messages.filter(message => message.orderId === myServiceOrder._id & message.serviceId === myServiceOrder.serviceId).length > 0 && <>
                                                                    {
                                                                        messages.map(message => message.orderId === myServiceOrder._id && <Link to={`/inbox/${message._id}`} className="mt-2 inbox"> <img src="https://i.ibb.co/VDR0rvM/send-icon.png" alt="Message" /></Link>)
                                                                    }

                                                                </>
                                                            }

                                                        </td>
                                                        <td>
                                                            <div className='d-flex justify-content-center'>
                                                                <div><Link className="badge rounded-pill d-inline" to={`/requirement/${myServiceOrder._id}`}>Requirement</Link></div>
                                                                <div>{myServiceOrder.reqUpdated === 'requpdated' && <p className='updateRequire'>1</p>}</div>
                                                            </div>

                                                        </td>
                                                    </tr>
                                                    ).reverse()
                                                }
                                            </tbody>
                                        </Table>
                                        {displayCount < myServiceOrders.length && (
                                            <div className="text-center mt-3">
                                                <button className="btn btn-primary" onClick={handleLoadMore}>
                                                    Load More
                                                </button>
                                            </div>



                                        )}
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>

                    }

                    {withdraws.length > 0 &&
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>Withdraw Date</th>
                                    <th>Amounts</th>
                                    <th>PayPal Email</th>
                                    <th>Status</th>
                                    <th>Note</th>
                                    <th>TRansaction ID</th>

                                </tr>
                            </thead>
                            <tbody>
                                {withdraws.map(withdraw => <tr>
                                    <td>{withdraw.withdrawalDate}</td>
                                    <td>${withdraw.amount} USD</td>
                                    <td>{withdraw.method}</td>
                                    <td>
                                        {withdraw.status === 'pending' && <p>Pending...</p>}
                                        {withdraw.status === 'accepted' && <>
                                            <p>Accepted</p>
                                            <p>Processed on {withdraw.processDate}</p>
                                        </>
                                        }
                                        {withdraw.status === 'cancelled' && <>
                                            <p>Cancelled</p>
                                            <p>Processed on {withdraw.processDate}</p>
                                        </>}
                                    </td>
                                    <td>{withdraw.note}</td>
                                    <td>{withdraw.transactionId}</td>

                                </tr>).reverse()}

                            </tbody>
                        </Table>
                    }

                </div>
                {
                    clientName.filter(client => client.clientEmail === user?.email).length === 0 && <>
                        {
                            providerName.filter(provider => provider.email === user?.email).length === 0 &&
                            <div>
                                <Link className='btn btn-primary' to={'/setup'}><i class="fa-solid fa-id-card-clip"></i> Update Your Profile</Link>
                            </div>
                        }
                    </>
                }
            </div></>

    );
};

export default Dashboard;