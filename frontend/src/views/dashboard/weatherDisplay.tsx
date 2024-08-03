import React from 'react';
import { twmerge } from '@/utils/tailwindMerger';
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
            className={twmerge('flex justify-between items-center pt-3 pb-7 border border-t-0 border-x-0 border-b-gray-400', className)}>

            <div className='inline-flex'>
                {temperature ?
                    <h1 className='text-6xl'>{temperature}</h1> :
                    <Skeleton className='h-[44px] w-[50px] dark:bg-white mb-0'/>
                }
                <span className='text-4xl text-nowrap'>° C</span>
            </div>

            {icon ?
                <div className='flex flex-col'>
                    <Image
                        src={`https://cdn.weatherbit.io/static/img/icons/${icon?.icon}.png`}
                        width={70}
                        height={70}
                        alt={icon?.description ?? ''}
                    />
                    <span className='text-sm font-light'>{icon?.description}</span>
                </div>:
                <div>
                    <Skeleton className='h-[44px] w-[50px] dark:bg-gray-300 mb-0'/>
                </div>
            }

        </div>
    );
}

export default WeatherDisplay;
