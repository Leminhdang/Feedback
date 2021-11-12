import React, { Component, useState } from "react";
import "./adminResetPass.css";
import MediaQuery from "react-responsive";
const ResetPassword = () => {
  document.title = "Reset Password";
  const [emailRP, setEmailRP] = useState("");
  function changeValueEmail(e) {
    setEmailRP(e.target.value);
  }
  return (
    <MediaQuery minDeviceWidth={1224} device={{ deviceWidth: 1600 }}>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form>
            <h3>Reset Password</h3>
            <div className="form-group">
              <label>Please enter your email </label>
              <input
                type="email"
                className="form-control"
                placeholder="your email"
                value={emailRP}
                onChange={changeValueEmail}
              />
            </div>

            <button type="submit" className="btn btn-dark btn-lg btn-block">
              Reset Password
            </button>
            <p className="forgot-password text-right">
              <a href="/admin/login">log in?</a>
            </p>
            <h1>Hello {emailRP}</h1>
          </form>
        </div>
      </div>
    </MediaQuery>
  );
};

export default ResetPassword;
