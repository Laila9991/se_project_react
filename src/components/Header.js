import React from "react";

 import "../Blocks/Header.css";   
 import logo from  '../images/logoWtwr.svg';
 import avatar from "../images/avatarLogo.svg";

 const Header = ({ weatherData, openModal }) => {
    if (!weatherData) return null;
  
    const currentDate = new Date().toLocaleString("default", {
      month: "long",
      day: "numeric",
    });
  
    return (
      <header className="header">
        <div className="header__container-weather">
          <img src={logo} alt="WTWR logo" className="header__logo" />
          <p className="header__date-and-city">
            {currentDate}, {weatherData.city}
          </p>
        </div>
        <div className="header__container-user">
          <button type="button" className="header__button" onClick={openModal}>
            + Add clothes
          </button>
          <p className="header__user">Laila</p>
          <img className="header__avatar" src={avatar} alt="user avatar" />
        </div>
      </header>
    );
  };
  
  export default Header;

