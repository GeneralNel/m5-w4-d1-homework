import { useState, useEffect } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import countries from 'i18n-iso-countries';
import { faMapMarkerAlt, faTemperatureHigh, faTemperatureLow } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

function App() {
  const [apiData, setApiData] = useState({});
  const [getState, setGetState] = useState('Irvine, USA');
  const [state, setState] = useState('Irvine, USA');

  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;

  useEffect(() => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setApiData(data))
  }, [apiUrl]);

  const inputHandler = (e) => {
    setGetState(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setState(getState);
  };

  const kelvinToFahrenheit = (temp) => {
    return Math.round((temp - 273.15) * 9 / 5 + 32);
  };

  return (
    <div className="App">
      <header className="d-flex justify-content-center align-items-center">
        <h1>React Weather App</h1>
      </header>
      <div className="container">
        <div className="mt-3 d-flex flex-column justify-content-center align-items-center">
          <div className="col-auto">
            <label for="location" className="col-form-label">Enter Location:</label>
          </div>
          <div className="col-auto">
            <input type="text" id="location" className="form-control" value={getState} onChange={inputHandler} />
          </div>
          <button type="submit" onClick={submitHandler} className="btn btn-primary mt-3">Search</button>
        </div>
        <div className="card mt-3 mx-auto">
          {
            apiData.main
              ? ( // show weather data if true
                <div class="card-body text-center">
                  <img src={`https://openweathermap.org/img/wn/${apiData.weather[0].icon}.png`} alt="weather icon" className="weather-icon" />
                  <p className="h2"> {kelvinToFahrenheit(apiData.main.temp)}°F</p>
                  <p className="h5">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="fas fa-1x mr-2 text-dark" />{' '}
                    <strong>{apiData.name}</strong>
                  </p>
                  <div className="row mt-4">
                    <div className="col-md-6">
                      <p>
                        <FontAwesomeIcon icon={faTemperatureLow} className="fas fa-1x mr-2 text-primary" />{' '}
                        <strong> {kelvinToFahrenheit(apiData.main.temp_min)}°F </strong>
                      </p>
                      <p>
                        <FontAwesomeIcon icon={faTemperatureHigh} className="fas fa-1x mr-2 text-danger" />{' '}
                        <strong> {kelvinToFahrenheit(apiData.main.temp_max)}°F </strong>
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p>
                        <strong>{apiData.weather[0].main}
                          <p>{' '}
                            {countries.getName(apiData.sys.country, 'en', {
                              select: 'official'
                            })}
                          </p>
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>
              )
              : (<h1> Loading...</h1>) // show loading state if false
          }
        </div>
      </div>
    </div>
  );
}

export default App;
