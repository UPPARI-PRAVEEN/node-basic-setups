import React, { useState } from "react";
import "../styles/register.css";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";

const Login = () => {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth,setAuth] = useAuth()
 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/login', {
       
        email,
        password,
       
      });

      if (response && response.data.success) {
        toast.success(response.data.message);

        setAuth({
          ...auth,
          user: response.data.user,
          token: response.data.token,
        })
        localStorage.setItem("auth", JSON.stringify(response.data));


        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error in register:", error);
      toast.error("Something went wrong in login");
    }
  };

  return (
    <div className="forms">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Register form</h1>
        
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            value={email}
            className="form-control"
            id="exampleInputEmail1"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            value={password}
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
