'use client';

import {useCallback, useEffect, useState, useRef, useMemo} from 'react'
import dynamic from 'next/dynamic'
import {usePathname} from "next/navigation";

// ** Hook imports
import useGeolocation from '@/lib/useGeolocation'

// ** Component Imports
const Toolbar = dynamic(()=> import("@/views/dashboard/toolbar"))
const Stats = dynamic(()=> import("@/views/dashboard/stats"))
const AverageTemperature = dynamic(()=> import("@/views/dashboard/averageTemperature"))
const LocationTimeDisplay = dynamic(()=> import("@/views/dashboard/locationTimeDisplay"))
const WeatherDisplay = dynamic(()=> import("@/views/dashboard/weatherDisplay"))
const ChanceOfRain = dynamic(()=> import("@/views/dashboard/chanceOfRain"))
const SunriseSunsetStats = dynamic(()=> import("@/views/dashboard/sunriseSunsetStats"))
const MasterLayout = dynamic(()=> import("@/components/layout/master"))

// ** Icon Imports
import { socket } from '@/lib/socket'
import { debounce } from 'lodash';
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
    const pathname = usePathname()
    const { latitude, longitude, error } = useGeolocation();
    const latitudeRef = useRef(latitude);
    const longitudeRef = useRef(longitude);
    const errorRef = useRef(error);

    useEffect(() => {
        latitudeRef.current = latitude;
        longitudeRef.current = longitude;
        errorRef.current = error;
    }, [latitude, longitude, error]);

    const retryInterval = useRef<NodeJS.Timeout | null>(null);
    const [weather, setWeather] = useState<weatherData | null>(null);

    const emitWeatherRequest = useCallback(() => {
        const currentLatitude = latitudeRef.current;
        const currentLongitude = longitudeRef.current;

        socket.emit('getWeather', 'Amsterdam', currentLatitude, currentLongitude);
    },[]);

    const startRetryMechanism = useCallback(() => {
        retryInterval.current = setInterval(() => {
            emitWeatherRequest();
        }, 1000);
    }, [emitWeatherRequest] );

    const stopRetryMechanism = useCallback(() => {
        if (retryInterval.current !== null) {
            clearInterval(retryInterval.current);
            retryInterval.current = null;
        }
    },[])

    useEffect(() => {
        const debouncedSetWeather = debounce((data: any) => {
            setWeather(data);
        }, 1000);

        socket.on('connect', () => {
            if (!latitude){
                startRetryMechanism();
                return
            }
            emitWeatherRequest();
        });

        socket.on('weatherUpdate', (data) => {
            if (data.error) {
                console.log('Something when wrong:', data.error)
                return
            }
            debouncedSetWeather(data);
            stopRetryMechanism();
        });

        socket.on('disconnect', () => {
            stopRetryMechanism();
        });

        socket.on('connect_error', (error) => {
            console.error('Connection error:', error);
        });

        return () => {
            socket.off('weatherUpdate');
            socket.off('connect');
            socket.off('disconnect');
            socket.off('connect_error');
        };
    }, [latitude, emitWeatherRequest, startRetryMechanism, stopRetryMechanism]);

    return (
        <MasterLayout path={pathname}>
            <main className="grid grid-cols-12 min-h-screen gap-5">
                <div className='col-span-12 md:col-span-8 flex min-h-screen flex-col gap-8 md:gap-16 px-3 sm:px-8 py-4 sm:py-8'>
                    <Toolbar />

                    <div className='md:hidden block'>
                        <LocationTimeDisplay
                            location={weather?.city_name ?? null}
                            details={weather?.country_code ?? null}
                        />

                        <WeatherDisplay
                            icon={weather?.weather_icon ?? null}
                            temperature={weather?.temperature ?? null}/>
                    </div>
                    <Stats wind={weather?.wind_speed} pressure={weather?.pressure} uvIndex={weather?.uv_index}/>

                    <div className='md:hidden block space-y-4'>
                        <ChanceOfRain />

                        <SunriseSunsetStats
                            sunrise={weather?.sunrise ?? null}
                            sunset={weather?.sunset ?? null} />
                    </div>

                    <AverageTemperature/>
                </div>
                <div className='hidden col-span-4 py-10 px-6 xl:px-10 bg-gradient-to-br from-blue-950 to-zinc-500 text-white md:flex flex-col gap-6'>
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
        </MasterLayout>
    );
}
