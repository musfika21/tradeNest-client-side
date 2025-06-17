import React from 'react';
import { Triangle } from 'react-loader-spinner';

const Loader = () => {
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <Triangle
                visible={true}
                height="80"
                width="80"
                color="#9b111f"
                ariaLabel="triangle-loading"
            />
        </div>
    );
};

export default Loader;