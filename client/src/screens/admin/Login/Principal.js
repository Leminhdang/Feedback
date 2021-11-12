import React, {useState, useEffect } from "react";
import Cookies from 'universal-cookie';
import "./adminLogin.css";
import {Redirect} from 'react-router-dom';
import MediaQuery from "react-responsive";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const cookies = new Cookies();
  function changeValueUsername(e) {
    setUsername(e.target.value);
  }
  function changeValuePassword(e) {
    setPassword(e.target.value);
  }

  const data = { username: username, password: password};

  const ham = async () => {
    const response = await fetch('http://localhost:8080/login/loginPrincipals', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    let res = await response.json();
    console.log("..........",res);
    
    if(res.token){
      cookies.set('token', res.token, { path: '/' });
      cookies.set('role', res.role, { path: '/' });
      setToken(res.token)
      cookies.set('idCreator', res.id);  
    }
  }

  document.title = "Đăng Nhập Hệ Thống";
  return (
    <MediaQuery minDeviceWidth={1224} device={{ deviceWidth: 1600 }}>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <div className="adminLogin">
            <form action="/">
              <h3>ĐĂNG NHẬP HỆ THỐNG</h3>
              <div className="form-group">
                <label>Tên đăng nhập</label>
                <input
                  type="text"
                  value={username}
                  className="form-control"
                  onChange={changeValueUsername}
                  placeholder="Enter user name"
                />
              </div>
              <div className="form-group">
                <label>Mật khẩu</label>
                <input
                  value={password}
                  onChange={changeValuePassword}
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                />
              </div>
              <input type="button" value="Đăng nhập" className="btn btn-dark btn-lg btn-block" onClick={ham}/>
              <p className="forgot-password text-right">
                <a href="/admin/resetpassword">Quên mật khẩu?</a>
              </p>
            </form>
          </div>
        </div>
      </div>
      {token ? <Redirect from="/principal/login" to="/admin/index"/> : <Redirect from="/principal/*" to="/principal/login"/>}
    </MediaQuery>
  );
};
export default AdminLogin;
