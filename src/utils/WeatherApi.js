const getForcastWeather = (latitude, longitude, apiKey) => {
    return fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
    ).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    });
  };
  
  const filterDataFromWeatherApi = (data) => {
    if (!data) {
      return null;
    }
    const weatherData = {};
    weatherData.city = data.name;
    weatherData.temperature = data.main.temp;
    weatherData.condition = data.weather.main;
    return weatherData;
  };
  