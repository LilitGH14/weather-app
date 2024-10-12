import { ForecastType } from '../../../types/weatherTypes'

import styles from './forecast.module.scss'

interface ForecastProps {
  data: ForecastType[]
}

const Forecast = ({ data }: ForecastProps) => {
  return (
    <div className={styles.forecast_wrapper}>
      <h6 className={styles.title}>Today's forecast</h6>
      <div className={styles.forecast_row}>
        {data?.map((daylyWeather: ForecastType) => (
          <div
            className={styles.weatherCard_wrapper}
            key={daylyWeather.date?.toString()}
          >
            <div className={styles.content}>
              <p className={styles.forecast}>Date: {daylyWeather.date}</p>
              <h1 className={styles.temperature}>
                {daylyWeather.maxTempreture}°-{daylyWeather.minTempreture}°
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Forecast
