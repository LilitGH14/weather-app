import { ReactNode } from "react";

export type WeatherType = {
  time: Date;
  interval: number;
  temperature: number;
  windspeed: number;
  winddirection: number;
  is_day: number;
  weathercode: number;
};

export type CityCoordinatesType = {
  latitude: number;
  longitude: number;
};

export type ForecastType = {
  minTempreture: number;
  maxTempreture: number;
  date: ReactNode;
};
