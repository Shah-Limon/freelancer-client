import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import './ClientProfile.css';
import BreadcumArea from '../../Shared/BreadcumArea';

const ClientProfile = () => {
    const { clientId } = useParams();
    const [client, setClient] = useState([]);
    const [clientReviews, setClientReviews] = useState([]);
    const imageStyle = {
        height: '15rem',
        width: '14rem',
    };
    useEffect(() => {
        fetch(`http://localhost:5000/client/${clientId}`)
            .then(res => res.json())
            .then(data => setClient(data))
    }, [client]);

    useEffect(() => {
        fetch(`http://localhost:5000/clientprofilereview?customeremail=${client.clientEmail}`)
            .then(res => res.json())
            .then(result => setClientReviews(result))
    }, [clientReviews]);
    return (
        <>

            <div className='container mt-5'>
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
                                                <img src={client.clientProfile} alt="img"
                                                    style={imageStyle}
                                                />
                                            </div>
                                            <div className="t-testi-content">
                                                <p>
                                                    “{client.cLientAbout}”
                                                </p>
                                                <h5>{client.clientName}</h5>

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
               
                <div className='shadow p-3 mt-5 bg-body rounded-5'>
                    <h5>Total: {clientReviews.filter(clientReview => clientReview.providerReviewStatus === 'done').length} Reviews</h5>
                    {
                        clientReviews.map(clientReview =>
                            <div className='col-lg-12 mt-3'>
                                <div>
                                    {clientReview.providerReviewStatus === 'none' && <></>}
                                    {clientReview.providerReviewStatus === 'done' &&
                                        <div className='review p-5'>
                                            {clientReview.providerReviewStatus === 'done' && <div>Provider <h5>{clientReview.providerName}</h5></div>}
                                            {clientReview.providerReviewStatus === 'done' && <p >Rating {clientReview.providerRate} Out of 5</p>}
                                            <p className='font-italic'>"{clientReview.providerReview}"</p>
                                            {clientReview.providerReviewStatus === 'done' && <p>Review: {clientReview.providerReview}</p>}
                                        </div>}
                                </div>

                            </div>).reverse()
                    }
                </div>
            </div>

        </>
    );
};

export default ClientProfile;