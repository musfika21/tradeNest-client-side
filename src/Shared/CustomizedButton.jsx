import React from 'react';

const CustomizedButton = ({ text = "Click Me", type = "button" }) => {
  return (
    <>
      <a className="w-full block px-3 py-2 md:px-5 md:py-2.5 relative rounded group text-sm md:text-base text-white font-medium cursor-pointer">
        <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-[#8A0A19] to-[#b94351] cursor-pointer"></span>
        <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-[#8A0A19] to-[#b94351] cursor-pointer"></span>
        <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-[#8A0A19] to-[#b94351] cursor-pointer"></span>
        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-[#8A0A19] from-[#b94351] cursor-pointer"></span>
        <button type={type} className="relative w-full cursor-pointer">{text}</button>
      </a>
    </>
  );
};

export default CustomizedButton;
