import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

import CurrentWeather from "../../components/core/currentWeather/CurrentWeather";
import Forecast from "../../components/core/forecast/Forecast";
import { convertForecastData } from "../../helpers/forecastUtils";
import { useAppSelector } from "../../redux/hooks";
import {
  setCacheData,
  setCity,
  setCurrentWeather,
  setError,
  setForecast,
  setLoading,
  setSearchFilterValue,
} from "../../redux/slices/weatherSlice";

import {
  getCoordinatesFromCity,
  getCurrentWeather,
  getWeatherForecast,
} from "../../services/weatherService";
import styles from "./header.module.scss";

const Home = () => {
  const dispatch = useDispatch();

  const { searchFilterValue, currentCity, forecast, currentWeather, cache } =
    useAppSelector((state) => state.general);

  const setCachedData = useCallback(
    (city: string) => {
      const cached = cache[city];
      if (cached) {
        dispatch(setCurrentWeather(cached.currentWeather));
        dispatch(setForecast(cached.forecast));
        dispatch(setCity(city));
      }
    },
    [cache, dispatch]
  );

  const fetchWeatherData = useCallback(
    (latitude: number, longitude: number) => {
      dispatch(setLoading(true));

      Promise.all([
        getCurrentWeather(latitude, longitude),
        getWeatherForecast(latitude, longitude),
      ])
        .then(([currentWeatherData, forecastData]) => {
          const forecast = convertForecastData(forecastData);

          dispatch(setCurrentWeather(currentWeatherData?.current_weather));
          dispatch(setForecast(forecast));

          const city =
            forecastData.timezone.split("/").pop()?.toLowerCase() || "";

          dispatch(setCity(city));
          dispatch(
            setCacheData({
              city,
              forecast,
              currentWeather: currentWeatherData?.current_weather,
              coords: [latitude, longitude],
            })
          );
        })
        .catch((err) => dispatch(setError(err)))
        .finally(() => dispatch(setLoading(false)));
    },
    [dispatch]
  );

  const handleGeolocationSuccess = useCallback(
    (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;

      const cachedCity = Object.entries(cache).find(([_, data]) => {
        const [cachedLat, cachedLon] = (data as any).coords;
        return cachedLat === latitude && cachedLon === longitude;
      });

      if (cachedCity) {
        setCachedData(cachedCity[0]);
      } else {
        fetchWeatherData(latitude, longitude);
      }
    },
    [cache, fetchWeatherData, setCachedData]
  );

  const handleGeolocationError = useCallback(() => {
    const fallbackLatitude =
      (process.env.REACT_APP_YEREVAN_LATITUDE &&
        +process.env.REACT_APP_YEREVAN_LATITUDE) ||
      40.1792;
    const fallbackLongitude =
      (process.env.REACT_APP_YEREVAN_LONGITUDE &&
        +process.env.REACT_APP_YEREVAN_LONGITUDE) ||
      44.4991;

    fetchWeatherData(fallbackLatitude, fallbackLongitude);
  }, [fetchWeatherData]);

  const handleSearchFilter = useCallback(() => {
    if (searchFilterValue && !cache[searchFilterValue]) {
      getCoordinatesFromCity(searchFilterValue)
        .then(({ lat, lng }) => {
          dispatch(setSearchFilterValue(""));
          fetchWeatherData(lat, lng);
        })
        .catch((err) => dispatch(setError(err)))
        .finally(() => dispatch(setLoading(false)));
    } else {
      setCachedData(searchFilterValue.toLowerCase());
    }
  }, [searchFilterValue, cache, dispatch, fetchWeatherData, setCachedData]);

  useEffect(() => {
    if (!currentWeather) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          handleGeolocationSuccess,
          handleGeolocationError
        );
      } else {
        handleGeolocationError();
      }
    }
  }, [currentWeather, handleGeolocationSuccess, handleGeolocationError]);

  useEffect(() => {
    if (searchFilterValue) {
      dispatch(setLoading(true));
      handleSearchFilter();
    }
  }, [searchFilterValue, handleSearchFilter, dispatch]);

  return (
    <div className={styles.home_wrapper}>
      {currentWeather && (
        <CurrentWeather data={currentWeather} city={currentCity} />
      )}
      <Forecast data={forecast} />
    </div>
  );
};

export default Home;
