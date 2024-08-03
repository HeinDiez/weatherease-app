import React from 'react';
import { twmerge } from '@/utils/tailwindMerger'

interface SkeletonProps {
    className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
    return (
        <div className={
            twmerge('' +
                'bg-gray-200 animate-pulse rounded-xl dark:bg-gray-700 mb-2.5 h-2 w-full',
                className
            )}></div>
    );
}

export default Skeleton;
