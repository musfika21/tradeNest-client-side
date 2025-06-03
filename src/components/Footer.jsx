import React from 'react';
import logo from '../assets/logo.png';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <>
            <footer className="px-4 divide-y font">
                <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
                    <div className="lg:w-1/3">
                        <a rel="noopener noreferrer" href="#" className="flex items-center justify-center space-x-3 lg:justify-start">
                            <img className='w-10 h-10 sm:w-12 sm:h-12 md:h-15 md:w-15' src={logo} alt="logo of TradeNest" />
                            <span className="self-center text-2xl md:text-3xl font-semibold logo-style">Trade Nest</span>
                        </a>
                    </div>
                    <div className="grid grid-cols-3 text-sm justify-between gap-x-3 gap-y-8 lg:w-2/3">
                        <div className="space-y-3">
                            <h3 className="tracking-wide uppercase md:text-lg">Product</h3>
                            <ul className="space-y-1 text-xs sm:text-sm">
                                <li>
                                    <a rel="noopener noreferrer" href="#">Features</a>
                                </li>
                                <li>
                                    <a rel="noopener noreferrer" href="#">Integrations</a>
                                </li>
                                <li>
                                    <a rel="noopener noreferrer" href="#">Pricing</a>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-3">
                            <h3 className="tracking-wide uppercase md:text-lg">Company</h3>
                            <ul className="space-y-1 text-xs sm:text-sm">
                                <li>
                                    <a rel="noopener noreferrer" href="#">Privacy</a>
                                </li>
                                <li>
                                    <a rel="noopener noreferrer" href="#">Terms of Service</a>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-3">
                            <h3 className="uppercase md:text-lg">Developers</h3>
                            <ul className="space-y-1 text-xs sm:text-sm">
                                <li>
                                    <a rel="noopener noreferrer" href="#">Public API</a>
                                </li>
                                <li>
                                    <a rel="noopener noreferrer" href="#">Guides</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="space-y-3">
                            <div className="uppercase text-center md:text-lg">Social media</div>
                            <div className="flex justify-center space-x-3 md:space-x-5">
                                <a href="https://www.facebook.com/" title="Facebook" target='_blank' className="flex items-center p-1">
                                    <FaFacebook className='w-5 h-5 md:w-8 md:h-8 text-[#460911] hover:text-[#8a0a19af] transition-all delay-75' />
                                </a>
                                <a href="https://x.com/" title="Twitter" target='_blank' className="flex items-center p-1">
                                    <FaTwitter className='w-5 h-5 md:w-8 md:h-8 text-[#460911] hover:text-[#8A0A19af]' />
                                </a>
                                <a href="https://www.instagram.com/" title="Instagram" target='_blank' className="flex items-center p-1">
                                    <FaInstagram className='w-5 h-5 md:w-8 md:h-8 text-[#460911] hover:text-[#8A0A19af]' />
                                </a>
                            </div>
                        </div>
                </div>
                <div className="py-6 text-sm text-center text-[#8A0A19]">© 2025 Trade Nest LTD. All rights reserved.</div>
            </footer>
        </>
    );
};

export default Footer;