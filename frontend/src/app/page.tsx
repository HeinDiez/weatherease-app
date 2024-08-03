'use client';

import { useEffect, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'

// ** Hook imports
import useGeolocation from '@/lib/useGeolocation'

// ** Component Imports
const Toolbar = dynamic(()=> import("@/views/dashboard/toolbar"))
const Stats = dynamic(()=> import("@/views/dashboard/stats"))
const Header = dynamic(()=> import("@/components/typography/header"))
const AverageTemperature = dynamic(()=> import("@/views/dashboard/averageTemperature"))
const LocationTimeDisplay = dynamic(()=> import("@/views/dashboard/locationTimeDisplay"))
const WeatherDisplay = dynamic(()=> import("@/views/dashboard/weatherDisplay"))
const ChanceOfRain = dynamic(()=> import("@/views/dashboard/chanceOfRain"))

// ** Icon Imports
import { SunriseIcon, SunsetIcon } from "@/components/icons";
import { socket } from '@/lib/socket'
import { debounce } from 'lodash';
import { WeatherIcon } from '@/views/dashboard/weatherDisplay'
import SunriseSunsetStats from "@/views/dashboard/sunriseSunsetStats";


export type weatherData = {
  wind_speed: number;
  uv_index: number;
  sunrise: string;
  sunset: string;
  pressure: number;
  gust: number;
  city_name: string;
  country_code: string;
  clouds_coverage: number;
  temperature: number;
  weather_icon: WeatherIcon;
}

export default function Home() {
  const [weather, setWeather] = useState<weatherData | null>(null);
  // const { latitude, longitude, error } = useGeolocation();
  //
  // console.log(latitude, longitude, error, "check here")

  useEffect(() => {
    const debouncedSetWeather = debounce((data: any) => {
      setWeather(data);

      console.log(data, "check data")
    }, 1000);

    socket.on('connect', () => {
      socket.emit('getWeather', 'Hilversum');
    });

    socket.on('weatherUpdate', (data) => {
      debouncedSetWeather(data);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from socket.io server');
    });

    socket.on('connect_error', (error) => {
      console.log('Connection error:', error)
      console.error('Connection error:', error);
    });

    return () => {
      socket.off('weatherUpdate');
      socket.off('connect');
      socket.off('disconnect');
      socket.off('connect_error');
    };
  }, [socket]);

  return (
    <main className="grid grid-cols-12 min-h-screen gap-5">
      <div className='col-span-12 lg:col-span-8 flex min-h-screen flex-col gap-16 p-8'>
        <Toolbar />

        <Stats/>

        <AverageTemperature/>
      </div>
      <div className='hidden col-span-4 p-10 bg-gradient-to-br from-blue-950 to-zinc-500 text-white lg:flex flex-col gap-6'>
        <LocationTimeDisplay
            location={weather?.city_name ?? null}
            details={weather?.country_code ?? null}
        />

        <WeatherDisplay
            icon={weather?.weather_icon ?? null}
            temperature={weather?.temperature ?? null}/>

        <ChanceOfRain />

        <SunriseSunsetStats
            sunrise={weather?.sunrise ?? null}
            sunset={weather?.sunset ?? null} />
      </div>
    </main>
  );
}
