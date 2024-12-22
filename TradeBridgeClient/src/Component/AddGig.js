import React, { useRef } from "react";
import UserDashboard from './UserDashboard';
import { BsCardList } from 'react-icons/bs'; 
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function AddGig() {
  const logedUser = useSelector((state) => state.login.user);
  const categoryname = useRef();
  const productname = useRef();
  const descriptionname = useRef();
  const image = useRef();
  const price = useRef(); 
  const navigate = useNavigate();
  
  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous page
  };
  const handleAddGig = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("category", categoryname.current.value.toLowerCase());
    formData.append("product", productname.current.value.toLowerCase());
    formData.append("description", descriptionname.current.value);
    formData.append("price", price.current.value); 
    formData.append("image", image.current.files[0]);
    formData.append("seller", logedUser._id);
    

    try {
      const response = await axios.post("http://localhost:8080/gig/addgig", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          CustomHeader: "custom-value",
        },
      });
      
      if (response.status === 202) {
        alert("Gig added successfully");
        navigate('/userhome'); 
      }
       else {
        alert("Error adding gig");
      }
    } catch (error) {
      console.error("Error adding gig:", error);
      alert("Error adding gig");
    }
  };
  console.log(logedUser._id)
  return (
    <div className='userhome'>
      <div>
        <UserDashboard />
      </div>
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
      <div className='container-fluid'>
        <header className='text-center mb-4'>
          <h2 className='display-4'>Hello! Seller</h2>
          <p className='lead'>Kindly fill this form</p>
        </header>
        <div className='row justify-content-center align-items-center'>
          <div className='col-md-6'>
            <div className="card" style={{ border: '4px solid #000000' }}>
              <div className="card-body">
                <form onSubmit={handleAddGig}>
                  <div className="mb-3">
                    <label htmlFor="category" className="bo">
                      <BsCardList className="me-2"  /> Category
                    </label>
                    <input style={{ border: '3px solid #000000' }} type="text" className="form-control" id="category" name="category" ref={categoryname} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="productName" className="bo">
                      <BsCardList className="me-2" /> Product Name
                    </label>
                    <input style={{ border: '3px solid #000000' }} type="text" className="form-control" id="productName" name="productName" ref={productname} required />
                  </div>
                  <div className="form-group mb-2">
              <label htmlFor="companyDescription" className="bo">
                Description:
              </label>            
              <input style={{ border: '3px solid #000000' }}
                className="form-control custom-input"
                id="companyDescription"
                name="companyDescription"
                placeholder="Tell something about product"
                ref={descriptionname}
                rows={12} 
                required
              />
              </div>
                  <div className="mb-3">
                    <label htmlFor="price" className="bo">
                      Per kg Price
                    </label>
                    <input style={{ border: '3px solid #000000' }} type="number" className="form-control" id="price" name="price" ref={price} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="image" className="bo">
                      Image
                    </label>
                    <input style={{ border: '3px solid #000000' }} type="file" className="form-control" id="image" name="image" accept="image/*" ref={image} />
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-success">
                      Add Gig
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
