'use client';

import dynamic from 'next/dynamic';

const Header = dynamic(()=> import("@/components/typography/header"))
import {BellIcon, MagnifyingGlassIcon, UserIcon} from "@heroicons/react/24/outline";

export default function ChanceOfRain() {
    const rainChance = [
        { time: '7 PM', percentage: 44 },
        { time: '8 PM', percentage: 30 },
        { time: '9 PM', percentage: 67 },
        { time: '10 PM', percentage: 72 },
        { time: '11 PM', percentage: 20 },
        { time: '12 AM', percentage: 0 },
    ]

    return (
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
    )
}
