import { useState } from "react";
import { Link } from "react-router-dom";
import useServices from "../../hooks/useServices";
import Service from "./Service";

const Services = () => {
  const [services] = useServices();
  const itemsPerPage = 6;
  const totalPages = Math.ceil(services.length / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbers = 3;
    let start = currentPage - Math.floor(maxPageNumbers / 2);
    let end = currentPage + Math.floor(maxPageNumbers / 2);

    if (start < 1) {
      start = 1;
      end = Math.min(start + maxPageNumbers - 1, totalPages);
    }

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - maxPageNumbers + 1, 1);
    }

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const currentServices = services
    .filter((service) => service.publishStatus === "Published")
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <section className="product-area gray-bg pt-120 pb-120">
      <div className="container">
        <div className="t-product-wrap">
          <div className="row">
            {currentServices.map((service) => (
              <Service key={service._id} service={service}></Service>
            ))}
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="pagination-wrap mt-30 text-center">
              <nav>
                <ul className="pagination">
                  <li className="page-item">
                    <a
                      href="#"
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      <i className="fas fa-chevron-left" />
                    </a>
                  </li>
                  {getPageNumbers().map((pageNumber) => (
                    <li
                      key={pageNumber}
                      className={`page-item ${
                        pageNumber === currentPage ? "active" : ""
                      }`}
                    >
                      <a  onClick={() => handlePageChange(pageNumber)}>
                        {pageNumber}
                      </a>
                    </li>
                  ))}
                  <li className="page-item">
                    <a
                     
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      <i className="fas fa-chevron-right" />
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
