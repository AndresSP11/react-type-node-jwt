import React from 'react'
import {Weather} from "../hooks/useWeather";
import { formatTemperature } from '../utils';
import styles from './Weather.module.css';


type WeatherDetailProps ={
  weather: Weather
}

export default function WeatherDetail({weather}:WeatherDetailProps) {
  return (

    <>
      <div className={styles.container}>
        <h2>Climda De: {weather.name}</h2>
        <p className={styles.current}>{formatTemperature(weather.main.temp)}&deg;</p>
        <div className={styles.temperatures}>
          <p>Min: <span>{formatTemperature(weather.main.temp_min)}&deg;C</span></p>
          <p>Max: <span>{formatTemperature(weather.main.temp_max)}&deg;C</span></p>
        </div>




      </div>
      
    </>

  )
}

