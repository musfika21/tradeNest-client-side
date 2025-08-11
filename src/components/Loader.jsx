import React from 'react';
import { Triangle } from 'react-loader-spinner';
import useAuth from '../CustomHooks/UseAuth';

const Loader = () => {

    const {theme} = useAuth();

    return (
        <div className='flex justify-center items-center min-h-screen'>
            <Triangle
                visible={true}
                height="80"
                width="80"
                color={`${theme ? "" : ""}`}
                ariaLabel="triangle-loading"
            />
        </div>
    );
};

export default Loader;