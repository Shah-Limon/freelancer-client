import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { Helmet } from "react-helmet";
import { Link, useNavigate, useParams } from "react-router-dom";
import auth from "../../../firebase.init";
import useOrderItem from "../../hooks/useOrderItem";

const ServiceDetails = () => {
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const [service] = useOrderItem();

  const [orders, setOrders] = useState([]);
  const [userProfile, setUserProfile] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [user] = useAuthState(auth);
  const { id } = useParams();


  useEffect(() => {
    fetch(`http://localhost:5000/orders`)
      .then((res) => res.json())
      .then((result) => setOrders(result));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/freelancerprofile?email=${service.email}`)
      .then((res) => res.json())
      .then((result) => setUserProfile(result));
  }, [userProfile]);

  useEffect(() => {
    fetch(`http://localhost:5000/providerreview?serviceId=${service._id}`)
      .then((res) => res.json())
      .then((info) => setReviews(info));
  }, [reviews]);

  const navigateToOrderPage = (id) => {
    navigate(`/order/${id}`);
  };
  const navigateTouserProfile = (id) => {
    navigate(`/freelancer/${id}`);
  };
  return (
    <>
      <div className="service-details-page">
        <Helmet>
          <title>TakeALancer.com Details</title>
          <meta name="description" content="Helmet application" />
        </Helmet>

      </div>

      <main>
        <section
          className="breadcrumb-area products-breadcrumb-area d-flex align-items-center"
          style={{
            backgroundImage:
              'url("https://themebeyond.com/html/makplus/makplus/img/slider/slider_bg02.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="breadcrumb-wrap text-center">
                  <h2>{service.title}</h2>

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* product-details-area */}

        <section className="product-details gray-bg pt-120 pb-120">
          <div className="container">
            <div className="t-product-wrap">
              <div className="row">
                <div className="col-lg-8">
                  <div className="product-details-wrap">
                    <div className="product-details-thumb">
                      <img src={service.img} alt="img" />
                    </div>
                    <div className="product-details-tab">
                      <ul className="nav product-tab" id="myTab" role="tablist">
                        <li className="nav-item">
                          <a
                            className="nav-link btn active"
                            id="item-details-tab"
                            data-toggle="tab"
                            href="#item-details"
                            role="tab"
                            aria-controls="item-details"
                            aria-selected="true"
                          >
                            Item Details
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link btn"
                            id="product-reviews-tab"
                            data-toggle="tab"
                            href="#product-reviews"
                            role="tab"
                            aria-controls="product-reviews"
                            aria-selected="false"
                          >
                            Reviews
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link btn"
                            id="product-support-tab"
                            data-toggle="tab"
                            href="#product-support"
                            role="tab"
                            aria-controls="product-support"
                            aria-selected="false"
                          >
                            Support
                          </a>
                        </li>
                      </ul>
                      <div
                        className="tab-content product-tab-content"
                        id="myTabContent"
                      >
                        <div
                          className="tab-pane fade show active"
                          id="item-details"
                          role="tabpanel"
                          aria-labelledby="item-details-tab"
                        >
                          <div className="product-details-content">
                            <h2> About My Service:</h2>
                            <hr></hr>

                            <h3>{service.title}</h3>

                            <p>
                              {service.details}
                            </p>

                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="product-reviews"
                          role="tabpanel"
                          aria-labelledby="product-reviews-tab"
                        >
                          <div className="item-comment-wrap">
                            {
                              orders.map(review => review.serviceId === service._id && review.provideremail === service.email &&
                                <div className="item-single-comment">
                                  <ul>
                                    <li>
                                      <div className="item-comment-avatar">
                                        <a href="#">
                                          <img
                                            src="img/product/item_comment_avatar01.jpg"
                                            alt="img"
                                          />
                                        </a>
                                      </div>
                                      <div className="item-comment-content">
                                        <h5>
                                          <a href="#">{review.clientName}</a>
                                        </h5>
                                        <span>

                                        </span>
                                        <small>2 days ago</small>
                                        <p>
                                          {review.review}
                                        </p>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              ).reverse()
                            }

                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="product-support"
                          role="tabpanel"
                          aria-labelledby="product-support-tab"
                        >
                          <div className="product-details-content">
                            <h3>Marktplus - Engineering WordPress Theme</h3>
                            <p>
                              There are many variations of passages of Lorem
                              Ipsum available, but the majority have suffered
                              alteration in some form, by injected humour, or
                              randomised words which don't look even slightly
                              believable. If you are going to use a passage of
                              Lorem Ipsum, you need to be sure there isn't
                              anything embarrassing hidde.
                            </p>
                            <p>
                              But the majority have suffered alteration in some
                              form, by injected humour, or domised words which
                              don't look even slightly believable. If you are
                              going to use a passage Lorem Ipsum, you need sure
                              there isn't anything.
                            </p>
                            <div className="product-details-features">
                              <h4>Features Marktplus</h4>
                              <p>
                                Alteration in some form, by injected humour, or
                                domised words which.
                              </p>
                              <ul>
                                <li>Full WooCommerce integration</li>
                                <li>
                                  Compatible Browsers – IE9+, Chrome, Safari,
                                  Opera, Firefox
                                </li>
                                <li>
                                  All settings defined via customization API
                                </li>
                                <li>Files Included – php, html, JS, css</li>
                                <li>Compatible with – Elementor</li>
                              </ul>
                            </div>
                            <p>
                              Majority have suffered alteration in some form, by
                              injected humour, or domised words which don't look
                              even slightly by injected humour, or domised have
                              suffered alteration in some believable njected
                              humour.
                            </p>
                            <div className="product-details-source">
                              <h4>Sources and Credits:</h4>
                              <p>
                                A full list of all the sources and services we
                                use to build :
                              </p>
                              <ul>
                                <li>FontAwesome</li>
                                <li>Parallax</li>
                                <li>Owl carosel</li>
                                <li>Free Image Used</li>
                                <li>Google Font Use</li>
                              </ul>
                            </div>
                            <p className="product-details-note">
                              Please Note : All images are only for demo preview
                              and NOT included in purchase files.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <aside className="vendor-profile-sidebar item-details-sidebar">
                    <h5 className="vendor-wrap-title">Service DETAILS</h5>
                    <div className="item-sidebar-action text-center">
                      <div className="item-price-count mb-25">
                        <h4>${service.price}</h4>
                      </div>
                      <div className="item-sidebar-btn mb-25">
                        <Link to={`/order/${service._id}`} className="btn">
                          ${service.price} Purchase Now
                        </Link>
                        {/* <a href="#" className="btn item-prev-btn">
                              Live Preview
                            </a> */}
                      </div>
                    </div>
                    <div className="sidebar-item-info">
                      <h5 className="vendor-sidebar-title text-center">
                        Information
                      </h5>
                      <ul>
                        <li>
                          Price<span>${service.price}usd</span>
                        </li>
                        <li>
                          Total Sales<span>{orders.filter(order => order.serviceId === service._id).length}</span>
                        </li>

                        <li>
                          Category<span>{service.category}</span>
                        </li>
                        <li>
                          Customer Rating
                          <span>
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="vendor-info-wrap text-center">
                      <div className="vendor-thumb mb-10">
                        {userProfile.map((u) => (
                          <>
                            <img
                              src={u.profile}
                              alt="img"
                              style={{ width: "7.5rem", height: "7.5rem" }}
                            />
                            <div className="vendor-info mb-25">

                              <Link to={`/freelancer/${service.providerId}`}> <h4>{u.name}</h4></Link>



                              <p>Experience{u.experience}</p>
                              <div className="verify-status">

                                <p className="verified-by-takealancer">

                                  <Link
                                    to={`/message/${service._id}`}
                                    className="btn user-btn mt-2"
                                  >
                                    <i class="fa-solid fa-message"></i> Message Me
                                  </Link>
                                  <div class="item-sidebar-btn mb-25">
                                    <Link  class="btn" to={`/freelancer/${service.providerId}`}> View Profile</Link>
                                    </div>

                                 
                                </p>

                                <hr></hr>
                                <h4>About</h4>
                                <p>{u.about}</p>
                                <hr></hr>

                              </div>
                            </div>


                           
                          </>
                        ))}
                      </div>
                    </div>

                    <div className="product-sidebar-tag">
                      <h5 className="vendor-sidebar-title text-center">
                        Skilled
                      </h5>
                      {userProfile.map((u) => (
                        <ul>
                          <li>
                            <a href="#">{u.onpageseo}</a>
                            <a>{u.onpageseo}</a>
                            <a>{u.onpageseo}</a>
                            <a>{u.onpageseo}</a>
                            <a>{u.onpageseo}</a>
                          </li>
                        </ul>
                      ))}
                    </div>


                  </aside>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* product-details-area-end */}
        {/* <div className="container d-flex justify-content-center profile-service">
          <div className="service-details container col-lg-9 shadow p-3 mb-5 bg-body rounded-5">
            <div className="service-title">
              <h5>{service.title}</h5>
            </div>
            <img src={service.img} alt="" />
            <h5 className="mt-3">About My Service:</h5>
            <div className="verify-status">
              <div className="d-flex justify-content-center verified">
                <p className="mx-2">
                  Verified Provider <i class="fa-solid fa-check"></i>
                </p>
                <p className="mx-2">
                  Verified Service <i class="fa-solid fa-check"></i>
                </p>
              </div>
              <p className="verified-by-takealancer">
                (Verified by TakeALancer Team)
              </p>

            </div>
            {service.publishStatus === "Published" && (
              <Button
                className="price-btn"
                onClick={() => navigateToOrderPage(service._id)}
              >
                Price ${service.price}usd/ Mo
              </Button>
            )}
            {service.publishStatus === "Unpublished" && (
              <Button>This Service is Not Published</Button>
            )}
            <p>{service.details}</p>
            {service.publishStatus === "Pending" && (
              <Button>This Service is Not Published</Button>
            )}
          </div>
          <div className="col-lg-3">
            <div className="user-profile shadow p-3 mb-5 bg-body rounded-5">
              {userProfile.map((u) => (
                <div key={u._id}>
                  <img src={u.profile} alt="" />
                  <h5>{u.name}</h5>
                  <p>
                    <i class="fa-solid fa-location-dot"></i> {u.location}
                  </p>
                  <Button
                    className="mx-5 user-btn"
                    onClick={() => navigateTouserProfile(u._id)}
                  >
                    <i class="fa-solid fa-user"></i> View Profile
                  </Button>
                </div>
              ))}
              <Link
                to={`/message/${service._id}`}
                className="btn user-btn mt-2"
              >
                <i class="fa-solid fa-message"></i> Message Me
              </Link>
            </div>
            <div className="buy-service mt-3">
              {service.publishStatus === "Published" && (
                <Button onClick={() => navigateToOrderPage(service._id)}>
                  Buy this service ${service.price}usd/ Mo
                </Button>
              )}
              {service.publishStatus === "Unpublished" && (
                <Button>This Service is Not Published</Button>
              )}

              {service.publishStatus === "Pending" && (
                <Button>This Service is Not Published</Button>
              )}
            </div>
          </div>
        </div>
        <div className="container mt-5">
          <h5>
            Total:{" "}
            {reviews.filter((review) => review.reviewStatus === "done").length}{" "}
            Reviews
          </h5>
          {reviews
            .map((review) => (
              <div key={review._id}>
                <div className="col-lg-6 mt-3">
                  <div>
                    {review.reviewStatus === "none" && <></>}
                    {review.reviewStatus === "done" && (
                      <div className="review">
                        <h6>Client: {review.clientName}: </h6>
                        <p>Rate: {review.rate} out of 5</p>
                        <p className="client-review font-italic">
                          "{review.review}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
            .reverse()}
        </div> */}
      </main>
    </>
  );
};

export default ServiceDetails;
