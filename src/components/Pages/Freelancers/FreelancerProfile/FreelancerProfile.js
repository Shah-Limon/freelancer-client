import React, { useEffect, useState } from 'react';
import { Accordion, Table } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './FreelancerProfile.css';
import { Button } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../../firebase.init';
import BreadcumArea from '../../../Shared/BreadcumArea';


const FreelancerProfile = () => {
    const { freelancerId } = useParams();
    const [freelancer, setFreelancer] = useState([]);
    const [userServices, setUserServices] = useState([]);
    const [orders, setOrders] = useState([]);
    const [categoris, setCategoris] = useState([]);
    const [providerReviews, setProviderReviews] = useState([]);
    const [totalEarns, setTotalEarns] = useState([]);
    const navigate = useNavigate();
    const [user] = useAuthState(auth);


    useEffect(() => {
        fetch(`http://localhost:5000/categoris`)
            .then((res) => res.json())
            .then((result) => setCategoris(result));
    }, []);
    useEffect(() => {
        fetch(`http://localhost:5000/orders`)
            .then((res) => res.json())
            .then((result) => setOrders(result));
    }, []);

    const imageStyle = {
        height: '15rem',
        width: '14rem',
    };
    const imageSizeInRem = {
        height: '7.5rem',
        width: '7.5rem',
    };
    const bannerImage = {
        height: '22rem',
        width: '25rem',
    };

    let total = 0;
    for (const totalEarn of totalEarns) {
        total = total + parseFloat(totalEarn.releaseAmount);
    }



    useEffect(() => {
        fetch(`http://localhost:5000/freelancer/${freelancerId}`)
            .then(res => res.json())
            .then(data => setFreelancer(data))
    }, [freelancer]);

    useEffect(() => {
        fetch(`http://localhost:5000/userservice?email=${freelancer.email}`)
            .then(res => res.json())
            .then(result => setUserServices(result))
    }, [userServices]);

    useEffect(() => {
        fetch(`http://localhost:5000/providerprofilereview?provideremail=${freelancer.email}`)
            .then(res => res.json())
            .then(review => setProviderReviews(review))
    }, [providerReviews]);


    useEffect(() => {
        const url = `http://localhost:5000/myserviceorder?email=${freelancer.email}`
        fetch(url)
            .then(res => res.json())
            .then(data => setTotalEarns(data));

    }, [totalEarns])


    const navigateToDetails = id => {
        navigate(`/service/${id}`)
    };


    return (
        <>
          
            <main>

                <div className="container">
                    <div className="t-testimonial-wrap">
                        <div className="row t-testi-active slick-initialized slick-slider">
                            <button
                                type="button"
                                className="slick-prev slick-arrow"
                                style={{ display: "block" }}
                            >

                            </button>
                            <div className="slick-list draggable">
                                <div className="slick-track" style={{ opacity: 1, width: 2000 }}>
                                    <div
                                        className="col-12 slick-slide slick-current slick-active"
                                        data-slick-index={0}
                                        aria-hidden="false"
                                        tabIndex={0}
                                        style={{
                                            width: 980,
                                            position: "relative",
                                            left: 0,
                                            top: 0,
                                            zIndex: 999,
                                            opacity: 1
                                        }}
                                    >
                                        <div className="t-single-testimonial">
                                            <div className="t-testi-img">
                                                <img src={freelancer.profile} alt="img"
                                                    style={imageStyle}
                                                />
                                            </div>
                                            <div className="t-testi-content">
                                                <p>
                                                    “{freelancer.about}”
                                                </p>
                                                <h5>{freelancer.name}</h5>
                                                <span>{freelancer.heading}</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <button
                                type="button"
                                className="slick-next slick-arrow"
                                style={{ display: "block" }}
                            >

                            </button>
                        </div>
                    </div>
                </div>

                <section className="vendor-profile gray-bg pt-120 pb-120">
                    <div className="container">
                        <div className="t-product-wrap">
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="row">
                                        {
                                            userServices.map(useService =>
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="single-product t-single-product mb-30">
                                                        <div className="product-img">
                                                            <a href="#">
                                                                <img src={useService.img} alt="img"/>
                                                            </a>
                                                        </div>
                                                        <div className="t-product-overlay">
                                                            <h5>
                                                                <Link to={`/service/${useService._id}`}>{useService.title}</Link>


                                                            </h5>
                                                            <span>Digital Marketplace</span>
                                                            {/* <p>14 Sales</p> */}
                                                            <p>{orders.filter(order => order.serviceId === useService._id).length} Sales</p>
                                                            <div className="t-product-meta">
                                                                <div className="t-product-rating">
                                                                    <i className="far fa-star" />
                                                                    <i className="far fa-star" />
                                                                    <i className="far fa-star" />
                                                                    <i className="far fa-star" />
                                                                    <i className="far fa-star" />
                                                                </div>
                                                                <h6>$29.00</h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            )
                                        }


                                    </div>
                                    <div className="pagination-wrap mt-30 text-center">
                                        <nav>
                                            <ul className="pagination">

                                                <li className="page-item active">
                                                    <a href="#">01</a>
                                                </li>
                                                <li className="page-item">
                                                    <a href="#">02</a>
                                                </li>
                                                <li className="page-item">
                                                    <a href="#">03</a>
                                                </li>
                                                <li className="page-item">
                                                    <a href="#">...</a>
                                                </li>
                                                <li className="page-item">
                                                    <a href="#">10</a>
                                                </li>

                                            </ul>
                                        </nav>
                                    </div>
                                    <div className='shadow p-3 mt-5 bg-body rounded-5'>
                                        <h5>Total: {providerReviews.filter(review => review.reviewStatus === 'done').length} Reviews</h5>
                                        {
                                            providerReviews.map(review => <div key={review._id}>
                                                <div className='col-lg-12 mt-3'>
                                                    <div>
                                                        {review.reviewStatus === 'none' && <></>}
                                                        {review.reviewStatus === 'done' &&
                                                            <div className='review p-5'><h6>Client: {review.clientName}: </h6>
                                                                <p>Rate: {review.rate} out of 5</p>
                                                                <p className='font-italic'>"{review.review}"</p>
                                                            </div>}
                                                    </div>
                                                </div>
                                            </div>).reverse()
                                        }
                                    </div>
                                </div>

                                <div className="col-lg-4">
                                    <aside className="vendor-profile-sidebar">
                                        <h5 className="vendor-wrap-title">Author Details</h5>
                                        <div className="vendor-info-wrap text-center">
                                            <div className="vendor-thumb mb-10">
                                                <a href="#">
                                                    <img src={freelancer.profile} alt="img"
                                                        style={imageSizeInRem} />
                                                </a>
                                            </div>
                                            <div className="vendor-info mb-25">
                                                <h4>{freelancer.name}</h4>
                                                <span>Vendor Portfolio</span>
                                            </div>
                                            <div className="vendor-action">


                                                <div><span> Total Earning</span>  <h4 className="profile-sale-count"> ${total} USD</h4></div>



                                                <div className="profile-rating">
                                                    <i className="fas fa-star" />
                                                    <i className="fas fa-star" />
                                                    <i className="fas fa-star" />
                                                    <i className="fas fa-star" />
                                                    <i className="fas fa-star" />
                                                    <span>({providerReviews.filter(review => review.reviewStatus === 'done').length} To Reviews)</span>
                                                </div>
                                            </div>
                                            <div className="vendor-product-thumb">
                                                <ul>
                                                    <li>
                                                        <a href="#">
                                                            <img
                                                                src="https://themebeyond.com/html/makplus/makplus/img/product/vendor_product_thumb01.jpg"
                                                                alt="img"
                                                            />
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <img
                                                                src="https://themebeyond.com/html/makplus/makplus/img/product/vendor_product_thumb02.jpg"
                                                                alt="img"
                                                            />
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <img
                                                                src="https://themebeyond.com/html/makplus/makplus/img/product/vendor_product_thumb03.jpg"
                                                                alt="img"
                                                            />
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="vendor-profile-cat">
                                            <h5 className="vendor-sidebar-title">Service Categories</h5>
                                            <ul>

                                                {
                                                    categoris.map(category =>
                                                        <>
                                                            {
                                                                userServices.map(service => service.category === category.categoryName &&
                                                                    <li>
                                                                        <a href="#">
                                                                            {category.categoryName}<span>{
                                                                                userServices.filter(service => category.categoryName === service.category).length
                                                                                }</span>
                                                                        </a>
                                                                    </li>
                                                                )
                                                            }
                                                        </>

                                                    )
                                                }


                                            </ul>
                                        </div>
                                        
                                    </aside>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>




                {/* <div className='provider-profile'>
                    <div className='container'>
                        <div className='d-flex justify-content-between freelancer-profile'>
                            <div className='col-lg-3'>
                                <div className='profile shadow p-3 mt-5 bg-body rounded-5'>
                                    <img src={freelancer.profile} alt="" />
                                    <h5 className='freelancer-name'>{freelancer.name}</h5>
                                    <p>{freelancer.heading}</p>
                                    <h5>Total Earned ${total} USD</h5>
                                    <p><i class="fa-solid fa-location-dot"></i> {freelancer.location}</p>
                                    <p>Available for work: {freelancer.available}</p>
                                </div>
                                <div>
                                    <div className='marketplace shadow p-3 mb-2 bg-body rounded-5'>
                                        <div className='working'><h3>I am working on</h3></div>
                                        <Table className='verified' striped bordered hover variant="dark">
                                            <tbody>
                                                <tr>
                                                    <td><h5>Marketplace <i class="fa-solid fa-check"></i></h5></td>
                                                    <td>{freelancer.marketplace}</td>

                                                </tr>
                                            </tbody>
                                            <tbody>
                                                <tr>
                                                    <td><h5>Total Reviews <i class="fa-solid fa-check"></i></h5></td>
                                                    <td>{freelancer.totalreviews}</td>
                                                </tr>
                                            </tbody>
                                            <tbody>
                                                <tr>
                                                    <td><h5>Project Completed <i class="fa-solid fa-check"></i></h5></td>
                                                    <td>{freelancer.projectcompleted}</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>

                                <div className='shadow p-3 mb-2 bg-body rounded-5'>
                                    <h5>Social Profile</h5>
                                    <div className='d-flex justify-content-center'>
                                        <a className='mx-2' href={freelancer.fb}><h3><i class="fa-brands fa-facebook"></i></h3></a>
                                        <a className='mx-2' href={freelancer.twitter}><h3><i class="fa-brands fa-twitter-square"></i></h3></a>
                                        <a className='mx-2' href={freelancer.linkedin}><h3><i class="fa-brands fa-linkedin"></i></h3></a>
                                    </div>
                                </div>
                                <div className='profile shadow p-3 mb-2 bg-body rounded-5'>
                                    <p>Experience: {freelancer.experience}</p>
                                    <h5>Skills</h5>
                                    <button>{freelancer.onpageseo}</button> <button>{freelancer.offpageseo}</button> <button>{freelancer.technicalseo}</button><button>{freelancer.lead}</button><button>{freelancer.social}</button>
                                </div>
                            </div>
                            <div className='col-lg-9 profile-info'>
                                <div className='shadow p-3 mt-5 bg-body rounded-5'>
                                    <Accordion defaultActiveKey="0" flush>
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header><h5 className='text-center'>About Me</h5></Accordion.Header>
                                            <Accordion.Body>
                                                {freelancer.about}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="1">
                                            <Accordion.Header><h5 className='text-center'>My Services {userServices.length}</h5></Accordion.Header>

                                            <Accordion.Body>
                                                <div className='user-services'>
                                                    {
                                                        userServices.map(useService =>
                                                            <div key={useService._id}>
                                                                <Button variant="light" onClick={() => navigateToDetails(useService._id)}><img className='profile-service-img' src={useService.img} alt="" />
                                                                    <p>{useService.title}</p></Button>
                                                            </div>

                                                        )
                                                    }
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </div>
                                <div className='shadow p-3 mt-5 bg-body rounded-5'>
                                    <h5>Total: {providerReviews.filter(review => review.reviewStatus === 'done').length} Reviews</h5>
                                    {
                                        providerReviews.map(review => <div key={review._id}>
                                            <div className='col-lg-6 mt-3'>
                                                <div>
                                                    {review.reviewStatus === 'none' && <></>}
                                                    {review.reviewStatus === 'done' &&
                                                        <div className='review'><h6>Client: {review.clientName}: </h6>
                                                            <p>Rate: {review.rate} out of 5</p>
                                                            <p className='client-review font-italic'>"{review.review}"</p>
                                                        </div>}
                                                </div>
                                            </div>
                                        </div>).reverse()
                                    }
                                </div>
                            </div>
                        </div>


                    </div>
                </div> */}
                </main>
        </>


    );
};

export default FreelancerProfile;