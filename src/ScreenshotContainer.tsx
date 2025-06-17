/**
 * @file ScreenshotContainer.tsx
 */

// Vendors
import React from 'react';

// Types
import type { FC, HTMLAttributes } from 'react';

export interface ScreenshotContainerProps
    extends HTMLAttributes<HTMLDivElement> {
    /**
     * The offset of the component when screenshotting.
     */
    offset?: [x?: number, y?: number];
}

/**
 * The container component for screenshot.
 * @param children
 * @param style
 * @param offset
 * @param restProps
 * @constructor
 */
const ScreenshotContainer: FC<ScreenshotContainerProps> = ({
    children,
    style,
    offset,
    ...restProps
}) => {
    return (
        <div
            {...restProps}
            style={{
                width: '100vw',
                height: '100vh',
                transform: `translate(${offset?.[0] || 0}px, ${offset?.[1] || 0}px)`,
                ...style,
            }}
        >
            {children}
        </div>
    );
};

export default ScreenshotContainer;
