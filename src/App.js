import React, { useState, useEffect } from "react";

const api = {
  key: "0aa7fe2b9920667e0d42ac5e31ea1c3b",
  base: "https://api.openweathermap.org/data/2.5/",
};
function App() {
  const [searchInput, setSearchInput] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [weatherInfo, setWeatherInfo] = useState("");
  const [icon, setIcon] = useState("");

  //--------Side Effect

  useEffect(() => {
    const fetchWeather = async () => {
      if (!city) return;
      try {
        const url = `${api.base}weather?q=${city}&unit=metrics&appid=${api.key}`;
        setLoading(true);
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          setWeatherInfo(
            `${data.name} is having ${data.weather[0].description}`
          );
          setIcon(`${data.weather[0].icon}`);
          console.log(icon);
          setErrorMsg("");
        } else {
          setErrorMsg(data.message);
        }
      } catch (error) {
        setErrorMsg(error.message);
      }
      setLoading(false);
    };
    fetchWeather();
  }, [city]);

  // use value in city  and fecth api --> city is the dependency.
  //-------Event Handler
  //save the input to state variable "city"
  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(searchInput);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          type="text"
          placeholder="City"
        />
        <button>Search</button>
      </form>
      {loading ? (
        <div> Loading... </div>
      ) : (
        <>
          {errorMsg ? (
            <div style={{ color: "red" }}> {errorMsg}</div>
          ) : (
            <div>
              {weatherInfo}
              <img
                style={{ width: "30px", height: "30px" }}
                src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
