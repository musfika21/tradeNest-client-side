import React from "react";
import { Link, NavLink } from "react-router";

const NavLinks = (
    <>
        <li className='text-lg'>
            <NavLink
                className={({ isActive }) =>
                    isActive ? `underline underline-offset-8 '}` : ''
                }
                to='/'>
                Home
            </NavLink>
        </li>

        <li className='text-lg'>
            <NavLink
                className={({ isActive }) =>
                    isActive ? `underline underline-offset-8 '}` : ''
                }
                to='/all-Plants'>
                All Plants
            </NavLink>
        </li>

        <li className='text-lg'>
            <NavLink
                className={({ isActive }) =>
                    isActive ? `underline underline-offset-8 '}` : ''
                }
                to='/add-Plant'>
                Add Plant
            </NavLink>
        </li>

        <li className='text-lg'>
            <NavLink
                className={({ isActive }) =>
                    isActive ? `underline underline-offset-8 '}` : ''
                }
                to='/my-Plants'>
                My Plants
            </NavLink>
        </li>
    </>
);

const Navbar = () => {
    return (
        <div className="">
            <nav className="flex justify-between py-7 fixed left-0 right-0 bg-red-500">
                <div></div>
                {/* NAVBAR LINKS */}
                <div>
                    <ul className="flex gap-5">{NavLinks}</ul>
                </div>
                <div className="space-x-5">
                    <Link to='/login-user'>Login</Link>
                    <Link to='/register-user'>Register</Link>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;

// import React, { useState } from 'react';
// import Link from './Link';
// import { Menu, X } from 'lucide-react';

// const navigationData = [
//     {
//         id: 1,
//         name: "Google",
//         path: "https://www.google.com"
//     },
//     {
//         id: 2,
//         name: "YouTube",
//         path: "https://www.youtube.com"
//     },
//     {
//         id: 3,
//         name: "GitHub",
//         path: "https://github.com"
//     },
//     {
//         id: 4,
//         name: "Stack Overflow",
//         path: "https://stackoverflow.com"
//     },
//     {
//         id: 5,
//         name: "Mozilla Developer Network",
//         path: "https://developer.mozilla.org"
//     }
// ];

// const links = navigationData.map((route) =>
//     <Link
//         key={route.id}
//         route={route}
//     ></Link>)
// const NavBar = () => {

//     const [open, setOpen] = useState(false)

//     return (
//         <nav className='flex justify-between px-10 py-4 bg-gray-50 shadow-xl'>
//             <div
//                 className='flex gap-2'
//                 onClick={() =>setOpen(!open)}
//                 >
//                     {
//                         open ?
//                             <X className='md:hidden'></X> :
//                             <Menu className='md:hidden'></Menu>
//                     }
//                 <ul
//                     className={`md:hidden absolute duration-800
//                     ${open? " top-11" : "-top-80"}
//                     bg-gray-700 text-white p-4 rounded-2xl`}>
//                     {links}
//                 </ul>
//                 <h3>My NavBar</h3>
//             </div>
{
    /* <ul className='md:flex hidden md:gap-10 '>
                  {
                      links
                  }
              </ul>
              <button className='btn btn-accent'>Sign In</button>
              
          </nav>
      );
  };
  
  export default NavBar; */
}
