import React from 'react';
import useAuth from '../../CustomHooks/UseAuth';

const Feature = () => {

    const {theme} = useAuth();

    return (
        <section className='pt-16 md:px-10 lg:px-20'>
            <div className='text-center'>
                <h2 className={`text-3xl md:text-4xl font-bold ${theme ? "text-[#3E3F29]" : "text-[#BCA88D]"} mb-6`}>Recent Products</h2>

            </div>
        </section>
    );
};

export default Feature;