import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';
import Skeleton from '../skeleton'

describe('Skeleton Component', () => {
    it('renders correctly with default props', () => {
        const { container } = render(<Skeleton />);
        const skeletonDiv = container.firstChild;

        expect(skeletonDiv).toBeInTheDocument();
        expect(skeletonDiv).toHaveClass('h-2 w-full animate-pulse rounded-xl dark:bg-gray-800 dark:bg-opacity-40 mb-2.5');
    });

    it('renders correctly with additional className', () => {
        const additionalClass = 'custom-class';
        const { container } = render(<Skeleton className={additionalClass} />);
        const skeletonDiv = container.firstChild;

        expect(skeletonDiv).toBeInTheDocument();
        expect(skeletonDiv).toHaveClass('h-2 w-full animate-pulse rounded-xl dark:bg-gray-800 dark:bg-opacity-40 mb-2.5');
        expect(skeletonDiv).toHaveClass(additionalClass);
    });

    it('merges class names correctly', () => {
        const { container } = render(<Skeleton className="extra-class" />);
        const skeletonDiv = container.firstChild;

        expect(skeletonDiv).toBeInTheDocument();
        expect(skeletonDiv).toHaveClass('extra-class');
        expect(skeletonDiv).toHaveClass('h-2 w-full animate-pulse rounded-xl dark:bg-gray-800 dark:bg-opacity-40 mb-2.5');
    });
});
