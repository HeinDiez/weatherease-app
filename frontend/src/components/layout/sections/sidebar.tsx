import React, {ReactNode} from 'react';
import LogoIcon from "@/components/icons/logo";
import {
    UserCircleIcon,
    Cog6ToothIcon
} from '@heroicons/react/24/outline'
import {twMerge} from "@/utils/tailwindMerger";

export type Navigation = {
    name: string,
    href: string,
    icon: ReactNode,
    current: boolean
}

interface SidebarProps {
    navigation: Navigation[],
    classNames?: string
}

const Sidebar = ({ navigation, classNames }: SidebarProps) => {

    return (
        <div className={twMerge("hidden lg:fixed lg:inset-y-0 lg:z-50 lg:w-72 lg:flex-col", classNames)}>
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-100 px-6">
                <div className="flex gap-3 h-16 shrink-0 items-center text-primary-700">
                    <LogoIcon className='h-10 w-10 fill-primary' />
                    <h3 className='font-bold'>
                        WeatherEase
                    </h3>
                </div>
                <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                            <ul role="list" className="-mx-2 space-y-1">
                                {navigation.map((item) => (
                                    <li key={item.name}>
                                        <a
                                            href={item.href}
                                            className={twMerge(
                                                item.current
                                                    ? 'text-primary-700'
                                                    : 'text-gray-400 hover:text-primary-500',
                                                'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                                            )}
                                        >
                                            <span className={twMerge(
                                                item.current ? 'text-primary-700' : 'text-gray-400 group-hover:text-primary-500',
                                                'h-6 w-6 shrink-0',
                                            )}>
                                                {item.icon}
                                              </span>
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </li>
                        <li className="-mx-6 mt-auto">
                            <ul role="list" className="space-y-1">
                            <li>
                                    <a
                                        href="#"
                                        className="group flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-400 hover:text-primary-500"
                                    >
                                        <Cog6ToothIcon
                                            className='h-6 w-6 shrink-0 text-gray-400 group-hover:text-primary-500'
                                        />
                                        <span className="sr-only">Your Settings</span>
                                        <span aria-hidden="true">Settings</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="group flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-400 hover:text-primary-500"
                                    >
                                        <UserCircleIcon
                                            className='h-6 w-6 shrink-0 text-gray-400 group-hover:text-primary-500'
                                        />
                                        <span className="sr-only">Your profile</span>
                                        <span aria-hidden="true">Sign In</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;