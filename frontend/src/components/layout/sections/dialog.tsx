import React from 'react';
import LogoIcon from "@/components/icons/logo";
import {  XMarkIcon } from '@heroicons/react/24/outline'
import {twMerge} from "@/utils/tailwindMerger";
import {Dialog, DialogBackdrop, DialogPanel, TransitionChild} from "@headlessui/react";
import { Navigation } from './sidebar'

interface SidebarProps {
    sidebarOpen: boolean
    setSidebarOpen: (value: boolean) => void
    classNames?: string,
    navigation: Navigation[],
}

const Header = ({ sidebarOpen, setSidebarOpen, classNames, navigation }: SidebarProps) => {

    return (
        <Dialog open={sidebarOpen} onClose={setSidebarOpen} className={twMerge(classNames)}>
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
            />

            <div className="fixed inset-0 flex">
                <DialogPanel
                    transition
                    className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
                >
                    <TransitionChild>
                        <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                            <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                                <span className="sr-only">Close sidebar</span>
                                <XMarkIcon aria-hidden="true" className="h-6 w-6 text-white" />
                            </button>
                        </div>
                    </TransitionChild>
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-200 px-6 pb-2">
                        <div className="flex gap-3 h-16 shrink-0 items-center text-primary">
                            <LogoIcon className='h-10 w-10'/>
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
                            </ul>
                        </nav>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
};

export default Header;