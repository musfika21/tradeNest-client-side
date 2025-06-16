import React, { useState } from "react";
import { Link, NavLink } from "react-router"; // Updated to react-router-dom
import logo from '../assets/logo.png';
import { TiHome, TiHomeOutline } from "react-icons/ti";
import { BiCart, BiCategory, BiShoppingBag, BiSolidCart, BiSolidCategory, BiSolidShoppingBags } from "react-icons/bi";
import { IoIosAddCircle, IoIosAddCircleOutline } from "react-icons/io";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { RiMenuFold2Line, RiMenuUnfold2Line } from "react-icons/ri";
import { CiLogin, CiLogout } from "react-icons/ci";
import useAuth from "../CustomHooks/UseAuth";
import Swal from "sweetalert2";
import { IoPersonCircleOutline } from "react-icons/io5";

const NavLinks = () => (
  <>
    <li className="text-lg flex items-center space-x-2">
      <NavLink
        className={({ isActive }) => (isActive ? 'underline underline-offset-8 text-[#9b111f]' : '')}
        to="/"
      >
        {({ isActive }) => (
          <div className="flex items-center">
            {isActive ? <TiHome /> : <TiHomeOutline />}
            <span className="ml-2 text-[15px]">Home</span>
          </div>
        )}
      </NavLink>
    </li>

    <li className="text-lg flex items-center space-x-2">
      <NavLink
        className={({ isActive }) => (isActive ? 'underline underline-offset-8 text-[#9b111f]' : '')}
        to="/categories"
      >
        {({ isActive }) => (
          <div className="flex items-center">
            {isActive ? <BiSolidCategory /> : <BiCategory />}
            <span className="ml-2 text-[15px]">Categories</span>
          </div>
        )}
      </NavLink>
    </li>

    <li className="text-lg flex items-center space-x-2">
      <NavLink
        className={({ isActive }) => (isActive ? 'underline underline-offset-8 text-[#9b111f]' : '')}
        to="/all-Products"
      >
        {({ isActive }) => (
          <div className="flex items-center">
            {isActive ? <BiSolidShoppingBags /> : <BiShoppingBag />}
            <span className="ml-2 text-[15px]">All Products</span>
          </div>
        )}
      </NavLink>
    </li>

    <li className="text-lg flex items-center space-x-2">
      <NavLink
        className={({ isActive }) => (isActive ? 'underline underline-offset-8 text-[#9b111f]' : '')}
        to="/add-Product"
      >
        {({ isActive }) => (
          <div className="flex items-center">
            {isActive ? <IoIosAddCircle /> : <IoIosAddCircleOutline />}
            <span className="ml-2 text-[15px]">Add Product</span>
          </div>
        )}
      </NavLink>
    </li>

    <li className="text-lg flex items-center space-x-2">
      <NavLink
        className={({ isActive }) => (isActive ? 'underline underline-offset-8 text-[#9b111f]' : '')}
        to="/my-Products"
      >
        {({ isActive }) => (
          <div className="flex items-center">
            {isActive ? <FaHeart /> : <FaRegHeart />}
            <span className="ml-2 text-[15px]">My Products</span>
          </div>
        )}
      </NavLink>
    </li>

    <li className="text-lg flex items-center space-x-2">
      <NavLink
        className={({ isActive }) => (isActive ? 'underline underline-offset-8 text-[#9b111f]' : '')}
        to="/cart"
      >
        {({ isActive }) => (
          <div className="flex items-center">
            {isActive ? <BiSolidCart /> : <BiCart />}
            <span className="ml-2 text-[15px]">Cart</span>
          </div>
        )}
      </NavLink>
    </li>
  </>
);

const Navbar = () => {

  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [sidebar, setSideBar] = useState(false);

  // sign out 
  const handleSignOut = () => {
    Swal.fire({
      title: "Logout Successful",
      icon: "success",
      draggable: true,
    });
    logout();
  }

  return (
    <div className="w-full bg-white fixed left-0 right-0 shadow-md font z-1000">
      <nav className="flex justify-between mx-4 items-center py-3 z-20">

        {/* LOGO */}
        <div className="flex items-center gap-4">

          {/* RESPONSIVE NAVBAR LINKS BY MENU ICON */}
          <div className="flex gap-2" onClick={() => setOpen(!open)}>
            {open ? (
              <RiMenuUnfold2Line className="lg:hidden h-5 w-5 md:w-7 md:h-7 text-[#460911ca]" />
            ) : (
              <RiMenuFold2Line className="lg:hidden h-5 w-5 md:w-7 md:h-7 text-[#460911ca]" />
            )}

            <ul
              className={`lg:hidden absolute space-y-3 left-22 transform -translate-x-1/2
                        duration-300 ease-in-out transition-all font-semibold
                      bg-[#b49494] text-white rounded-md shadow-lg w-45  p-6
                        backdrop-blur-lg z-50
                        ${open ? "top-16 md:top-21 opacity-100 scale-100" : "top-10 opacity-0 scale-90 pointer-events-none"}
                      `}
            >
              {NavLinks()}
            </ul>
          </div>
          {/* applications image */}
          <img className="w-10 h-10 sm:w-12 sm:h-12 md:h-13 md:w-13" src={logo} alt="logo of TradeNest" />
          <h3 className="hidden md:block md:self-center md:text-xl xl:text-3xl font-semibold logo-style">Trade Nest</h3>
        </div>

        {/* NAVBAR LINKS */}
        <div className="hidden lg:flex">
          <ul className="flex lg:gap-4 xl:gap-8">{NavLinks()}</ul>
        </div>

        {/* LOGIN/REGISTER */}
        {
          user ? <>
            <div className="mr-3 cursor-pointer" onClick={() => setSideBar(!sidebar)}>
              {
                user?.photoURL ? (
                  <img
                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13 lg:w-15 lg:h-15 rounded-full border-2 lg:border-3 border-[#6F0E18]"
                    src={user?.photoURL}
                    alt="profile picture"
                  />
                ) : (
                  <IoPersonCircleOutline
                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13 lg:w-15 lg:h-15"
                  />
                )
              }
              <div
                className={`absolute space-y-3 -right-10 transform -translate-x-1/2
                        duration-300 ease-in-out transition-all font-semibold
                      bg-[#b49494] text-white rounded-md shadow-lg w-30 p-2
                        backdrop-blur-lg z-50
                        ${sidebar ? "top-16 md:top-19 lg:top-21 opacity-100 scale-100" : "top-10 opacity-0 scale-90 pointer-events-none"}
                      `}
              >
                <p className="text-center">{user?.displayName}</p>
                <button className="flex items-center gap-2 text-[#460911ca] cursor-pointer" onClick={handleSignOut}><CiLogout />Logout</button>
              </div>
            </div>
          </> : <>
            <div className="flex items-center gap-2 border px-2 py-1 rounded-md text-[#460911ca] border-[#460911ca] bg-[#46091124] cursor-pointer hover:bg-[#460911ca] hover:text-white hover:border-none mr-3">
              <CiLogin /><Link to="/login-user" className="">Login</Link>
            </div>
          </>
        }
      </nav>
    </div>
  );
};

export default Navbar;