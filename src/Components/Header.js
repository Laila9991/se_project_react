import React from "react";

 import "../Blocks/Header.css";   
 import logo from  '../images/logoWtwr.svg';
 import avatar from "../images/avatarLogo.svg";

 function Header() {

    const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });

    return (
        <header className="header">
            <div className="header__wrapper">
                <img className="header__logo" src={logo} alt="home" />
                <p className="header__date">{currentDate}, Culemborg</p>
            </div>
            <div className="header__wrapper">
                <button className="header__button">+Add clothes</button>
                <p className="header__profileName">Laila</p>
                <img className="header__avatar" alt="Laila" src={avatar}/> 
            </div>
        </header>
    );
}

export default Header;

