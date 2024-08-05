import React, { useMemo } from 'react';
import dynamic from "next/dynamic";
import {SunriseIcon, SunsetIcon} from "@/components/icons";
import Skeleton from "@/components/feedback/skeleton";
import { timeRelativeToNow } from '@/utils/useDateFormatter'

const Header = dynamic(()=> import("@/components/typography/header"))

interface  SunriseSunsetStatsProps {
    sunrise: string | null;
    sunset: string | null;
}
const SunriseSunsetStats = ({ sunrise, sunset } : SunriseSunsetStatsProps) => {

    const stats = useMemo(() => {
        return [
            { id: 1, name: 'Sunrise', stat: sunrise, icon: SunriseIcon, change: timeRelativeToNow(sunrise as string), changeType: 'decrease' },
            { id: 2, name: 'Sunset', stat: sunset, icon: SunsetIcon, change: timeRelativeToNow(sunset as string), changeType: 'increase' },
        ]
    }, [sunrise, sunset])

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
                        <dd className="ml-16 flex flex-col xl:flex-row items-baseline gap-3 justify-between relative">
                            {item.stat ?
                                <p className="text-xl font-semibold text-white">{item.stat}</p>:
                                <Skeleton className='h-[25px] w-[50px] mb-0 dark:bg-gray-500'/>
                            }
                            {item.stat ?
                                <p className="ml-2 flex items-baseline text-sm font-medium text-gray-400">
                                    {item.change}
                                </p>:
                                <Skeleton className='h-[12px] w-[60px] mb-0 dark:bg-gray-500'/>
                            }
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    );
};

export default SunriseSunsetStats;
