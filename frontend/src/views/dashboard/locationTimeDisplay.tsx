import {FC} from 'react';
import Skeleton from "@/components/feedback/skeleton";
import { formatTime } from '@/utils/useDateFormatter'

interface LocationTimeDisplayProps {
    location: string | null;
    details: string | null;
}

const LocationTimeDisplay: FC<LocationTimeDisplayProps> = ({ location, details }) => {
    return (
        <div className='flex justify-between items-center'>
            <div>
                {location ?
                    <h3 className='text-xl xl:text-2xl'>{location}</h3> :
                    <Skeleton className='h-[28px] w-[154px] mb-0 dark:bg-gray-600'/>
                }
                {details ?
                    <span className='text-sm font-light text-gray-400'>{details}</span>:
                    <Skeleton className='h-[18px] w-10 dark:bg-gray-600 mt-2.5'/>
                }
            </div>
            {location ?
                <h4 className='text-lg xl:text-xl font-bold' suppressHydrationWarning>{formatTime(new Date())}</h4>:
                <Skeleton className='h-[26px] w-[80px] mb-0 dark:bg-gray-500'/>
            }
        </div>
    );
}

export default LocationTimeDisplay;
