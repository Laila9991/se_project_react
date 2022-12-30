import React, { useContext } from "react";
import "../Blocks/Main.css";
import ItemCard from "./ItemCard";
import WeatherCard from "./WeatherCard";
import currentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";

function Main({ weatherData, clothingItems, handleCardClick }) {
  const currentWeather = weatherData.temperature;


const HOT_WEATHER = 86;
  const COLD_WEATHER =  64;

  const getWeatherType = () => {
    if (currentWeather >= HOT_WEATHER) {
      return "hot";
    } else if (
      currentWeather >= COLD_WEATHER - 1 &&
      currentWeather <= HOT_WEATHER - 1
    ) {
      return "warm";
    } else if (currentWeather <= COLD_WEATHER) {
      return "cold";
    }
  };

  function filterClothing(card, data) {
    return (
      card.weather?.toLowerCase() === data ||
      card.weatherType?.toLowerCase() === data
    );
  }

  const clothingOptions = clothingItems.filter((items) =>
    filterClothing(items)
  );

  const { currentTemperatureUnit } = useContext(currentTemperatureUnitContext);

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <h3 className="main__header">
      Today is{" "}
              {currentTemperatureUnit === "F"
                ? weatherData.temperatureF
                : weatherData.temperatureC}{" "}
              and it is {getWeatherType()} / You may want to wear:
      </h3>
      <ul className="main__gallery">
        {clothingOptions.map((item) => (
          <ItemCard
            isOpen="false"
            clothingOption={item}
            key={item._id}
            name={item.name}
            image={item.imageUrl}
            weather={item.weather}
            onClick={() => handleCardClick(item)}
          />
        ))}
      </ul>
    </main>
  );
}

  export default Main;
  
  
