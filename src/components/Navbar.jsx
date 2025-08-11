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
      <li ref={dropdownRef} className="relative text-lg flex items-center space-x-2 cursor-pointer">
        {/* Trigger */}
        <div
          onClick={() => setShowCategories((prev) => !prev)}
          className={`flex items-center transition-colors duration-200
        hover:${theme ? "text-[#3E3F29]" : "text-[#7D8D86]"}
        ${showCategories ? (theme ? "text-[#3E3F29]" : "text-[#7D8D86]") : ""}
      `}
        >
          <BiCategory className="" />
          <span className="text-[15px] font-bold">Categories</span>
          <IoMdArrowDropdown
            className={`ml-1 transform transition-transform duration-200 ${showCategories ? "rotate-180" : ""
              }`}
          />
        </div>

        {/* Dropdown */}
        {showCategories && (
          <ul className={`absolute top-10 left-0 mt-2 ${theme ? 'bg-[#F1F0E4] text-black' : 'bg-[#1F1F1F] text-white'} border shadow-lg rounded-md w-60 z-50`}>
            {categories.map((cat) => (
              <li
                key={cat.slug}
                onClick={() => handleCategoryClick(cat.slug)}
                className={`px-4 py-2 ${theme? "hover:bg-[#BCA88D]" : "hover:bg-[#353935]"} cursor-pointer`}
              >
                {cat.name}
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
    <div className={`w-full ${theme ? 'bg-[#BCA88D] text-black' : 'bg-[#202124] text-white'} fixed left-0 right-0 shadow-md font z-1000`}>
      <nav className="max-w-11/12 mx-auto flex justify-between items-center py-3 z-20">

        {/* LOGO */}
        <div className="flex items-center gap-4">

          {/* RESPONSIVE NAVBAR LINKS BY MENU ICON */}
          <div className="flex gap-2" onClick={() => setOpen(!open)}>
            {open ? (
              <RiMenuUnfold2Line className={`lg:hidden h-5 w-5 md:w-7 md:h-7 ${theme ? 'text-[#3E3F29]' : 'text-[#7D8D86]'}`} />
            ) : (
              <RiMenuFold2Line className={`lg:hidden h-5 w-5 md:w-7 md:h-7 ${theme ? 'text-[#3E3F29]' : 'text-[#7D8D86]'}`} />
            )}

            <ul
              className={`lg:hidden absolute space-y-3 left-1/2 transform -translate-x-1/2
                        duration-300 ease-in-out transition-all font-bold
                      ${theme ? 'bg-[#F1F0E4] text-black' : 'bg-gray-950 text-white'} rounded-b-md shadow-lg w-full p-6
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
        <div className="flex items-center">
          <button
            className="block text-xl mr-1 md:mr-3 cursor-pointer transition delay-75"
            onClick={toggleTheme}
          >
            {theme ? <FaMoon /> : <ImSun />}
          </button>
          {
            user ? <>
              <div className="mr-3 cursor-pointer" onClick={() => setSideBar(!sidebar)}>
                {
                  user?.photoURL ? (
                    <img
                      className={`w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13 rounded-full border-2 lg:border-3 ${theme ? 'text-[#3E3F29]' : 'border-[#7D8D86]'}`}
                      src={user?.photoURL}
                      alt="profile picture"
                    />
                  ) : (
                    <IoPersonCircleOutline
                      className="w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13"
                    />
                  )
                }
                <div
                  className={`absolute space-y-3 -right-15 transform -translate-x-1/2
                        duration-300 ease-in-out transition-all font-semibold
                      ${theme ? 'bg-[#F1F0E4] text-black' : 'bg-gray-950 text-white'} rounded-b-lg shadow-lg w-30 p-4
                        backdrop-blur-lg z-50
                        ${sidebar ? "top-16 md:top-19 opacity-100 scale-100" : "top-10 opacity-0 scale-90 pointer-events-none"}
                      `}
                >
                  <p className="text-center text-sm">{user?.displayName}</p>
                  <CommonButton className="flex items-center gap-2" onClick={handleSignOut}><CiLogout />Logout</CommonButton>
                </div>
              </div>
            </> : <>
              <CommonButton className="flex items-center gap-2 lg:text-md">
                <CiLogin /><Link to="/login-user" className="">Login</Link>
              </CommonButton>
            </>

          }
        </div>
      </nav>
    </div>
  );
};

export default Navbar;