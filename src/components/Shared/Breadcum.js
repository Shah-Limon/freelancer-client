import React from 'react';

const Breadcum = ({ title }) => {
    return (
        <section
            className="breadcrumb-area products-breadcrumb-area d-flex align-items-center"
            style={{
                backgroundImage: 'url("https://themebeyond.com/html/makplus/makplus/img/slider/slider_bg02.jpg")',
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="breadcrumb-wrap text-center">
                            <h2>{title}</h2>
                            {/* <Breadcum title="Publish Service" /> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Breadcum;
