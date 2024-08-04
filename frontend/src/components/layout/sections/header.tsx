import React from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline'
import {twMerge} from "@/utils/tailwindMerger";

interface SidebarProps {
    setSidebarOpen: (value: boolean) => void
    classNames?: string
}

const Header = ({ setSidebarOpen, classNames }: SidebarProps) => {

    return (
        <div
            className={twMerge("sticky top-0 z-40  items-center gap-x-6 bg-gray-100 px-4 py-4 shadow-sm sm:px-6 lg:hidden", classNames)}>
            <button type="button" onClick={() => setSidebarOpen(true)}
                    className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon aria-hidden="true" className="h-6 w-6"/>
            </button>
            <a href="#">
                <span className="sr-only">Your profile</span>
            </a>
        </div>
    );
};

export default Header;