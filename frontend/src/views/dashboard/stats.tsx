import React, {useMemo} from "react";

import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { WindIcon, RainIcon, PressureIcon, UvIcon } from '@/components/icons'

import Skeleton from "@/components/feedback/skeleton";
import { isNil } from 'lodash'

interface StatsProps {
    wind?: number,
    pressure?: number,
    uvIndex?: number
}

export default function Stats({ wind, pressure, uvIndex } : StatsProps) {
    const stats = useMemo(() => {
        return [
            { id: 1, name: 'Wind Speed', stat: wind, unit:'m/s', icon: WindIcon, change: '2 m/s', changeType: 'decrease' },
            { id: 2, name: 'Rain Chance', stat: '24', unit:'%', icon: RainIcon, change: '10%', changeType: 'increase' },
            { id: 3, name: 'Pressure', stat: pressure, unit:'mb', icon: PressureIcon, change: '32 mb', changeType: 'increase' },
            { id: 4, name: 'Uv Index', stat: uvIndex, unit:'', icon: UvIcon, change: '0,3', changeType: 'decrease' },
        ]
    },[wind, pressure, uvIndex])

    return (
        <div>
            <div className='flex justify-between '>
                <h3 className="text-base font-semibold leading-6 text-gray-900">Today&apos;s overview</h3>

                <span className='text-sm text-primary cursor-pointer'>More Details</span>
            </div>

            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {stats.map((item) => (
                    <div
                        key={item.id}
                        className="relative overflow-hidden rounded-lg bg-gray-50 px-4 pb-5 sm:pb-12 pt-5 sm:px-6 sm:pt-6"
                    >
                        <dt>
                            <div className="absolute rounded-md p-3">
                                <item.icon aria-hidden="true" className="h-5 lg:h-7 w-5 lg:w-7 text-primary"/>
                            </div>
                            <p className="ml-16 truncate text-sm font-light text-gray-500">{item.name}</p>
                        </dt>
                        <dd className="ml-16 flex items-baseline pb-2 lg:pb-6 xl:pb-7 gap-3 justify-between">
                            <div className="text-xl lg:text-2xl xl:text-4xl font-semibold text-gray-900 flex">
                                { !isNil(item.stat) ?
                                    <p>{item.stat} {item.unit}</p> :
                                    <Skeleton className='h-[40px] w-[60px] mb-0 dark:bg-gray-300'/>
                                }
                            </div>
                            <div className={'ml-2 flex items-baseline text-sm font-light'}>
                                { !isNil(item.stat) ?
                                    <span className='flex'>
                                        {item.changeType === 'increase' ? (
                                            <ChevronUpIcon aria-hidden="true"
                                                         className="h-5 w-5 flex-shrink-0 self-center text-green-500"/>
                                        ) : (
                                            <ChevronDownIcon aria-hidden="true"
                                                           className="h-5 w-5 flex-shrink-0 self-center text-red-500"/>
                                        )}

                                        <span
                                            className="sr-only"> {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by </span>
                                        {item.change}
                                    </span>:
                                    <Skeleton className='h-[20px] w-[30px] mb-0 dark:bg-gray-300'/>
                                }
                            </div>
                            <div className="hidden sm:block absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                                <div className="text-sm">
                                    <a href="#" className="font-light text-gray-500 hover:text-primary-500">
                                        View all<span className="sr-only"> {item.name} stats</span>
                                    </a>
                                </div>
                            </div>
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    )
}
