import { useState, useEffect } from 'react';

interface LocationState {
    latitude: number | null;
    longitude: number | null;
    error: string | null;
}

const useGeolocation = (): LocationState => {
    const [location, setLocation] = useState<LocationState>({
        latitude: null,
        longitude: null,
        error: null,
    });

    useEffect(() => {
        if (!('geolocation' in navigator)) {
            setLocation((prevState) => ({
                ...prevState,
                error: 'Geolocation is not supported by this browser.',
            }));
            return;
        }

        const onSuccess = (position: GeolocationPosition) => {
            setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
            });
        };

        const onError = (error: GeolocationPositionError) => {
            setLocation((prevState) => ({
                ...prevState,
                error: error.message,
            }));
        };

        const geoOptions = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        };

        const geoWatcher = navigator.geolocation.watchPosition(onSuccess, onError, geoOptions);

        return () => {
            navigator.geolocation.clearWatch(geoWatcher);
        };
    }, []);

    return location;
};

export default useGeolocation;
