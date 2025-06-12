import React from "react";

const NotFound = () => {
  return (
   <div className="min-h-screen flex flex-col items-center justify-center bg-black relative overflow-hidden text-white">
      {/* Spotlight Background */}
      <div className="absolute w-[500px] h-[500px] bg-gradient-radial from-gray-800/10 via-gray-700/30 to-black rounded-full blur-3xl pointer-events-none" style={{ top: '20%', left: '25%' }}></div>

      {/* Large Dim "04" */}
      <div className="absolute text-[180px] font-extrabold text-white/10 drop-shadow-[8px_8px_8px_rgba(0,0,0,0.7)] select-none">
        04
      </div>

      {/* Center Content */}
      <div className="relative z-10 mt-48 text-center px-6">
        <h1 className="text-xl font-light text-white mb-2">
          We can’t find that page
        </h1>
        <p className="text-sm text-gray-400 max-w-md mx-auto mb-6">
          We’re fairly sure that page used to be here, but seems to have gone missing. We do apologise on its behalf.
        </p>
        <a
          href="/"
          className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm backdrop-blur-sm transition"
        >
          HOME
        </a>
      </div>
    </div>
  );
};

export default NotFound;
