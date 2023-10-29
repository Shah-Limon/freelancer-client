import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const [footers, setFooters] = useState([]);
  const [categoris, setCategoris] = useState([]);

  useEffect(() => {
    const url = `http://localhost:5000/categoris`
    fetch(url)
      .then(res => res.json())
      .then(data => setCategoris(data));
  }, []);

  useEffect(() => {
    const url = `http://localhost:5000/footer`
    fetch(url)
      .then(res => res.json())
      .then(data => setFooters(data));
  }, []);
  return (
    <>
      {/* <div className='footer'>
            {
                footers.map(f =>
                    <>
                        <img className='footer-logo' src={f.footerLogo} alt="" />
                        <div className='d-flex justify-content-between container footer-container'>
                            <div className=' col-lg-4'>
                                <p className='text-white'>{f.footerText}</p>
                                <p className='text-white'><i class="fa-solid fa-at"></i> {f.footerEmail}</p>
                            </div>
                            <div className='col-lg-4 menu-list'>
                                <li><Link className='text-white text-left' to={'/'}>Home</Link></li>
                                <li><Link className='text-white text-left' to={'/about'}>About</Link></li>
                                <li><Link className='text-white text-left' to={'/contact'}>Contact Us</Link></li>
                                {
                                    categoris.map(category => 
                                        <li><Link className='text-white text-left' to={`/category/${category.slug}`}>{category.categoryName}</Link></li>
                                        )
                                }
                               
                            </div>
                            <div className='d-flex justify-content-center col-lg-4 social-icons'>
                                <a href={f.facebookURL}><i class="fa-brands fa-facebook"></i></a>
                                <a href={f.twitterURL}><i class="fa-brands fa-twitter"></i></a>
                                <a href={f.youtubeURL}><i class="fa-brands fa-youtube"></i></a>
                                <a href={f.liniedInURL}><i class="fa-brands fa-linkedin"></i></a>
                            </div>
                        </div>
                        <p className='text-white mt-5'>{f.copyRight}</p>
                    </>
                )
            }

        </div> */}

      <footer>
        <div className="footer-top-wrap black-bg pt-90 pb-35">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="logo text-center mb-30">
                  <a href="#">
                    <img src="https://themebeyond.com/html/makplus/makplus/img/logo/w_logo.png" alt="Logo" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-6">
                <div className="footer-widget mb-50 pr-80">
                  <div className="fw-title mb-30">
                    <h5>About Market</h5>
                  </div>
                  <div className="footer-text mb-35">
                    <p>
                      Popularised in the with the release of etras sheets containing
                      passages and more rcently with desop publishing software like
                      Maker including versions.
                    </p>
                  </div>
                  <div className="footer-social">
                    <ul>
                      <li>
                        <a href="#">
                          <i className="fab fa-facebook-f" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-twitter" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-pinterest-p" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-linkedin-in" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-3 col-sm-6">
                <div className="footer-widget mb-50">
                  <div className="fw-title mb-30">
                    <h5>PRODUCT List</h5>
                  </div>
                  <div className="fw-link">
                    <ul>
                      <li>
                        <a href="#">Pricing</a>
                      </li>
                      <li>
                        <a href="#">LiveChat Benefits</a>
                      </li>
                      <li>
                        <a href="#">Tour</a>
                      </li>
                      <li>
                        <a href="#">Features</a>
                      </li>
                      <li>
                        <a href="#">Use Cases</a>
                      </li>
                      <li>
                        <a href="#">App</a>
                      </li>
                      <li>
                        <a href="#">Marketplace</a>
                      </li>
                      <li>
                        <a href="#">Updates</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-3 col-sm-6">
                <div className="footer-widget mb-50">
                  <div className="fw-title mb-30">
                    <h5>RESOURCES</h5>
                  </div>
                  <div className="fw-link">
                    <ul>
                      <li>
                        <a href="#">Blog</a>
                      </li>
                      <li>
                        <a href="#">Infographics</a>
                      </li>
                      <li>
                        <a href="#">Reports</a>
                      </li>
                      <li>
                        <a href="#">Podcast</a>
                      </li>
                      <li>
                        <a href="#">Benchmark</a>
                      </li>
                      <li>
                        <a href="#">Update</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-3 col-sm-6">
                <div className="footer-widget mb-50">
                  <div className="fw-title mb-30">
                    <h5>CUSTOMERS</h5>
                  </div>
                  <div className="fw-link">
                    <ul>
                      <li>
                        <a href="#">Pricing</a>
                      </li>
                      <li>
                        <a href="#">LiveChat Benefits</a>
                      </li>
                      <li>
                        <a href="#">Tour</a>
                      </li>
                      <li>
                        <a href="#">Features</a>
                      </li>
                      <li>
                        <a href="#">Use Cases</a>
                      </li>
                      <li>
                        <a href="#">App</a>
                      </li>
                      <li>
                        <a href="#">Marketplace</a>
                      </li>
                      <li>
                        <a href="#">Updates</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-4 col-md-3 col-sm-6">
                <div className="footer-widget mb-50">
                  <div className="fw-title mb-30">
                    <h5>SUPPORT center</h5>
                  </div>
                  <div className="fw-link">
                    <ul>
                      <li>
                        <a href="#">Help Center</a>
                      </li>
                      <li>
                        <a href="#">Community</a>
                      </li>
                      <li>
                        <a href="#">Webinars</a>
                      </li>
                      <li>
                        <a href="#">Experts Marketplace</a>
                      </li>
                      <li>
                        <a href="#">API &amp; Developers</a>
                      </li>
                      <li>
                        <a href="#">System Status</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright-wrap">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <div className="copyright-text">
                  <p>
                    Copyright © 2019 <a href="#">Makplus</a> All Rights Reserved.
                  </p>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 d-none d-md-block">
                <div className="payment-method-img text-right">
                  <img src="img/images/card_img.png" alt="img" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>


    </>
  );
};

export default Footer;