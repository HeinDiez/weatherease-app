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

// ** Icon Imports
import { SunriseIcon, SunsetIcon } from "@/components/icons";
import { socket } from '@/lib/socket'
import { debounce } from 'lodash';
import LocationTimeDisplay from "@/views/dashboard/locationTimeDisplay";
import WeatherDisplay from "@/views/dashboard/weatherDisplay";
import { WeatherIcon } from '@/views/dashboard/weatherDisplay'


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

  const rainChance = [
    { time: '7 PM', percentage: 44 },
    { time: '8 PM', percentage: 30 },
    { time: '9 PM', percentage: 67 },
    { time: '10 PM', percentage: 72 },
    { time: '11 PM', percentage: 20 },
    { time: '12 AM', percentage: 0 },
  ]

  const stats = [
    { id: 1, name: 'Sunrise', stat: weather?.sunrise ?? null, icon: SunriseIcon, change: '4 hours ago', changeType: 'decrease' },
    { id: 2, name: 'Sunset', stat: weather?.sunset ?? null, icon: SunsetIcon, change: 'in 9 hours', changeType: 'increase' },
  ]

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

        <WeatherDisplay icon={weather?.weather_icon ?? null} temperature={weather?.temperature ?? null}/>

        <div className='flex gap-8 flex-col'>
          <Header>Chance of rain</Header>

          <div className='flex gap-4 flex-col'>
            {rainChance.map((chance) => {
              return (
                  <div className='grid grid-cols-12 items-center gap-2' key={chance.time}>
                    <span className='col-span-2 text-sm'>{chance.time}</span>
                    <div className='relative rounded-full bg-gray-300 flex-1 h-6 col-span-8'>
                      <div className={`absolute bg-primary-400 left-0 top-0 rounded-full h-6`}
                           style={{width: `${chance.percentage}%`}}
                      ></div>
                    </div>
                    <span className='col-span-2 justify-self-end text-sm'>{chance.percentage}%</span>
                  </div>
              )
            })}
          </div>
        </div>

        <div className='flex gap-4 flex-col'>
          <Header>Sunrise & Sunset</Header>

          <dl className=" grid grid-cols-1 gap-5">
            {stats.map((item) => (
                <div key={item.id} className="relative overflow-hidden rounded-lg bg-gray-800 bg-opacity-30 px-4 pb-6 pt-5 sm:px-6 sm:pt-6" >
                  <dt>
                    <div className="absolute rounded-md p-3">
                      <item.icon aria-hidden="true" className="h-7 w-7 text-white"/>
                    </div>
                    <p className="ml-16 truncate text-sm font-light text-gray-300">{item.name}</p>
                  </dt>
                  <dd className="ml-16 flex items-baseline gap-3 justify-between">
                    <p className="text-xl font-semibold text-white">{item.stat}</p>
                    <p className='ml-2 flex items-baseline text-sm font-medium text-white'>
                      {item.change}
                    </p>
                  </dd>
                </div>
            ))}
          </dl>
        </div>
      </div>
    </main>
  );
}
