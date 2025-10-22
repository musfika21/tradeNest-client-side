import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { MdEmail } from 'react-icons/md';
import useAuth from '../../CustomHooks/UseAuth';
import SocialLogins from '../../Shared/SocialLogins';
import CommonButton from '../../Shared/CommonButton';
import toast from 'react-hot-toast';
import DemoUser from '../../Shared/DemoUser';

const Login = () => {
    const { loginUser, setLoading, theme } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
            if (location.pathname === "/register-user") {
                window.document.title = "Register | TradeNest";
            }
        }, [location.pathname]);

    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'email':
                if (!value.trim()) error = 'Email is required';
                else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Please enter a valid email';
                break;
            case 'password':
                if (!value) error = 'Password is required';
                else if (value.length < 6) error = 'Password must be at least 6 characters';
                break;
            default:
                break;
        }
        return error;
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched({ ...touched, [name]: true });
        const error = validateField(name, value);
        setErrors({ ...errors, [name]: error });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (touched[name]) {
            const error = validateField(name, value);
            setErrors({ ...errors, [name]: error });
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const { email, password } = Object.fromEntries(formData);

        // Validate all fields
        const newErrors = {};
        const fieldNames = ['email', 'password'];
        fieldNames.forEach((field) => {
            const value = formData.get(field);
            const error = validateField(field, value);
            if (error) newErrors[field] = error;
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setTouched(fieldNames.reduce((acc, f) => ({ ...acc, [f]: true }), {}));
            toast.error('Please fix all errors before submitting', {
                position: 'top-right',
                className: theme
                    ? 'bg-red-50 text-red-800 border border-red-300'
                    : 'bg-red-900 text-red-100 border border-red-700',
            });
            return;
        }

        loginUser(email, password)
            .then((result) => {
                toast.success("Registered Successfully!", {
                    duration: 3000,
                    position: 'top-right',
                    style: {
                        background: theme ? 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)' : 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)',
                        color: theme ? '#166534' : '#d1fae5',
                        border: `2px solid ${theme ? '#86efac' : '#10b981'}`,
                        padding: '16px',
                        borderRadius: '12px',
                        boxShadow: theme ? '0 4px 12px rgba(34, 197, 94, 0.2)' : '0 4px 12px rgba(16, 185, 129, 0.3)',
                        fontWeight: '600',
                    },
                    iconTheme: {
                        primary: theme ? '#22c55e' : '#10b981',
                        secondary: theme ? '#f0fdf4' : '#064e3b',
                    },
                });
                setLoading(false);
                navigate(location.state || '/');
            })
            .catch((error) => {
                toast.error(`Login Failed: ${error.message}`, {
                    position: 'top-right',
                    className: theme
                        ? 'bg-red-50 text-red-800 border border-red-300'
                        : 'bg-red-900 text-red-100 border border-red-700',
                });
            });
    };

    return (
        <div
            className={`py-5 md:py-10 min-h-screen flex items-center justify-center ${theme
                    ? 'bg-gradient-to-br from-gray-50 to-gray-100'
                    : 'bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a]'
                }`}
        >
            {/* Login Form */}
            <div
                className={`p-6 sm:p-8 md:p-10 rounded-2xl transition-all duration-300 w-11/12 mx-auto md:w-3/4 lg:w-2/3 xl:w-1/2 ${theme ? 'bg-white/60' : 'bg-[#2a2a2a]/70'
                    } backdrop-blur-md`}
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <h1
                        className={`xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 ${theme ? 'text-[#3E3F29]' : 'text-[#E5D3B3]'
                            }`}
                    >
                        Welcome Back
                    </h1>
                    <div
                        className={`h-1 w-20 mx-auto rounded-full ${theme ? 'bg-[#7D8D86]' : 'bg-[#BCA88D]'
                            }`}
                    />
                    <p
                        className={`mt-3 text-xs md:text-sm lg:text-base ${theme ? 'text-gray-600' : 'text-gray-400'
                            }`}
                    >
                        Sign in to continue your journey
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-6">
                    {/* Email */}
                    <div>
                        <label
                            className={`block mb-2 text-sm font-semibold ${theme ? 'text-[#3E3F29]' : 'text-[#BCA88D]'
                                }`}
                        >
                            Email Address
                        </label>
                        <div className="relative">
                            <MdEmail
                                className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme ? 'text-[#7D8D86]' : 'text-[#BCA88D]'
                                    }`}
                            />
                            <input
                                type="email"
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className={`w-full pl-11 pr-4 py-3 rounded-lg border outline-none transition-all duration-200 ${theme
                                        ? 'bg-white/40 text-gray-800 border-[#7D8D86]/30 focus:border-[#7D8D86] focus:ring-[#7D8D86]/20'
                                        : 'bg-[#1a1a1a] text-gray-200 border-[#BCA88D]/30 focus:border-[#BCA88D] focus:ring-[#BCA88D]/20'
                                    } ${touched.email && errors.email
                                        ? 'border-red-500 ring-red-500/20'
                                        : ''
                                    }`}
                            />
                        </div>
                        {touched.email && errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            className={`block mb-2 text-sm font-semibold ${theme ? 'text-[#3E3F29]' : 'text-[#BCA88D]'
                                }`}
                        >
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className={`w-full pr-11 pl-4 py-3 rounded-lg border outline-none transition-all duration-200 ${theme
                                        ? 'bg-white/40 text-gray-800 border-[#7D8D86]/30 focus:border-[#7D8D86] focus:ring-[#7D8D86]/20'
                                        : 'bg-[#1a1a1a] text-gray-200 border-[#BCA88D]/30 focus:border-[#BCA88D] focus:ring-[#BCA88D]/20'
                                    } ${touched.password && errors.password
                                        ? 'border-red-500 ring-red-500/20'
                                        : ''
                                    }`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${theme
                                        ? 'text-[#7D8D86] hover:text-[#3E3F29]'
                                        : 'text-[#BCA88D] hover:text-white'
                                    }`}
                            >
                                {showPassword ? <IoEye size={20} /> : <IoEyeOff size={20} />}
                            </button>
                        </div>
                        {touched.password && errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                    </div>

                    {/* Forgot Password */}
                    <div className="text-right">
                        <Link
                            to="/reset-Password"
                            className={`text-sm font-medium transition-colors ${theme
                                    ? 'text-[#3E3F29] hover:text-[#7D8D86]'
                                    : 'text-[#BCA88D] hover:text-white'
                                }`}
                        >
                            Forgot password?
                        </Link>
                    </div>

                    {/* Submit */}
                    <div className="pt-4 text-center">
                        <CommonButton type="submit" className="w-full sm:w-auto px-12 py-3 text-base">
                            Sign In
                        </CommonButton>
                    </div>
                </form>

                {/* Divider */}
                <div className="flex items-center py-6">
                    <div
                        className={`flex-1 h-px ${theme ? 'bg-[#7D8D86]/30' : 'bg-[#BCA88D]/30'
                            }`}
                    />
                    <span
                        className={`px-4 text-sm ${theme ? 'text-gray-500' : 'text-gray-400'
                            }`}
                    >
                        OR
                    </span>
                    <div
                        className={`flex-1 h-px ${theme ? 'bg-[#7D8D86]/30' : 'bg-[#BCA88D]/30'
                            }`}
                    />
                </div>

                <div className="flex justify-between flex-col md:flex-row w-1/2 mx-auto">
                    <SocialLogins />
                    <DemoUser/>
                </div>

                {/* Register link */}
                <p
                    className={`text-center text-sm md:text-base mt-4 ${theme ? 'text-gray-600' : 'text-gray-400'
                        }`}
                >
                    Don't have an account?{' '}
                    <Link
                        to="/register-user"
                        className={`font-semibold underline transition-colors ${theme
                                ? 'text-[#3E3F29] hover:text-[#7D8D86]'
                                : 'text-[#BCA88D] hover:text-white'
                            }`}
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;