import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { BsCardList } from "react-icons/bs";
import AdminDashboard from "./AdminDashboard";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

export default function AdminOrCategory() {
  const productName = useRef();
  const catName = useRef();
  const tax=useRef();
  const [categories, setCategories] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    // Fetch categories from the backend when component mounts
    axios
      .get("http://localhost:8080/category/allcategories")
      .then((res) => {
        setCategories(res.data.categories);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
    console.log("in use effect");
  }, [reload]);
  const addcat = (e) => {
    e.preventDefault();
    if (catName.current.value === "" || catName.current.value === " ") {
      alert("Please enter category name before adding");
    } else {
      axios
        .post("http://localhost:8080/category/addcategory", {
          categoryName: catName.current.value,
          tax:tax.current.value
        })
        .then((res) => {
          if (res.status === 201) {
            alert(res.data.message);
            catName.current.value = "";
            setReload(!reload);
          } else if (res.status === 202) {
            alert(res.data.message);
          } else {
            alert("Server error");
          }
        })
        .catch((err) => {
          alert("Error sending data to the backend:", err);
        });

      console.log(reload);
    }
  };

  const addproduct = (e) => {
    e.preventDefault();
    const selectedCategoryId = document.getElementById("category").value;
    if (productName.current.value.trim() === "") {
      alert("Please enter product name before adding");
      return;
    }

    axios
      .post("http://localhost:8080/product/addproduct", {
        productName: productName.current.value,
        categoryId: selectedCategoryId,
      })
      .then((res) => {
        if (res.status === 201) {
          alert(res.data.message);
          productName.current.value = "";
        } else if (res.status === 202) {
          alert(res.data.message);
        } else {
          alert("Server error");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error sending data to the backend:", err);
      });
  };
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous page
  };
  return (
    <div className="userhome">
      <AdminDashboard />
      <div>
      <button
                  type="button"
                  className="btn btn-link mb-3"
                  onClick={handleBackClick}
                  style={{color:"green"}}
                >
                  <FaArrowLeft /> Back
                </button>

      </div>
      <div className="container-fluid scroll">
        <header className="text-center mb-4 m-5">
          <h2 className="display-4">Hello! Admin</h2>
          <p className="lead">Now You can Add new Product and Category</p>
        </header>
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6 mb-4">
            <div className="card" style={{ border: "3px solid #000000" }}>
              <div className="card-body">
                <h5 className="card-title text-center mb-4">Add Product</h5>
                <form>
                  <div className="mb-3">
                    <label htmlFor="productName" className="form-label">
                      <BsCardList className="me-2" /> Product Name
                    </label>
                    <input
                      style={{ border: "3px solid #000000" }}
                      type="text"
                      className="form-control"
                      id="productName"
                      name="productName"
                      ref={productName}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="category" className="form-label">
                      <BsCardList className="me-2" /> Category
                    </label>
                    <select
                      style={{ border: "3px solid #000000" }}
                      className="form-select"
                      id="category"
                      name="category"
                      required
                    >
                      {categories &&
                        categories.length > 0 &&
                        categories.map((category) => {
                          return (
                            <option
                              key={category.categoryId}
                              value={category.categoryId}
                            >
                              {category.categoryName}
                            </option>
                          );
                        })}
                    </select>
                  </div>

                  <div className="text-center">
                    <button className="btn btn-success" onClick={addproduct}>
                      Add Product
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          
          <div className="col-md-6 mb-4">
            <div className="card" style={{ border: "3px solid #000000" }}>
              <div className="card-body">
                <h5 className="card-title text-center mb-4">
                  Add Product Category
                </h5>
                <form>
                 
                  <div className="mb-3">
                    <label htmlFor="productCategory" className="form-label">
                      <BsCardList className="me-2" /> Product Category Name
                    </label>
                    <input
                      style={{ border: "3px solid #000000" }}
                      type="text"
                      className="form-control"
                      id="productCategory"
                      name="productCategory"
                      ref={catName}
                      required
                    />
                    <label htmlFor="productCategory" className="form-label">
                      <BsCardList className="me-2" /> Add Tax
                    </label>
                    <input
                      style={{ border: "3px solid #000000" }}
                      type="number"
                      className="form-control"
                      id="productTax"
                      name="productTax"
                      ref={tax}
                      required
                    />
                  </div>
                 
                  <div className="text-center">
                    <button className="btn btn-success" onClick={addcat}>
                      Add Product Category
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
