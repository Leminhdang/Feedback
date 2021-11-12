import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/scss/argon-dashboard-react.scss";

import AdminLayout from "./layouts/Admin.js";
import PrincicalLayout from "./layouts/Principal";
import AuthLayout from "./layouts/Auth.js";
import AdminLogin from "./screens/admin/Login/Login";
import PrincipalLogin from "./screens/admin/Login/Principal";
import TeacherLogin from "./screens/admin/Login/Teacher";
import UserLayout from "./layouts/User.js";
import TeacherLayout from "./layouts/Teacher";
import EvaluateDetail from "./views/examples/EvaluateDetail";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/evaluate/detail/:id" render={(props) => <EvaluateDetail {...props} />}/>
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
      <Route path="/user" render={(props) => <UserLayout {...props} />} />
      {/* <Redirect from="/" to="/auth/login" /> */}
    </Switch>
    <Switch>
      <Route path="/principal/login" component={PrincipalLogin} />
      <Route
        path="/principal"
        render={(props) => <PrincicalLayout {...props} />}
      />
    </Switch>
    <Switch>
      <Route path="/teacher/login" component={TeacherLogin} />
      <Route path="/teacher" render={(props) => <TeacherLayout {...props} />} />
      <Redirect from="/teacher/*" to="/teacher/login" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
