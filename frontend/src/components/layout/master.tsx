'use client'

import React, {ReactNode, useMemo, useState} from 'react'

import { Bars3Icon, HomeIcon, MapIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { twMerge } from "@/utils/tailwindMerger";

import Sidebar from "@/components/layout/sections/sidebar";
import Headers from '@/components/layout/sections/header'
import Dialog from '@/components/layout/sections/dialog'

type Props ={
    children: ReactNode;
    path: string,
    useDialogOnly?: boolean
}

export default function MasterLayout({ children, path, useDialogOnly = false }: Props) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const navigation = useMemo(()=> {
        const list = [
            { name: 'Dashboard', href: '/', icon: <HomeIcon /> },
            { name: 'Maps', href: '/maps', icon: <MapIcon /> },
        ]
        return list.map((item) => ({...item, current: item.href === path }) )
    }, [path])

    return (
        <>
            <div>
                <Dialog classNames={useDialogOnly ? "relative z-[1000] " : "relative z-[1000] lg:hidden"}
                        sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} navigation={navigation}/>

                <Sidebar navigation={navigation} classNames={useDialogOnly ? "lg:hidden": 'lg:flex'}/>

                <Headers setSidebarOpen={setSidebarOpen} classNames={useDialogOnly ? "hidden" : "flex"}/>

                <main className={twMerge(useDialogOnly ? "relative" : "lg:pl-72")}>
                    {useDialogOnly &&
                        <button type="button" onClick={() => setSidebarOpen(true)}
                                className="-m-2.5 p-1.5 text-gray-900 absolute top-5 left-16 z-[1000] rounded-lg bg-gray-50 outline-gray-300 hover:bg-gray-50">
                            <span className="sr-only">Open sidebar</span>
                            <Bars3Icon aria-hidden="true" className="h-6 w-6"/>
                        </button>
                    }
                    <div className="">{children}</div>
                </main>
            </div>
        </>
    )
}
