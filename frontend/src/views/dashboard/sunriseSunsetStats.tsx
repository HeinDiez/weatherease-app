import React from 'react';
import dynamic from "next/dynamic";
import {SunriseIcon, SunsetIcon} from "@/components/icons";
import Skeleton from "@/components/feedback/skeleton";

const Header = dynamic(()=> import("@/components/typography/header"))

interface  SunriseSunsetStatsProps {
    sunrise: string | null;
    sunset: string | null;
}
const SunriseSunsetStats = ({ sunrise, sunset } : SunriseSunsetStatsProps) => {

    const stats = [
        { id: 1, name: 'Sunrise', stat: sunrise, icon: SunriseIcon, change: '4 hours ago', changeType: 'decrease' },
        { id: 2, name: 'Sunset', stat: sunset, icon: SunsetIcon, change: 'in 9 hours', changeType: 'increase' },
    ]

    return (
        <div className='flex gap-4 flex-col'>
            <Header>Sunrise & Sunset</Header>

            <dl className="grid grid-cols-1 gap-5">
                {stats.map((item) => (
                    <div
                        key={item.id}
                        className="relative overflow-hidden rounded-lg bg-gray-800 bg-opacity-30 px-4 pb-6 pt-5 sm:px-6 sm:pt-6"
                    >
                        <dt>
                            <div className="absolute rounded-md p-3">
                                <item.icon aria-hidden="true" className="h-7 w-7 text-white" />
                            </div>
                            <p className="ml-16 truncate text-sm font-light text-gray-300">{item.name}</p>
                        </dt>
                        <dd className="ml-16 flex items-baseline gap-3 justify-between relative">
                            {item.stat ?
                                <p className="text-xl font-semibold text-white">{item.stat}</p>:
                                <Skeleton className='h-[25px] w-[50px] mb-0 dark:bg-gray-500'/>
                            }
                            {item.stat ?
                                <p className="ml-2 flex items-baseline text-sm font-medium text-white">
                                    {item.change}
                                </p>:
                                <Skeleton className='h-[25px] w-[90px] mb-0 dark:bg-gray-500'/>
                            }
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    );
};

export default SunriseSunsetStats;
