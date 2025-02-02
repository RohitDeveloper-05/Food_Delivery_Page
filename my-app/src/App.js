// import { useReducer } from "react";

import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaTh, FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import "./App.css";

const App = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  //console.log(categories)

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/categories`).then((res) => {
      setCategories(res.data);
    });
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/products?category=${selectedCategory}`
        )
        .then((res) => {
          setProducts(res.data);
        });
    }
  }, [selectedCategory]);

  const handleSearch = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/products?search=${searchQuery}`)
      .then((res) => {
        setProducts(res.data);
      });
  };

  return (
    <div>
      <nav className="navbar navbar-light bg-white shadow-sm px-4">
        <div className="d-flex align-items-center">
          <img
            src="/Assets/asset_logo.webp"
            alt="Pizza Heist"
            className="me-2"
            style={{ width: "40px", height: "40px" }}
          />
          <span className="fw-bold fs-5">Pizza Heist</span>
        </div>
        <div className="flex-grow-1 mx-3 d-flex">
          <input
            type="text"
            className="form-control"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn btn-primary ms-2" onClick={handleSearch}>
            <FaSearch />
          </button>
        </div>
        <div className="d-flex gap-3">
          <span className="d-flex align-items-center gap-1">
            <FaTh /> Categories
          </span>
          <span className="d-flex align-items-center gap-1">
            <FaShoppingCart /> Cart
          </span>
          <span className="d-flex align-items-center gap-1">
            <FaUser /> Account
          </span>
        </div>
      </nav>

      <div className="container mt-4">
        {/* <h1 className="text-center">Pizza Heist</h1> */}
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-4">
              <div className="card p-3 h-100 d-flex shadow-sm">
                <img
                  src="/Assets/assets_1.webp"
                  alt="New Arrivals"
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-3 h-100 d-flex shadow-sm ">
                <img
                  src="/Assets/assets_2.webp"
                  alt="Free Home Delivery"
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-3 h-100 d-flex shadow-sm">
                <img
                  src="/Assets/assets_3.webp"
                  alt="Beverage Category"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <aside className="col-md-3">
            <h2>Categories</h2>
            <ul className="list-group">
              {categories.map((category) => (
                <li
                  key={category.id}
                  className={`list-group-item ${
                    selectedCategory === category.name ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory(category.name)}
                  style={{ cursor: "pointer" }}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </aside>
          <main className="col-md-9">
            <h2>Products</h2>
            <div className="row">
              {products.map((product) => (
                <div key={product.id} className="col-md-4 mb-3">
                  <div className="card">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="card-img-top"
                    />
                    <div className="card-body text-center">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">
                        ₹{product.price} <strike>{product.demo_price}</strike>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;

//Password --> N17hzZ4TaMAsXKm4
