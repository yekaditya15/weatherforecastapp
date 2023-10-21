import React from "react";
import CurrentLocation from "./currentLocation";
import "./App.css";
import { log } from "util";

function App() {
  return (
    <React.Fragment>
      <div className="container">
        <CurrentLocation />
      </div>
      <div className="footer-info">
       
        Developed by Yekaditya Devadi |  WeatherApplication
     
      </div>
    </React.Fragment>
  );
}

export default App;

