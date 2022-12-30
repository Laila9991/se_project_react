import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../Blocks/App.css";
import Header from "./Header";
import Main from "./Main.js";

import ModalWithForm from "./ModalWithForm.js";
import ItemModal from "./ItemModal";
import Footer from "./Footer";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext.js";
import Profile from "./Profile.js";

import { apiKey, latitude, longitude } from "../utils/constant";
import {
  getForcastWeather,
  filterDataFromWeatherApi,
} from "../utils/WeatherApi";

import { getItems, addItem, removeItem } from "../utils/api.js";

import AddItemModal from "./AddItemModal.js";
import DeleteConfirmationModal from "./DeleteConfirmationModal.js";

const App = () => {
  const [weatherData, setWeatherData] = useState({});
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const [clothingItems, setClothingItems] = useState([]);

  const onCloseModal = () => {
    setActiveModal("");
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleAddItemSubmit = (name, link, weather) => {
    addItem(name, link, weather)
      .then((item) => {
        setClothingItems([...clothingItems, item]);
        onCloseModal();
      })
      .catch((err) => console.log(err));
  };

  const handleCardDelete = (card) => {
    removeItem(card.id)
      .then(() => {
        setClothingItems((cards) => cards.filter((c) => c.id !== card.id));
        onCloseModal();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (latitude && longitude) {
      getForcastWeather(latitude, longitude, apiKey)
        .then((data) => {
          setWeatherData(filterDataFromWeatherApi(data));
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const fetchClothingItems = () => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    fetchClothingItems();
  }, []);
  return (
    <div className="app">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <BrowserRouter>
          <div>
            <Header
              weatherData={weatherData}
              openModal={() => {
                setActiveModal("add");
              }}
            />
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                    handleCardClick={handleCardClick}
                  />
                }
              />

              <Route
                path="/profile"
                element={
                  <Profile
                    clothingItems={clothingItems}
                    handleCardClick={handleCardClick}
                    openModal={() => {
                      setActiveModal("add");
                    }}
                  />
                }
              />
            </Routes>
            <Footer />
          </div>
          {activeModal === "add" && (
            <AddItemModal
              isOpen={activeModal === "add"}
              onCloseModal={onCloseModal}
              onAddItem={handleAddItemSubmit}
            ></AddItemModal>
          )}
          <ItemModal
            isOpen={activeModal === "preview"}
            name={"preview"}
            card={selectedCard}
            onClose={onCloseModal}
            handleDeleteModal={() => {
              setActiveModal("delete");
            }}
          />
          {activeModal === "delete" && (
            <DeleteConfirmationModal
              isOpen={activeModal === "delete"}
              name="delete"
              onClose={onCloseModal}
              handleConfirm={() => handleCardDelete(selectedCard)}
              handleCancel={() => {
                setActiveModal("preview");
              }}
            />
          )}
        </BrowserRouter>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
};
export default App;
