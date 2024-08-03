import {FC, useMemo} from 'react';
import {getCurrentFormattedTime} from '@/utils/getCurrentFormattedTime'
import Skeleton from "@/components/feedback/skeleton";

interface LocationTimeDisplayProps {
    location: string | null;
    details: string | null;
}

const LocationTimeDisplay: FC<LocationTimeDisplayProps> = ({ location, details }) => {
    // const time = useMemo(() => {
    //     return getCurrentFormattedTime()
    // }, [])

    return (
        <div className='flex justify-between items-center'>
            <div>
                {location ?
                    <h3 className='text-2xl'>{location}</h3> :
                    <Skeleton className='h-[28px] w-[154px] mb-0 dark:bg-gray-600'/>
                }
                {details ?
                    <span className='text-sm font-light'>{details}</span>:
                    <Skeleton className='h-[18px] w-10 dark:bg-gray-600 mt-2.5'/>
                }
            </div>
            <h4 className='text-xl font-bold'>5:45 AM</h4>
        </div>
    );
}

export default LocationTimeDisplay;
