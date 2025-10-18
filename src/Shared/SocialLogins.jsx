import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../CustomHooks/UseAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const SocialLogins = () => {

  const { GoogleLogin, theme } = useAuth();
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
      .catch(() => { });
  };

  return (
    <>
      <button onClick={handleGoogleLogin}
        aria-label="Login with Google"
        type="button"
        className={`${theme
            ? "border-[#3E3F29] hover:bg-[#3E3F29] hover:text-white text-[#3E3F29]"
            : "border-[#7D8D86] hover:text-black text-[#7D8D86] hover:bg-[#7D8D86]"
          } flex items-center justify-center px-4 py-2 space-x-4 border rounded-sm cursor-pointer hover:shadow-sm hover:shadow-white`}>
        <FcGoogle />
        <p>Login with Google</p>
      </button>
    </>
  );
};

export default SocialLogins;