import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
const Service = ({ service }) => {
  const [serviceReviews, setServiceReviews] = useState([]);
  const { id } = useParams();
  const [orders, setOrders] = useState([]);

  const { _id, title, price, img, profileIMG, providerName, category } = service;
  const navigate = useNavigate();

  const navigateToServiceDetails = (id) => {
    navigate(`/service/${id}`);
  };
  const bannerImage = {
    height: '22rem',
    width: '25rem',
  };

  useEffect(() => {
    fetch(`http://localhost:5000/providerreview?serviceId=${service._id}`)
      .then((res) => res.json())
      .then((info) => setServiceReviews(info));
  }, [serviceReviews]);
  useEffect(() => {
    fetch(`http://localhost:5000/orders`)
      .then((res) => res.json())
      .then((result) => setOrders(result));
  }, []);

  return (
    <>
      {/* <div className="single-service-card">
      <Button variant="light" onClick={() => navigateToServiceDetails(_id)}>
        <img className="service-image" src={img} alt="" />
        <div className="service-card p-2">
          <div className="mt-4">
            <p className="title">{title}</p>
            <div className="d-flex justify-content-start mt-2">
              <img className="profile-image" src={profileIMG} alt="" />
              <p>{providerName}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p>${price}usd/Mo</p>
              <p>
                {
                  serviceReviews.filter(
                    (review) => review.reviewStatus === "done"
                  ).length
                }{" "}
                Reviews
              </p>
            </div>
          </div>
        </div>
      </Button>
    </div> */}

      <div className="col-lg-4 col-md-6">
        <div className="single-product t-single-product mb-30">
          <div className="product-img">
            <Link to={`service/${_id}`}>
              <img src={img} alt="img"

                className="service-image"

              />

            </Link>
          </div>
          <div className="t-product-overlay">
            <h5>
              <Link to={`service/${_id}`}>
                {title}
              </Link>
            </h5>
            <span>{category}</span>
            <p>{orders.filter(order => order.serviceId === service._id).length} Sales</p>

            <div className="t-product-meta">
              <p>
                {
                  serviceReviews.filter(
                    (review) => review.reviewStatus === "done"
                  ).length
                }{" "}
                Reviews
              </p>
              <h6>${price} Usd/Mo</h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Service;
