import axios from '../api/axios';
import { useGlobalContext } from '../context';

const useRefreshToken = () => {
  const { setUser } = useGlobalContext();

  const refresh = async () => {
    try {
      const response = await axios.get('/refresh', {
        withCredentials: true,
      });
      setUser((prev) => {
        return { ...prev, accessToken: response.data.accessToken };
      });
      setUser(response.data);

      return response.data.accessToken;
    } catch (error) {
      console.log('Failed to refresh token', error);
      // Navigate the user to the login page and set the state to null
      setUser(null);
    }
  };

  return refresh;
};

export default useRefreshToken;
