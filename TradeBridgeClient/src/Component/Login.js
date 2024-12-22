import { useRef } from "react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { userLogin, logedinUser } from "../Store/Slices/LoginSlice";
import {useSelector,useDispatch} from 'react-redux'
const Login = () => {
  const username = useRef();
  const password = useRef();
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const handleLogin = (e) => {
    e.preventDefault();
    if (
      
      !username.current.value ||
      !password.current.value 
    ) {
      alert("Please fill in all the fields");
      return;
    }

    axios
      .post("http://localhost:8080/user/login", {
        username: username.current.value,
        password: password.current.value,
      })
      .then((res) => {
        if (res.status === 202) {
          alert(res.data.message);
          dispatch(userLogin());
          dispatch(logedinUser(res.data.user));
          if (res.data.user.signUpAs === "t") {
            navigate("/userhome");
          } else if(res.data.user.signUpAs === "s") {
            navigate("/shipperhome");
          }
          else{
            navigate('/adminhome')
          }
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
    <div className="App">
      <Header />
      <div className="body2 d-flex flex-column align-items-center justify-content-center">
        <div className="login-card">
          <h2 className="text-center mb-4">Login</h2>
          <form>
            <div className="form-group">
              <label className="bo" htmlFor="username">
                Username:
              </label>
              <input
                type="text"
                className="form-control custom-input"
                id="username"
                name="username"
                placeholder="Username"
                ref={username}
                required
              />
            </div>

            <div className="form-group">
              <label className="bo" htmlFor="password">
                Password:
              </label>
              <input
                type="password"
                className="form-control custom-input"
                id="password"
                name="password"
                placeholder="Password"
                required
                ref={password}
              />
            </div>
            <Link to="/userhome">
              <button
                onClick={handleLogin}
                className="btn btn-success btn-block w-100 mt-3"
              >
                Login
              </button>
            </Link>
          </form>
          <p className="mt-3 text-center">
            Don't have an account?{" "}
            <Link
              to="/signup"
              style={{ color: "Green", textDecoration: "None" }}
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
