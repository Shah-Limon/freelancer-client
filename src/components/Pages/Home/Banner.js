import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [categoris, setCategoris] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {
    const url = `http://localhost:5000/categoris`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setCategoris(data));
  }, []);

  useEffect(() => {
    const url = `http://localhost:5000/banner`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setBanners(data));
  }, []);

  return (
    <>
      {/* <div className='banner py-5'>
            <div className='container d-flex py-5 banner-container'>
                <div className='d-flex align-items-center banner-text'>
                    <div>
                        {
                            banner.map(b => {b.bannerHeading}>)
                        }
                        {
                            banner.map(b=> <h5>{b.bannerSubHeading}</h5>)
                        }
                        
                        <div className='d-flex justify-content-center'>
                            {
                                categoris.map(category => 
                                    <Link className='btn btn-danger btn-sm' to={`/category/${category.slug}`}><p className='text-white'>{category.categoryName}</p></Link>
                                    )
                            }
                        </div>
                    </div>
                </div>
                <div className='col-lg-5 banner-img'>
                    {
                        banner.map(b=> <img src={b.bannerImg} alt="" />)
                    }
                    
                </div>
            </div>
        </div> */}
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
                {banners.map((banner) => (
                  <h2>{banner.bannerHeading}</h2>
                ))}

                {banners.map((banner) => (
                  <p>{banner.bannerSubHeading}</p>
                ))}

                <div className="row justify-content-center">
                  <div className="col-xl-5 col-lg-7 col-md-10">
                    <div className="s-slider-search-form t-slider-search-form">
                      <form action="#">
                        <input
                          type="text"
                          placeholder="Search what your need..."
                        />
                        <button>
                          <i className="fas fa-search" />
                        </button>
                      </form>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
