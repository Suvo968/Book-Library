import  { useContext } from 'react';
import { AuthContext } from '../contects/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';

const Logout = () => {
  const { logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || '/';

  const handleLogout = () => {
    logout()
      .then(() => {
        // Sign-out successful
        alert('Signed out successfully!');
        navigate(from, { replace: true });
      })
      .catch((error) => {
        // Handle error
        console.error('Logout error:', error);
      });
  };

  return (
    <div className="h-screen bg-teal-100 flex items-center justify-center">
      <button
        className="bg-red-700 px-8 py-2 text-white rounded hover:bg-red-800 transition"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
