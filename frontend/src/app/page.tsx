'use client';

import { useEffect } from 'react'
import dynamic from 'next/dynamic'

import { BellIcon, MagnifyingGlassIcon, UserIcon } from '@heroicons/react/24/outline'

const Stats = dynamic(()=> import("../views/dashboard/stats"))
const AverageTemperature = dynamic(()=> import("@/views/dashboard/averageTemperature"))
export default function Home() {
  const fetchData = async () => {
    const res = await fetch("http://localhost:4000/");
    console.log(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const rainChance = [
    { time: '7 PM', percentage: 44 },
    { time: '8 PM', percentage: 30 },
    { time: '9 PM', percentage: 67 },
    { time: '10 PM', percentage: 72 },
    { time: '11 PM', percentage: 20 },
    { time: '12 AM', percentage: 0 },
  ]

  return (
    <main className="grid grid-cols-12 min-h-screen gap-5">
      <div className='col-span-12 lg:col-span-8 flex min-h-screen flex-col gap-16 p-8'>
        <div className='flex gap-5 border border-white border-b-gray-200 pb-10 justify-between items-center'>
          <div>
            <h3 className='text-xl font-bold text-gray-700'>January 2023</h3>
            <span className='text-sm text-gray-400'>Thursday, Jan 4, 2022</span>
          </div>
          <div className='flex gap-3'>
              <form action="#" method="GET" className="relative flex flex-1">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <MagnifyingGlassIcon
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                />
                <input
                    id="search-field"
                    name="search"
                    type="search"
                    placeholder="Search..."
                    className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:font-light placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                />
              </form>

              <button type="button" className=" p-2.5 text-gray-400 hover:bg-primary-500 hover:text-white bg-gray-50 rounded-lg">
                <span className="sr-only">View notifications</span>
                <BellIcon aria-hidden="true" className="h-6 w-6"/>
              </button>
              <button type="button" className=" p-2.5 text-gray-400 hover:bg-primary-500 hover:text-white bg-gray-50 rounded-lg">
                <span className="sr-only">User Login</span>
                <UserIcon aria-hidden="true" className="h-6 w-6"/>
              </button>
          </div>
        </div>

        <Stats/>

        <AverageTemperature/>
      </div>
      <div className='hidden col-span-4 p-10 bg-gradient-to-br from-blue-950 to-zinc-500 text-white lg:flex flex-col gap-10'>
        <div className='flex justify-between items-center'>
          <div>
            <h3 className='text-2xl'>
              Hilversum
            </h3>
            <span className='text-sm font-light'>Amsterdam, Netherlands</span>
          </div>

          <h4 className='text-xlfont-bold'>08:54 AM</h4>
        </div>

        <div className='flex justify-between items-center py-10 border border-t-0 border-x-0 border-b-gray-400'>
          <h1 className='text-6xl'>20° C</h1>
          <h3>
            Dramatic
            Cloudy
          </h3>
        </div>

        <div className='flex gap-8 flex-col'>
          <h3 className='text-xl font-bold'>Chance of rain</h3>

          <div className='flex gap-4 flex-col'>
            {rainChance.map((chance) => {
              return (
                  <div className='grid grid-cols-12 items-center gap-2' key={chance.time}>
                    <span className='col-span-2'>{chance.time}</span>
                    <div className='relative rounded-full bg-gray-300 flex-1 h-7 col-span-8'>
                      <div className={`absolute bg-primary-400 left-0 top-0 rounded-full h-7`}
                           style={{width: `${chance.percentage}%`}}
                      ></div>
                    </div>
                    <span className='col-span-2 justify-self-end'>{chance.percentage}%</span>
                  </div>
              )
            })}
          </div>
        </div>

        <div className='flex gap-8 flex-col'>
          <h3 className='text-xl font-bold'>Sunrise & Sunset</h3>


        </div>
      </div>
    </main>
);
}
