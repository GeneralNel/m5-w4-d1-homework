import { useState, useEffect } from 'react';
import './App.css';
import countries from 'i18n-iso-countries';
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
          <div class="col-auto">
            <label for="location" className="col-form-label">Enter Location:</label>
          </div>
          <div class="col-auto">
            <input type="text" id="location" className="form-control" value={getState} onChange={inputHandler} />
          </div>
          <button type="submit" onClick={submitHandler} className="btn btn-primary">Search</button>
        </div>
        <div className="card mt-3 mx-auto">
          {
            apiData.main
              ? (<div class="card-body text-center"> </div>) // show weather data if true
              : (<h1> Loading...</h1>) // show loading state if false
          }
        </div>
      </div>
      <footer className="footer">
        &copy; React Weather App 2026
      </footer>
    </div>
  )
}


export default App;
