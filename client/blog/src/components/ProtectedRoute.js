import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { user } = useSelector((state) => state.user);
    console.log(user)
    const navigate = useNavigate();
  
    useEffect(() => {
      if (user) {
        navigate('/');
      }
    }, [user, navigate]);
  
    return !user ? children : '';

}

export default ProtectedRoute;

