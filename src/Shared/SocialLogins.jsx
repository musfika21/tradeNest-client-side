import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const SocialLogins = () => {
    return (
        <>
            <button aria-label="Login with Google" type="button" className="flex items-center bg-[#2D0509] text-white justify-center w-full py-2 space-x-4 border rounded-sm cursor-pointer hover:shadow-sm hover:shadow-white">
                <FcGoogle />
                <p>Login with Google</p>
            </button>
        </>
    );
};

export default SocialLogins;