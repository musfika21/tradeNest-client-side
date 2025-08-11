import React from 'react';
import { Link } from 'react-router';
import useAuth from '../CustomHooks/UseAuth';
import CommonButton from '../Shared/CommonButton';

const NotFound = () => {

  const { theme } = useAuth();

  return (
    <div className="min-h-1/2 py-auto flex items-center justify-center px-4 relative overflow-hidden pb-4">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-dot-grid opacity-10 pointer-events-none z-0"></div>

      {/* Content */}
      <div className="z-10 text-center">
        {/* 404 */}
        <h1 className={`text-[80px] sm:text-[120px] md:text-[180px] lg:text-[220px] xl:text-[260px] font-extrabold text-transparent bg-clip-text ${theme ? "bg-gradient-to-br from-[#3E3F29] to-[#696a4d] drop-shadow-[0_0_25px_#3E3F29]" : "bg-gradient-to-br from-[#7D8D86] to-[#9baba4]  drop-shadow-[0_0_25px_#7D8D86]"}`}>
          4 0 4
        </h1>

        {/* PAGE NOT FOUND */}
        <h2
          className={`text-white text-xl sm:text-2xl md:text-3xl font-semibold tracking-widest uppercase mt-[-2rem] ${theme ? "drop-shadow-[0_0_5px_#3E3F29]" : "drop-shadow-[0_0_5px_#7D8D86]"
            }`}
        >
          Page Not Found
        </h2>


        {/* Home Button */}
        <Link to="/"><CommonButton className='my-5'>Home</CommonButton></Link>
      </div>
    </div>
  );
};

export default NotFound;
