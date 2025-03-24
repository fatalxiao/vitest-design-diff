/**
 * @file ScreenshotContainer.tsx
 */

// Vendors
import React from 'react';

// Types
import type { FC, HTMLAttributes } from 'react';

/**
 * The container component for screenshot.
 * @param children
 * @param style
 * @param restProps
 * @constructor
 */
const ScreenshotContainer: FC<HTMLAttributes<HTMLDivElement>> = ({
    children,
    style,
    ...restProps
}) => (
    <div
        {...restProps}
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

export default ScreenshotContainer;
