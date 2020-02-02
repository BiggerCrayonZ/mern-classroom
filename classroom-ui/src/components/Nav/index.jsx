import React from "react";
import "./nav.scss";
import { NavLink } from "react-router-dom";
import { ButtonBase } from "@material-ui/core";
import { MenuBook, Group, Close } from "@material-ui/icons";

const Nav = () => {
  return (
    <div className="w-100 h-100 nav">
      <NavLink to="/app/home-page">
        <ButtonBase
          className="nav_item"
          title="Listas"
        >
          <MenuBook />
        </ButtonBase>
      </NavLink>
      <NavLink to="/app/user-control">
        <ButtonBase
          className="nav_item"
          title="Control de usuarios"
        >
          <Group />
        </ButtonBase>
      </NavLink>
      <NavLink to="/sign-out">
        <ButtonBase
          className="nav_item"
          title="Cerrar sesión"
        >
          <Close />
        </ButtonBase>
      </NavLink>
    </div>
  );
};

export default Nav;
