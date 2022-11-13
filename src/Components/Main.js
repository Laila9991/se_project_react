
import "../Blocks/Main.css";
import ItemCard from "../Components/ItemCard";
import WeatherCard from "../Components/WeatherCard";

function Main({ weatherData, defaultClothing, handleCardClick }) {
    const actualWeather = weatherData.temperature;
    const weatherType = () => {
      if (actualWeather >= 86) {
        return "hot";
      } else if (actualWeather >= 66 && actualWeather <= 85) {
        return "warm";
      } else if (actualWeather <= 65) {
        return "cold";
      }
    };
  
    function filterClothing(card, data) {
      if (card.weather === data) {
        return true;
      } else {
        return false;
      }
    }
    const clothingOptions = defaultClothing.filter((item) =>
      filterClothing(item, weatherType())
    );
  
    return (
      <div className="main">
        <WeatherCard weatherData={weatherData} />
        <section className="main__clothes">
          <div className="main__info">
            <div className="main__description-container">
              <p className="main__description">
                Today is {actualWeather}°F and it is {weatherType()} / You may
                want to wear:
              </p>
            </div>
          </div>
          <ul className="main__items">
            {clothingOptions.map((item) => {
              return (
                <ItemCard
                  isOpen="false"
                  clothingOption={item}
                  key={item._id}
                  name={item.name}
                  image={item.link}
                  weather={item.weather}
                  onClick={() => {
                    handleCardClick(item);
                  }}
                />
              );
            })}
          </ul>
        </section>
      </div>
    );
  }
  
  export default Main;
  
  