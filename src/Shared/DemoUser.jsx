import { useLocation, useNavigate } from 'react-router';
import useAuth from '../CustomHooks/UseAuth';
import CommonButton from './CommonButton';
import toast from 'react-hot-toast';

const DemoUser = () => {
    const { loginAsDemoUser, theme, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleDemoLogin = async () => {
        try {
            await loginAsDemoUser();
            toast.success("Alice Logged in Successfully!", {
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
            navigate(location.state || '/');
        } catch (error) {
            toast.error(`Login Failed: ${error.message}`, {
                position: 'top-right',
                className: theme
                    ? 'bg-red-50 text-red-800 border border-red-300'
                    : 'bg-red-900 text-red-100 border border-red-700',
            });
        }
    };

    return (
        <CommonButton
            disabled={loading}
            onClick={handleDemoLogin}
        >
            {loading ? "Logging in..." : "Login as Demo User"}
        </CommonButton>
    );
};

export default DemoUser;