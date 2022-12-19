import React from "react";
import { NavLink } from "react-router-dom";
 import "../Blocks/Header.css";   
 import logo from  '../images/logoWtwr.svg';
 import avatar from "../images/avatarLogo.svg";
 import ToggleSwitch from "./ToggleSwitch.js";

 const Header = ({ weatherData, openModal }) => {
    if (!weatherData) return null;
  
    const currentDate = new Date().toLocaleString("default", {
      month: "long",
      day: "numeric",
    });
  
    return (
      <header className="header">
        <div className="header__container-weather">
        <NavLink exact to="/" activeClassName="menu__item-active">
          <img src={logo} alt="WTWR logo" className="header__logo" />
        </NavLink>
          <p className="header__date-and-city">
            {currentDate}, {weatherData.city}
          </p>
        </div>
        <div className="header__container-user">
        <ToggleSwitch />
          <button type="button" className="header__button" onClick={openModal}>
            + Add clothes
          </button>
          <NavLink to="/profile" activeClassName="menu__item-active">
          <p className="header__user">Terrence Tegegne</p>
        </NavLink>
          <p className="header__user">Laila</p>
          <img className="header__avatar" src={avatar} alt="user avatar" />
        </div>
      </header>
    );
  };
  
  export default Header;

