'use client';

import dynamic from 'next/dynamic';

const WeatherMap = dynamic(() => import('@/views/maps/weatherMap'), { ssr: false });

const Maps: React.FC = () => {
    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <WeatherMap />
        </div>
    );
};

export default Maps;