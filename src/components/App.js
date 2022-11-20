import React, { useState, useEffect } from "react";

import "../Blocks/App.css";
import Header from "./Header";
import Main from "./Main.js";

import ModalWithForm from "./ModalWithForm";
import ItemModal from "./ItemModal";
import Footer from "./Footer";

import {
    apiKey,
    latitude,
    longitude,
    defaultClothingItems,
  } from "../utils/constant";
  import {
    getForcastWeather,
    filterDataFromWeatherApi,
  } from "../utils/WeatherApi";



const App = () => {
    const [weatherData, setWeatherData] = useState({});
    const [activeModal, setActiveModal] = useState("");
    const [selectedCard, setSelectedCard] = useState({});
  
    const closeModal = () => {
      setActiveModal(false);
    };
  
    const handleCardClick = (card) => {
      setSelectedCard(card);
      setActiveModal("preview");
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
  
    return (
      <div className="app">
        <div>
          <Header
            weatherData={weatherData}
            openModal={() => {
              setActiveModal("add");
            }}
          />
          <Main
            weatherData={weatherData}
            defaultClothing={defaultClothingItems}
            handleCardClick={handleCardClick}
          />
  
          <Footer />
        </div>
        {activeModal === "add" && (
          <ModalWithForm
            Open={activeModal === "add"}
            name="add"
            title="New Garment"
            buttonText="Add Garment"
            onClose={closeModal}
          >
            <h4 className="form__label">Name</h4>
            <input
              className="form__input form__input_type_name"
              name="name"
              type="text"
              placeholder="Name"
              minLength="1"
              maxLength="40"
              required
            />
            <h4 className="form__label">Image</h4>
            <input
              className="form__input form__input_type_image"
              name="image"
              type="url"
              placeholder="Image URL"
              required
            />
            <h4 className="form__label">Select the weather type:</h4>
            <div className="form__radio-container">
              <div className="form__radio">
                <input
                  className="form__input-radio"
                  name="temp"
                  value="Hot"
                  type="radio"
                  id="hot"
                />
                <label className="form__label-radio" htmlFor="hot">
                  Hot
                </label>
              </div>
              <div className="form__radio">
                <input
                  className="form__input-radio"
                  name="temp"
                  value="Warm"
                  type="radio"
                  id="warm"
                />
                <label className="form__label-radio" htmlFor="warm">
                  Warm
                </label>
              </div>
              <div className="form__radio">
                <input
                  className="form__input-radio"
                  name="temp"
                  value="Cold"
                  type="radio"
                  id="cold"
                />
                <label className="form__label-radio" htmlFor="cold">
                  Cold
                </label>
              </div>
            </div>
          </ModalWithForm>
        )}
        <ItemModal
          Open={activeModal === "preview"}
          name={"preview"}
          card={selectedCard}
          onClose={closeModal}
        />
      </div>
    );
  };

export default App;

  
  
