import { ForecastType } from '../types/weatherTypes'

export const convertForecastData = (forecastObj: any): ForecastType[] => {
  let _forecast: ForecastType[] = []

  //start from tomorrow so i=1
  for (let i = 1; i < 6; i++) {
    _forecast.push({
      minTempreture: forecastObj.daily.temperature_2m_min[i],
      maxTempreture: forecastObj.daily.temperature_2m_max[i],
      date: forecastObj.daily.time[i],
    })
  }

  return _forecast
}
