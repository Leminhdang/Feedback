import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      style={{
        overflow: "scroll initial",
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#167bff">
        <CDBSidebarHeader
          prefix={
            <i
              className="fa fa-bars fa-large"
              style={{ marginLeft: "0.5vw" }}
            ></i>
          }
        >
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          ></a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink
              exact
              to="/admin/usermanager"
              activeClassName="activeClicked"
              id={
                window.location.pathname == "/admin/usermanager" ? "active" : ""
              }
            >
              <CDBSidebarMenuItem icon="book-reader">
                Danh sach hoc sinh
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/tables" activeClassName="activeClicked">
              <CDBSidebarMenuItem
                icon="chalkboard-teacher"
                className="nav_link"
              >
                Danh sach giao vien
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/profile" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="users" className="nav_link">
                Danh sach phu huynh
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/analytics" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="sign-out-alt" className="nav_link">
                Dang xuat
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
