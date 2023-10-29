import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import BreadcumArea from '../Shared/BreadcumArea';

function Categories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [slug, setSlug] = useState('');
  const [error, setError] = useState('');

  // Function to generate a slug from the category name
  function generateSlug(categoryName) {
    // Replace spaces with dashes and make it lowercase
    return categoryName.toLowerCase().replace(/\s+/g, '-');
  }

  useEffect(() => {
    const url = 'http://localhost:5000/categoris'; // Correct the endpoint URL
    fetch(url)
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const handleCategory = (event) => {
    event.preventDefault();
    const categoryName = event.target.categoryName.value;

    // Check if a category with the same name already exists
    if (categories.some((category) => category.categoryName === categoryName)) {
      setError('Category with the same name already exists.');
      return;
    }

    const categoryDescription = event.target.categoryDescription.value;
    const generatedSlug = generateSlug(categoryName);

    const adminDetails = { categoryName, slug: generatedSlug, categoryDescription };

    const url = 'http://localhost:5000/categoris'; // Correct the endpoint URL
    fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(adminDetails),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate('/admin');
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle the error as needed, e.g., set an error state.
      });
  };

  return (
    <>
      <div className="container">
        <h2>Total {categories.length} Categories</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Category Name</th>
              <th>View</th>
              <th>Edit</th>
            </tr>
          </thead>
          {categories.map((category, index) => (
            <tbody key={category._id}>
              <tr>
                <td>{index + 1}</td>
                <td>{category.categoryName}</td>
                <td>
                  <Link to={`/category/${category.slug}`}>View</Link>
                </td>
                <td>
                  <Link to={`/edit-category/${category._id}`}>Edit</Link>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
        <form onSubmit={handleCategory} className="mt-4">
          <div className="mb-3">
            <label htmlFor="categoryName" className="form-label">
              Category Name
            </label>
            <input
              type="text"
              name="categoryName"
              id="categoryName"
              className="form-control"
              placeholder="Category Name"
              onChange={(e) => {
                const categoryName = e.target.value;
                const generatedSlug = generateSlug(categoryName);
                setSlug(generatedSlug);
              }}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="slug" className="form-label">
              Category Slug
            </label>
            <input
              type="text"
              name="slug"
              id="slug"
              className="form-control"
              placeholder="Category Slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="categoryDescription" className="form-label">
              Category Description
            </label>
            <textarea
              type="text"
              name="categoryDescription"
              id="categoryDescription"
              className="form-control"
              placeholder="Category Description"
            />
          </div>
          <div className="mb-3">
            <div className="text-danger">{error}</div>
          </div>
          <button type="submit" className="btn btn-primary">
            Add Category
          </button>
        </form>
      </div>
    </>
  );
}

export default Categories;
