import React from 'react';
import { Link } from 'react-router';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-dot-grid opacity-10 pointer-events-none z-0"></div>

      {/* Content */}
      <div className="z-10 text-center">
        {/* 404 */}
        <h1 className="text-[80px] sm:text-[120px] md:text-[180px] lg:text-[220px] xl:text-[260px] font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-[#6F0E18] to-[#9b1c2e] drop-shadow-[0_0_25px_#6F0E18]">
          404
        </h1>

        {/* PAGE NOT FOUND */}
        <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-semibold tracking-widest uppercase mt-[-2rem] drop-shadow-[0_0_5px_#6F0E18]">
          Page Not Found
        </h2>

        {/* Home Button */}
        <Link to="/" className="inline-block mt-8 border border-[#6F0E18] text-[#6F0E18] hover:bg-[#6F0E18] hover:text-white transition px-6 py-2 rounded-lg font-semibold tracking-wider">
          Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
