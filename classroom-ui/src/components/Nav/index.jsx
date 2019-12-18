import React from "react";
import "./nav.scss";
import { NavLink } from "react-router-dom";
import { ButtonBase } from "@material-ui/core";
import { Home } from "@material-ui/icons";

const Nav = () => {
  return (
    <div className="w-100 h-100 nav">
      <NavLink to="/app/home-page">
        <ButtonBase className="nav_item">
          <Home />
        </ButtonBase>
      </NavLink>
      <NavLink to="/app/control">
        <ButtonBase className="nav_item">
          <Home />
        </ButtonBase>
      </NavLink>
    </div>
  );
};

export default Nav;
