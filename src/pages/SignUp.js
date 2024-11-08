import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axiosClient from "../api/axiosClient";
import Navbar from "../components/navbar/Navbar";
import "./SignUp.css";
import { useState } from "react";
const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    setIsLoading(true);
    try {
      const res = await axiosClient.post("/auth/signup", data);
      if (res.status === 201) {
        navigate("/login");
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
          <h1 className="form-title">Register</h1>
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" {...register("username", { required: "Username is required" })} />
            {errors.username && <p style={{ color: "red" }}>{errors.username.message}</p>}
          </div>

          <div className="form-control">
            <label htmlFor="fullName">Full Name</label>
            <input type="text" id="fullName" {...register("fullName", { required: "Full name is required" })} />
            {errors.fullName && <p style={{ color: "red" }}>{errors.fullName.message}</p>}
          </div>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              {...register("email", { required: "Email is required", pattern: "" })}
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
          </div>
          <div className="form-control">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              {...register("phoneNumber", {
                required: "Phone number is required",
              })}
            />
            {errors.phoneNumber && <p style={{ color: "red" }}>{errors.phoneNumber.message}</p>}
          </div>

          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
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
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) => value === watch("password") || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>}
          </div>
          <div className="form-control">
            <button className="btn btn-primary" type="submit" disabled={isLoading}>
              Register
            </button>
          </div>

          <div className="form-control">
            <div style={{ textAlign: "center" }}>
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
