import { get } from './httpClient'

export const getCurrentWeather: (
  latitude: number,
  longitude: number
) => Promise<any> = (latitude, longitude) => {
  return get(
    `${process.env.REACT_APP_BASE_WEATHER_URL}?latitude=${latitude}&longitude=${longitude}&current_weather=true`
  )
}

export const getWeatherForecast: (
  latitude: number,
  longitude: number
) => Promise<any> = (latitude, longitude) => {
  return get(
    `${process.env.REACT_APP_BASE_WEATHER_URL}?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
  )
}

export const getCoordinatesFromCity = async (city: string) => {
  const url = `${process.env.REACT_APP_BASE_GOOGLE_API_URL}?address=${city}&key=${process.env.REACT_APP_GOOGLE_API_KRY}`

  const response = await get(url)

  if (response.status === 'OK') {
    const results = response.results

    if (results[0]) {
      return results[0].geometry.location
    }
  }
}
