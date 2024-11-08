import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axiosClient from "../api/axiosClient";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/navbar/Navbar";
import "./Login.css";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    try {
      setIsLoading(true);
      const res = await axiosClient.post("/auth/login", data);
      if (res.status === 200) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user });
        navigate("/");
      }
    } catch (errs) {
      if (errs.response && errs.response.status === 422) {
        if (errs.response.data.errors) {
          errs.response.data.errors.forEach((err) => {
            setError(err.path, { type: "manual", message: err.msg });
          });
        }
        if (errs.response.data.message) {
          alert(errs.response.data.message);
        }
      }
    }
    setIsLoading(false);
  };
  return (
    <>
      <Navbar />
      <div className="auth">
        <form action="" className="authForm" onSubmit={handleSubmit(submitHandler)}>
          <h1 className="form-title">Login</h1>
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              {...register("username", { required: "username is required" })}
            />
            {errors.username && <p style={{ color: "red" }}>{errors.username.message}</p>}
          </div>

          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
          </div>
          <div className="form-control">
            <button className="btn btn-primary" type="submit" disabled={isLoading}>
              Login
            </button>
          </div>

          <div className="form-control">
            <div style={{ textAlign: "center" }}>
              Not have an account? <Link to="/signup">Signup</Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default Login;
