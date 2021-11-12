import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminFooter from "../components/Footers/AdminFooter.js";
import UserSidebar from "../components/Sidebar/SidebarUser";
import UserNavbar from "../components/Navbars/UserNavbar";

import routes from "../routes.js";

const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/user") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        document.title = routes[i].name;
        return routes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      <UserSidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: "/user/index",
          imgSrc:
            "https://career.fpt.edu.vn/Content/images/logo_unit/fpt-university.png",
          imgAlt: "...",
          imgRes:
            "https://vi-magento.com/wp-content/uploads/2020/09/ASSET-USER-ADMIN.png",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <UserNavbar
          {...props}
          brandText={getBrandText(props.location.pathname)}
        />
        <Switch>
          {getRoutes(routes)}
          <Redirect from="/" to="/user/index" />
        </Switch>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default Admin;