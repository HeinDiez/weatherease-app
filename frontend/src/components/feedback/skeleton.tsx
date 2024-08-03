import React from 'react';
import { twMerge } from '@/utils/tailwindMerger'

interface SkeletonProps {
    className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
    return (
        <div className={
            twMerge(
                'h-2 w-full animate-pulse rounded-xl dark:bg-gray-800 dark:bg-opacity-40 mb-2.5 ',
                className
            )}></div>
    );
}

export default Skeleton;
