import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the auth token from localStorage
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <button
      onClick={handleLogout}
      className='group fixed bottom-6 right-6 bg-secondary hover:bg-secondary/70 text-white p-4 rounded-full shadow-lg transition-all hover:shadow-xl flex items-center justify-center'
      title='Logout'
    >
      <LogOut size={20} className='group-hover:scale-125 transition-all duration-300' />
    </button>
  );
};

export default LogoutButton;
