import { useEffect } from 'react';
import { axiosPrivate } from '../api/axios';
import useRefreshToken from './useRefreshToken';
import { useGlobalContext } from '../context';

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { user } = useGlobalContext();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        // If the authorization headers does not exist, we know it is not a retry
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${user.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        // If the access token has expired.
        const prevRequest = error?.config;
        console.log('Error in the request, access token has expired');

        // We get a 403 in our backend if the token has expired or can't be decoded.
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          // Get a new access token and retry the request again.
          console.log(
            'Access token has expired because status of 403 has been returned'
          );

          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          console.log('Token refreshed an is attempting another request');
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      // To avoid pilling many interceptors
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [user, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
