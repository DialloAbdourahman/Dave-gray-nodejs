import { useEffect, useState } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import { useGlobalContext } from '../context';

const PersistLogin = ({ children }) => {
  const refresh = useRefreshToken();
  const [loading, setLoading] = useState(false);

  // For this to work, we must make sure that it runs only once, so that is why I removed the react strict mode

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        setLoading(true);
        await refresh();
      } catch (error) {
        console.log('Persist login error', error);
      } finally {
        setLoading(false);
      }
    };
    verifyRefreshToken();
    console.log('Persist user login ran');
  }, []);

  if (loading) return <h1>Loading persist login</h1>;

  return <>{children}</>;
};

export default PersistLogin;
