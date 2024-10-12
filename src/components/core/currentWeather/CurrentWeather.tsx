import { useEffect, useState } from 'react'

import {
  DEFAULT_ICON,
  WeatherCode,
  weatherIcons,
} from '../../../constants/weatherIcons'
import { WeatherType } from '../../../types/weatherTypes'

import styles from './currentWeather.module.scss'

interface CurrentWeatherProps {
  data: WeatherType
  city: string
}

const CurrentWeather = ({ data, city }: CurrentWeatherProps) => {
  const { windspeed, temperature, weathercode } = data

  const [weatherSrc, setWeatherSrc] = useState('')

  useEffect(() => {
    (async function loadModule() {
      const importedModule = await import(
        `../../../assets/images/weather-icons/${
          weatherIcons[weathercode] ?? DEFAULT_ICON
        }`
      )
      setWeatherSrc(importedModule.default)
    })()
  }, [weathercode])

  return (
    <div className={styles.currentWeather_wrapper}>
      <div className={styles.left_container}>
        <div>
          <h4 className={styles.city}>{city?.toUpperCase()}</h4>
          <p className={styles.forecast}>Wind speed: {windspeed}km/h</p>
        </div>
        <div>
          <h1 className={styles.temperature}>{temperature}°</h1>
        </div>
      </div>
      <div className={styles.right_container}>
        <img src={weatherSrc} alt={WeatherCode[weathercode]} />
      </div>
    </div>
  )
}

export default CurrentWeather
