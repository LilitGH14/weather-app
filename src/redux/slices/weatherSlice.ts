import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ForecastType, WeatherType } from '../../types/weatherTypes'

interface GeneralState {
  currentCity: string
  forecast: ForecastType[]
  currentWeather: WeatherType | null
  searchFilterValue: string | null
  isLoading: boolean
  error: any
  cache: any
}

const initialState: GeneralState = {
  currentCity: '',
  forecast: [],
  currentWeather: null,
  searchFilterValue: null,
  isLoading: false,
  error: null,
  cache: {},
}

const weatherSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setCacheData(state, action: PayloadAction<any>) {
      state.cache[action.payload.city] = {
        forecast: action.payload.forecast,
        currentWeather: action.payload.currentWeather,
      }
    },
    setLoading(state, action: PayloadAction<any>) {
      state.isLoading = action.payload
    },
    setError(state, action: PayloadAction<any>) {
      state.error = action.payload
    },
    setSearchFilterValue(state, action: PayloadAction<any>) {
      state.searchFilterValue = action.payload
    },
    setCity(state, action: PayloadAction<any>) {
      state.currentCity = action.payload
    },
    setForecast(state, action: PayloadAction<any>) {
      state.forecast = action.payload
    },
    setCurrentWeather(state, action: PayloadAction<any>) {
      state.currentWeather = action.payload
    },
  },
})

export const {
  setSearchFilterValue,
  setCity,
  setForecast,
  setCurrentWeather,
  setLoading,
  setError,
  setCacheData,
} = weatherSlice.actions

export default weatherSlice
