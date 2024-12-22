import Header from "./Header";
import React, { useRef } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const cname = useRef();
  const username = useRef();
  const password = useRef();
  const email = useRef();
  const phone = useRef();
  const type = useRef();
  const image = useRef();
  const cdescription=useRef();
  const navigate=useNavigate()
  const handleSignup = (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (
      !cname.current.value ||
      !username.current.value ||
      !password.current.value ||
      !email.current.value ||
      !phone.current.value ||
      !type.current.value ||
      !cdescription.current.value
    ) {
      alert("Please fill in all the fields");
      return;
    }

    // Prepare the data to send to the backend
    const formData = new FormData();
    formData.append("companyName", cname.current.value);
    formData.append("username", username.current.value);
    formData.append("password", password.current.value);
    formData.append("email", email.current.value);
    formData.append("phoneNumber", phone.current.value);
    formData.append("signUpAs", type.current.value);
    formData.append("image", image.current.files[0]);
    formData.append("companyDescription",cdescription.current.value);
    
    axios
      .post("http://localhost:8080/user/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          CustomHeader: "custom-value",
        },
      })
      .then((res) => {
        if (res.status === 202) {
          alert(res.data.message);
          navigate('/login')
        } else if (res.status === 201) {
          alert(res.data.message);

        } else {
          alert("error");
        }
      })
      .catch((err) => {
        alert("Error sending data to the backend:");
      });
  };

  return (
    <div className="App body1">
      <Header />
      <div className="d-flex flex-column align-items-center justify-content-center">
        <div className="login-card p-4">
          <h2 className="text-center">Sign Up</h2>
          <form>
            <div className="form-group mb-2">
              <label htmlFor="companyName" className="bo">
                Company Name:
              </label>
              <input
                type="text"
                className="form-control custom-input"
                id="companyName"
                name="companyName"
                placeholder="Enter Company Name"
                ref={cname}
                required
              />
            </div>

            <div className="form-group mb-2">
              <label htmlFor="username" className="bo">
                Username:
              </label>
              <input
                type="text"
                className="form-control custom-input"
                id="username"
                name="username"
                placeholder="Enter Username"
                ref={username}
                required
              />
            </div>

            <div className="form-group mb-2">
              <label htmlFor="password" className="bo">
                Password:
              </label>
              <input
                type="password"
                className="form-control custom-input"
                id="password"
                name="password"
                placeholder="Enter Password"
                ref={password}
                required
              />
            </div>

            <div className="form-group mb-2">
              <label htmlFor="email" className="bo">
                Email:
              </label>
              <input
                type="email"
                className="form-control custom-input"
                id="email"
                name="email"
                placeholder="Enter Email"
                ref={email}
                required
              />
            </div>

            <div className="form-group mb-2">
              <label htmlFor="phoneNumber" className="bo">
                Phone Number:
              </label>
              <input
                type="tel"
                className="form-control custom-input"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Enter Phone Number"
                ref={phone}
                required
              />
            </div>

            <div className="form-group mb-2">
              <label htmlFor="signUpAs" className="bo">
                Sign Up as:
              </label>
              <select
                className="form-control custom-input"
                id="signUpAs"
                name="signUpAs"
                required
                ref={type}
              >
                <option value="" disabled selected>
                  Select...
                </option>
                <option value="t">Trader</option>
                <option value="s">Shipper</option>
              </select>
            </div>
            <div className="form-group mb-2">
              <label htmlFor="image" className="bo">
                Profile Picture:
              </label>
              <input
                type="file"
                className="form-control custom-input"
                id="image"
                name="image"
                placeholder="Upload Profile Picture"
                ref={image}
                required
              />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="companyDescription" className="bo">
                Description:
              </label>            
              <textarea
                className="form-control custom-input"
                id="companyDescription"
                name="companyDescription"
                placeholder="Tell us about yourself"
                ref={cdescription}
                rows={12} // Adjust the number of rows as needed
                required
              ></textarea>
              </div>
            <Link to="/login">
              <button
                onClick={handleSignup}
                className="btn btn-success btn-block w-100 mt-3"
              >
                Sign Up
              </button>
            </Link>
          </form>
          <p className="mt-3 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              style={{ color: "green", textDecoration: "None" }}
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
