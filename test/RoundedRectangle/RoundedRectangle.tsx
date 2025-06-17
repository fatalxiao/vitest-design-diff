// Types
import type { FC } from 'react';

const RoundedRectangle: FC = () => {
    return (
        <div
            style={{
                width: 120,
                height: 40,
                background: '#000',
                borderRadius: 6,
            }}
        />
    );
};

export default RoundedRectangle;
