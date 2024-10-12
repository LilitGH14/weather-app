import { useEffect } from "react";
import { useDispatch } from "react-redux";

import CurrentWeather from "../../components/core/currentWeather/CurrentWeather";
import {
  getCoordinatesFromCity,
  getCurrentWeather,
  getWeatherForecast,
} from "../../services/weatherService";
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

import styles from "./header.module.scss";

const Home = () => {
  const dispatch = useDispatch();

  const { searchFilterValue, currentCity, forecast, currentWeather, cache } =
    useAppSelector((state) => state.general);

  const setCachedData = (city: string) => {
    dispatch(setCurrentWeather(cache[city].currentWeather));
    dispatch(setForecast(cache[city].forecast));
    dispatch(setCity(city));
  };

  const getData = (position: any) => {
    dispatch(setLoading(true));

    Promise.all([
      getCurrentWeather(position.coords.latitude, position.coords.longitude),
      getWeatherForecast(position.coords.latitude, position.coords.longitude),
    ])
      .then(([res1, res2]) => {
        dispatch(setCurrentWeather(res1?.current_weather));
        dispatch(setForecast(convertForecastData(res2)));

        let _city = res2.timezone
          .split("/")
          [res2.timezone.split("/").length - 1].toLowerCase();

        dispatch(setCity(_city));

        dispatch(
          setCacheData({
            city: _city,
            forecast: convertForecastData(res2),
            currentWeather: res1?.current_weather,
            coords: [res1.latitude, res1.longitude],
          })
        );
      })
      .catch((err: any) => dispatch(setError(err)))
      .finally(() => {
        setTimeout(() => {
          dispatch(setLoading(false));
        }, 2000);
      });
  };

  //get client current position
  useEffect(() => {
    if (!currentWeather) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            let coordsArr = Object.values(cache).map((m: any) => m.coords);

            if (coordsArr.length > 0) {
              for (let i = 0; i < coordsArr.length; i++) {
                if (
                  position.coords.latitude === coordsArr[i][0] &&
                  position.coords.longitude === coordsArr[i][1]
                ) {
                  setCachedData(cache[i]);
                } else {
                  getData(position);
                }
              }
            }
          },
          (error) => {
            getData({
              coords: {
                latitude: process.env.REACT_APP_YEREVAN_LATITUDE,
                longitude: process.env.REACT_APP_YEREVAN_LONGITUDE,
              },
            });
          }
        );
      } else {
        getData({
          coords: {
            latitude: process.env.REACT_APP_YEREVAN_LATITUDE,
            longitude: process.env.REACT_APP_YEREVAN_LONGITUDE,
          },
        });
      }
    }
  }, [cache, currentWeather]);

  //get data while search filter is used
  useEffect(() => {
    if (searchFilterValue) {
      if (cache[searchFilterValue]) {
        setCachedData(searchFilterValue.toLowerCase());
      } else {
        getCoordinatesFromCity(searchFilterValue)
          .then((res) => {
            dispatch(setSearchFilterValue(""));
            getData({ coords: { latitude: res.lat, longitude: res.lng } });
          })
          .catch((err: any) => dispatch(setError(err)))
          .finally(() => {
            setTimeout(() => {
              dispatch(setLoading(false));
            }, 2000);
          });
      }
    }
  }, [searchFilterValue, cache]);

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
