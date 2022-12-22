

import React from "react";
import "../Blocks/Profile.css";
import Sidebar from "./Sidebar.js";
import ClothesSection from "./ClothesSection.js";



function Profile({ clothingItems, handleCardClick, openModal }) {
  return (
    <div className="profile__wrapper">
      <Sidebar />
      <ClothesSection
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
        openModal={openModal}
      />
    </div>
  );
}

export default Profile;