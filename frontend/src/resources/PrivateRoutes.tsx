import { Outlet, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { idToken } from '../services/verify-service';

const PrivateRoutes = () => {
  const [verified, setVerified] = useState<boolean | null>(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const verified = await idToken();
        setVerified(verified);
      } catch (error) {
        console.error('Error verifying token:', error);
        setVerified(false);
      }
    };

    verifyToken();
  }, []);

  if (verified === null) {
    return <div>Loading...</div>;
  }

  return verified ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
