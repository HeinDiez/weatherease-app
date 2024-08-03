'use client';

import dynamic from 'next/dynamic';
import {BellIcon, MagnifyingGlassIcon, UserIcon} from "@heroicons/react/24/outline";

export default function Toolbar() {

    return (
        <div className='flex gap-5 border border-white border-b-gray-200 pb-10 justify-between items-center'>
            <div>
                <h3 className='text-xl font-bold text-gray-700'>January 2024</h3>
                <span className='text-sm text-gray-400'>Thursday, Jan 4, 2024</span>
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

                <button type="button"
                        className=" p-2.5 text-gray-400 hover:bg-primary-500 hover:text-white bg-gray-50 rounded-lg">
                    <span className="sr-only">View notifications</span>
                    <BellIcon aria-hidden="true" className="h-6 w-6"/>
                </button>
                <button type="button"
                        className=" p-2.5 text-gray-400 hover:bg-primary-500 hover:text-white bg-gray-50 rounded-lg">
                    <span className="sr-only">User Login</span>
                    <UserIcon aria-hidden="true" className="h-6 w-6"/>
                </button>
            </div>
        </div>
    )
}
