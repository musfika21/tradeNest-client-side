import React from 'react';
import useAuth from '../CustomHooks/UseAuth';
import { Button } from "@material-tailwind/react";

const CommonButton = ({ children, onClick, disabled, className = "", type = "button" }) => {
    const { theme } = useAuth();

    return (
        <Button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`border ${
              theme 
              ? "border-[#3E3F29] hover:bg-[#3E3F29] hover:text-white text-[#3E3F29]" 
              : "border-[#7D8D86] hover:text-white text-[#7D8D86] hover:bg-[#7D8D86]"
            } py-2 px-4 rounded transition-colors duration-300 hover:opacity-80 w-auto bg-transparent normal-case font-bold
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            ${className}`}
        >
            {children}
        </Button>
    );
};

export default CommonButton;