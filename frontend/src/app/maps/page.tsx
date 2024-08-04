'use client';

import dynamic from 'next/dynamic';
import {usePathname} from "next/navigation";

const WeatherMap = dynamic(() => import('@/views/maps/weatherMap'), { ssr: false });
const MasterLayout = dynamic(()=> import("@/components/layout/master"))

const Maps: React.FC = () => {
    const pathname = usePathname()

    return (
        <MasterLayout path={pathname} useDialogOnly>
            <div style={{ height: '100vh', width: '100%' }}>
                <WeatherMap />
            </div>
        </MasterLayout>
    );
};

export default Maps;