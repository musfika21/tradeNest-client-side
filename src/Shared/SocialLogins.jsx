import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../CustomHooks/UseAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const SocialLogins = () => {

    const {GoogleLogin} = useAuth();
    const navigate = useNavigate();

    const handleGoogleLogin = () => {
    GoogleLogin()
      .then(() => {
        Swal.fire({
            title: "Login Successful",
            icon: "success",
            draggable: true,
          });
        navigate(location?.state || "/");
      })
      .catch(() => {});
  };

    return (
        <>
            <button onClick={handleGoogleLogin}
            aria-label="Login with Google" 
            type="button" 
            className="flex items-center bg-[#2D0509] text-white justify-center w-full py-2 space-x-4 border rounded-sm cursor-pointer hover:shadow-sm hover:shadow-white">
                <FcGoogle />
                <p>Login with Google</p>
            </button>
        </>
    );
};

export default SocialLogins;