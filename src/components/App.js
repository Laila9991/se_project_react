import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "../Blocks/App.css";
import Header from "./Header";
import Main from "./Main.js";

import ModalWithForm from "./ModalWithForm";
import ItemModal from "./ItemModal";
import Footer from "./Footer";
import CurrentTemperatureUnitContext from "./currentTemperatureUnitContext.js";
import Profile from "./Profile.js";


import {
    apiKey,
    latitude,
    longitude,
  } from "../utils/constant";
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
      setActiveModal(false);
    };
  

    const handleCardClick = (card) => {
      setSelectedCard(card);
      setActiveModal("preview");
    };
  

    const handleAddItemSubmit = (name, link, weather) => {
      addItem(name, link, weather)
        .then((item) => {
          setClothingItems([item, ...clothingItems]);
          onCloseModal();
        })
        .catch((err) => console.log(err));
    };
  
    const handleCardDelete = (card) => {
      removeItem(card)
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

    const handleToggleChange = () => {
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
        value={{ currentTemperatureUnit, handleToggleChange }}
      >
        
 
        <BrowserRouter>
          <div>
            <Header
              weatherData={weatherData}
              openModal={() => {
                setActiveModal("add");
              }}
            />
            <Switch>
              <Route exact path="/">
                <Main
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  handleCardClick={handleCardClick}
                />
              </Route>
              <Route path="/profile">
                <Profile
                  clothingItems={clothingItems}
                  handleCardClick={handleCardClick}
                  openModal={() => {
                    setActiveModal("add");
                  }}
                />
              </Route>
            </Switch>
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


  
  


  
  
  
