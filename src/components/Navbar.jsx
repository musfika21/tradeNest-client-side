import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import logo from '../assets/logo.png';
import { TiHome, TiHomeOutline } from "react-icons/ti";
import { BiCart, BiCategory, BiShoppingBag, BiSolidCart, BiSolidShoppingBags } from "react-icons/bi";
import { IoIosAddCircle, IoIosAddCircleOutline, IoMdArrowDropdown } from "react-icons/io";
import { FaHeart, FaMoon, FaRegHeart } from "react-icons/fa";
import { RiMenuFold2Line, RiMenuUnfold2Line } from "react-icons/ri";
import { CiLogin, CiLogout } from "react-icons/ci";
import useAuth from "../CustomHooks/UseAuth";
import Swal from "sweetalert2";
import { IoPersonCircleOutline } from "react-icons/io5";
import { ImSun } from "react-icons/im";
import CommonButton from "../Shared/CommonButton";

const categories = [
  { name: "Electronics & Gadgets", slug: "electronics_&_gadgets" },
  { name: "Home & Kitchen Appliances", slug: "home_&_kitchen_appliances" },
  { name: "Fashion & Apparel", slug: "fashion_&_apparel" },
  { name: "Industrial Machinery & Tools", slug: "industrial_machinery_&_tools" },
  { name: "Health & Beauty", slug: "health_&_beauty" },
  { name: "Automotive Parts & Accessories", slug: "automotive_parts_&_accessories" },
  { name: "Office Supplies & Stationery", slug: "office_supplies_&_stationery" },
];

