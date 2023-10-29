import React from "react";
import { Helmet } from "react-helmet";
import Freelancers from "../Freelancers/Freelancers/Freelancers";
import Services from "../Services/Services";
import Banner from "./Banner";

const Home = () => {
  return (
    <main>
      <Helmet>
        <title>TakeAlancer.com - Find Skilled SEO Experts</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <Banner></Banner>
      <div className="service-bg">
        <Services></Services>
      </div>
      <div ></div>
      <h5>Recent Joined Service Providers</h5>
    </main>
  );
};

export default Home;
