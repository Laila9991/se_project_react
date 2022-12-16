

import React from "react";
import "../Blocks/Profile.css";
import Sidebar from "./Sidebar.js";
import ClothingSection from "./ClothingSection.js";



function Profile({ clothingItems, handleCardClick, openModal }) {
  return (
    <div className="profile__wrapper">
      <Sidebar />
      <ClothingSection
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
        openModal={openModal}
      />
    </div>
  );
}

export default Profile;