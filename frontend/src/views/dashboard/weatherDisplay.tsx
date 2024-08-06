import React from 'react';
import { twMerge } from '@/utils/tailwindMerger';
import Skeleton from "@/components/feedback/skeleton";
import Image from 'next/image'

export type WeatherIcon = {
    icon: string,
    code: number,
    description: string,
}

interface WeatherDisplayProps {
    temperature: number | null;
    icon: WeatherIcon | null;
    className?: string;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ temperature, icon, className = '' }) => {
    return (
        <div
            className={twMerge('flex justify-between items-center pt-3 pb-7 border border-t-0 border-x-0 border-b-gray-200', className)}>

            <div className='flex flex-col'>
                {temperature ?
                    <div className='inline-flex'>
                        <h1 className='text-4xl xl:text-6xl'>{temperature}</h1>
                        <span className='text-4xl text-nowrap'>° C</span>
                    </div> :
                    <Skeleton className='h-[50px] w-[90px] dark:bg-gray-600'/>
                }
                {icon ?
                <span
                    className='text-xs xl:text-sm font-light text-gray-400'>{icon?.description}</span>:
                    <Skeleton className='h-[15px] w-[150px] mb-0 dark:bg-gray-600'/>
                }
            </div>
            {icon ?
                <div className='flex flex-col items-end'>
                    <Image
                        src={`https://cdn.weatherbit.io/static/img/icons/${icon?.icon}.png`}
                        width={85}
                        height={85}
                        alt={icon?.description ?? ''}
                    />
                </div>:
                <Skeleton className='h-[75px] w-[75px] dark:bg-gray-500 mb-0'/>
            }

        </div>
    );
}

export default WeatherDisplay;
