/**
 * @file ScreenshotContainer.tsx
 */

// Vendors
import React from 'react';

// Types
import type { FC, HTMLAttributes } from 'react';

const ScreenshotContainer: FC<HTMLAttributes<HTMLDivElement>> = ({
    children,
    style,
}) => {
    return (
        <div
            style={{
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
                ...style,
            }}
        >
            {children}
        </div>
    );
};

export default ScreenshotContainer;