const Navbar = () => {

  const { user, logout, toggleTheme, theme } = useAuth();
  const [open, setOpen] = useState(false);
  const [sidebar, setSideBar] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleCategoryClick = (slug) => {
    navigate(`/category/${slug}`);
    setShowCategories(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCategories(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const NavLinks = () => (
    <>
      <li className="text-lg flex items-center space-x-2">
        <NavLink
          className={({ isActive }) => (isActive ? `underline underline-offset-8 ${theme ? 'text-[#3E3F29]' : 'text-[#7D8D86]'}` : '')}
          to="/"
        >
          {({ isActive }) => (
            <div className="flex items-center">
              {isActive ? <TiHome /> : <TiHomeOutline />}
              <span className="ml-2 text-[15px] font-bold">Home</span>
            </div>
          )}
        </NavLink>
      </li>

      {/* dropdown categories */}
      <li ref={dropdownRef} className="relative text-lg flex items-center space-x-2">
        {/* Trigger */}
        <div
          onClick={() => setShowCategories((prev) => !prev)}
          className={`flex items-center transition-colors duration-200 cursor-pointer
        hover:${theme ? "text-[#3E3F29]" : "text-[#7D8D86]"}
        ${showCategories ? (theme ? "text-[#3E3F29]" : "text-[#7D8D86]") : ""}
      `}
        >
          <BiCategory className="" />
          <span className="ml-1 text-[15px] font-bold">Categories</span>
          <IoMdArrowDropdown
            className={`ml-1 transform transition-transform duration-300 ${showCategories ? "rotate-180" : ""
              }`}
          />
        </div>

        {/* Dropdown */}
        {showCategories && (
          <ul className={`absolute top-full left-0 mt-3 ${theme ? 'bg-white/90 text-black border-gray-200' : 'bg-gray-900/95 text-white border-gray-700'} 
            border backdrop-blur-xl shadow-2xl rounded-xl w-72 z-50 overflow-hidden
            animate-in fade-in slide-in-from-top-2 duration-200`}
          >
            {categories.map((cat, index) => (
              <li
                key={cat.slug}
                onClick={() => handleCategoryClick(cat.slug)}
                className={`px-5 py-3.5 transition-all duration-200 cursor-pointer
                  ${theme
                    ? "hover:bg-[#BCA88D]/40 hover:pl-7"
                    : "hover:bg-[#353935] hover:pl-7"
                  }
                  ${index !== categories.length - 1 ? (theme ? 'border-b border-gray-200/50' : 'border-b border-gray-700/50') : ''}
                  flex items-center gap-2 group
                `}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="text-sm font-medium">{cat.name}</span>
              </li>
            ))}
          </ul>
        )}
      </li>


      <li className="text-lg flex items-center space-x-2">
        <NavLink
          className={({ isActive }) => (isActive ? `underline underline-offset-8 ${theme ? 'text-[#3E3F29]' : 'text-[#7D8D86]'}` : '')}
          to="/all-Products"
        >
          {({ isActive }) => (
            <div className="flex items-center">
              {isActive ? <BiSolidShoppingBags /> : <BiShoppingBag />}
              <span className="ml-2 text-[15px] font-bold">All Products</span>
            </div>
          )}
        </NavLink>
      </li>

      {
        user && <>
          <li className="text-lg flex items-center space-x-2">
            <NavLink
              className={({ isActive }) => (isActive ? `underline underline-offset-8 ${theme ? 'text-[#3E3F29]' : 'text-[#7D8D86]'}` : '')}
              to="/add-Product"
            >
              {({ isActive }) => (
                <div className="flex items-center">
                  {isActive ? <IoIosAddCircle /> : <IoIosAddCircleOutline />}
                  <span className="ml-2 text-[15px] font-bold">Add Product</span>
                </div>
              )}
            </NavLink>
          </li>

          <li className="text-lg flex items-center space-x-2">
            <NavLink
              className={({ isActive }) => (isActive ? `underline underline-offset-8 ${theme ? 'text-[#3E3F29]' : 'text-[#7D8D86]'}` : '')}
              to="/my-Products"
            >
              {({ isActive }) => (
                <div className="flex items-center">
                  {isActive ? <FaHeart /> : <FaRegHeart />}
                  <span className="ml-2 text-[15px] font-bold">My Products</span>
                </div>
              )}
            </NavLink>
          </li>

          <li className="text-lg flex items-center space-x-2">
            <NavLink
              className={({ isActive }) => (isActive ? `underline underline-offset-8 ${theme ? 'text-[#3E3F29]' : 'text-[#7D8D86]'}` : '')}
              to="/cart"
            >
              {({ isActive }) => (
                <div className="flex items-center">
                  {isActive ? <BiSolidCart /> : <BiCart />}
                  <span className="ml-2 text-[15px] font-bold">Cart</span>
                </div>
              )}
            </NavLink>
          </li>
        </>
      }
    </>
  );

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
    <div className={`w-full fixed left-0 right-0 top-0 z-50 ${theme ? 'bg-[#BCA88D]/80 text-black' : 'bg-[#202124]/80 text-white'} backdrop-blur-md border-b ${theme ? 'border-gray-300/20' : 'border-gray-700/20'} shadow-lg`}>
      <nav className="max-w-11/12 mx-auto flex justify-between items-center py-3 px-4">

        {/* LOGO */}
        <div className="flex items-center gap-4">

          {/* RESPONSIVE NAVBAR LINKS BY MENU ICON */}
          <div className="flex gap-2" onClick={() => setOpen(!open)}>
            {open ? (
              <RiMenuUnfold2Line className={`lg:hidden h-5 w-5 md:w-7 md:h-7 ${theme ? 'text-[#3E3F29]' : 'text-[#7D8D86]'} cursor-pointer`} />
            ) : (
              <RiMenuFold2Line className={`lg:hidden h-5 w-5 md:w-7 md:h-7 ${theme ? 'text-[#3E3F29]' : 'text-[#7D8D86]'} cursor-pointer`} />
            )}

            <ul
              className={`lg:hidden absolute space-y-3 left-1/2 transform -translate-x-1/2
                        duration-300 ease-in-out transition-all font-bold
                      ${theme ? 'bg-white/95 text-black' : 'bg-gray-950/95 text-white'} rounded-b-xl shadow-2xl w-full p-6
                        backdrop-blur-xl z-50 border-t-0 ${theme ? 'border-gray-300/20' : 'border-gray-700/20'}
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
        <div className="flex items-center">
          <button
            className="block text-xl mr-1 md:mr-3 cursor-pointer transition-all duration-200 hover:scale-110"
            onClick={toggleTheme}
          >
            {theme ? <FaMoon /> : <ImSun />}
          </button>
          {
            user ? <>
              <div className="mr-3 cursor-pointer relative" onClick={() => setSideBar(!sidebar)}>
                {
                  user?.photoURL ? (
                    <img
                      className={`w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13 rounded-full border-2 lg:border-3 ${theme ? 'border-[#3E3F29]' : 'border-[#7D8D86]'} transition-all duration-200 hover:scale-105`}
                      src={user?.photoURL}
                      alt="profile picture"
                    />
                  ) : (
                    <IoPersonCircleOutline
                      className="w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13 transition-all duration-200 hover:scale-105"
                    />
                  )
                }
                <div
                  className={`absolute space-y-3 right-0 transform
                        duration-300 ease-in-out transition-all font-semibold
                      ${theme ? 'bg-white/95 text-black' : 'bg-gray-950/95 text-white'} rounded-xl shadow-2xl w-48 p-4
                        backdrop-blur-xl z-50 border ${theme ? 'border-gray-200/50' : 'border-gray-700/50'}
                        ${sidebar ? "top-full mt-3 opacity-100 scale-100" : "top-10 opacity-0 scale-90 pointer-events-none"}
                      `}
                >
                  <p className="text-center text-sm border-b pb-2 ${theme ? 'border-gray-200' : 'border-gray-700'}">{user?.displayName}</p>
                  <CommonButton className="flex items-center gap-2 w-full justify-center" onClick={handleSignOut}><CiLogout />Logout</CommonButton>
                </div>
              </div>
            </> : <>
              <Link to="/login-user" className="">
                <CommonButton className="flex items-center gap-2 lg:text-md">
                  <CiLogin />Login
                </CommonButton>
              </Link>
            </>

          }
        </div>
      </nav>
    </div>
  );
};

export default Navbar;